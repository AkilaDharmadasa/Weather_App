/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    backdropFilter: {
      'none': 'none',
      'blur': 'blur(1000px)',
    },
    extend: {
      colors: {
        "weather-main": "#1F2128", 
        "weather-city": "#378DE7", 
        "weather-data": "#373B47", 
        "weather-primary": "#00668A",
        "weather-secondary": "#004E71",
      }
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "800px",
    },
  },
  plugins: [],
}

