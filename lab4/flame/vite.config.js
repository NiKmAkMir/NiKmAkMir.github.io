import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/lab4/',             
  build: {
    outDir: path.resolve(__dirname, '../../lab4/'), 
    emptyOutDir: true
  }
})
