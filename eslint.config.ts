import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';

export default [
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}'],
    },
    {
        name: 'app/files-to-ignore',
        ignores: [
            '**/dist/**',
            '**/dist-ssr/**',
            '**/coverage/**',
            '**/.nuxt/**',
            '**/.output/**',
            '**/*.d.ts',
        ],
    },
    ...pluginVue.configs['flat/essential'],
    ...vueTsEslintConfig(),
    {
        rules: {
            'semi': ['error', 'always'],
            'indent': ['error', 4, { SwitchCase: 1 }],
            'quotes': ['error', 'single', { avoidEscape: true }],
            'no-multi-spaces': 'error',
            'no-redeclare': 'error',
            'no-unused-expressions': 'error',
            'prefer-const': ['error', { destructuring: 'any' }],
            'no-multiple-empty-lines': ['error', { max: 1 }],
            'keyword-spacing': ['error', { before: true, after: true }],
            'space-before-blocks': 'error',
            'space-before-function-paren': ['error', 'always'],
            'block-spacing': ['error', 'always'],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'no-trailing-spaces': 'error',
            'comma-dangle': ['error', 'always-multiline'],

            'vue/html-indent': ['error', 4, {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            }],
            'vue/script-indent': ['error', 4, {
                baseIndent: 1,
                switchCase: 1,
                ignores: [],
            }],
            'vue/html-closing-bracket-newline': ['error', {
                singleline: 'never',
                multiline: 'always',
            }],
            'vue/max-attributes-per-line': ['error', {
                singleline: 3,
                multiline: 1,
            }],
            'vue/no-unused-vars': 'error',
            'vue/multi-word-component-names': 'off',

            '@typescript-eslint/indent': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
        },
    },
    {
        files: ['**/*.json'],
        rules: {
            'indent': ['error', 4],
        },
    },
];