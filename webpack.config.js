module.exports = {
    entry: __dirname + '/src/App.jsx',
    mode: 'production',
    output: {
        path: __dirname + '/public/javascripts',
        filename: 'bundle.js'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    }
};