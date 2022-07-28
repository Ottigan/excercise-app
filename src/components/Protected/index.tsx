import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Loader } from 'components/Loader';

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

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default Protected;
