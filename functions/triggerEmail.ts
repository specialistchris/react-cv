import type {Handler} from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async function(event) {
  
  console.log('Handler function running with event ', event);

  if (event.body === null) {
    console.log('Handler function EMPTY event');
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }
  
  const requestBody = JSON.parse(event.body) as {
    name: string;
    email: string;
    message: string;
  };

  // automatically generated snippet from the email preview
  // sends a request to an email handler for a subscribed email
  // template name
  await fetch(`${process.env.URL}/.netlify/functions/emails/contactemail`, {
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
  });

  await fetch(`${process.env.URL}/.netlify/functions/emails/confirmemail`, {
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

  return {
    statusCode: 200,
    body: JSON.stringify({
      text: "Contact email sent!",
      requestBody,
    }
    ),
  };
};

export {handler};