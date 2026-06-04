import type React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'altcha-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        challengeurl?: string;
        name?: string;
        ref?: React.Ref<HTMLElement>;
      };
    }
  }
}

export {};
