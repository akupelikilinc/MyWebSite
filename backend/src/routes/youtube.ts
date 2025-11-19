import express from 'express'
import axios from 'axios'
import { pool } from '../config/database'

const router = express.Router()

// Get YouTube videos
router.get('/videos', async (req, res) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY
    const channelId = process.env.YOUTUBE_CHANNEL_ID || 'UCDOQkn4DWRdpjoC-obymdHA'
    const maxResults = parseInt(req.query.max as string) || 6

    if (!apiKey) {
      // Try to get from database cache
      const cachedResult = await pool.query(
        'SELECT * FROM youtube_videos ORDER BY published_at DESC LIMIT $1',
        [maxResults]
      )
      if (cachedResult.rows.length > 0) {
        return res.json(cachedResult.rows)
      }
      return res.status(500).json({ message: 'YouTube API key not configured' })
    }

    // Fetch from YouTube API
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: apiKey,
        channelId: channelId,
        part: 'snippet',
        order: 'date',
        maxResults: maxResults,
        type: 'video',
      },
    })

    const videos = response.data.items.map((item: any) => ({
      id: item.id.videoId,
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url,
      publishedAt: item.snippet.publishedAt,
    }))

    // Cache videos in database
    for (const video of videos) {
      await pool.query(
        `INSERT INTO youtube_videos (video_id, title, description, thumbnail, published_at)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (video_id) 
         DO UPDATE SET title = $2, description = $3, thumbnail = $4, updated_at = NOW()`,
        [video.videoId, video.title, video.description, video.thumbnail, video.publishedAt]
      )
    }

    res.json(videos)
  } catch (error: any) {
    console.error('Get YouTube videos error:', error)
    
    // Fallback to cached videos
    try {
      const cachedResult = await pool.query(
        `SELECT 
          video_id as id, 
          video_id as "videoId", 
          title, 
          description, 
          thumbnail, 
          published_at as "publishedAt"
        FROM youtube_videos 
        ORDER BY published_at DESC 
        LIMIT $1`,
        [parseInt(req.query.max as string) || 6]
      )
      if (cachedResult.rows.length > 0) {
        return res.json(cachedResult.rows)
      }
    } catch (dbError) {
      console.error('Database fallback error:', dbError)
    }

    // Return empty array instead of error if no cache
    res.json([])
  }
})

export default router

