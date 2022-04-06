module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    indent: "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["off"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/interface-name-prefix": ["off"],
    "@typescript-eslint/no-var-requires": ["off"],
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
  },
};
