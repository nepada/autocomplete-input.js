import {babel} from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import rollupTerser from '@rollup/plugin-terser';


export default [
    {
        input: 'src/js/autocomplete-input.js',
        external: [
            /^corejs-typeahead/u,
            'jquery',
            'nette-forms',
        ],
        output: {
            file: 'dist/js/autocomplete-input.js',
            format: 'umd',
            exports: 'auto',
            sourcemap: true,
            globals: {
                'corejs-typeahead/dist/bloodhound': 'Bloodhound',
                'jquery': 'jQuery',
                'nette-forms': 'Nette',
            },
        },
        plugins: [
            nodeResolve(),
            json(),
            commonjs(),
            babel({
                babelrc: false,
                babelHelpers: 'bundled',
                presets: [['@babel/preset-env', {targets: '> 1%, cover 95%, not dead'}]],
            }),
        ],
    },
    {
        input: 'src/js/autocomplete-input.js',
        external: [
            /^corejs-typeahead/u,
            'jquery',
            'nette-forms',
        ],
        output: {
            file: 'dist/js/autocomplete-input.min.js',
            format: 'umd',
            exports: 'auto',
            sourcemap: true,
            globals: {
                'corejs-typeahead/dist/bloodhound': 'Bloodhound',
                'jquery': 'jQuery',
                'nette-forms': 'Nette',
            },
        },
        plugins: [
            nodeResolve(),
            json(),
            commonjs(),
            babel({
                babelrc: false,
                babelHelpers: 'bundled',
                presets: [['@babel/preset-env', {targets: '> 1%, cover 95%, not dead'}]],
            }),
            rollupTerser(),
        ],
    },
];
