# Marketing Dashboard

A Next.js 15-based marketing dashboard with analytics, campaign management, and reporting features. Built with React 19 and optimized for performance and error handling.

## Deployment to Netlify

This project is configured for deployment on Netlify. Follow these steps to deploy:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to Netlify and click "New site from Git"
3. Select your repository and configure the following settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add the following environment variables in Netlify's site settings:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
5. Deploy the site

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Troubleshooting Netlify Deployment

If you encounter issues with Netlify deployment:

1. Ensure your repository includes the `netlify.toml` file
2. Verify that both the `app` directory and `pages` directory are pushed to your repository
3. Check that all environment variables are correctly set in Netlify
4. Review the Netlify build logs for specific errors
5. If you encounter the error "Couldn't find any `pages` or `app` directory":
   - Make sure your Git repository includes both directories
   - Check that your Netlify base directory setting is correct (should be empty or `/`)
   - Verify that the directories aren't excluded in `.gitignore`
6. If you encounter conflicts between `app` and `pages` directories, move conflicting files to a backup directory:
   ```bash
   # Example: If index.js in pages conflicts with page.tsx in app
   mkdir -p pages_conflict_backup
   mv pages/index.js pages_conflict_backup/
   ```
7. For Next.js 15+ users: The `appDir` experimental flag is no longer needed and may cause build errors

## Error Handling

This project includes comprehensive error handling at multiple levels:

1. **React Error Boundaries**: Class-based error boundary component to catch and display errors gracefully
2. **Next.js Error Pages**: Custom error pages for different error scenarios:
   - `app/error.tsx`: For component-level errors within the app directory
   - `app/global-error.js`: For global rendering errors
   - `app/not-found.tsx`: For 404 errors
   - `app/loading.tsx`: For loading states
3. **Client-Side Error Tracking**: JavaScript error listeners in `_document.js` to catch and log unhandled errors
4. **Middleware Security**: Edge runtime middleware with security headers and CSP

## React 19 Compatibility

This project is built with Next.js 15 and React 19. Some considerations:

1. All Radix UI components have been tested for compatibility with React 19
2. The project uses Node.js 20 for optimal compatibility
3. Error boundaries have been implemented to handle potential React 19 rendering issues

## Project Structure

- `app/`: Next.js App Router pages and layouts
- `pages/`: Next.js Pages Router components
- `components/`: Reusable UI components
- `contexts/`: React context providers
- `lib/`: Utility functions and API clients
- `public/`: Static assets
- `pages_conflict_backup/`: Storage for pages files that conflict with app directory
- `.next/`: Build output directory (generated during build)
- `middleware.js`: Edge runtime middleware for security headers and CSP

## Security Features

This project includes several security enhancements:

1. **Content Security Policy (CSP)**: Implemented in middleware.js to prevent XSS attacks
2. **Security Headers**: Added X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, and Referrer-Policy
3. **Secure Authentication**: Using Supabase for secure user authentication
4. **Error Isolation**: Error boundaries prevent cascading failures from compromising the entire application