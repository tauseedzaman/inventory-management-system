import { defineConfig } from 'vite';
import * as laravelPlugin from 'laravel-vite-plugin'; // AI Refactor Patch: Switched to namespace import for laravel-vite-plugin to support both default and named exports because Vite 4.5.0 -> 6.4.3 requires upgrading laravel-vite-plugin (0.7.x is incompatible). Using a resilient import pattern helps work with newer laravel-vite-plugin (>=1.1.0) without changing call sites.
import { viteStaticCopy } from "vite-plugin-static-copy";

const laravel = laravelPlugin.default ?? laravelPlugin.laravel ?? laravelPlugin; // AI Refactor Patch: Selected the plugin factory from possible default or named exports to accommodate laravel-vite-plugin API differences when upgrading to a version compatible with Vite 6 (>=1.1.0). This prevents runtime errors from mismatched export shapes after the Vite 4.5.0 -> 6.4.3 upgrade.

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        viteStaticCopy({
            targets: [
                // Styles
                {
                    src: [
                        'node_modules/@tabler/core/dist/css/tabler.min.css',
                        'node_modules/@tabler/core/dist/css/tabler-flags.min.css',
                        'node_modules/@tabler/core/dist/css/tabler-payments.min.css',
                        'node_modules/@tabler/core/dist/css/tabler-vendors.min.css',
                        'node_modules/@tabler/core/dist/css/demo.min.css',
                        'node_modules/@tabler/core/dist/css/tabler-social.min.css',
                    ],
                    dest: '../dist/css'
                },
                // Scripts
                {
                    src: [
                        'node_modules/@tabler/core/dist/js/demo-theme.min.js',
                        'node_modules/@tabler/core/dist/js/tabler.min.js',
                        'node_modules/@tabler/core/dist/js/demo.min.js',
                    ],
                    dest: '../dist/js'
                },
                // libraries
                {
                    src: 'node_modules/@tabler/core/dist/libs/*',
                    dest: '../dist/libs'
                },
                // Images
                {
                    src: 'node_modules/@tabler/core/dist/img/*',
                    dest: '../dist/img'
                },
            ]
        })
    ],
});
