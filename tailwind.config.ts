import type { Config } from 'tailwindcss';
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: { sans: ['Poppins', 'sans-serif'], display: ['Farsan', 'cursive'] },
    extend: {
      colors: {
        background: 'hsl(var(--background))', foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))', border: 'hsl(var(--border))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: 'hsl(var(--accent))', ring: 'hsl(var(--ring))'
      }
    }
  },
  plugins: []
} satisfies Config;
