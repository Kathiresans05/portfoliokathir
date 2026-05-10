/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#050505",
          primary: "#00f3ff",
          secondary: "#ff00ff",
          accent: "#7000ff",
          text: "#e0e0e0",
          glass: "rgba(255, 255, 255, 0.05)",
          border: "rgba(0, 243, 255, 0.2)",
        },
      },
      animation: {
        'glow-pulse': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-slow-reverse': 'spin 15s linear infinite reverse',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 243, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 243, 255, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
