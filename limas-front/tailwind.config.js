// export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
// export const darkMode = 'class';
// export const theme = {
//   extend: {
//     keyframes: {
//       slideInUp: {
//         '0%': { transform: 'translateY(20px)', opacity: '0' },
//         '100%': { transform: 'translateY(0)', opacity: '1' },
//       },
//       fadeIn: {
//         '0%': { opacity: '0' },
//         '100%': { opacity: '1' },
//       },
//     },
//     animation: {
//       'slide-in-up': 'slideInUp 1s ease-out',
//       fade: 'fadeIn 2s ease-out',
//     },
    
//   },
// };
// export const plugins = [];

// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'slide-in-up': 'slideInUp 1s ease-out',
        fade: 'fadeIn 2s ease-out',
      },
    },
  },
  plugins: [],
};
