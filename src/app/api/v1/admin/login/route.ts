import { NextRequest, NextResponse } from 'next/server'
import clientPromise, { dbName } from "@/lib/mongo"
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

    const client = await clientPromise
    const db = client.db(dbName)
    const usersCollection = db.collection('users')

    const user = await usersCollection.findOne({ email })

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

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    )

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        email: user.email,
        name: user.name,
        permissions: [
          {
            module: "User",
            actions: ["create", "read", "update", "delete"]
          },
          {
            module: "Customer",
            actions: ["create", "read", "update", "delete"]
          },
          {
            module: "Coupon",
            actions: ["create", "read", "update", "delete"]
          }
        ]
      },
    })

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
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
    const token = (await cookies()).get('admin_token')?.value

    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized. No admin token found.',
      }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string
      email: string
      role: string
    }

    const client = await clientPromise
    const db = client.db(dbName)
    const usersCollection = db.collection('users')

    const user = await usersCollection.findOne(
      { _id: new (await import('mongodb')).ObjectId(decoded.id) },
      { projection: { name: 1, email: 1, role: 1, status: 1 } }
    )

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
            module: "User",
            actions: ["create", "read", "update", "delete"]
          },
          {
            module: "Customer",
            actions: ["create", "read", "update", "delete"]
          },
          {
            module: "Coupon",
            actions: ["create", "read", "update", "delete"]
          }
        ]
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
