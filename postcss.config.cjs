module.exports = {
  plugins: {
    tailwindcss: {},
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
};
