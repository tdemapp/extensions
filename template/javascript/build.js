var fs = require('fs');
var package = require('./package.json');
var extension = require('./index.js');

function generateExtension () {
  // Generate extension meta data based on package.json data
  const generatedExtension = {
    name: package.name,
    version: package.version,
    description: package.description,
    author: package.author,
    website: package.homepage, 
    enabled: true, 
    init: true,
    dependencies: [],
    conflicts: [],
    create: null,
    destroy: null,
  };

  // Convert create/destroy functions to string
  generatedExtension.create = extension.create.toString();
  generatedExtension.destroy = extension.destroy.toString();

  // Create dist directory if it doesn't exist already
  if (!fs.existsSync('dist/')) {
    fs.mkdirSync('./dist/');
  }

  // Generate extension JSON file
  fs.writeFile(`dist/${package.name}-${package.version}.json`, JSON.stringify(generatedExtension), (err) => {
    if (err) {
      throw new Error(err);
    } else {
      console.log('🎉 Successfully generated extension!');
    }
  });
}

generateExtension();
