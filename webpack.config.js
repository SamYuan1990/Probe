module.exports = {
    entry: {
        index: [__dirname + '/src/index/App.jsx'],
        sidebar: [__dirname + '/src/sidebar/App.jsx'],
        newUI: [__dirname + '/src/newUI/App.jsx'],
    },
    mode: 'production',
    output: {
        path: __dirname + '/public/javascripts',
        filename: './[name]/bundle.js'
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