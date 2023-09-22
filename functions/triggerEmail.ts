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
    reqName: string;
    reqEmail: string;
    reqMessage: string;
  };

  //automatically generated snippet from the email preview
  //sends a request to an email handler for a subscribed email
  // template name
  await fetch(`${process.env.URL}/.netlify/functions/emails/contactemail`, {
    headers: {
      "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET as string,
    },
    method: "POST",
    body: JSON.stringify({
      to: "hero@christophernapier.com",
      from: "contact@christophernapier.com",
      subject: `New cn.com message from:: ${requestBody.reqName}`,
      parameters: {
        name: requestBody.reqName, 
        email: requestBody.reqEmail,
        message: requestBody.reqMessage,
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

export { handler };