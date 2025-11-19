-- Insert default apps
INSERT INTO apps (name, description, icon, play_store_url, app_store_url, is_active)
VALUES 
  (
    'Memory Match : Brain Training',
    'Beyin egzersizi ve hafıza geliştirme oyunu. Hafızanızı test edin ve geliştirin.',
    'brain',
    'https://play.google.com/store/apps/details?id=com.ahmetkupelikilinc.memorygame',
    NULL,
    true
  ),
  (
    'Sleep Sounds for Babies',
    'Bebekler için rahatlatıcı uyku sesleri. Bebeğinizin huzurlu uyuması için özel tasarlandı.',
    'baby',
    'https://play.google.com/store/apps/details?id=com.ahmetkupelikilinc.babysleeper',
    NULL,
    true
  )
ON CONFLICT DO NOTHING;

-- Insert default blog posts
INSERT INTO blog_posts (title, excerpt, content, image_url, category, slug, is_published, published_at)
VALUES 
  (
    'Modern Web Geliştirme Trendleri 2024',
    'Bu yılın en popüler web geliştirme teknolojileri ve yaklaşımları hakkında detaylı bir analiz.',
    'Web geliştirme dünyası sürekli olarak değişiyor ve gelişiyor. 2024 yılında öne çıkan teknolojiler ve trendler hakkında detaylı bilgiler...',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    'Web Geliştirme',
    'modern-web-gelistirme-trendleri-2024',
    true,
    '2024-03-15'
  ),
  (
    'Mobil Uygulama Performans Optimizasyonu',
    'Mobil uygulamalarınızın performansını artırmak için uygulayabileceğiniz teknikler.',
    'Mobil uygulama performansı, kullanıcı deneyimini doğrudan etkileyen kritik bir faktördür. Bu yazıda performans optimizasyonu için kullanabileceğiniz teknikleri ele alıyoruz...',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
    'Mobil Geliştirme',
    'mobil-uygulama-performans-optimizasyonu',
    true,
    '2024-03-10'
  ),
  (
    'AI ve Makine Öğrenmesi Geleceği',
    'Yapay zeka teknolojilerinin yazılım geliştirme süreçlerine etkileri.',
    'Yapay zeka ve makine öğrenmesi teknolojileri, yazılım geliştirme süreçlerini köklü bir şekilde değiştiriyor. Bu teknolojilerin gelecekteki rolü ve etkileri hakkında...',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    'AI/ML',
    'ai-ve-makine-ogrenmesi-gelecegi',
    true,
    '2024-03-05'
  )
ON CONFLICT (slug) DO NOTHING;

-- Insert default projects
INSERT INTO projects (name, description, icon, technologies, website_url, github_url, is_active)
VALUES 
  (
    'Sayar İnşaat',
    'Profesyonel inşaat şirketi web sitesi. Modern tasarım ve SEO optimizasyonu ile geliştirildi.',
    'building',
    ARRAY['HTML/CSS', 'JavaScript', 'WordPress'],
    'https://sayarinsaat.com.tr/',
    NULL,
    true
  ),
  (
    'Özyılmaz Taşımacılık',
    'Lojistik ve taşımacılık şirketi web sitesi. Responsive tasarım ve hızlı yükleme süreleri.',
    'truck',
    ARRAY['HTML/CSS', 'JavaScript', 'WordPress'],
    'https://ozyilmaztasimacilik.com/',
    NULL,
    true
  ),
  (
    'Yerli Oto Makas',
    'Otomotiv servis şirketi web sitesi. Kullanıcı dostu arayüz ve online randevu sistemi.',
    'wrench',
    ARRAY['HTML/CSS', 'JavaScript', 'WordPress'],
    'https://yerliotomakas.com/',
    NULL,
    true
  ),
  (
    'Miezden Uca',
    'Romanya''da faaliyet gösteren e-ticaret platformu. Güvenli ödeme sistemleri ve çok dilli destek.',
    'shopping',
    ARRAY['WooCommerce', 'PHP', 'MySQL'],
    'https://miezdenuca.ro',
    NULL,
    true
  ),
  (
    'Ayan Market',
    'İtalya''da faaliyet gösteren online market. Geniş ürün yelpazesi ve hızlı teslimat.',
    'store',
    ARRAY['WooCommerce', 'PHP', 'MySQL'],
    'https://ayanmarket.it',
    NULL,
    true
  ),
  (
    'Dashboard Uygulaması',
    'Veri görselleştirme ve analiz dashboard''u. Vue.js ve D3.js ile geliştirildi.',
    'chart',
    ARRAY['Vue.js', 'D3.js', 'Firebase'],
    NULL,
    NULL,
    true
  )
ON CONFLICT DO NOTHING;

