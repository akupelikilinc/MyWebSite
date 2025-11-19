import express from 'express'
import { pool } from '../config/database'
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get all apps
router.get('/', async (req, res) => {
  try {
    // Check if admin (via query param or auth header)
    const isAdmin = req.query.admin === 'true'
    const query = isAdmin
      ? 'SELECT * FROM apps ORDER BY created_at DESC'
      : 'SELECT * FROM apps WHERE is_active = true ORDER BY created_at DESC'
    const result = await pool.query(query)
    res.json(result.rows)
  } catch (error: any) {
    console.error('Get apps error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get app by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM apps WHERE id = $1', [req.params.id])
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'App not found' })
    }
    res.json(result.rows[0])
  } catch (error: any) {
    console.error('Get app error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Create app (admin only)
router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { name, description, icon, play_store_url, app_store_url } = req.body

    const result = await pool.query(
      `INSERT INTO apps (name, description, icon, play_store_url, app_store_url, is_active)
       VALUES ($1, $2, $3, $4, $5, true)
       RETURNING *`,
      [name, description, icon, play_store_url, app_store_url]
    )

    res.status(201).json(result.rows[0])
  } catch (error: any) {
    console.error('Create app error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Update app (admin only)
router.put('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { name, description, icon, play_store_url, app_store_url, is_active } = req.body

    const result = await pool.query(
      `UPDATE apps 
       SET name = $1, description = $2, icon = $3, play_store_url = $4, app_store_url = $5, is_active = $6, updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [name, description, icon, play_store_url, app_store_url, is_active, req.params.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'App not found' })
    }

    res.json(result.rows[0])
  } catch (error: any) {
    console.error('Update app error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Delete app (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const result = await pool.query('DELETE FROM apps WHERE id = $1 RETURNING id', [
      req.params.id,
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'App not found' })
    }

    res.json({ message: 'App deleted successfully' })
  } catch (error: any) {
    console.error('Delete app error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router

