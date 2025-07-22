import { NextResponse } from 'next/server'
import clientPromise, { dbName } from "@/lib/mongo";
import bcrypt from 'bcryptjs'

// Helper: Generate a random secure password
function generatePassword(length = 10) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

// Helper: Validate email format
function isValidEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Helper: Validate mobile number (10-digit)
function isValidMobile(mobile: string) {
  const regex = /^[6-9]\d{9}$/
  return regex.test(mobile)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, role, password, mobile } = body

    // ✅ Basic validation
    if (!name || !email || !mobile) {
      return NextResponse.json({
        success: false,
        message: 'Name, email and mobile are required.',
        data: null
      }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email format.',
        data: null
      }, { status: 400 })
    }

    if (!isValidMobile(mobile)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid mobile number. Must be a 10-digit Indian number starting with 6-9.',
        data: null
      }, { status: 400 })
    }

    if (password && password.length < 6) {
      return NextResponse.json({
        success: false,
        message: 'Password must be at least 6 characters.',
        data: null
      }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(dbName) // 🔁 Change this to your actual DB name
    const usersCollection = db.collection('users')

    // ✅ Check if user already exists
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: 'Email already exists.',
        data: null
      }, { status: 400 })
    }

    // ✅ Use given or generated password
    const rawPassword = password || generatePassword()
    const hashedPassword = await bcrypt.hash(rawPassword, 10)

    // ✅ Insert user
    const newUser = {
      name,
      email,
      mobile,
      password: hashedPassword,
      role: role || 'student',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await usersCollection.insertOne(newUser)

    return NextResponse.json({
      success: true,
      message: 'User created successfully.',
      data: {
        user: {
          id: result.insertedId,
          name: newUser.name,
          email: newUser.email,
          mobile: newUser.mobile,
          role: newUser.role,
          status: newUser.status
        },
        plainPassword: rawPassword
      }
    })
  } catch (error) {
    console.error('User creation failed:', error)
    return NextResponse.json({
      success: false,
      message: 'Something went wrong while creating the user.',
      data: null
    }, { status: 500 })
  }
}
