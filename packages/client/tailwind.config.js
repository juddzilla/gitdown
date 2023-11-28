import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindTypography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,tsx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'bug-primary': 'rgba(232, 109, 109, 1)',
        'bug-secondary': 'rgba(232, 109, 109, 0.4)',
        'epic-primary': 'rgba(0, 150, 152, 1)',
        'epic-secondary': 'rgba(0, 150, 152, 0.4)',
        'task-primary': 'rgba(138, 209, 159, 1)',
        'task-secondary': 'rgba(138, 209, 159, 0.4)',
        'use-case-primary': 'rgba(252, 176, 124, 1)',
        'use-case-secondary': 'rgba(252, 176, 124, 0.4)',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  safelist: [{
    pattern: /(bg|text|border)-(bug|epic|task|use-case)-(primary|secondary)/
  }],
  plugins: [
    tailwindTypography(),
  ],
}

