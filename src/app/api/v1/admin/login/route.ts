import { NextRequest } from 'next/server';
import { asyncHandler } from '@/lib/asyncHandler';
import { connectToDB } from '@/config/mongo';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '@/models/User';
import { loginUserSchema } from '@/lib/validations/user.schema';
import { sendResponse } from '@/lib/sendResponse';

export const POST = asyncHandler(async (req: NextRequest) => {
  const body = await req.json();

  // ✅ Joi validation
  const { error, value } = loginUserSchema.validate(body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.reduce((acc, curr) => {
      acc[curr.path[0] as string] = curr.message;
      return acc;
    }, {} as Record<string, string>);

    return sendResponse({
      success: false,
      statusCode: 400,
      message: 'Validation failed',
      data: errorMessages,
    });
  }

  const { email, password } = value;

  await connectToDB();

  // ⛔ Must include password field manually due to select: false
  const user = await User.findOne({ email }).select('+password');

  if (!user || user.role !== 'admin') {
    return sendResponse({
      success: false,
      statusCode: 401,
      message: 'Unauthorized: Admin not found',
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return sendResponse({
      success: false,
      statusCode: 401,
      message: 'Invalid credentials',
    });
  }

  // ✅ JWT creation
  const token = generateToken({
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  // ✅ Permissions (can later be fetched from DB if needed)
  const permissions = getAdminPermissions();

  return sendResponse({
    message: 'Login successful',
    token,
    data: {
      email: user.email,
      name: user.name,
      permissions,
    },
  });
});

// 🔐 Generate JWT
const generateToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

// 📦 Admin role-based permission object
const getAdminPermissions = () => [
  { module: 'User', actions: ['create', 'read', 'update', 'delete'] },
  { module: 'Customer', actions: ['create', 'read', 'update', 'delete'] },
  { module: 'Coupon', actions: ['create', 'read', 'update', 'delete'] },
];
