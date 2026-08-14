import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'OaUtils',
            fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            // 保持外部依赖（无依赖）
            external: [],
            output: {
                globals: {},
            },
        },
    },
});