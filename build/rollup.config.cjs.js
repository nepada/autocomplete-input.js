import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeBuiltins from 'rollup-plugin-node-builtins';
import nodeGlobals from 'rollup-plugin-node-globals';
import nodeResolve from '@rollup/plugin-node-resolve';


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
        sourcemap: true,
    },
    preserveModules: true,
    plugins: [
        nodeResolve(),
        json(),
        commonjs(),
        nodeBuiltins(),
        nodeGlobals(),
    ],
};
