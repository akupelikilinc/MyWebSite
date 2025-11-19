# MyWebSite - Modern Portfolio & CMS

Modern, esnek ve ölçeklenebilir bir portfolio ve içerik yönetim sistemi. React frontend, Node.js backend ve PostgreSQL veritabanı ile geliştirilmiştir.

## 🚀 Özellikler

- **Modern Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Güçlü Backend**: Node.js + Express + TypeScript
- **Veritabanı**: PostgreSQL ile güvenli veri saklama
- **Yönetim Paneli**: İçerik yönetimi için admin paneli
- **RESTful API**: Tam CRUD işlemleri
- **JWT Authentication**: Güvenli kimlik doğrulama
- **Docker Support**: Kolay deployment
- **Responsive Design**: Tüm cihazlarda mükemmel görünüm
- **Genel Ayarlar**: Footer, site ayarları ve sosyal medya linkleri yönetimi
- **Kullanıcı Yönetimi**: Admin kullanıcı ekleme, düzenleme ve silme

## 📁 Proje Yapısı

```
MyWebSite/
├── frontend/          # React frontend uygulaması
│   ├── src/
│   │   ├── components/    # React bileşenleri
│   │   ├── pages/         # Sayfa bileşenleri
│   │   ├── lib/           # Yardımcı fonksiyonlar
│   │   └── store/          # State management
│   └── package.json
├── backend/           # Node.js backend API
│   ├── src/
│   │   ├── routes/        # API route'ları
│   │   ├── middleware/    # Middleware'ler
│   │   ├── config/         # Konfigürasyon
│   │   └── migrations/     # Veritabanı migration'ları
│   └── package.json
├── docker-compose.yml # Docker compose konfigürasyonu
└── README.md
```

## 🛠️ Teknolojiler

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query (React Query)
- Zustand (State Management)
- React Hook Form + Zod

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT Authentication
- Bcrypt (Password Hashing)

## 📦 Kurulum

### Gereksinimler
- Node.js 20+
- PostgreSQL 15+
- Docker & Docker Compose (opsiyonel)

### Yerel Geliştirme

1. **Repository'yi klonlayın**
```bash
git clone https://github.com/akupelikilinc/MyWebSite.git
cd MyWebSite
```

2. **Backend kurulumu**
```bash
cd backend
npm install
cp .env.example .env
# .env dosyasını düzenleyin
```

3. **Veritabanını oluşturun**
```bash
# PostgreSQL'de veritabanı oluşturun
createdb mywebsite

# Migration'ları çalıştırın
psql -U postgres -d mywebsite -f migrations/001_initial_schema.sql
psql -U postgres -d mywebsite -f migrations/002_insert_default_data.sql
psql -U postgres -d mywebsite -f migrations/003_settings_and_user_management.sql
```

4. **Backend'i başlatın**
```bash
npm run dev
```

5. **Frontend kurulumu**
```bash
cd ../frontend
npm install
cp .env.example .env
# .env dosyasını düzenleyin (VITE_API_URL)
```

6. **Frontend'i başlatın**
```bash
npm run dev
```

### Docker ile Kurulum

1. **Docker Compose ile başlatın**
```bash
docker-compose up -d
```

Bu komut:
- PostgreSQL veritabanını başlatır
- Backend API'yi başlatır (port 5000)
- Frontend'i başlatır (port 3000)

## 🔐 Varsayılan Admin Kullanıcısı

İlk kurulumda varsayılan admin kullanıcısı:
- **Email**: admin@example.com
- **Şifre**: admin123

⚠️ **ÖNEMLİ**: Production ortamında mutlaka şifreyi değiştirin!

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Giriş yap
- `GET /api/auth/me` - Mevcut kullanıcı bilgisi
- `POST /api/auth/register` - Yeni kullanıcı oluştur (admin)
- `GET /api/auth/users` - Tüm kullanıcıları listele (admin)
- `PUT /api/auth/users/:id` - Kullanıcı güncelle (admin)
- `DELETE /api/auth/users/:id` - Kullanıcı sil (admin)

### Apps
- `GET /api/apps` - Tüm uygulamaları listele
- `GET /api/apps/:id` - Uygulama detayı
- `POST /api/apps` - Yeni uygulama oluştur (admin)
- `PUT /api/apps/:id` - Uygulama güncelle (admin)
- `DELETE /api/apps/:id` - Uygulama sil (admin)

### Blog
- `GET /api/blog/posts` - Yayınlanmış blog yazıları
- `GET /api/blog/posts/:slug` - Blog yazısı detayı
- `GET /api/blog` - Tüm blog yazıları (admin)
- `POST /api/blog` - Yeni blog yazısı (admin)
- `PUT /api/blog/:id` - Blog yazısı güncelle (admin)
- `DELETE /api/blog/:id` - Blog yazısı sil (admin)

### Projects
- `GET /api/projects` - Tüm projeleri listele
- `GET /api/projects/:id` - Proje detayı
- `POST /api/projects` - Yeni proje oluştur (admin)
- `PUT /api/projects/:id` - Proje güncelle (admin)
- `DELETE /api/projects/:id` - Proje sil (admin)

### YouTube
- `GET /api/youtube/videos` - YouTube videolarını getir

### Settings
- `GET /api/settings` - Tüm ayarları getir
- `GET /api/settings/:key` - Belirli bir ayarı getir
- `PUT /api/settings/:key` - Ayarı güncelle (admin)
- `POST /api/settings` - Yeni ayar oluştur (admin)

## 🎨 Özelleştirme

### Tema Renkleri
Frontend'deki renkleri `frontend/tailwind.config.js` dosyasından özelleştirebilirsiniz.

### Veritabanı Şeması
Veritabanı şemasını `backend/migrations/` klasöründeki SQL dosyalarından düzenleyebilirsiniz.

## 🔄 Geliştirme

### Yeni Migration Oluşturma
```bash
cd backend
npm run migrate:create migration_name
```

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
```

## 📝 Notlar

- Backend varsayılan olarak `http://localhost:5000` portunda çalışır
- Frontend varsayılan olarak `http://localhost:3000` portunda çalışır
- PostgreSQL varsayılan olarak `localhost:5432` portunda çalışır
- YouTube API entegrasyonu için `YOUTUBE_API_KEY` environment variable'ı gereklidir

## 🚧 Gelecek Özellikler

- [ ] Dosya yükleme sistemi
- [ ] SEO optimizasyonu
- [ ] Çoklu dil desteği
- [ ] Analytics entegrasyonu
- [ ] Email bildirimleri
- [ ] Redis cache desteği
- [ ] Unit ve integration testleri

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add some amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

**Not**: Bu proje sürekli geliştirilmektedir. Yeni özellikler ve iyileştirmeler düzenli olarak eklenecektir.
