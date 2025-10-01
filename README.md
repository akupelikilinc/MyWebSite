# Kişisel Web Sitesi Projesi

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş kişisel bir web sitesi ve blog platformudur.

## Teknolojiler

### Backend
- ASP.NET Core
- Entity Framework Core
- SQL Server
- Clean Architecture

### Frontend
- Blazor WebAssembly
- Tailwind CSS

## Proje Yapısı

```
MyWebSite/
├── src/
│   ├── admin/                 # Admin panel uygulaması
│   │   ├── MyWebSite.Admin.API/
│   │   ├── MyWebSite.Admin.Application/
│   │   ├── MyWebSite.Admin.Core/
│   │   ├── MyWebSite.Admin.Infrastructure/
│   │   └── MyWebSite.Admin.Web/
│   ├── frontend/             # Frontend uygulaması
│   └── shared/              # Paylaşılan kod ve modeller
├── tests/                   # Test projeleri
│   ├── integration/
│   └── unit/
└── docs/                    # Dokümantasyon
```

## Başlangıç

### Gereksinimler
- .NET SDK 9.0 veya üzeri
- SQL Server
- Node.js ve npm

### Kurulum

1. Repoyu klonlayın:
```bash
git clone https://github.com/akupelikilinc/MyWebSite.git
```

2. Backend bağımlılıklarını yükleyin:
```bash
cd src/admin/MyWebSite.Admin.API
dotnet restore
```

3. Veritabanını oluşturun:
```bash
dotnet ef database update
```

4. API'yi çalıştırın:
```bash
dotnet run
```

5. Web uygulamasını çalıştırın:
```bash
cd ../MyWebSite.Admin.Web
dotnet run
```

## Özellikler

- Blog yazıları yönetimi
- Proje portföyü
- YouTube video entegrasyonu
- Yönetim paneli
- SEO optimizasyonu

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.