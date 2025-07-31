import { useEffect } from 'react';
import { useRouter } from 'next/router';

// This is a fallback page that redirects to the app directory
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the app directory's root page
    router.replace('/');
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Redirecting to dashboard...</p>
    </div>
  );
}