import { NextRequest, NextResponse } from 'next/server';
import { asyncHandler } from '@/lib/asyncHandler';
import { withAuth } from '@/lib/withAuth';
import { connectToDB } from '@/config/mongo';
import { Team } from '@/models/Team';
import { uploadBufferToS3 } from '@/lib/uploadToS3';
import { createTeamSchema } from '@/lib/validations/team.schema';
import { Types } from 'mongoose';

type CreateTeamBody = {
  name: string;
  designation: string;
  department: string;
  profileImage?: string;
  description?: string;
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
  };
  isActive?: boolean;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
};

export const POST = withAuth(
  asyncHandler(async (req: NextRequest) => {
    await connectToDB();
    const user = (req as any).user;
    const formData = await req.formData();

    const rawBody = Object.fromEntries(formData.entries());

    // Parse `socialLinks` JSON if provided
    if (typeof rawBody.socialLinks === 'string') {
      try {
        rawBody.socialLinks = JSON.parse(rawBody.socialLinks);
      } catch {
        rawBody.socialLinks = {};
      }
    }

    // Remove file key before validation
    delete rawBody.profileImage;

    // ✅ Joi Validation
    const { error, value } = createTeamSchema.validate(rawBody, { abortEarly: false });
    if (error) {
      const formattedErrors = error.details.reduce((acc, curr) => {
        acc[curr.path[0] as string] = curr.message;
        return acc;
      }, {} as Record<string, string>);

      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: formattedErrors,
          data: null,
        },
        { status: 400 }
      );
    }

    // ✅ Handle file upload
    let profileImageUrl = '';
    const file = formData.get('profileImage') as File | null;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const upload = await uploadBufferToS3(buffer, file.type, file.name, 'teams');
      profileImageUrl = upload?.url || '';
    }

    // ✅ Prepare Team data
    const teamData: CreateTeamBody = {
      ...value,
      profileImage: profileImageUrl || '',
      isActive: rawBody.isActive === 'true',
      createdBy: new Types.ObjectId(user.id),
      updatedBy: new Types.ObjectId(user.id),
    };

    // ✅ Save to DB
    const created = await createTeam(teamData);

    return NextResponse.json({
      success: true,
      message: 'Team created successfully',
      data: created,
    });
  })
);

// 🔁 Separate logic for DB insertion
const createTeam = async (data: CreateTeamBody) => {
  try {
    await connectToDB();
    const team = new Team(data);
    const saved = await team.save();
    return saved.toObject();
  } catch (err) {
    console.error('Team creation failed:', err);
    throw new Error('Team creation failed');
  }
};
