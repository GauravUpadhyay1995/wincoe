// /src/app/api/v1/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/config/mongo';
import { User } from '@/models/User';
import { withAuth } from '@/lib/withAuth';
import { asyncHandler } from '@/lib/asyncHandler';
import bcrypt from 'bcryptjs';

export const PATCH = withAuth(asyncHandler(async (req: NextRequest, { params }: any) => {
  await connectToDB();

  const userId = params.id;
  const updates = await req.json();

  // 🧼 Remove unallowed fields
  const allowedFields = ['name', 'email', 'mobile', 'role', 'password'];
  Object.keys(updates).forEach(key => {
    if (!allowedFields.includes(key)) {
      delete updates[key];
    }
  });

  // 🛡️ Email uniqueness check
  if (updates.email) {
    const existingEmail = await User.findOne({ email: updates.email, _id: { $ne: userId } });
    if (existingEmail) {
      return NextResponse.json({
        success: false,
        message: 'Email already in use by another user',
      }, { status: 400 });
    }
  }

  // 📵 Mobile uniqueness check
  if (updates.mobile) {
    const existingMobile = await User.findOne({ mobile: updates.mobile, _id: { $ne: userId } });
    if (existingMobile) {
      return NextResponse.json({
        success: false,
        message: 'Mobile number already in use by another user',
      }, { status: 400 });
    }
  }

  // 🔐 If password is being updated, hash it
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  // ✏️ Update user
  const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');

  if (!updatedUser) {
    return NextResponse.json({
      success: false,
      message: 'User not found',
    }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    message: 'User updated successfully',
    data: updatedUser
  });
}));
