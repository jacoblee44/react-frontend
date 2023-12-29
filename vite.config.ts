import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        sourcemap: true,
    },
    server: {
        port: 3000,
        host: "akademie1.bkfm.local",
        // host: "127.0.0.1",
        proxy: {
            "/api/v1": {
                target: "http://localhost:8085",
            },
        },
    }
})
