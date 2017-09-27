module.exports = {
    entry: './lib/index.js',
    output: {
        filename: 'dx.js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: "Dx"
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
}