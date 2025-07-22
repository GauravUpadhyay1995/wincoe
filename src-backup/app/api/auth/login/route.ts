import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Email and password required',
        data: null,
      }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password',
        data: null,
      }, { status: 401 })
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    // ✅ Set JWT in secure HttpOnly cookie
    ;(await
      // ✅ Set JWT in secure HttpOnly cookie
      cookies()).set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({
      success: false,
      message: 'Server error during login',
      data: null,
    }, { status: 500 })
  }
}

export async function GET() {
  const token = (await cookies()).get('token')?.value

  if (!token) {
    return NextResponse.json({
      success: false,
      message: 'Unauthorized: token missing',
      data: null,
    }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }

    const user = await prisma.user.findUnique({
      where: { id: Number(decoded.id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
        data: null,
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Authenticated user fetched',
      data: user,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Invalid or expired token',
      data: null,
    }, { status: 401 })
  }
}
