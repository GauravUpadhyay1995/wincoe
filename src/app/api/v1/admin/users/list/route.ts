import { NextRequest, NextResponse } from 'next/server'
import clientPromise, { dbName } from "@/lib/mongo"
import { verifyAdmin } from '@/lib/verifyAdmin'

export async function GET(request: NextRequest) {
  try {
    // ✅ Authenticate admin
    const { user } = await verifyAdmin()

    // ✅ Query parameters
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1', 10)
    const perPage = parseInt(searchParams.get('perPage') || '10', 10)
    const email = searchParams.get('email') || ''

    // ✅ DB connection
    const client = await clientPromise
    const db = client.db(dbName)
    const usersCollection = db.collection('users')

    // ✅ Filtering
    const filter: any = {}
    if (email) {
      filter.email = { $regex: email, $options: 'i' }
    }

    // ✅ Count and fetch
    const total = await usersCollection.countDocuments(filter)
    const users = await usersCollection
      .find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .project({ password: 0 }) // 🔐 Never expose password
      .toArray()

    // ✅ Success
    return NextResponse.json({
      success: true,
      message: 'User list fetched successfully',
      total,
      currentPage: page,
      perPage,
      data: users,
    })

  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error'

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: errorMessage.includes('Unauthorized') ? 401 : 500 }
    )
  }
}
