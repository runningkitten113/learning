import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";

export default {
    input: "./index.js",
    output: {
        file: 'bundle.js',
        format: 'es'
    },
    plugins: [
        commonjs(),
        json(),
    ]
}