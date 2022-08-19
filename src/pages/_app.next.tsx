import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Header from 'components/Header';
import Protected from 'components/Protected';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../styles/globals.css';

config.autoAddCss = false;

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  const routes = [
    '/dashboard',
    '/exercises',
    '/workouts',
  ];

  return (
    <SessionProvider session={session}>
      {routes.includes(router.pathname)
        ? (
          <Protected>
            <Header routes={routes}/>
            <Component {...pageProps}></Component>
          </Protected>
        )
        : (
          <Component {...pageProps}></Component>
        )}
    </SessionProvider>
  );
}
