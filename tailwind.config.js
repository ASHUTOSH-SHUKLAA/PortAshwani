/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0d0b0b',
        red: '#b3121b',
        gold: '#c9a45c',
        paper: '#f1eee6',
        lime: '#c8ff4d', // UI accents only
        ash: '#8a8a84',
        
        // Semantic aliases for seamless backwards-compatibility
        bg: {
          primary: '#0d0b0b',
          secondary: '#171414',
          card: '#2c2927',
          ivory: '#f1eee6',
        },
        text: {
          primary: '#f1eee6',
          secondary: '#cbc4b5',
          muted: '#8a8a84',
          dark: '#0d0b0b',
        },
        accent: {
          lime: '#c8ff4d',
          red: '#b3121b',
        },
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'sans-serif'],
        'body': ['"DM Sans"', 'sans-serif'],
        'serif': ['"Instrument Serif"', 'serif'],
      },
      maxWidth: {
        'content': '1280px',
      },
      letterSpacing: {
        'tighter': '-0.04em',
        'tight': '-0.02em',
        'wide': '0.04em',
        'widest': '0.12em',
      },
      animation: {
        'blink': 'blink 1.8s ease-in-out infinite',
        'scroll-down': 'scrollDown 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
        scrollDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { opacity: '0.8' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
