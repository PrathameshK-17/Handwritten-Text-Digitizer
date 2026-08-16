import { SignJWT, jwtVerify } from 'jose';

function getSecretKey() {
    const secret = process.env.JWT_SECRET || 'fallback_secret_not_secure';
    return new TextEncoder().encode(secret);
}

export async function generateToken(payload: any): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1d')
        .sign(getSecretKey());
}

export async function verifyToken(token: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(token, getSecretKey(), {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        return null;
    }
}
