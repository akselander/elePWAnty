module.exports = function eleventyDevConfig(config) {
  config.addWatchTarget('src/components/');

  return {
    dir: {
      output: 'build',
      input: 'src/pages',
      layouts: '../layouts',
    },
  };
};
