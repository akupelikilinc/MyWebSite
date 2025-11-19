import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { Building, Truck, Wrench, ShoppingCart, Store, BarChart } from 'lucide-react'

interface Project {
  id: number
  name: string
  description: string
  icon?: string
  technologies: string[]
  websiteUrl?: string
  githubUrl?: string
  isActive: boolean
}

const iconMap: Record<string, any> = {
  building: Building,
  truck: Truck,
  wrench: Wrench,
  shopping: ShoppingCart,
  store: Store,
  chart: BarChart,
}

export default function ProjectsSection() {
  const { data: projectsData, isLoading } = useQuery<any[]>({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects').then((res) => res.data),
  })

  // Transform backend data to frontend format
  const projects: Project[] = projectsData?.map((project: any) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    icon: project.icon,
    technologies: project.technologies || [],
    websiteUrl: project.website_url,
    githubUrl: project.github_url,
    isActive: project.is_active,
  })) || []

  const displayProjects = projects && projects.length > 0 
    ? projects.filter((project) => project.isActive)
    : []

  if (isLoading) {
    return <div className="text-center text-gray-400">Yükleniyor...</div>
  }

  if (displayProjects.length === 0) {
    return (
      <div>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Siteler</h2>
        <div className="text-center text-gray-400 py-12">
          <p>Henüz proje eklenmemiş.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Siteler</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProjects.map((project) => {
          const IconComponent = project.icon ? iconMap[project.icon] : Building
          return (
            <div
              key={project.id}
              className="glass rounded-2xl p-6 hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <IconComponent size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{project.name}</h3>
              </div>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-black/40 text-gray-300 text-xs rounded-full border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {project.websiteUrl && (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm"
                  >
                    Siteyi Ziyaret Et
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-black/40 text-gray-300 rounded-lg hover:bg-black/60 transition text-sm border border-white/10"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

