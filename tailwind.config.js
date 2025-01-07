/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Ensure it scans your components
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8', // Custom primary color
      },
    },
  },
  plugins: [],
};


