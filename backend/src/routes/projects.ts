import express from 'express'
import { pool } from '../config/database'
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get all projects
router.get('/', async (req, res) => {
  try {
    // Check if admin (via query param or auth header)
    const isAdmin = req.query.admin === 'true'
    const query = isAdmin
      ? 'SELECT * FROM projects ORDER BY created_at DESC'
      : 'SELECT * FROM projects WHERE is_active = true ORDER BY created_at DESC'
    const result = await pool.query(query)
    res.json(result.rows)
  } catch (error: any) {
    console.error('Get projects error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [req.params.id])
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' })
    }
    res.json(result.rows[0])
  } catch (error: any) {
    console.error('Get project error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Create project (admin only)
router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { name, description, icon, technologies, website_url, github_url } = req.body

    const result = await pool.query(
      `INSERT INTO projects (name, description, icon, technologies, website_url, github_url, is_active)
       VALUES ($1, $2, $3, $4::text[], $5, $6, true)
       RETURNING *`,
      [name, description, icon, technologies || [], website_url, github_url]
    )

    res.status(201).json(result.rows[0])
  } catch (error: any) {
    console.error('Create project error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Update project (admin only)
router.put('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { name, description, icon, technologies, website_url, github_url, is_active } = req.body

    const result = await pool.query(
      `UPDATE projects 
       SET name = $1, description = $2, icon = $3, technologies = $4::text[], 
           website_url = $5, github_url = $6, is_active = $7, updated_at = NOW()
       WHERE id = $8
       RETURNING *`,
      [name, description, icon, technologies || [], website_url, github_url, is_active, req.params.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' })
    }

    res.json(result.rows[0])
  } catch (error: any) {
    console.error('Update project error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Delete project (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING id', [
      req.params.id,
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' })
    }

    res.json({ message: 'Project deleted successfully' })
  } catch (error: any) {
    console.error('Delete project error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router

