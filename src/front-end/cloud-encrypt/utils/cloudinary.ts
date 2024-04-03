"use server";
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';
import { Readable } from 'stream';

// interface EncryptedFile {
//   name: string;
//   type: string;
//   encryptedData: Buffer;
// };

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function uploadFile(encryptedData: string, fileName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const readableStream = new Readable();
    readableStream.push(encryptedData);
    readableStream.push(null); // indicates end of data
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: fileName, resource_type: 'auto' },
      (error, result: any) => {
        if (error) {
          console.error('Error uploading file:', error);
          reject(error);
        } else {
          console.log('File uploaded successfully. File URL:', result.url);
          resolve();
        }
      }
    );
    readableStream.pipe(uploadStream);
  });
}

export async function queryAllFiles() {
  try {
    let result = await cloudinary.api.resources({ resource_type: 'raw' });
    let files = result;
    return files;
  } catch (err) {
    console.error(err);
    return [];
  }
}
