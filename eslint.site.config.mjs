import js from '@eslint/js';
import globals from 'globals';
export default [
 {ignores:['node_modules/**','dist/**','site-dist/**','src/**','review/**','netlify/**']},
 {files:['scripts/**/*.mjs','tests/**/*.mjs','eslint.site.config.mjs'],...js.configs.recommended,languageOptions:{ecmaVersion:'latest',sourceType:'module',globals:{...globals.node,...globals.browser}}},
 {files:['public/scripts/*.js'],...js.configs.recommended,languageOptions:{ecmaVersion:'latest',sourceType:'module',globals:globals.browser}}
];
