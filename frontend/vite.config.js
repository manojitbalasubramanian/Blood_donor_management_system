import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config();
const PORT=process.env.PORT;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: PORT,
  }
})
