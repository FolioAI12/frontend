import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        ui: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        bg: '#F8F8F6',
        surface: '#FFFFFF',
        primary: '#1A1A2E',
        accent: '#00C9A7',
        purple: '#6C63FF',
        danger: '#EF4444',
        border: '#E5E7EB',
        'text-primary': '#1C1C1E',
        'text-secondary': '#6B7280',
      },
    },
  },
  plugins: [],
}
export default config
