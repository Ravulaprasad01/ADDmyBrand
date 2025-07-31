// Script to fix webpack caching issues
const fs = require('fs');
const path = require('path');

// Function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Function to fix webpack cache permissions
function fixWebpackCache() {
  const projectRoot = process.cwd();
  const cacheDirs = [
    path.join(projectRoot, '.next', 'cache', 'webpack', 'client-development'),
    path.join(projectRoot, '.next', 'cache', 'webpack', 'server-development')
  ];

  cacheDirs.forEach(cacheDir => {
    try {
      // Ensure the directory exists
      ensureDirectoryExists(cacheDir);
      
      // Check if there are any pack files with issues
      const files = fs.readdirSync(cacheDir);
      const packFiles = files.filter(file => file.endsWith('.pack.gz_'));
      
      if (packFiles.length > 0) {
        console.log(`Found ${packFiles.length} problematic pack files in ${cacheDir}`);
        
        // Rename or remove problematic files
        packFiles.forEach(file => {
          const filePath = path.join(cacheDir, file);
          try {
            fs.unlinkSync(filePath);
            console.log(`Removed problematic file: ${filePath}`);
          } catch (err) {
            console.error(`Error removing file ${filePath}:`, err);
          }
        });
      } else {
        console.log(`No problematic pack files found in ${cacheDir}`);
      }
    } catch (err) {
      console.error(`Error processing directory ${cacheDir}:`, err);
    }
  });
}

// Execute the fix
console.log('Starting webpack cache fix...');
fixWebpackCache();
console.log('Webpack cache fix completed.');