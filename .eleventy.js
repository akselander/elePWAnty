module.exports = function eleventyConfig() {
  return {
    dir: {
      output: 'dist',
      input: 'src',
      includes: '../layouts',
    },
  };
};
