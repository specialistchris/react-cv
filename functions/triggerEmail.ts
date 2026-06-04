import type {Handler} from "@netlify/functions";
import fetch from "node-fetch";
import {createHmac, createHash, timingSafeEqual} from "crypto";

type AltchaPayload = {
  algorithm?: string;
  challenge?: string;
  number?: number;
  salt?: string;
  signature?: string;
};

const sha256Hex = (value: string): string => createHash("sha256").update(value).digest("hex");

const hmacSha256Hex = (value: string, secret: string): string =>
  createHmac("sha256", secret).update(value).digest("hex");

const safeCompare = (a: string, b: string): boolean => {
  const aBuffer = Buffer.from(a, "hex");
  const bBuffer = Buffer.from(b, "hex");

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
};

const parseAltchaPayload = (payload: string): AltchaPayload | null => {
  try {
    return JSON.parse(Buffer.from(payload, "base64").toString("utf8")) as AltchaPayload;
  } catch (error) {
    console.error("ALTCHA payload parsing failed:", error);
    return null;
  }
};

const verifyAltchaPayload = (payload: string, secret: string): boolean => {
  const altcha = parseAltchaPayload(payload);

  if (!altcha?.challenge || typeof altcha.number !== "number" || !altcha.salt || !altcha.signature) {
    return false;
  }

  if (altcha.algorithm !== "SHA-256") {
    return false;
  }

  const expectedChallenge = sha256Hex(`${altcha.salt}${altcha.number}`);

  if (!safeCompare(expectedChallenge, altcha.challenge)) {
    return false;
  }

  const expectedSignature = hmacSha256Hex(altcha.challenge, secret);

  return safeCompare(expectedSignature, altcha.signature);
};

const handler: Handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({error: "Method not allowed"}),
    };
  }

  if (event.body === null) {
    console.log('Handler function EMPTY event');
    return {
      statusCode: 400,
      body: JSON.stringify({error: "Payload required"}),
    };
  }

  const secret = process.env.ALTCHA_SECRET;

  if (!secret) {
    return {
      statusCode: 500,
      body: JSON.stringify({error: "ALTCHA_SECRET is not configured"}),
    };
  }
  
  const requestBody = JSON.parse(event.body) as {
    name: string;
    email: string;
    message: string;
    altcha?: string;
  };

  if (!requestBody.name || !requestBody.email || !requestBody.message) {
    return {
      statusCode: 400,
      body: JSON.stringify({error: "Name, email, and message are required"}),
    };
  }

  if (!requestBody.altcha) {
    return {
      statusCode: 403,
      body: JSON.stringify({error: "Human verification required"}),
    };
  }

  const verified = verifyAltchaPayload(requestBody.altcha, secret);

  if (!verified) {
    return {
      statusCode: 403,
      body: JSON.stringify({error: "Human verification failed"}),
    };
  }

  // automatically generated snippet copied from the email preview
  // sends a request to an email handler for a subscribed email
  // template name

  const contactResponse = await fetch(
    `${process.env.URL}/.netlify/functions/emails/contactemail`,
    {
      headers: {
        "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET as string,
      },
      method: "POST",
      body: JSON.stringify({
        to: "hero@christophernapier.com",
        from: "contact@christophernapier.com",
        subject: `cn.com - new message received from: ${requestBody.name}`,
        parameters: {
          name: requestBody.name, 
          email: requestBody.email,
          message: requestBody.message,
        },
      }),
    }
  );

  const confirmResponse = await fetch(`${process.env.URL}/.netlify/functions/emails/confirmemail`, {
    headers: {
      "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET as string,
    },
    method: "POST",
    body: JSON.stringify({
      to: requestBody.email,
      from: "contact@christophernapier.com",
      subject: `christophernapier.com - message sent`,
      parameters: {
        name: requestBody.name, 
        email: requestBody.email,
        message: requestBody.message,
      },
    }),
  });

  if (!contactResponse.ok || !confirmResponse.ok) {
    return {
      statusCode: 502,
      body: JSON.stringify({
        error: "Email delivery failed",
        contactStatus: contactResponse.status,
        confirmStatus: confirmResponse.status,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      text: "Contact email sent!",
    }),
  };
};

export {handler};
