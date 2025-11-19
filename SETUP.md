# Kurulum Rehberi

Bu rehber, MyWebSite projesini yerel ortamınızda çalıştırmak için gerekli adımları içerir.

## Hızlı Başlangıç (Docker ile)

### 1. Gereksinimler
- Docker Desktop
- Docker Compose

### 2. Kurulum
```bash
# Projeyi klonlayın
git clone <repository-url>
cd MyWebSite

# Environment dosyalarını oluşturun
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# .env dosyalarını düzenleyin (gerekirse)

# Docker Compose ile başlatın
docker-compose up -d
```

### 3. Erişim
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- PostgreSQL: localhost:5432

## Manuel Kurulum

### 1. Gereksinimler
- Node.js 20+
- PostgreSQL 15+
- npm veya yarn

### 2. Veritabanı Kurulumu

```bash
# PostgreSQL'de veritabanı oluşturun
createdb mywebsite

# Migration'ı çalıştırın
psql -U postgres -d mywebsite -f backend/migrations/001_initial_schema.sql
```

### 3. Backend Kurulumu

```bash
cd backend

# Bağımlılıkları yükleyin
npm install

# Environment dosyasını oluşturun
cp .env.example .env

# .env dosyasını düzenleyin
# Özellikle şunları kontrol edin:
# - DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
# - JWT_SECRET (güvenli bir değer kullanın)
# - YOUTUBE_API_KEY (opsiyonel)

# Backend'i başlatın
npm run dev
```

Backend şu adreste çalışacak: http://localhost:5000

### 4. Frontend Kurulumu

```bash
cd frontend

# Bağımlılıkları yükleyin
npm install

# Environment dosyasını oluşturun
cp .env.example .env

# .env dosyasını düzenleyin
# VITE_API_URL=http://localhost:5000/api

# Frontend'i başlatın
npm run dev
```

Frontend şu adreste çalışacak: http://localhost:3000

## İlk Giriş

Varsayılan admin kullanıcısı:
- **Email**: admin@example.com
- **Şifre**: admin123

⚠️ **ÖNEMLİ**: Production ortamında mutlaka şifreyi değiştirin!

## Sorun Giderme

### Veritabanı Bağlantı Hatası
- PostgreSQL servisinin çalıştığından emin olun
- `.env` dosyasındaki veritabanı bilgilerini kontrol edin
- Veritabanının oluşturulduğundan emin olun

### Port Kullanımda Hatası
- Port 3000, 5000 veya 5432 kullanımda ise, `.env` dosyalarında farklı portlar belirleyin

### CORS Hatası
- Backend'deki CORS ayarlarını kontrol edin
- Frontend'in doğru API URL'ini kullandığından emin olun

## Production Deployment

### Environment Variables

**Backend (.env)**
```env
NODE_ENV=production
PORT=5000
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=mywebsite
DB_USER=your-db-user
DB_PASSWORD=your-secure-password
JWT_SECRET=your-super-secret-jwt-key
YOUTUBE_API_KEY=your-youtube-api-key
```

**Frontend (.env)**
```env
VITE_API_URL=https://your-api-domain.com/api
```

### Build

```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

### Docker Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Yardım

Sorun yaşıyorsanız:
1. README.md dosyasını kontrol edin
2. GitHub Issues'da arama yapın
3. Yeni bir issue oluşturun

