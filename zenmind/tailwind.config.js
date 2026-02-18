/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "bloom": {
          '0%': { transform: 'scale(0.92)', opacity: '0.25' },
          '50%': { transform: 'scale(1.08)', opacity: '0.4' },
          '100%': { transform: 'scale(0.92)', opacity: '0.25' },
        },
        "ripple": {
          '0%': { transform: 'scale(0.8)', opacity: '0.35' },
          '70%': { transform: 'scale(1.15)', opacity: '0.12' },
          '100%': { transform: 'scale(1.2)', opacity: '0' },
        },
        "glow": {
          '0%': { opacity: '0.25', filter: 'blur(12px)' },
          '50%': { opacity: '0.5', filter: 'blur(18px)' },
          '100%': { opacity: '0.25', filter: 'blur(12px)' },
        },
      },
      animation: {
        bloom: 'bloom 6s ease-in-out infinite',
        ripple: 'ripple 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
