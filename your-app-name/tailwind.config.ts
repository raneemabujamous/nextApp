/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/views/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
      extend: {
          colors: {
              bgPrimary: '#22273c',
              bgSecondary: '#15192c',
              main: '#7950ed',
              card: '#2a2e44',
            },
          backgroundImage: {
              'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
              'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          },
      },
  },
 
};
