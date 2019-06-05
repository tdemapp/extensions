const fs = require('fs');
const path = require('path')
const webpack = require('webpack');
const package = require('./package.json');

const config = {
  entry: {
    create: './src/create.js',
    destroy: './src/destroy.js'
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: path.resolve(__dirname, './dist/'),
  }
};

console.log('🏗  Bundling sources...');
webpack(config, (err) => {
  if (err) throw new Error(err);

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

  // Set extension create function to stringified JS bundle
  generatedExtension.create = fs.readFileSync('./dist/create.bundle.js', (err) => {
    if(err) throw new Error(err)
  }).toString();

  // Set extension destroy function to stringified JS bundle
  generatedExtension.destroy = fs.readFileSync('./dist/destroy.bundle.js', (err) => {
    if(err) throw new Error(err)
  }).toString();
  
  // Generate extension JSON file
  fs.writeFile(`./dist/${package.name}-${package.version}.json`, JSON.stringify(generatedExtension, null, '\t'), (err) => {
    if (err) throw new Error(err);
    console.log('🎉  Successfully generated extension!');
  });
});
