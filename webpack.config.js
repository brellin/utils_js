const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'router-vanilla.js',
        library: {
            name: 'routerVanilla',
            type: 'umd',
        },
    },
};
