import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { Play } from 'lucide-react'

interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  videoId: string
}

export default function YouTubeSection() {
  const { data: videosData, isLoading, error } = useQuery<any[]>({
    queryKey: ['youtube-videos'],
    queryFn: () => api.get('/youtube/videos').then((res) => res.data).catch(() => []),
    staleTime: 5 * 60 * 1000, // 5 dakika
    retry: false,
  })

  // Transform backend data to frontend format
  const videos: YouTubeVideo[] = videosData?.map((video: any) => ({
    id: video.id || video.video_id,
    videoId: video.videoId || video.video_id,
    title: video.title,
    description: video.description || '',
    thumbnail: video.thumbnail || '',
    publishedAt: video.publishedAt || video.published_at,
  })) || []

  if (isLoading) {
    return <div className="text-center text-gray-400">Videolar yükleniyor...</div>
  }

  if (error || !videos || videos.length === 0) {
    return (
      <div>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">YouTube Paylaşımlarım</h2>
        <div className="text-center text-gray-400 py-12">
          <p>YouTube API'den videolar çekilemedi.</p>
          <p className="text-sm mt-2">Lütfen admin panelinden YouTube API Key'i kontrol edin.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6 text-center">YouTube Paylaşımlarım</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-2xl overflow-hidden hover:scale-105 transition-transform group"
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Play size={24} className="text-black ml-1" fill="black" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-2 line-clamp-2">{video.title}</h3>
              <p className="text-gray-400 text-sm mb-2 line-clamp-2">{video.description}</p>
              <span className="text-gray-500 text-xs">
                {new Date(video.publishedAt).toLocaleDateString('tr-TR')}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

