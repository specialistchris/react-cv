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
    //from: string;
    //to: string;
    //subject: string;
    name: string;
    email: string;
    message: string;
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
      to: "specialistchris@gmail.com",
      from: "contact@christophernapier.com",
      subject: "contact email from cn.com",
      //from: requestBody.from,
      //to: requestBody.to,
      //subject: requestBody.subject,
      parameters: {
        name: requestBody.name, //"nameynamey",
        email: requestBody.email,//"emaillly@cn.com", //requestBody.email,
        message: "messageymassage", //requestBody.message,
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