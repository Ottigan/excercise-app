import Loader from 'components/Loader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface ProtectedProps {
  children: React.ReactNode;
}

function Protected({ children }: ProtectedProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.error || status === 'unauthenticated') {
      router.push('/');
    }
  }, [router, session?.error, status]);

  if (status === 'authenticated') {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Loader />
    </div>
  );
}

export default Protected;
