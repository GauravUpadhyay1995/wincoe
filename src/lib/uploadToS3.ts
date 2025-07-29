// lib/uploadToS3.ts
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  S3ServiceException
} from '@aws-sdk/client-s3';


const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

interface UploadResult {
  url: string;
  key: string;
  size: number;
}

export const uploadBufferToS3 = async (
  buffer: Buffer,
  mimetype: string,
  originalName: string,
  folder: string
): Promise<UploadResult> => {
  try {
    // Sanitize filename
    const cleanFileName = originalName
      .replace(/[^\w.-]/g, '') // Remove special chars
      .replace(/\s+/g, '-')
      .toLowerCase();

    const key = `${folder}/${Date.now()}-${cleanFileName}`;

    const input: PutObjectCommandInput = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
      // Metadata: { originalName } // Optional: preserve original filename
    };

    const command = new PutObjectCommand(input);
    await s3.send(command);

    return {
      url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
      key,
      size: buffer.length
    };
  } catch (error) {
    if (error instanceof S3ServiceException) {
      console.error('S3 Upload Error:', error.$metadata);
      throw new Error(`Upload failed: ${error.message}`);
    }
    throw error;
  }
};