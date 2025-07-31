# PowerShell script to deploy to Netlify using Netlify CLI

# Check if Netlify CLI is installed
$netlifyCLIInstalled = $null
try {
    $netlifyCLIInstalled = Get-Command netlify -ErrorAction Stop
    Write-Host "Netlify CLI is installed at: $($netlifyCLIInstalled.Source)" -ForegroundColor Green
} catch {
    Write-Host "Netlify CLI is not installed. Installing now..." -ForegroundColor Yellow
    npm install -g netlify-cli
    
    # Verify installation
    try {
        $netlifyCLIInstalled = Get-Command netlify -ErrorAction Stop
        Write-Host "Netlify CLI installed successfully at: $($netlifyCLIInstalled.Source)" -ForegroundColor Green
    } catch {
        Write-Host "Failed to install Netlify CLI. Please install it manually with 'npm install -g netlify-cli'" -ForegroundColor Red
        exit 1
    }
}

# Build the project
Write-Host "Building the project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Please fix the errors and try again." -ForegroundColor Red
    exit 1
}

Write-Host "Build completed successfully!" -ForegroundColor Green

# Check if already logged in to Netlify
$loggedIn = $false
try {
    $netlifyStatus = netlify status
    if ($netlifyStatus -match "Logged in") {
        $loggedIn = $true
        Write-Host "Already logged in to Netlify" -ForegroundColor Green
    }
} catch {
    # Not logged in or command failed
}

# Login to Netlify if not already logged in
if (-not $loggedIn) {
    Write-Host "Logging in to Netlify..." -ForegroundColor Yellow
    netlify login
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to log in to Netlify. Please try again." -ForegroundColor Red
        exit 1
    }
}

# Check if site is already linked
$siteLinked = $false
if (Test-Path -Path ".netlify" -PathType Container) {
    $siteLinked = $true
    Write-Host "Site is already linked to Netlify" -ForegroundColor Green
}

# Link site if not already linked
if (-not $siteLinked) {
    Write-Host "Linking site to Netlify..." -ForegroundColor Yellow
    netlify link
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to link site to Netlify. Creating a new site..." -ForegroundColor Yellow
        netlify sites:create
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Failed to create a new site on Netlify. Please try again." -ForegroundColor Red
            exit 1
        }
        
        netlify link
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Failed to link site to Netlify. Please try again." -ForegroundColor Red
            exit 1
        }
    }
}

# Set environment variables
Write-Host "\nDo you want to set environment variables for Supabase? (y/n)" -ForegroundColor Yellow
$setEnvVars = Read-Host

if ($setEnvVars -eq "y") {
    Write-Host "Enter your Supabase URL:" -ForegroundColor Yellow
    $supabaseUrl = Read-Host
    
    Write-Host "Enter your Supabase anonymous key:" -ForegroundColor Yellow
    $supabaseAnonKey = Read-Host
    
    netlify env:set NEXT_PUBLIC_SUPABASE_URL $supabaseUrl
    netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY $supabaseAnonKey
    
    Write-Host "Environment variables set successfully!" -ForegroundColor Green
}

# Deploy to Netlify
Write-Host "Deploying to Netlify..." -ForegroundColor Yellow
netlify deploy --build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Deployment failed. Please check the errors and try again." -ForegroundColor Red
    exit 1
}

Write-Host "\nDo you want to publish this deployment to production? (y/n)" -ForegroundColor Yellow
$publishToProduction = Read-Host

if ($publishToProduction -eq "y") {
    Write-Host "Publishing to production..." -ForegroundColor Yellow
    netlify deploy --build --prod
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Production deployment failed. Please check the errors and try again." -ForegroundColor Red
        exit 1
    }
    
    Write-Host "Deployed to production successfully!" -ForegroundColor Green
} else {
    Write-Host "Deployment completed as a draft. You can publish it to production from the Netlify dashboard." -ForegroundColor Green
}