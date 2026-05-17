import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...compat.extends("next/core-web-vitals"),
  eslintPluginPrettier,
  { rules: { "react/no-unescaped-entities": "off" } },
];
