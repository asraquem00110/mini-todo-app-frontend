import type { Config } from 'tailwindcss';
import tailwindCssAnimate from 'tailwindcss-animate';

const config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/features/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/routes/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {},
  plugins: [tailwindCssAnimate],
} satisfies Config;

export default config;
