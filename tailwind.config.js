/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: '#181F2A', // deep navy
        orange: '#FF6B35', // sunset orange
        yellow: '#FFD166', // golden yellow
        charcoal: '#23272F', // charcoal
        white: '#fff',
        surface: '#23272F', // for cards
        accent: '#FF6B35',
        highlight: '#FFD166',
        badge: '#23272F',
        badgeOutline: '#FF6B35',
      },
      fontFamily: {
        sans: [
          'Space Grotesk',
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        display: [
          'Space Grotesk',
          'Poppins',
          'Montserrat',
          'serif'
        ]
      },
      boxShadow: {
        'badge': '0 4px 24px 0 rgba(24,31,42,0.12), 0 1.5px 6px 0 rgba(255,107,53,0.10)',
        'badge-glow': '0 0 0 4px rgba(255,107,53,0.15)',
        'soft': '0 2px 8px 0 rgba(24,31,42,0.10)',
      },
      borderWidth: {
        'badge': '3px',
      },
      borderRadius: {
        'badge': '1.25rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
      },
    },
  },
  plugins: [],
}

