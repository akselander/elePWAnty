module.exports = function eleventyDevConfig() {
  return {
    dir: {
      output: 'build',
      input: 'src',
      includes: 'layouts',
    },
  };
};
