import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import {nodeResolve} from '@rollup/plugin-node-resolve';


export default {
    input: 'src/js/index.js',
    external: [
        /^corejs-typeahead/u,
        'jquery',
        'nette-forms',
    ],
    output: {
        dir: 'dist/js/commonjs',
        format: 'cjs',
        exports: 'auto',
        sourcemap: true,
        preserveModules: true,
    },
    plugins: [
        nodeResolve(),
        json(),
        commonjs(),
    ],
};
