import type {Handler} from '@netlify/functions';
import {createChallenge, deriveHmacKeySecret, randomInt} from 'altcha-lib';
import {deriveKey} from 'altcha-lib/algorithms/pbkdf2';

const handler: Handler = async () => {
  const secret = process.env.ALTCHA_SECRET;

  if (!secret) {
    return {
      statusCode: 500,
      body: JSON.stringify({error: 'ALTCHA_SECRET is not configured'}),
    };
  }

  try {
    const challenge = await createChallenge({
      algorithm: 'PBKDF2/SHA-256',
      cost: 5000,
      counter: randomInt(10000, 5000),
      deriveKey,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      hmacKeySignatureSecret: await deriveHmacKeySecret(secret),
      hmacSignatureSecret: secret,
    });

    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(challenge),
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
