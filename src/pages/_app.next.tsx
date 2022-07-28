import Protected from 'components/Protected';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  const protectedList = ['/dashboard'];

  return (
    <SessionProvider session={session}>
      {protectedList.includes(router.pathname)
        ? (
          <Protected>
            <Component {...pageProps}></Component>
          </Protected>
        )
        : (
          <Component {...pageProps}></Component>
        )}
    </SessionProvider>
  );
}
