import type { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async function(event) {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }

  const requestBody = JSON.parse(event.body) as {
    to: string;
    from: string;
    name: string;
    email: string;
    message: string;
  };

  //automatically generated snippet from the email preview
  //sends a request to an email handler for a subscribed email
  await fetch(`${process.env.URL}/.netlify/functions/emails/contactemail`, {
    headers: {
      "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET as string,
    },
    method: "POST",
    body: JSON.stringify({
      from: "contact@christophernapier.com",
      to: "christopher.napier@hotmail.com",
      subject: "trigger email HC subject",
      parameters: {
        name: ""
      },
    }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify("Contact email sent!"),
  };
};

export { handler };