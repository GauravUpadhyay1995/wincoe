import { NextRequest, NextResponse } from 'next/server';
import { asyncHandler } from '@/lib/asyncHandler';
import { withAuth } from '@/lib/withAuth';
import { connectToDB } from '@/config/mongo';
import { Gallery } from '@/models/Gallery';
import { uploadBufferToS3 } from '@/lib/uploadToS3';
import { createGallerySchema } from '@/lib/validations/gallery.schema';
import { Types } from 'mongoose';
import {verifyAdmin}  from '@/lib/verifyAdmin';

type CreateGalleryBody = {
  title: string;
  images?: {
    url: string;
    mimetype: string;
    size: number;
  }[];
  video_url?: {
    url: string;
    title: string;
    description: string;
  }[];
  isActive?: boolean;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
};

export const POST = verifyAdmin(
  asyncHandler(async (req: NextRequest) => {
    await connectToDB();
    const user = (req as any).user;
    const formData = await req.formData();

    const rawBody: any = {};
    for (const [key, value] of formData.entries()) {
      if (key === 'video_url') {
        if (!rawBody.video_url) rawBody.video_url = [];
        // Parse the video data if it's JSON string
        try {
          const videoData = JSON.parse(value as string);
          rawBody.video_url.push({
            url: videoData.url,
            title: videoData.title || '',
            description: videoData.description || ''
          });
        } catch (e: any) {
          // Fallback to simple URL if parsing fails
          rawBody.video_url.push({
            url: value,
            title: '',
            description: ''
          });
        }
      } else {
        rawBody[key] = value;
      }
    }

    // ✅ Extract image files
    const imageFiles = formData.getAll('images') as File[];
    delete rawBody.images;

    // ✅ Validate with Joi
    const { error, value } = createGallerySchema.validate(rawBody, { abortEarly: false });
    if (error) {
      const formattedErrors = error.details.reduce((acc, curr) => {
        acc[curr.path[0] as string] = curr.message;
        return acc;
      }, {} as Record<string, string>);

      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors: formattedErrors,
        data: null,
      }, { status: 400 });
    }

    // ✅ Upload image files
    let imageMetaData: CreateGalleryBody['images'] = [];

    for (const file of imageFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploaded = await uploadBufferToS3(buffer, file.type, file.name, 'gallery');
      if (uploaded?.url) {
        imageMetaData.push({
          url: uploaded.url,
          mimetype: file.type,
          size: file.size,
        });
      }
    }

    const galleryData: CreateGalleryBody = {
      ...value,
      images: imageMetaData.length > 0 ? imageMetaData : undefined,
      isActive: rawBody.isActive === 'true',
      createdBy: new Types.ObjectId(user.id),
      updatedBy: new Types.ObjectId(user.id),
    };

    const created = await createGallery(galleryData);

    return NextResponse.json({
      success: true,
      message: 'Gallery created successfully',
      data: created,
    });
  })
);

// ✅ Insert into DB
const createGallery = async (data: CreateGalleryBody) => {
  try {
   
    const gallery = new Gallery(data);
    const saved = await gallery.save();
    return saved.toObject();
  } catch (err) {
    console.error('Gallery creation failed:', err);
    throw new Error('Gallery creation failed');
  }
};
