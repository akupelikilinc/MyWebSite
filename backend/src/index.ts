import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { pool } from './config/database'
import authRoutes from './routes/auth'
import appsRoutes from './routes/apps'
import blogRoutes from './routes/blog'
import projectsRoutes from './routes/projects'
import youtubeRoutes from './routes/youtube'
import settingsRoutes from './routes/settings'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ status: 'ok', database: 'connected' })
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected' })
  }
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/apps', appsRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/projects', projectsRoutes)
app.use('/api/youtube', youtubeRoutes)
app.use('/api/settings', settingsRoutes)

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server')
  await pool.end()
  process.exit(0)
})

