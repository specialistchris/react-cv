import type {Handler} from "@netlify/functions";
import fetch from "node-fetch";
import {verifySolution} from "altcha-lib";

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

  const verified = await verifySolution(requestBody.altcha, secret);

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
