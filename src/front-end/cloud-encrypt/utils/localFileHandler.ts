"use server";
import fs from 'fs';
import { decrypt } from './crypto';
import path from 'path';

declare global {
    interface Window {
        electron: {
            openFile(path: string): Promise<void>
        }
    }
}

export const decryptFile = async (path: string, password: string) => {
    return new Promise((resolve, reject) => {
        try {
            const filePath = path;
            const encryptedData = fs.readFileSync(filePath);
            const originalData = Buffer.from(encryptedData.toString(), 'base64');
            const decryptedData = decrypt(originalData, password);
            fs.writeFileSync(path, decryptedData);
            resolve('File decrypted successfully');
        } catch (error) {
            console.error('Failed to decrypt file:', error);
            reject('Failed to decrypt file');
        }
    });
};

export async function getLocalFiles() {
    const dirPath = path.join(process.cwd(), '../downloads');
    // console.log("Dir Path: ", dirPath);
    const fileNames = fs.readdirSync(dirPath);

    const filesMetadata = fileNames.map(fileName => {
        const filePath = path.join(dirPath, fileName);
        const stats = fs.statSync(filePath);

        return {
            name: fileName,
            size: stats.size,
            createdAt: stats.birthtime,
            updatedAt: stats.mtime,
        };
    });

    return filesMetadata;
}

// export async function openFile(fileName: string) {
//     const filePath = path.join(process.cwd(), '../downloads', fileName);
//     try {
//         await window.electron.openFile(filePath);
//     } catch (error) {
//         console.error('Failed to open file:', error);
//     }

// }