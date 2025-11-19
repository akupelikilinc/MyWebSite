import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'

export default function Footer() {
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: () => api.get('/settings').then((res) => res.data),
  })

  const footerText = settings?.footer_text?.value || '© 2024 MyWebSite. Tüm hakları saklıdır.'

  return (
    <footer className="glass-dark border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-400">
          <p>{footerText}</p>
        </div>
      </div>
    </footer>
  )
}

