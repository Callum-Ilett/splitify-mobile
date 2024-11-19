// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: ["/dist/*"],
};

