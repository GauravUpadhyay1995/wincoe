import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import clientPromise, { dbName } from './mongo'

export async function verifyAdmin() {
  const token = (await cookies()).get('admin_token')?.value

  if (!token) {
    throw new Error('Unauthorized: Token missing')
  }

  let decoded: { id: string; email: string; role: string }

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!) as typeof decoded
  } catch (err) {
    throw new Error('Unauthorized: Invalid token')
  }

  if (!decoded || decoded.role !== 'admin') {
    throw new Error('Unauthorized: Admin role required')
  }

  // Optional: verify from DB if you want stronger validation
  const client = await clientPromise
  const db = client.db(dbName)
  const user = await db.collection('users').findOne({
    _id: new ObjectId(decoded.id),
    role: 'admin',
  })

  if (!user) {
    throw new Error('Unauthorized: Admin not found')
  }

  return {
    user,
    token,
  }
}
