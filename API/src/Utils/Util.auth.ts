import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import AdminPayload from '../Interfaces/AdminPayload.Interface';

const JWT_SECRET = process.env.JWT_SECRET || 'kfiejnewroke';

export function generateToken(payload: AdminPayload, expiresIn: number = 86400) {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): JwtPayload | string {
  return jwt.verify(token, JWT_SECRET);
}
