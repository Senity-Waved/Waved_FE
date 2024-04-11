import { Global, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { RecoilEnv, RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/router';
import Script from 'next/script';
import theme from '@/styles/theme';
import global from '@/styles/global';
import ClientErrorSnackBar from '@/lib/axios/clientErrorSnackBar';
import * as gtag from '@/lib/ga/gtag';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  const router = useRouter();

  useEffect(() => {
    const handleRoutingChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRoutingChange);
    return () => {
      router.events.off('routeChangeComplete', handleRoutingChange);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ClientErrorSnackBar />
        <ThemeProvider theme={theme}>
          <Global styles={global} />
          {process.env.NODE_ENV === 'production' && (
            <>
              <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
              />
              <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
              />
            </>
          )}
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
