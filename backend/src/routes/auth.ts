import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../config/database'
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    const user = result.rows[0]

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error: any) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get current user
router.get('/me', authenticate, (req: AuthRequest, res) => {
  res.json({ user: req.user })
})

// Register (admin only, can be used for initial setup)
router.post('/register', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { name, email, password, role = 'admin' } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' })
    }

    // Check if user exists
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email])
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, passwordHash, role]
    )

    res.status(201).json({
      message: 'User created successfully',
      user: result.rows[0],
    })
  } catch (error: any) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get all users (admin only)
router.get('/users', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY created_at DESC'
    )
    res.json(result.rows)
  } catch (error: any) {
    console.error('Get users error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Update user (admin only)
router.put('/users/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { name, email, role, password } = req.body
    const userId = parseInt(req.params.id)

    // Check if user exists
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId])
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    const updates: string[] = []
    const values: any[] = []
    let paramCount = 1

    if (name) {
      updates.push(`name = $${paramCount++}`)
      values.push(name)
    }
    if (email) {
      updates.push(`email = $${paramCount++}`)
      values.push(email)
    }
    if (role) {
      updates.push(`role = $${paramCount++}`)
      values.push(role)
    }
    if (password) {
      const passwordHash = await bcrypt.hash(password, 10)
      updates.push(`password_hash = $${paramCount++}`)
      values.push(passwordHash)
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields to update' })
    }

    updates.push(`updated_at = NOW()`)
    values.push(userId)

    const result = await pool.query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING id, name, email, role`,
      values
    )

    res.json(result.rows[0])
  } catch (error: any) {
    console.error('Update user error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Delete user (admin only)
router.delete('/users/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const userId = parseInt(req.params.id)

    // Prevent deleting yourself
    if (userId === req.user?.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' })
    }

    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [userId])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ message: 'User deleted successfully' })
  } catch (error: any) {
    console.error('Delete user error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router

