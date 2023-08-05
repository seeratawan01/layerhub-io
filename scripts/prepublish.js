const fs = require('fs');
const path = require('path');

// List the packages
const packages = ['core', 'downloader', 'objects', 'types', 'react'];

packages.forEach((package) => {
  const packagePath = path.join(__dirname, '..', 'packages', package, 'package.json');

  console.log(`Refreshing dependencies for ${packagePath}`);

  // Check if the package.json file exists in the directory
  if(fs.existsSync(packagePath)) {
    const packageJson = require(packagePath);

    // Iterate over the dependencies and remove the "workspace:" prefix
    for(let dep in packageJson.dependencies) {
      if(packageJson.dependencies[dep].startsWith('workspace:')) {
        packageJson.dependencies[dep] = packageJson.dependencies[dep].substring(10);
      }
    }

    // Write the refreshed dependencies back to package.json
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  }
});
