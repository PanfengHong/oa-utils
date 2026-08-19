import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        // 由 tsc -p tsconfig.build.json 预先生成 .d.ts，vite 不能清空 dist
        emptyOutDir: false,
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