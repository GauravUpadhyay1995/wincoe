import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Email and password are required',
      }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || user.role !== 'admin') {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized: Admin not found',
      }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials',
      }, { status: 401 })
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    )

    // ✅ Create response using your original structure
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        email: user.email,
        name: user.name,
        permissions: [
            {
                "module": "User",
                "actions": [
                    "create",
                    "read",
                    "update",
                    "delete"
                ]
            },
            {
                "module": "Customer",
                "actions": [
                    "create",
                    "read",
                    "update",
                    "delete"
                ]
            },
            {
                "module": "Coupon",
                "actions": [
                    "create",
                    "read",
                    "update",
                    "delete"
                ]
            }
        ], // Replace or fetch from DB if needed
      },
    })

    // ✅ Set token in cookie with `admin_token` key
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in prod
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })

    return response
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json({
      success: false,
      message: 'Something went wrong. Try again later.',
    }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    // Read the token from cookies
    const token = (await cookies()).get('admin_token')?.value

    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized. No admin token found.',
      }, { status: 401 })
    }

    // Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number
      email: string
      role: string
    }

    // Fetch user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    })

    if (!user || user.role !== 'admin') {
      return NextResponse.json({
        success: false,
        message: 'Admin not found or unauthorized.',
      }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      message: 'Admin info fetched successfully',
      user: {
        email: user.email,
        name: user.name,
        adminToken: token,
         permissions: [
            {
                "module": "User",
                "actions": [
                    "create",
                    "read",
                    "update",
                    "delete"
                ]
            },
            {
                "module": "Customer",
                "actions": [
                    "create",
                    "read",
                    "update",
                    "delete"
                ]
            },
            {
                "module": "Coupon",
                "actions": [
                    "create",
                    "read",
                    "update",
                    "delete"
                ]
            }
        ], // Replace or fetch from DB if needed
      },
    }, { status: 200 })

  } catch (error) {
    console.error('Get admin API error:', error)
    return NextResponse.json({
      success: false,
      message: 'Invalid or expired token',
    }, { status: 401 })
  }
}
