module.exports = {
  extends: ['next/core-web-vitals', 'plugin:jsx-a11y/recommended'],
  rules: {
    'jsx-a11y/anchor-is-valid': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
  },
};
