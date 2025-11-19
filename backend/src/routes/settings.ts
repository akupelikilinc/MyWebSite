import express from 'express'
import { pool } from '../config/database'
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get all settings
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM settings ORDER BY key')
    const settings: Record<string, any> = {}
    
    result.rows.forEach((row) => {
      let value = row.value
      if (row.type === 'json') {
        try {
          value = JSON.parse(value)
        } catch {
          value = value
        }
      } else if (row.type === 'boolean') {
        value = value === 'true'
      } else if (row.type === 'number') {
        value = parseFloat(value) || 0
      }
      settings[row.key] = {
        value,
        type: row.type,
        description: row.description,
      }
    })
    
    res.json(settings)
  } catch (error: any) {
    console.error('Get settings error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get single setting
router.get('/:key', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM settings WHERE key = $1', [req.params.key])
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Setting not found' })
    }
    
    const row = result.rows[0]
    let value = row.value
    if (row.type === 'json') {
      try {
        value = JSON.parse(value)
      } catch {
        value = value
      }
    } else if (row.type === 'boolean') {
      value = value === 'true'
    } else if (row.type === 'number') {
      value = parseFloat(value) || 0
    }
    
    res.json({ key: row.key, value, type: row.type, description: row.description })
  } catch (error: any) {
    console.error('Get setting error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Update setting (admin only)
router.put('/:key', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { value } = req.body
    const result = await pool.query(
      'SELECT type FROM settings WHERE key = $1',
      [req.params.key]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Setting not found' })
    }
    
    const settingType = result.rows[0].type
    let processedValue = value
    
    if (settingType === 'json') {
      processedValue = typeof value === 'string' ? value : JSON.stringify(value)
    } else if (settingType === 'boolean') {
      processedValue = value ? 'true' : 'false'
    } else {
      processedValue = String(value)
    }
    
    const updateResult = await pool.query(
      'UPDATE settings SET value = $1, updated_at = NOW() WHERE key = $2 RETURNING *',
      [processedValue, req.params.key]
    )
    
    res.json(updateResult.rows[0])
  } catch (error: any) {
    console.error('Update setting error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Create setting (admin only)
router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { key, value, type = 'text', description } = req.body
    
    let processedValue = value
    if (type === 'json') {
      processedValue = typeof value === 'string' ? value : JSON.stringify(value)
    } else if (type === 'boolean') {
      processedValue = value ? 'true' : 'false'
    } else {
      processedValue = String(value)
    }
    
    const result = await pool.query(
      'INSERT INTO settings (key, value, type, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [key, processedValue, type, description]
    )
    
    res.status(201).json(result.rows[0])
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'Setting key already exists' })
    }
    console.error('Create setting error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router

