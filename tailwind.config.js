/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Noto Serif TC', 'serif'],
      },
      maxWidth: {
        'cc-big-width': '1328px',
        'cc-width': '1296px',
      },
      width: {
        'cc-big-width': '1328px',
        'cc-width': '1296px',
      },
      colors: {
        'cc-primary': '#0F4BB4',
        'cc-accent': '#EE5220',
        'cc-other-1': '#FFFFFF',
        'cc-other-2': '#181818',
        'cc-other-3': '#666666',
        'cc-other-4': '#9F9F9F',
        'cc-other-5': '#D4D4D4',
        'cc-other-6': '#E9E9E9',
        'cc-other-7': '#F7F7F7',
        'cc-other-8': 'rgba(24, 24, 24, 0.8);',
        'cc-other-9': '#32302C',
      },
      borderRadius: {
        m: '5px',
      },
    },

    plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')],
  },
};
