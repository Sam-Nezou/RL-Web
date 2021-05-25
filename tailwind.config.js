module.exports = {
    purge: {
        enabled: process.env.WEBPACK_DEV_SERVER === 'true' && process.argv.join(' ').indexOf('build') !== -1,
        content: [
            "./src/**/*.{html,ts}",
            "./projects/**/*.{html,ts}"
        ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        height: {
            96: '96px',
            128: '128px'
        },
        extend: {},
    },
    variants: {},
    plugins: [],
}