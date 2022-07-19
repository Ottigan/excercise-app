import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

interface ProtectedProps {
    children: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.error || status === 'unauthenticated') {
      router.push('/');
    }
  }, [router, session?.error, status]);

  if (status === 'authenticated') {
    return <>{children}</>;
  }

  return <h1>Loading...</h1>;
};

export default Protected;
