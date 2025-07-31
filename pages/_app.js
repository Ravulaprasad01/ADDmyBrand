import '@/app/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ErrorBoundary } from '@/components/error-boundary';
import { AuthProvider } from '@/contexts/auth-context';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;