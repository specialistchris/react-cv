/* eslint @typescript-eslint/no-var-requires: "off" */

import {FC, memo, useCallback, useMemo, useState} from 'react';

export interface FormData {
  name: string;
  email: string;
  message: string;
};

const ContactForm: FC = memo(() => {
  const defaultData = useMemo(
    () => ({
      name: '',
      email: '',
      message: '',
    }),
    [],
  );

  const [data, setData] = useState<FormData>(defaultData);

  const onChange = useCallback(
    <T extends HTMLInputElement | HTMLTextAreaElement>(event: React.ChangeEvent<T>): void => {
      const {name, value} = event.target;

      const fieldData: Partial<FormData> = {[name]: value};

      setData({...data, ...fieldData});
    },
    [data],
  );

  const handleFormMessage = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();      
      try {
        console.log('Trying with data: ', data);
        
        // call to my function
        const response = await fetch('./.netlify/functions/triggerEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              reqName: data.name,
              reqEmail: data.email,
              reqMessage: data.message,
          }),
        });

        if (response.ok) {
          const responsedata = await response.json();
          console.log('Response OK. responsedata: ', responsedata);
          alert("Form Submitted Successfully");
        } else {
          console.error('Response not OK');
        }
      } catch (error) {
        console.error('Failed to send email:', error);
      }
      setData({
        name: '',
        email: '',
        message: '',
      });
    },
    [data],
  );

   const inputClasses =
    'bg-neutral-700 border-0 focus:border-0 focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-md placeholder:text-neutral-400 placeholder:text-sm text-neutral-200 text-sm';

  return (
    <form className="grid min-h-[320px] grid-cols-1 gap-y-4" data-netlify="true" method="POST" onSubmit={handleFormMessage}>
      <input 
        className={inputClasses} 
        id="name"
        name="name" 
        onChange={onChange} 
        placeholder="Name" 
        required 
        type="text" 
      />
      <input
        autoComplete="email"
        className={inputClasses}
        id="email"
        name="email"
        onChange={onChange}
        placeholder="Email"
        required
        type="email"
      />
      <textarea
        className={inputClasses}
        id="message"
        maxLength={250}
        name="message"
        onChange={onChange}
        placeholder="Message"
        required
        rows={6}
      />
      <button
        aria-label="Submit contact form"
        className="w-max rounded-full border-2 border-orange-600 bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-md outline-none hover:bg-stone-800 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-stone-800"
        type="submit"
        >
        Send Message
      </button>
    </form>
  );
});

ContactForm.displayName = 'ContactForm';
export default ContactForm;



// convoluted sendgrid example!!! =========  https://github.com/bthayes42/portfolio/blob/main/src/components/Sections/Contact/ContactForm.tsx =========
// https://rosso.codes/blog/send-email-using-netlify-functions-and-sendgrid-api/
// https://slawinski.dev/blog/start-sending-emails-using-netlify-lambda-functions-and-sendgrid/
// REF: emailjs1 https://github.com/Raiden0456/react-resume/blob/main/src/components/Sections/Contact/ContactForm.tsx
// axios example: https://github.com/bludbruda1/PersonalCV/blob/develop/src/components/Sections/Contact/ContactForm.tsx
// axios exmpale: https://github.com/bibinalias/bibinalias.github.io/blob/main/src/components/Sections/Contact/ContactForm.tsx
// old emialjs: https://github.com/bornagojsic/bornagojsic-web/blob/main/src/components/Sections/Contact/ContactForm.tsx

// continue from here: https://github.com/tbakerx/react-resume-template/forks?include=active&page=2&period=6mo&sort_by=stargazer_counts