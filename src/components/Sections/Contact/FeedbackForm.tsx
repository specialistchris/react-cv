/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {FC, FormEvent, memo, useCallback, useMemo, useState} from 'react';

// Define the Status type
// type Status = 'pending' | 'ok' | 'error' | null;

export interface FormData {
    //form: string;
    name: string;
    email: string;
    message: string;
  };


const FeedbackForm: FC = memo(() =>  {

    // const [status, setStatus] = useState<Status>(null);

    // const [error, setError] = useState<string | null>(null);

    const inputClasses =
    'bg-neutral-700 border-0 focus:border-0 focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-md placeholder:text-neutral-400 placeholder:text-sm text-neutral-200 text-sm';


    const defaultData = useMemo(
        () => ({
        //form-name: 'feedback',
        name: '',
        email: '',
        message: ''
        }),
        [],
    );
    
    const [data, setData] = useState<FormData>(defaultData);
    
    const [formValues, updateFormValues] = useState<FormData>({
        //form-name: "feedback",
        name: "",
        email: "",
        message: ""
    });

    const onChange = useCallback(
        <T extends HTMLInputElement | HTMLTextAreaElement>(event: React.ChangeEvent<T>): void => {
          const {name, value} = event.target;
    
          const fieldData: Partial<FormData> = {[name]: value};
    
          updateFormValues(formValues => ({...formValues, [name]: value}));
          setData({...data, ...fieldData});
        },
        [data],
      );

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            console.log('Handle for submit with data: ', data);
            // setStatus('pending');
            // setError(null);
            // const myForm = event.target as HTMLFormElement;
            // const formData = new FormData(myForm);
            // const formData = data;
            const response =  await fetch('/__forms.html', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                // body: new URLSearchParams("form-name: feedback" + data as any).toString(),
                body: new URLSearchParams("form-name=feedback&name=" + data.name + "&email= " + data.email + "&message=" + data.message).toString(),
            });

            console.log('Now trying triggerEmail with data: ', data);
            
            // call to my function
            const triggerResponse = await fetch('./.netlify/functions/triggerEmail', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  name: data.name,
                  email: data.email,
                  message: data.message,
              }),
            });

            console.log('triggerResponse status: ', triggerResponse.status);


            if (response.status == 200) {
                console.log('Response 200 received');
                alert("Form Submitted Successfully");
                updateFormValues({
                    name: '',
                    email: '',
                    message: '',
                });
            } else {
                console.error('Response not OK'); 
            }
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    };

    return (
        // <form className="grid min-h-[320px] grid-cols-1 gap-y-4" data-netlify="true" method="POST" onSubmit={handleFormSubmit}>
        <form className="grid min-h-[320px] grid-cols-1 gap-y-4" name="feedback" onSubmit={handleFormSubmit}>
            <input 
                autoComplete='given-name'
                className={inputClasses} 
                id="name"
                name="name" 
                onChange={onChange} 
                placeholder="Name" 
                required 
                type="text" 
                value={formValues.name}
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
                value={formValues.email}
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
                value={formValues.message}
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

    FeedbackForm.displayName = 'FeedbackForm';
    export default FeedbackForm;

/*     return (
        <div className="w-full md:max-w-md">
            <Card title="Leave Feedback">
                <form
                    className="text-black flex flex-col gap-3 align-center"
                    name="feedback"
                    onSubmit={handleFormSubmit}
                >
                    <input name="form-name" type="hidden" value="feedback" />
                    <input className="input input-bordered" name="name" placeholder="Name" required type="text" />
                    <input className="input input-bordered" name="email" placeholder="Email (optional)" type="text" />
                    <input className="input input-bordered" name="message" placeholder="Message" required type="text" />
                    <button className="btn btn-primary" disabled={status === 'pending'} type="submit">
                        Submit
                    </button>
                    {status === 'ok' && (
                        <div className="alert alert-success">
                            Submitted!
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="alert alert-error">
                            {error}
                        </div>
                    )}
                </form>
            </Card>
        </div>
    ); */