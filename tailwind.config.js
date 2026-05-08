/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['Bebas Neue', "sans-serif"],
        poppins: ['Poppins', 'sans-serif'],
        playfair: ["Playfair Display", "serif"],
        oswald: ["Oswald", "sans-serif"],
        anton: ["Anton", "sans-serif"],
        Lato: ["Lato", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
        Aptos: ['Aptos', 'sans-serif'],
        aptosNarrow: ['Aptos Narrow', 'sans-serif'],
        aptosDisplay: ['Aptos Display', 'sans-serif'],
        aptosMono: ['Aptos Mono', 'monospace'],
        aptosSerif: ['Aptos Serif', 'serif'],
        Montserrat: ['Montserrat', "sans-serif"],
        OpenSans: ['Open Sans', "sans-serif"],
        fangsong: ["FangSong", "sans-serif"],
        Arabic: ['Simplified Arabic', "sans-serif"],
        sans: ['Montserrat', 'Open Sans', '"Helvetica Neue"', 'Helvetica', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
