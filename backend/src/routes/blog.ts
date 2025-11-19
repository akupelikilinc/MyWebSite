import express from 'express'
import { pool } from '../config/database'
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get all published blog posts
router.get('/posts', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, excerpt, content, image_url, category, slug, 
              COALESCE(published_at, created_at) as published_at, 
              is_published
       FROM blog_posts 
       WHERE is_published = true 
       ORDER BY COALESCE(published_at, created_at) DESC`
    )
    res.json(result.rows)
  } catch (error: any) {
    console.error('Get blog posts error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get blog post by slug
router.get('/posts/:slug', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE slug = $1 AND is_published = true',
      [req.params.slug]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Blog post not found' })
    }
    res.json(result.rows[0])
  } catch (error: any) {
    console.error('Get blog post error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get all blog posts (admin only)
router.get('/', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (error: any) {
    console.error('Get all blog posts error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Create blog post (admin only)
router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { title, excerpt, content, image_url, category, slug, is_published } = req.body

    const result = await pool.query(
      `INSERT INTO blog_posts (title, excerpt, content, image_url, category, slug, is_published, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $7 ? NOW() : NULL)
       RETURNING *`,
      [title, excerpt, content, image_url, category, slug, is_published || false]
    )

    res.status(201).json(result.rows[0])
  } catch (error: any) {
    console.error('Create blog post error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Update blog post (admin only)
router.put('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { title, excerpt, content, image_url, category, slug, is_published } = req.body

    const result = await pool.query(
      `UPDATE blog_posts 
       SET title = $1, excerpt = $2, content = $3, image_url = $4, category = $5, 
           slug = $6, is_published = $7, updated_at = NOW(),
           published_at = CASE WHEN $7 = true AND published_at IS NULL THEN NOW() ELSE published_at END
       WHERE id = $8
       RETURNING *`,
      [title, excerpt, content, image_url, category, slug, is_published, req.params.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Blog post not found' })
    }

    res.json(result.rows[0])
  } catch (error: any) {
    console.error('Update blog post error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Delete blog post (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const result = await pool.query('DELETE FROM blog_posts WHERE id = $1 RETURNING id', [
      req.params.id,
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Blog post not found' })
    }

    res.json({ message: 'Blog post deleted successfully' })
  } catch (error: any) {
    console.error('Delete blog post error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router

