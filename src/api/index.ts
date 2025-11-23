import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

import { zodiacRouter } from './routes/zodiac'
import { horoscopeRouter } from './routes/horoscope'
import { celestialRouter } from './routes/celestial'
import { userRouter } from './routes/user'

// Create Hono app
const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

// Health check
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'mojhoroskop-api',
  })
})

// API Routes
app.route('/api/zodiac', zodiacRouter)
app.route('/api/horoscope', horoscopeRouter)
app.route('/api/celestial', celestialRouter)
app.route('/api/user', userRouter)

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found', path: c.req.path }, 404)
})

// Error handler
app.onError((err, c) => {
  console.error('API Error:', err)
  return c.json({
    error: 'Internal Server Error',
    message: err.message,
  }, 500)
})

// Start server
const port = Number(process.env.API_PORT) || 3001

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(`🚀 Hono API server starting on http://localhost:${port}`)
  serve({
    fetch: app.fetch,
    port,
  })
}

export default app
export type AppType = typeof app
