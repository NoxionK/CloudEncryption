"use server";
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';
import { Readable } from 'stream';
import axios from 'axios';
import fs from 'fs';

// interface EncryptedFile {
//   name: string;
//   type: string;
//   encryptedData: Buffer;
// };

interface FileInfo {
  path: string;
  name: string;
  size: number;
  isEncrypted: boolean;
}

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
      { public_id: fileName, resource_type: 'raw' },
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

export async function downloadFile(url: string, path: string) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  const writer = fs.createWriteStream(path);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  }).then(() => {
    const stats = fs.statSync(path);
    const fileInfo: FileInfo = {
      path: path,
      name: path.split('/').pop() as string,
      size: stats.size,
      isEncrypted: false
    };

    fs.writeFileSync('localFileInfo.json', JSON.stringify(fileInfo))
  });


  // const buffer = Buffer.from(response.data, 'binary');
  // const originalBuffer = Buffer.from(buffer.toString(), 'base64');

  // fs.writeFileSync(path, buffer);

  // return new Promise<void>((resolve, reject) => {
  //   fs.writeFile(path, originalBuffer, err => {
  //     if (err) reject(err)
  //     else resolve();
  //   });
  // });
}

export async function queryAllFiles() {
  try {
    let result = await cloudinary.api.resources({ resource_type: 'raw', max_results: 500 });
    let files = result;
    // console.log('Files:', files);
    return files;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function deleteCloudFile(publicId: string) {
  return new Promise<void>((resolve, reject) => {
    console.log('Deleting file:', publicId);
    cloudinary.uploader.destroy(publicId, {resource_type: 'raw'}, (error, result) => {
      if (error) {
        console.error('Error deleting file:', error);
        reject(error);
      } else {
        console.log('File deleted successfully:', result);
        resolve();
      }
    });
  });
}

export async function deleteCloudFiles(publicIds: string[]) {
  return new Promise<void>((resolve, reject) => {
    console.log('Deleting file:', publicIds);
    cloudinary.api.delete_resources(publicIds, {resource_type: 'raw'}, (error, result) => {
      if (error) {
        //console.error('Error deleting file:', error);
        reject(error);
      } else {
        //console.log('File deleted successfully:', result);
        resolve();
      }
    });
  });
}
