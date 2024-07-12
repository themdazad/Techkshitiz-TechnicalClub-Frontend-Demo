/**@type {import('tailwindcss').Config}*/
module.exports = {
  content: [
    './src/**/*.{html,js,tsx}',
    './src/components/**/*.{js,tsx}',
  ],
  theme: {
    screens: {
      "sm-m": '480px',
      "md-m": '768px',
      "lg-m": '976px',
      "xl-m": '1440px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'ml': '1400px',
      'mll': '1480px',
      "max-mill": "1150px",
      "large": "1980px"
    },
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      
    },
  },
  plugins: [],
}

