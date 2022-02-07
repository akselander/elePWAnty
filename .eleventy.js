module.exports = function eleventyConfig() {
  return {
    dir: {
      output: 'dist',
      input: 'src/pages',
      includes: '../layouts',
    },
  };
};
