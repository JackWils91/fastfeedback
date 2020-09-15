import React from 'react';
import { NextSeo } from 'next-seo';

const Page = ({ name, path, children }) => {
  const title = `Fast Feedback - ${name}`;
  const url = `https://fastfeedback-peach.vercel.app${path}`;
  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title
        }}
      />

      {children}
    </>
  );
};

export default Page;
