import { useState } from 'react'
import ProfileSection from '../components/sections/ProfileSection'
import AppsSection from '../components/sections/AppsSection'
import YouTubeSection from '../components/sections/YouTubeSection'
import BlogSection from '../components/sections/BlogSection'
import ProjectsSection from '../components/sections/ProjectsSection'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'apps' | 'youtube' | 'blog' | 'projects'>('apps')

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <ProfileSection />
        
        <div className="mt-8 glass-dark rounded-3xl overflow-hidden">
          <div className="flex flex-wrap border-b border-white/10">
            <button
              onClick={() => setActiveTab('apps')}
              className={`flex-1 min-w-[200px] px-6 py-4 text-center font-medium transition ${
                activeTab === 'apps'
                  ? 'bg-black/40 text-white border-b-2 border-primary-500'
                  : 'text-gray-400 hover:text-white hover:bg-black/20'
              }`}
            >
              Mobil Uygulamalarım
            </button>
            <button
              onClick={() => setActiveTab('youtube')}
              className={`flex-1 min-w-[200px] px-6 py-4 text-center font-medium transition ${
                activeTab === 'youtube'
                  ? 'bg-black/40 text-white border-b-2 border-primary-500'
                  : 'text-gray-400 hover:text-white hover:bg-black/20'
              }`}
            >
              YouTube Paylaşımlarım
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`flex-1 min-w-[200px] px-6 py-4 text-center font-medium transition ${
                activeTab === 'blog'
                  ? 'bg-black/40 text-white border-b-2 border-primary-500'
                  : 'text-gray-400 hover:text-white hover:bg-black/20'
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex-1 min-w-[200px] px-6 py-4 text-center font-medium transition ${
                activeTab === 'projects'
                  ? 'bg-black/40 text-white border-b-2 border-primary-500'
                  : 'text-gray-400 hover:text-white hover:bg-black/20'
              }`}
            >
              Projelerim
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'apps' && <AppsSection />}
            {activeTab === 'youtube' && <YouTubeSection />}
            {activeTab === 'blog' && <BlogSection />}
            {activeTab === 'projects' && <ProjectsSection />}
          </div>
        </div>
      </div>
    </div>
  )
}

