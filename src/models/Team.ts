import mongoose, { Schema, Types } from 'mongoose';

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  profileImage: {
    type: String, // URL to S3
    required: false,
  },
  socialLinks: {
    facebook: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    twitter: { type: String, trim: true },
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isSteering: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  updatedBy: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
