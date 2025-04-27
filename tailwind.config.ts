import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: 'var(--accent)',
        'accent-dark': 'var(--accent-dark)',
        'accent-green': 'var(--accent-green)',
        'accent-green-dark': 'var(--accent-green-dark)',
        'accent-green-darker': 'var(--accent-green-darker)',
        'foreground-secondary': 'var(--foreground-secondary)',
        star: 'var(--star)',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'Arial', 'Helvetica', 'sans-serif'],
        alternates: ['var(--font-montserrat-alternates)', 'Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config 