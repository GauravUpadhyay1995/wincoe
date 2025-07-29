import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { sendResponse } from './sendResponse';


export const withAuth = (handler: Function,) => {
  return async (req: NextRequest, ...args: any[]) => {
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendResponse({
        success: false,
        message: 'Unauthorized: Token missing or malformed',
        statusCode: 401
      });

    }

    const token = authHeader.split(' ')[1]; // Get token after "Bearer"

    try {
      // 🔐 Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      // ✅ Attach decoded user to request
      (req as any).user = decoded;



      return handler(req, ...args);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {

        return sendResponse({
          success: false,
          message: 'Unauthorized: Token expired',
          statusCode: 401
        });
      }
      if (err instanceof jwt.JsonWebTokenError) {

        return sendResponse({
          success: false,
          message: 'Unauthorized: Invalid token',
          statusCode: 401
        });
      }

      throw err;
    }
  };
};
