module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}','./content/**/*.{md,mdx}'],
    theme: {
        extend: {
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif']
            }
        }
    },
    plugins: []
};