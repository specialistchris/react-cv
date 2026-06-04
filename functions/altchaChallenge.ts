import type {Handler} from '@netlify/functions';
import {createHmac, createHash, randomBytes, randomInt} from 'crypto';

const MAX_NUMBER = 50000;

const sha256Hex = (value: string): string => createHash('sha256').update(value).digest('hex');

const hmacSha256Hex = (value: string, secret: string): string =>
  createHmac('sha256', secret).update(value).digest('hex');

const handler: Handler = async () => {
  const secret = process.env.ALTCHA_SECRET;

  if (!secret) {
    return {
      statusCode: 500,
      body: JSON.stringify({error: 'ALTCHA_SECRET is not configured'}),
    };
  }

  try {
    const salt = randomBytes(16).toString('hex');
    const number = randomInt(0, MAX_NUMBER + 1);
    const challenge = sha256Hex(`${salt}${number}`);
    const signature = hmacSha256Hex(challenge, secret);

    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        algorithm: 'SHA-256',
        challenge,
        maxnumber: MAX_NUMBER,
        salt,
        signature,
      }),
    };
  } catch (error) {
    console.error('ALTCHA challenge generation failed:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({error: 'ALTCHA challenge generation failed'}),
    };
  }
};

export {handler};
