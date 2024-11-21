// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: ["/dist/*"],
  rules: {
    "no-restricted-imports": [
      "warn",
      {
        paths: [
          {
            name: "react-native",
            importNames: ["Text"],
            message: "Please import Text from '@/components/ui/Text' instead. The default Text component will not translate text content",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["src/components/ui/Text/Text.tsx"],
      rules: {
        "no-restricted-imports": "off"
      },
    },
  ],
};

