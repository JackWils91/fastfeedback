import { useEffect } from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';
import { DefaultSeo } from 'next-seo';

import { AuthProvider } from '@/lib/auth';
import customTheme from '@/styles/theme';

import SEO from '../next-seo.config';

import Router from 'next/router';
import * as Fathom from 'fathom-client';

const GlobalStyle = ({ children }) => {
  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          html {
            min-width: 360px;
            scroll-behavior: smooth;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

// Router.events.on('routeChangeComplete', () => {
//   Fathom.trackPageview();
// });

const App = ({ Component, pageProps }) => {
  // useEffect(() => {
  //   if (process.env.NODE_ENV === 'production') {
  //     Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
  //       includedDomains: ['https://fastfeedback-peach.vercel.app']
  //     });
  //   }
  // });
  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider>
        <GlobalStyle />
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
