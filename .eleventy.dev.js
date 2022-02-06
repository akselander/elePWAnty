module.exports = function eleventyDevConfig() {
  return {
    dir: {
      output: 'build',
      input: 'src/pages',
      layouts: '../layouts',
    },
  };
};
