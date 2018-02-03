const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: ["./src/index.tsx"],

    output: {
        path: path.resolve(__dirname, "build"),
        filename: "main.js",
        publicPath: "/build/"
    },

    resolve: {
        extensions: [
            ".ts", ".tsx", ".css", ".js", ".json"
        ]
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: "style-loader",
                        use:'css-loader'
                    })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin("main.css")
    ]
};