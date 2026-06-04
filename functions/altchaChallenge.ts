import type {Handler} from '@netlify/functions';
import {createChallenge} from 'altcha-lib/v1';

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
      hmacKey: secret,
      maxNumber: 50000,
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
