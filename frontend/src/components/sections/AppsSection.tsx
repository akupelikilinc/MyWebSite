import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { Brain, Baby } from 'lucide-react'

interface App {
  id: number
  name: string
  description: string
  icon?: string
  playStoreUrl?: string
  appStoreUrl?: string
  isActive: boolean
}

export default function AppsSection() {
  const { data: appsData, isLoading } = useQuery<any[]>({
    queryKey: ['apps'],
    queryFn: () => api.get('/apps').then((res) => res.data),
  })

  // Transform backend data to frontend format
  const apps: App[] = appsData?.map((app: any) => ({
    id: app.id,
    name: app.name,
    description: app.description,
    icon: app.icon,
    playStoreUrl: app.play_store_url,
    appStoreUrl: app.app_store_url,
    isActive: app.is_active,
  })) || []

  const displayApps = apps && apps.length > 0 ? apps.filter((app) => app.isActive) : []

  if (isLoading) {
    return <div className="text-center text-gray-400">Yükleniyor...</div>
  }

  if (displayApps.length === 0) {
    return (
      <div>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Mobil Uygulamalarım</h2>
        <div className="text-center text-gray-400 py-12">
          <p>Henüz uygulama eklenmemiş.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Mobil Uygulamalarım</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayApps.map((app) => (
          <div
            key={app.id}
            className="glass rounded-2xl p-6 hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                {app.icon === 'brain' ? (
                  <Brain size={32} className="text-white" />
                ) : (
                  <Baby size={32} className="text-white" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-white">{app.name}</h3>
            </div>
            <p className="text-gray-400 mb-4">{app.description}</p>
            {app.playStoreUrl && (
              <a
                href={app.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                Google Play
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

