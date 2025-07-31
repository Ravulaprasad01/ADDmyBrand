import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add meta tags for better SEO and mobile experience */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Marketing Dashboard - Analytics and reporting" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Error handling script for client-side errors in production */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.addEventListener('error', function(event) {
                  console.error('Unhandled error:', event.error);
                  // You could send this to an error reporting service
                });
                window.addEventListener('unhandledrejection', function(event) {
                  console.error('Unhandled promise rejection:', event.reason);
                  // You could send this to an error reporting service
                });
              `,
            }}
          />
        )}
      </body>
    </Html>
  );
}