import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import Protected from 'components/Protected';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  const protectedList = [
    '/dashboard',
  ];

  return (
    <SessionProvider session={session}>
      {protectedList.includes(router.pathname)
        ? <Protected>
          <Component {...pageProps}></Component>
        </Protected>
        : <Component {...pageProps}></Component>
      }
    </SessionProvider>
  );
}
