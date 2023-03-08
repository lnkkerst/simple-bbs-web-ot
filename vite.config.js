import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import UnoCSS from 'unocss/vite';
import presetUno from '@unocss/preset-uno';
import presetAttributify from '@unocss/preset-attributify';
import presetTypography from '@unocss/preset-typography';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({ presets: [presetUno(), presetAttributify(), presetTypography()] })
  ],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  }
});
