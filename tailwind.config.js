export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'white-background': "url('src/assets/Backgrounds/bg_white.png')",
        'red-background': "url('src/assets/Backgrounds/bg_red.jpg')",
      },
      colors: {
        'valentino-red': "#b30e0f",
      },
      fontFamily: {
        'valentino-font': ['JetBrains Mono', 'monospace'],
        'indie-flower': ['Indie Flower', 'cursive'],
        'saira-custom': ['Saira', 'sans-serif'],
      },
      keyframes: {
        fadeLeft: {
          '0%, 100%': { transform: 'translateX(3px)' },
          '50%': { transform: 'translateX(6px) scale(1)' },
        },
        fadeRight: {
          '0%, 100%': { transform: 'translateX(-3px)' },
          '50%': { transform: 'translateX(-6px) scale(1)' },
        },
        smoothFade: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        showUp: {
          '0%' : {opacity: '0'},
          '100%': {opacity: '1'}
        }
      },
      animation: {
        'fade-infinite-left': 'fadeLeft 1s infinite',
        'fade-infinite-right': 'fadeRight 1s infinite',
        'fade-infinite': 'smoothFade 1.7s infinite',
        'showUp' : 'showUp 0.5s ease-in-out 0.2s forwards',
      },
      boxShadow: {
        'custom': 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px', 
      },
    },
  },
  plugins: [],
}