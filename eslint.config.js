import js from '@eslint/js';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.node  // déclare process, console, etc.
            }
        },
        rules: {
            'no-unused-vars': 'error',
            'no-undef': 'error',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'no-console': 'warn',
            'indent': ['error', 4],
        }
    }
];