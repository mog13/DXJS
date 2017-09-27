module.exports = {
    entry: './lib/index.js',
    output: {
        filename: 'DX.js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: "DX"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
};