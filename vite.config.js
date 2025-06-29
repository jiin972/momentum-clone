import { defineConfig } from "vite";

export default defineConfig({
  base: "/momentum-clone/",

  plugins: [],

  build: {
    rollupOptions: {
      output: {
        // 메인 JavaScript 파일은 'main.js'로 이름 고정 (해싱 없이)
        entryFileNames: `assets/[name].js`,
        // 다른 청크 파일들은 여전히 해싱
        chunkFileNames: `assets/[name]-[hash].js`,
        // CSS나 이미지 같은 다른 자산 파일들도 여전히 해싱
        assetFileNames: `assets/[name]-[hash].[ext]`,
      },
    },
  },
});
