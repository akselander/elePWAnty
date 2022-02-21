const litPlugin = require('@lit-labs/eleventy-plugin-lit');

module.exports = function eleventyConfig(config) {
  config.addPlugin(litPlugin, {
    componentModules: ['dist/app-index.js'],
  });

  config.addWatchTarget('src/components/');

  return {
    dir: {
      output: 'dist',
      input: 'src/pages',
      includes: '../layouts',
    },
  };
};
