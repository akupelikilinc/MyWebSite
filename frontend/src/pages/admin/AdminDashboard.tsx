import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { LogOut, Plus, Edit, Trash2, X } from 'lucide-react'

interface App {
  id: number
  name: string
  description: string
  icon?: string
  play_store_url?: string
  app_store_url?: string
  is_active: boolean
}

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image_url?: string
  category: string
  slug: string
  is_published: boolean
  published_at?: string
}

interface Project {
  id: number
  name: string
  description: string
  icon?: string
  technologies: string[]
  website_url?: string
  github_url?: string
  is_active: boolean
}

export default function AdminDashboard() {
  const { logout, user: currentUser } = useAuthStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<'apps' | 'blog' | 'projects' | 'youtube' | 'settings' | 'users'>('apps')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  // Apps
  const { data: apps = [] } = useQuery<App[]>({
    queryKey: ['admin-apps'],
    queryFn: () => api.get('/apps?admin=true').then((res) => res.data),
    enabled: activeTab === 'apps',
  })

  const createAppMutation = useMutation({
    mutationFn: (data: Partial<App>) => api.post('/apps', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-apps'] })
      setShowModal(false)
      setEditingItem(null)
    },
  })

  const updateAppMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<App> }) =>
      api.put(`/apps/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-apps'] })
      setShowModal(false)
      setEditingItem(null)
    },
  })

  const deleteAppMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/apps/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-apps'] })
    },
  })

  // Blog
  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ['admin-blog'],
    queryFn: () => api.get('/blog').then((res) => res.data),
    enabled: activeTab === 'blog',
  })

  const createBlogMutation = useMutation({
    mutationFn: (data: Partial<BlogPost>) => api.post('/blog', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog'] })
      setShowModal(false)
      setEditingItem(null)
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<BlogPost> }) =>
      api.put(`/blog/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog'] })
      setShowModal(false)
      setEditingItem(null)
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/blog/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog'] })
    },
  })

  // Projects
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ['admin-projects'],
    queryFn: () => api.get('/projects?admin=true').then((res) => res.data),
    enabled: activeTab === 'projects',
  })

  const createProjectMutation = useMutation({
    mutationFn: (data: Partial<Project>) => api.post('/projects', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] })
      setShowModal(false)
      setEditingItem(null)
    },
  })

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Project> }) =>
      api.put(`/projects/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] })
      setShowModal(false)
      setEditingItem(null)
    },
  })

  const deleteProjectMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] })
    },
  })

  // Settings
  const { data: settings = {} } = useQuery<Record<string, any>>({
    queryKey: ['settings'],
    queryFn: () => api.get('/settings').then((res) => res.data),
    enabled: activeTab === 'settings',
  })

  const updateSettingMutation = useMutation({
    mutationFn: ({ key, value }: { key: string; value: any }) =>
      api.put(`/settings/${key}`, { value }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })

  // Users
  const { data: users = [] } = useQuery<any[]>({
    queryKey: ['users'],
    queryFn: () => api.get('/auth/users').then((res) => res.data),
    enabled: activeTab === 'users',
  })

  const createUserMutation = useMutation({
    mutationFn: (data: any) => api.post('/auth/register', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setShowModal(false)
      setEditingItem(null)
    },
  })

  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      api.put(`/auth/users/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setShowModal(false)
      setEditingItem(null)
    },
  })

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/auth/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const handleAdd = () => {
    setEditingItem(null)
    setShowModal(true)
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (!confirm('Bu öğeyi silmek istediğinizden emin misiniz?')) return

    if (activeTab === 'apps') {
      deleteAppMutation.mutate(id)
    } else if (activeTab === 'blog') {
      deleteBlogMutation.mutate(id)
    } else if (activeTab === 'projects') {
      deleteProjectMutation.mutate(id)
    } else if (activeTab === 'users') {
      deleteUserMutation.mutate(id)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    if (activeTab === 'apps') {
      const appData = {
        name: data.name as string,
        description: data.description as string,
        icon: data.icon as string,
        play_store_url: data.play_store_url as string,
        app_store_url: data.app_store_url as string,
        is_active: data.is_active === 'true',
      }
      if (editingItem) {
        updateAppMutation.mutate({ id: editingItem.id, data: appData })
      } else {
        createAppMutation.mutate(appData)
      }
    } else if (activeTab === 'blog') {
      const blogData = {
        title: data.title as string,
        excerpt: data.excerpt as string,
        content: data.content as string,
        image_url: data.image_url as string,
        category: data.category as string,
        slug: data.slug as string,
        is_published: data.is_published === 'true',
      }
      if (editingItem) {
        updateBlogMutation.mutate({ id: editingItem.id, data: blogData })
      } else {
        createBlogMutation.mutate(blogData)
      }
    } else if (activeTab === 'projects') {
      const technologies = (data.technologies as string).split(',').map((t) => t.trim())
      const projectData = {
        name: data.name as string,
        description: data.description as string,
        icon: data.icon as string,
        technologies,
        website_url: data.website_url as string,
        github_url: data.github_url as string,
        is_active: data.is_active === 'true',
      }
      if (editingItem) {
        updateProjectMutation.mutate({ id: editingItem.id, data: projectData })
      } else {
        createProjectMutation.mutate(projectData)
      }
    } else if (activeTab === 'users') {
      const userData = {
        name: data.name as string,
        email: data.email as string,
        password: data.password as string,
        role: data.role as string,
      }
      if (editingItem) {
        const updateData: any = {
          name: userData.name,
          email: userData.email,
          role: userData.role,
        }
        if (userData.password) {
          updateData.password = userData.password
        }
        updateUserMutation.mutate({ id: editingItem.id, data: updateData })
      } else {
        createUserMutation.mutate(userData)
      }
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="glass-dark border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Yönetim Paneli</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-300">Hoş geldiniz, {currentUser?.name || 'Admin'}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <LogOut size={18} />
                Çıkış
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6 flex-wrap">
          {(['apps', 'blog', 'projects', 'youtube', 'settings', 'users'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg transition ${
                activeTab === tab
                  ? 'bg-primary-600 text-white'
                  : 'bg-black/40 text-gray-300 hover:bg-black/60'
              }`}
            >
              {tab === 'apps' && 'Uygulamalar'}
              {tab === 'blog' && 'Blog Yazıları'}
              {tab === 'projects' && 'Projeler'}
              {tab === 'youtube' && 'YouTube'}
              {tab === 'settings' && 'Genel Ayarlar'}
              {tab === 'users' && 'Kullanıcılar'}
            </button>
          ))}
        </div>

        <div className="glass-dark rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {activeTab === 'apps' && 'Uygulamalar'}
              {activeTab === 'blog' && 'Blog Yazıları'}
              {activeTab === 'projects' && 'Projeler'}
              {activeTab === 'youtube' && 'YouTube Videoları'}
              {activeTab === 'settings' && 'Genel Ayarlar'}
              {activeTab === 'users' && 'Kullanıcı Yönetimi'}
            </h2>
            {activeTab !== 'youtube' && activeTab !== 'settings' && activeTab !== 'users' && (
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                <Plus size={18} />
                Yeni Ekle
              </button>
            )}
            {activeTab === 'users' && (
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                <Plus size={18} />
                Yeni Kullanıcı
              </button>
            )}
          </div>

          {activeTab === 'apps' && (
            <div className="space-y-4">
              {apps.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Henüz uygulama eklenmemiş.</p>
              ) : (
                apps.map((app) => (
                  <div
                    key={app.id}
                    className="glass rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{app.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{app.description}</p>
                      <div className="flex gap-2 mt-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            app.is_active
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {app.is_active ? 'Aktif' : 'Pasif'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(app)}
                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded transition"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="space-y-4">
              {blogPosts.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Henüz blog yazısı eklenmemiş.</p>
              ) : (
                blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="glass rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{post.title}</h3>
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">{post.excerpt}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-xs">
                          {post.category}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            post.is_published
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {post.is_published ? 'Yayında' : 'Taslak'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded transition"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              {projects.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Henüz proje eklenmemiş.</p>
              ) : (
                projects.map((project) => (
                  <div
                    key={project.id}
                    className="glass rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{project.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                      <div className="flex gap-2 mt-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            project.is_active
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {project.is_active ? 'Aktif' : 'Pasif'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded transition"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'youtube' && (
            <div className="text-center text-gray-400 py-12">
              <p>YouTube videoları otomatik olarak YouTube API'den çekilmektedir.</p>
              <p className="text-sm mt-2">Manuel ekleme/düzenleme yapılamaz.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              {Object.entries(settings).map(([key, setting]: [string, any]) => (
                <div key={key} className="glass rounded-lg p-4">
                  <label className="block text-gray-300 mb-2">
                    {setting.description || key}
                  </label>
                  {setting.type === 'json' ? (
                    <textarea
                      value={JSON.stringify(setting.value, null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value)
                          updateSettingMutation.mutate({ key, value: parsed })
                        } catch {}
                      }}
                      onBlur={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value)
                          updateSettingMutation.mutate({ key, value: parsed })
                        } catch {}
                      }}
                      rows={4}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white font-mono text-sm"
                    />
                  ) : setting.type === 'boolean' ? (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={setting.value}
                        onChange={(e) =>
                          updateSettingMutation.mutate({ key, value: e.target.checked })
                        }
                        className="w-5 h-5"
                      />
                      <span className="text-gray-400">
                        {setting.value ? 'Aktif' : 'Pasif'}
                      </span>
                    </label>
                  ) : (
                    <input
                      type={setting.type === 'number' ? 'number' : 'text'}
                      value={setting.value || ''}
                      onChange={(e) => {
                        const value =
                          setting.type === 'number'
                            ? parseFloat(e.target.value) || 0
                            : e.target.value
                        updateSettingMutation.mutate({ key, value })
                      }}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-4">
              {users.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Henüz kullanıcı eklenmemiş.</p>
              ) : (
                users.map((user: any) => (
                  <div
                    key={user.id}
                    className="glass rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{user.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{user.email}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-xs">
                          {user.role}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded transition"
                      >
                        <Edit size={18} />
                      </button>
                      {user.id !== currentUser?.id && (
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-dark rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">
                {editingItem ? 'Düzenle' : 'Yeni Ekle'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false)
                  setEditingItem(null)
                }}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'apps' && (
                <>
                  <div>
                    <label className="block text-gray-300 mb-2">Uygulama Adı</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editingItem?.name || ''}
                      required
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Açıklama</label>
                    <textarea
                      name="description"
                      defaultValue={editingItem?.description || ''}
                      required
                      rows={3}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">İkon (brain, baby, vb.)</label>
                    <input
                      type="text"
                      name="icon"
                      defaultValue={editingItem?.icon || ''}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Google Play URL</label>
                    <input
                      type="url"
                      name="play_store_url"
                      defaultValue={editingItem?.play_store_url || ''}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">App Store URL</label>
                    <input
                      type="url"
                      name="app_store_url"
                      defaultValue={editingItem?.app_store_url || ''}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Durum</label>
                    <select
                      name="is_active"
                      defaultValue={editingItem?.is_active !== false ? 'true' : 'false'}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    >
                      <option value="true">Aktif</option>
                      <option value="false">Pasif</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab === 'blog' && (
                <>
                  <div>
                    <label className="block text-gray-300 mb-2">Başlık</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={editingItem?.title || ''}
                      required
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Özet</label>
                    <textarea
                      name="excerpt"
                      defaultValue={editingItem?.excerpt || ''}
                      required
                      rows={2}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">İçerik</label>
                    <textarea
                      name="content"
                      defaultValue={editingItem?.content || ''}
                      required
                      rows={6}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Görsel URL</label>
                    <input
                      type="url"
                      name="image_url"
                      defaultValue={editingItem?.image_url || ''}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Kategori</label>
                    <input
                      type="text"
                      name="category"
                      defaultValue={editingItem?.category || ''}
                      required
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Slug (URL dostu)</label>
                    <input
                      type="text"
                      name="slug"
                      defaultValue={editingItem?.slug || ''}
                      required
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Durum</label>
                    <select
                      name="is_published"
                      defaultValue={editingItem?.is_published ? 'true' : 'false'}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    >
                      <option value="false">Taslak</option>
                      <option value="true">Yayında</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab === 'projects' && (
                <>
                  <div>
                    <label className="block text-gray-300 mb-2">Proje Adı</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editingItem?.name || ''}
                      required
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Açıklama</label>
                    <textarea
                      name="description"
                      defaultValue={editingItem?.description || ''}
                      required
                      rows={3}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">İkon (building, truck, vb.)</label>
                    <input
                      type="text"
                      name="icon"
                      defaultValue={editingItem?.icon || ''}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">
                      Teknolojiler (virgülle ayırın)
                    </label>
                    <input
                      type="text"
                      name="technologies"
                      defaultValue={editingItem?.technologies?.join(', ') || ''}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Website URL</label>
                    <input
                      type="url"
                      name="website_url"
                      defaultValue={editingItem?.website_url || ''}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">GitHub URL</label>
                    <input
                      type="url"
                      name="github_url"
                      defaultValue={editingItem?.github_url || ''}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Durum</label>
                    <select
                      name="is_active"
                      defaultValue={editingItem?.is_active !== false ? 'true' : 'false'}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    >
                      <option value="true">Aktif</option>
                      <option value="false">Pasif</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab === 'users' && (
                <>
                  <div>
                    <label className="block text-gray-300 mb-2">Ad Soyad</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editingItem?.name || ''}
                      required
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">E-posta</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={editingItem?.email || ''}
                      required
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">
                      Şifre {editingItem && '(Değiştirmek için doldurun)'}
                    </label>
                    <input
                      type="password"
                      name="password"
                      required={!editingItem}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Rol</label>
                    <select
                      name="role"
                      defaultValue={editingItem?.role || 'admin'}
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white"
                    >
                      <option value="admin">Admin</option>
                      <option value="editor">Editör</option>
                    </select>
                  </div>
                </>
              )}

              <div className="flex gap-2 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingItem(null)
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  {editingItem ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
