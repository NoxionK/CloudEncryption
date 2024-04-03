import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'crypto';

export function encrypt(buffer: Buffer, password: string): Buffer {
    const iv = randomBytes(16);
    const key = createHash('sha256').update(password).digest();
    const cipher = createCipheriv('aes-256-cbc', key, iv);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return Buffer.concat([iv, encrypted]);
}

export function decrypt(buffer: Buffer, password: string): string {
    const iv = buffer.slice(0, 16);
    const encrypted = buffer.slice(16);
    const key = createHash('sha256').update(password).digest();
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
}

