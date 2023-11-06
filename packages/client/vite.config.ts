import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import htmlPlugin from 'vite-plugin-html-config';

let API = 'http://localhost:5678';
let WS = 'ws://localhost:8765';

const args = process.argv.slice(2, process.argv.length);
const mode = args.filter(v => v.includes('mode'))[0];

if (mode) {
  const value = mode.split('=')[1];
  if (value === 'production') {
    API = 'https://todo.com';
    WS = 'wss://todo.com';
  }
}

const htmlPluginOpt = {
  metas: [
    {
      name: 'api',
      content: API,
    },
    {
      name: 'ws',
      content: WS,
    }
  ]
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      htmlPlugin(htmlPluginOpt),
      react(),
  ],
})
