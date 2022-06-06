module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'dark': '#121212',
                'light': '#d7d7d7',
                'primary': '#0a5adf',
                'white': '#ffffff'
            },
            fontFamily: {
                sans: ['Graphik', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },
            spacing: {
                '8xl': '96rem',
                '9xl': '128rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            boxShadow: {
                '3xl': '10px 35px 60px 15px white',
            }
        }
    },
    plugins: [],
}
