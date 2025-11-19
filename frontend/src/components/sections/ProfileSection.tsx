import { Github, Linkedin, Youtube, Twitter, Instagram } from 'lucide-react'

export default function ProfileSection() {
  return (
    <section className="glass-dark rounded-3xl p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <img
            src="/akupelikilinc.jpg"
            alt="Ahmet KÜPELİKILINÇ"
            className="w-48 h-48 rounded-full border-4 border-primary-500 object-cover shadow-lg"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-white mb-2">Ahmet KÜPELİKILINÇ</h1>
          <p className="text-xl text-gray-300 mb-4">Yazılım Geliştirici & İçerik Üreticisi</p>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Mobil uygulama geliştirme, YouTube içerik üretimi ve teknoloji blog yazarlığı konularında
            tutkulu bir yazılım geliştiricisiyim. Modern teknolojiler kullanarak kullanıcı dostu
            çözümler geliştirmeyi seviyorum.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a
              href="https://github.com/akupelikilinc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center hover:bg-primary-600 hover:border-primary-500 transition"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/akupelikilinc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center hover:bg-primary-600 hover:border-primary-500 transition"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.youtube.com/@akupelikilinc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center hover:bg-primary-600 hover:border-primary-500 transition"
            >
              <Youtube size={20} />
            </a>
            <a
              href="https://twitter.com/akupelikilinc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center hover:bg-primary-600 hover:border-primary-500 transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://www.instagram.com/akupelikilinc/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center hover:bg-primary-600 hover:border-primary-500 transition"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

