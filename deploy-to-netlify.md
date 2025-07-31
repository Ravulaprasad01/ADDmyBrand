# Deploying to Netlify

## Prerequisites

- A Netlify account
- Your project code in a Git repository (GitHub, GitLab, or Bitbucket)

## Option 1: Deploy via Netlify UI (Recommended)

1. **Push your code to a Git repository**
   - Create a repository on GitHub, GitLab, or Bitbucket
   - Initialize Git in your project (if not already done):
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git remote add origin <your-repository-url>
     git push -u origin main
     ```

2. **Deploy on Netlify**
   - Log in to your Netlify account
   - Click "New site from Git"
   - Select your Git provider and repository
   - Configure build settings:
     - Base directory: Leave empty or set to `/`
     - Build command: `npm run build` (already set in netlify.toml)
     - Publish directory: `.next` (already set in netlify.toml)
   - Click "Deploy site"

3. **Set environment variables**
   - Go to Site settings > Build & deploy > Environment
   - Add the following variables:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Option 2: Deploy via Netlify Drop (No Git Required)

If you don't want to use Git, you can use Netlify Drop:

1. **Build your project locally**
   ```bash
   npm run build
   ```

2. **Deploy using Netlify Drop**
   - Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag and drop your `.next` folder to the upload area
   - Note: This method doesn't support environment variables or build settings from netlify.toml

## Troubleshooting

If you encounter the error "Couldn't find any `pages` or `app` directory":

1. **Verify directory structure**
   - Ensure both `app` and `pages` directories exist in your project
   - The `pages` directory should contain at least `_app.js` and `_document.js`
   - The `app` directory should contain at least `layout.tsx` and `page.tsx`

2. **Check Git repository**
   - Make sure both directories are committed and pushed to your repository
   - Verify they aren't excluded in `.gitignore`

3. **Netlify configuration**
   - Ensure the base directory setting is correct (should be empty or `/`)
   - Check that the build command is set to `npm run build`

4. **Resolve conflicts**
   - If you have conflicting routes in both `app` and `pages` directories, move the conflicting files to `pages_conflict_backup`

5. **Next.js configuration**
   - For Next.js 15+, the `appDir` experimental flag is no longer needed and may cause build errors