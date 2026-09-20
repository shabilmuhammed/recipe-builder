import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load OPENAI_API_KEY from .env.local so the dev API middleware below can use it.
dotenv.config({ path: '.env.local' })

// Dev-only middleware so `npm run dev` also serves the /api/recipes function
// (in production on Vercel, /api/recipes.js runs as a serverless function automatically).
function apiDevServer() {
  return {
    name: 'pantrypal-api-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/recipes')) return next()
        server
          .ssrLoadModule('/api/recipes.js')
          .then((mod) => mod.default(req, res))
          .catch((err) => {
            console.error(err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err?.message || 'Server error' }))
          })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), apiDevServer()],
})
