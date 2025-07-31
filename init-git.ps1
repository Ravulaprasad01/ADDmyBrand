# PowerShell script to initialize Git repository and prepare for Netlify deployment

# Check if Git is installed
$gitInstalled = $null
try {
    $gitInstalled = Get-Command git -ErrorAction Stop
    Write-Host "Git is installed at: $($gitInstalled.Source)" -ForegroundColor Green
} catch {
    Write-Host "Git is not installed. Please install Git from https://git-scm.com/downloads" -ForegroundColor Red
    exit 1
}

# Initialize Git repository if not already initialized
if (-not (Test-Path -Path ".git" -PathType Container)) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    
    # Create .gitignore if it doesn't exist
    if (-not (Test-Path -Path ".gitignore")) {
        Write-Host "Creating .gitignore file..." -ForegroundColor Yellow
        @"
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
"@ | Out-File -FilePath ".gitignore" -Encoding utf8
    } else {
        Write-Host ".gitignore already exists" -ForegroundColor Yellow
        
        # Check if .gitignore contains entries that might exclude app or pages directories
        $gitignoreContent = Get-Content -Path ".gitignore" -Raw
        if ($gitignoreContent -match "/app" -or $gitignoreContent -match "/pages") {
            Write-Host "WARNING: Your .gitignore may be excluding app or pages directories." -ForegroundColor Red
            Write-Host "Please check your .gitignore file and remove any entries that exclude these directories." -ForegroundColor Red
        }
    }
    
    # Modify .gitignore to ensure .next is not excluded for Netlify deployment
    $gitignoreContent = Get-Content -Path ".gitignore" -Raw
    if ($gitignoreContent -match "/.next/") {
        Write-Host "Modifying .gitignore to allow .next directory for Netlify deployment..." -ForegroundColor Yellow
        $gitignoreContent = $gitignoreContent -replace "/.next/", "# /.next/ # Commented out for Netlify deployment"
        $gitignoreContent | Out-File -FilePath ".gitignore" -Encoding utf8
    }
    
    # Add all files to Git
    Write-Host "Adding files to Git..." -ForegroundColor Yellow
    git add .
    
    # Commit changes
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m "Initial commit for Netlify deployment"
    
    Write-Host "Git repository initialized successfully!" -ForegroundColor Green
    Write-Host "\nNext steps:" -ForegroundColor Cyan
    Write-Host "1. Create a repository on GitHub, GitLab, or Bitbucket" -ForegroundColor Cyan
    Write-Host "2. Run the following commands to push your code:" -ForegroundColor Cyan
    Write-Host "   git remote add origin <your-repository-url>" -ForegroundColor Cyan
    Write-Host "   git push -u origin main" -ForegroundColor Cyan
    Write-Host "3. Deploy to Netlify following the instructions in deploy-to-netlify.md" -ForegroundColor Cyan
} else {
    Write-Host "Git repository already initialized" -ForegroundColor Yellow
    
    # Check Git status
    Write-Host "\nChecking Git status..." -ForegroundColor Yellow
    git status
    
    Write-Host "\nNext steps:" -ForegroundColor Cyan
    Write-Host "1. Add and commit any changes:" -ForegroundColor Cyan
    Write-Host "   git add ." -ForegroundColor Cyan
    Write-Host "   git commit -m 'Update for Netlify deployment'" -ForegroundColor Cyan
    Write-Host "2. Push your changes:" -ForegroundColor Cyan
    Write-Host "   git push" -ForegroundColor Cyan
    Write-Host "3. Deploy to Netlify following the instructions in deploy-to-netlify.md" -ForegroundColor Cyan
}