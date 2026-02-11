import jwt from 'jsonwebtoken';

export interface DecodedJWT {
  header: any;
  payload: any;
  signature: string;
  isExpired: boolean;
  expiresAt?: Date;
}

export function decodeJWT(token: string): DecodedJWT {
  const decoded = jwt.decode(token, { complete: true });
  
  if (!decoded) {
    throw new Error('Invalid JWT token');
  }

  const payload = decoded.payload as any;
  const expiresAt = payload.exp ? new Date(payload.exp * 1000) : undefined;
  const isExpired = expiresAt ? expiresAt < new Date() : false;

  return {
    header: decoded.header,
    payload: decoded.payload,
    signature: decoded.signature,
    isExpired,
    expiresAt,
  };
}

export function checkJWTExpiry(token: string): { expired: boolean; expiresAt?: Date; timeRemaining?: string } {
  const decoded = decodeJWT(token);
  
  if (!decoded.expiresAt) {
    return { expired: false };
  }

  const now = new Date();
  const timeRemaining = decoded.expiresAt.getTime() - now.getTime();
  
  if (timeRemaining < 0) {
    return { expired: true, expiresAt: decoded.expiresAt };
  }

  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  
  return {
    expired: false,
    expiresAt: decoded.expiresAt,
    timeRemaining: `${hours}h ${minutes}m`,
  };
}
