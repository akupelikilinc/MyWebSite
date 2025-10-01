# Kişisel Web Sitesi

Modern teknolojiler kullanılarak geliştirilmiş kişisel bir web sitesi ve blog platformu.

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
## 🚀 Özellikler

- **Modern Tasarım**: Glassmorphism ve gradient efektleri ile modern görünüm
- **Responsive**: Tüm cihazlarda mükemmel görünüm
- **Sekme Sistemi**: Organize edilmiş içerik kategorileri
- **Animasyonlar**: Smooth geçişler ve hover efektleri
- **Mobil Uyumlu**: Touch gesture desteği
- **Erişilebilirlik**: Klavye navigasyonu desteği

## 📱 İçerik Bölümleri

### 1. Profil Bölümü
- Profil fotoğrafı
- Kişisel bilgiler
- Sosyal medya linkleri

### 2. Mobil Uygulamalar
- Uygulama kartları
- Store linkleri
- Teknoloji bilgileri

### 3. YouTube Paylaşımları
- Video thumbnail'ları
- Video açıklamaları
- Yayın tarihleri

### 4. Blog Yazıları
- Blog kartları
- Kategori etiketleri
- Okuma linkleri

### 5. Projeler
- Proje kartları
- Teknoloji etiketleri
- Demo ve GitHub linkleri

## 🛠️ Teknolojiler

- **HTML5**: Semantic markup
- **CSS3**: Modern styling ve animasyonlar
- **JavaScript**: Etkileşimli özellikler
- **Font Awesome**: İkonlar
- **Google Fonts**: Inter font ailesi

## 📁 Dosya Yapısı

```
MyWebsite/
├── index.html          # Ana HTML dosyası
├── style.css           # CSS stilleri
├── script.js           # JavaScript işlevleri
└── README.md           # Proje dokümantasyonu
```

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Ana Renk**: #6366f1 (Indigo)
- **İkincil Renk**: #10b981 (Emerald)
- **Arka Plan**: Gradient (Purple to Blue)
- **Metin**: #1f2937 (Dark Gray)

### Tipografi
- **Font**: Inter (Google Fonts)
- **Başlıklar**: 700 weight
- **Alt başlıklar**: 600 weight
- **Normal metin**: 400 weight

## 📱 Responsive Breakpoint'ler

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: < 480px

## 🚀 Kurulum

1. Dosyaları bilgisayarınıza indirin
2. `index.html` dosyasını bir web tarayıcısında açın
3. Veya bir local server kullanın (Live Server gibi)

## ✨ Özelleştirme

### Profil Bilgilerini Değiştirme
`index.html` dosyasında şu bölümleri güncelleyin:

```html
<h1 class="name">Adınız Soyadınız</h1>
<p class="title">Yazılım Geliştirici & İçerik Üreticisi</p>
<p class="description">Kişisel açıklamanız...</p>
```

### Profil Fotoğrafı Ekleme
1. Fotoğrafınızı proje klasörüne ekleyin
2. `index.html` dosyasında img src'yi güncelleyin:

```html
<img src="profil-fotografiniz.jpg" alt="Profil Fotoğrafı">
```

### Sosyal Medya Linkleri
`index.html` dosyasında sosyal medya linklerini güncelleyin:

```html
<a href="https://github.com/kullaniciadi" class="social-link">
    <i class="fab fa-github"></i>
</a>
```

### İçerik Ekleme
Her sekme için yeni kartlar ekleyebilirsiniz. Mevcut kartları kopyalayıp içeriklerini değiştirin.

## 🎯 Gelecek Özellikler

- [ ] Dark mode desteği
- [ ] Blog yazıları için ayrı sayfalar
- [ ] İletişim formu
- [ ] Portfolio galerisi
- [ ] SEO optimizasyonu
- [ ] PWA desteği

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📞 İletişim

Herhangi bir sorunuz veya öneriniz varsa, lütfen issue açın.

---

**Not**: Bu template'i kişisel kullanımınız için özelleştirebilirsiniz. Tüm içerikler örnek amaçlıdır ve gerçek projelerinizle değiştirilmelidir. 
>>>>>>> da102937088b4bacbfd4142ea0ad66781c9871e3
