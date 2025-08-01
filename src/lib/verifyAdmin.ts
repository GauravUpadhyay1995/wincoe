import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { sendResponse } from './sendResponse';
import { cookies } from 'next/headers';

export const verifyAdmin = (handler: Function) => {
  return async (req: NextRequest, ...args: any[]) => {
    // 🧁 Get token from cookies
    const token = (await cookies()).get('admin_token')?.value;

    if (!token) {
      return sendResponse({
        success: false,
        message: 'Unauthorized: Token not found in cookies',
        statusCode: 401,
      });
    }

    try {
      // 🔐 Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        email: string;
        role: string;
      };

      // 🚫 Ensure the user is an admin
      if (!decoded || decoded.role !== 'admin') {
        return sendResponse({
          success: false,
          message: 'Unauthorized: Admin access only',
          statusCode: 403,
        });
      }

      // ✅ Attach user to request
      (req as any).user = decoded;

      // 🟢 Proceed to handler
      return handler(req, ...args);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return sendResponse({
          success: false,
          message: 'Unauthorized: Token expired',
          statusCode: 401,
        });
      }

      if (err instanceof jwt.JsonWebTokenError) {
        return sendResponse({
          success: false,
          message: 'Unauthorized: Invalid token',
          statusCode: 401,
        });
      }

      throw err;
    }
  };
};
