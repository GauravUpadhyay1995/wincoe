import { NextRequest, NextResponse } from 'next/server';
import { asyncHandler } from '@/lib/asyncHandler';
import { withAuth } from '@/lib/withAuth';
import { connectToDB } from '@/config/mongo';
import { Team } from '@/models/Team';
import { uploadBufferToS3 } from '@/lib/uploadToS3';
import { ApiError } from '@/lib/errorHandler';
import { verifyAdmin } from '@/lib/verifyAdmin';

type UpdateTeamBody = {
  name?: string;
  designation?: string;
  department?: string;
  profileImage?: string;
  description?: string;
  isSteering: boolean;
  socialLinks?: Record<string, string>;
  updatedBy?: string;
  isActive?: boolean;
};

export const PATCH = verifyAdmin(
  asyncHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
    await connectToDB();
    const user = (req as any).user;
    const teamId = params.id;

    const formData = await req.formData();
    console.log("formDATA=", formData)
    const body = Object.fromEntries(formData.entries());

    // Parse optional social links
    let parsedSocialLinks: Record<string, string> = {};
    if (typeof body.socialLinks == 'string') {
      try {
        parsedSocialLinks = JSON.parse(body.socialLinks);
      } catch {
        parsedSocialLinks = {};
      }
    }

    // Check if team exists
    const existingTeam = await Team.findById(teamId);
    if (!existingTeam) {
      return NextResponse.json({ success: false, message: 'Team not found' }, { status: 404 });
    }

    // Handle image upload
    const file = formData.get('profileImage') as File | null;
    let profileImage = existingTeam.profileImage;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await uploadBufferToS3(buffer, file.type, file.name, 'teams');
      profileImage = result?.url || profileImage;
      console.log("profileImage", profileImage)
    }

    // Determine new isActive value
    let isActive: boolean | undefined = undefined;
    if (body.hasOwnProperty('isActive')) {
      isActive = !existingTeam.isActive; // toggle current value
    }

    // Final data
    const updateData: UpdateTeamBody = {
      ...(body.name && { name: body.name }),
      ...(body.designation && { designation: body.designation }),
      ...(body.department && { department: body.department }),
      ...(body.isSteering && { isSteering: body.isSteering }),
      ...(profileImage && { profileImage }),
      ...(isActive !== undefined && { isActive }),
      socialLinks: {
        ...existingTeam.socialLinks?.toObject?.(), // existing links (if any)
        ...parsedSocialLinks,
      },
      updatedBy: user.id,
    };
    console.log("updateData=", updateData)
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { $set: { ...updateData, updatedAt: new Date() } },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedTeam) throw new ApiError(404, 'Team not found after update');

    return NextResponse.json({
      success: true,
      message: 'Team updated successfully',
      data: updatedTeam,
    });
  })
);
