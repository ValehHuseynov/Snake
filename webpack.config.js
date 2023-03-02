const path  = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "development",
    entry: path.join(__dirname,"app.js"),
    output: {
        path: path.resolve(__dirname,"dist"),
        clean: true,
        filename: "app.js"
    },
    devServer: {
        port: 3000,
        open:true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname,"index.html")
        })
    ]
}