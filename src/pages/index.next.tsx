import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Button from 'components/Button';
import Loader from 'components/Loader';

export default function Main() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [router, status]);

  const content = (() => {
    if (status === 'loading') {
      return <Loader isLoading={true}/>;
    }

    if (session?.error || status === 'unauthenticated') {
      return <Button onClick={() => signIn('github')}>Sign in</Button>;
    }

    return null;
  })();

  return (
    <>
      <Head>
        <title>MyGymPal</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen flex justify-center items-center bg-slate-800">{content}</div>
    </>
  );
}
