"use server";
import fs from 'fs';
import { decrypt } from './crypto';



export const decryptFile = async (path: string, password: string) => {
    const filePath = path;
    const encryptedData = fs.readFileSync(filePath);
    const originalData = Buffer.from(encryptedData.toString(), 'base64');
    const decryptedData = decrypt(originalData, password);
    fs.writeFileSync(path, decryptedData);
};


