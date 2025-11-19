import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'

export default function Header() {
  return (
    <header className="glass-dark sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            MyWebSite
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-white transition">
              Ana Sayfa
            </Link>
            <Link to="/#apps" className="text-gray-300 hover:text-white transition">
              Uygulamalar
            </Link>
            <Link to="/#youtube" className="text-gray-300 hover:text-white transition">
              YouTube
            </Link>
            <Link to="/#blog" className="text-gray-300 hover:text-white transition">
              Blog
            </Link>
            <Link to="/#projects" className="text-gray-300 hover:text-white transition">
              Projeler
            </Link>
            <Link
              to="/admin/login"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Yönetim
            </Link>
          </nav>
          <button className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  )
}

