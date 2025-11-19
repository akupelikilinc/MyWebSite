import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { Calendar, Tag } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  imageUrl?: string
  category: string
  publishedAt: string
  slug: string
  isPublished: boolean
}

export default function BlogSection() {
  const { data: postsData, isLoading } = useQuery<any[]>({
    queryKey: ['blog-posts'],
    queryFn: () => api.get('/blog/posts').then((res) => res.data),
  })

  // Transform backend data to frontend format
  const posts: BlogPost[] = postsData?.map((post: any) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt || '',
    content: post.content || '',
    imageUrl: post.image_url,
    category: post.category,
    publishedAt: post.published_at || post.created_at || new Date().toISOString(),
    slug: post.slug,
    isPublished: post.is_published === true || post.is_published === 'true' || post.is_published === 1,
  })) || []

  const displayPosts = posts && posts.length > 0 
    ? posts.filter((post) => post.isPublished).slice(0, 6)
    : []

  if (isLoading) {
    return <div className="text-center text-gray-400">Yükleniyor...</div>
  }

  if (displayPosts.length === 0) {
    return (
      <div>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Blog Yazılarım</h2>
        <div className="text-center text-gray-400 py-12">
          <p>Henüz blog yazısı eklenmemiş.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Blog Yazılarım</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPosts.map((post) => (
          <article
            key={post.id}
            className="glass rounded-2xl overflow-hidden hover:scale-105 transition-transform"
          >
            {post.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
              <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(post.publishedAt).toLocaleDateString('tr-TR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={16} />
                  <span>{post.category}</span>
                </div>
              </div>
              <a
                href={`/blog/${post.slug || post.id}`}
                className="text-primary-400 hover:text-primary-300 font-medium"
              >
                Devamını Oku →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

