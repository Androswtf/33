const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'index.js'),
    mode: 'development',
    watch: true,
    output: {
        path: __dirname,
        filename: 'bundle.js'
    }
}