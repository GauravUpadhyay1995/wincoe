import { NextRequest, NextResponse } from 'next/server';
import { asyncHandler } from '@/lib/asyncHandler';
import { withAuth } from '@/lib/withAuth';
import { connectToDB } from '@/config/mongo';
import { Team } from '@/models/Team';
import { uploadBufferToS3 } from '@/lib/uploadToS3';
import { ApiError } from '@/lib/errorHandler';

type UpdateTeamBody = {
  name?: string;
  designation?: string;
  department?: string;
  profileImageUrl?: string;
  description?: string;
  socialLinks?: Record<string, string>;
  updatedBy?: string;
};

export const PATCH = withAuth(
  asyncHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
    await connectToDB();
    const user = (req as any).user;
    const teamId = params.id;

    const formData = await req.formData();
    const body = Object.fromEntries(formData.entries());

    // Parse optional social links
    let parsedSocialLinks: Record<string, string> = {};
    if (typeof body.socialLinks === 'string') {
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
    let profileImageUrl = existingTeam.profileImageUrl;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await uploadBufferToS3(buffer, file.type, file.name, 'teams');
      profileImageUrl = result?.url || profileImageUrl;
    }

    // Final data
    const updateData: UpdateTeamBody = {
      ...(body.name && { name: body.name }),
      ...(body.designation && { designation: body.designation }),
      ...(body.department && { department: body.department }),
      ...(body.description && { description: body.description }),
      ...(profileImageUrl && { profileImageUrl }),
      socialLinks: {
        ...existingTeam.socialLinks?.toObject?.(), // existing links (if any)
        ...parsedSocialLinks,
      },
      updatedBy: user.id,
    };

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
