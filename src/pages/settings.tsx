import { useEffect } from 'react';
import { useAuth } from '~/hooks/useAuth';

export default function Settings() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);
  return <div className="mt-32 text-2xl">Settings</div>;
}
