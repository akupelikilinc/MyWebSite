// Tab işlevselliği
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Tab değiştirme işlevi
    function switchTab(tabId) {
        // Tüm tab butonlarından active sınıfını kaldır
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Tüm tab panellerini gizle
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Seçilen tab butonunu aktif yap
        const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Seçilen tab panelini göster
        const activePane = document.getElementById(tabId);
        if (activePane) {
            activePane.classList.add('active');
        }
    }

    // Tab butonlarına tıklama olayı ekle
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Smooth scroll için
    const smoothScroll = function(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Sosyal medya linklerine hover efekti
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Kartlara hover animasyonu
    const cards = document.querySelectorAll('.app-card, .video-card, .blog-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Sayfa yüklendiğinde animasyon
    window.addEventListener('load', function() {
        const header = document.querySelector('.header');
        const tabsSection = document.querySelector('.tabs-section');
        
        // Header animasyonu
        setTimeout(() => {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);

        // Tabs section animasyonu
        setTimeout(() => {
            tabsSection.style.opacity = '1';
            tabsSection.style.transform = 'translateY(0)';
        }, 300);
    });

    // Scroll efekti
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.container');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Mobil menü için touch desteği
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const currentTabIndex = Array.from(tabButtons).findIndex(btn => btn.classList.contains('active'));
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Sola kaydırma - sonraki tab
            const nextIndex = (currentTabIndex + 1) % tabButtons.length;
            const nextTabId = tabButtons[nextIndex].getAttribute('data-tab');
            switchTab(nextTabId);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Sağa kaydırma - önceki tab
            const prevIndex = currentTabIndex === 0 ? tabButtons.length - 1 : currentTabIndex - 1;
            const prevTabId = tabButtons[prevIndex].getAttribute('data-tab');
            switchTab(prevTabId);
        }
    }

    // Klavye navigasyonu
    document.addEventListener('keydown', function(e) {
        const currentTabIndex = Array.from(tabButtons).findIndex(btn => btn.classList.contains('active'));
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentTabIndex + 1) % tabButtons.length;
            const nextTabId = tabButtons[nextIndex].getAttribute('data-tab');
            switchTab(nextTabId);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = currentTabIndex === 0 ? tabButtons.length - 1 : currentTabIndex - 1;
            const prevTabId = tabButtons[prevIndex].getAttribute('data-tab');
            switchTab(prevTabId);
        }
    });

    // Lazy loading için Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Kartları gözlemle
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Performans için debounce fonksiyonu
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Scroll olayını optimize et
    const optimizedScroll = debounce(function() {
        // Scroll işlemleri burada
    }, 16);

    window.addEventListener('scroll', optimizedScroll);
});

// Sayfa yüklendiğinde başlangıç animasyonları
document.addEventListener('DOMContentLoaded', function() {
    // CSS animasyonları için başlangıç stilleri
    const header = document.querySelector('.header');
    const tabsSection = document.querySelector('.tabs-section');
    
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    
    if (tabsSection) {
        tabsSection.style.opacity = '0';
        tabsSection.style.transform = 'translateY(20px)';
        tabsSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
}); 

// YouTube API ile videoları çek ve göster
const YOUTUBE_API_KEY = 'AIzaSyDnq-5Gr4CRtyPPTvAVSqKoZ_676Ttku8Q';
const CHANNEL_ID = 'UCakupelikilinc'; // Doğrudan channel ID kullanıyoruz
const MAX_RESULTS = 6;

// Test için farklı channel ID'ler deneyelim
const TEST_CHANNEL_IDS = [
    'UCakupelikilinc',
    'UCakupelikilinc123',
    'UCakupelikilinc_',
    'UCakupelikilinc1'
];

function fetchYouTubeVideos() {
    console.log('YouTube API çağrısı başlatılıyor...');
    
    // CORS sorunu için proxy kullanıyoruz
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=akupelikilinc&type=channel&key=${YOUTUBE_API_KEY}`;
    
    // Önce kullanıcı adı ile kanal arayalım
    fetch(proxyUrl + apiUrl, {
        method: 'GET',
        headers: {
            'Origin': window.location.origin,
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
        .then(res => {
            console.log('Kanal arama yanıtı:', res);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log('Kanal arama verisi:', data);
            
            if (data.items && data.items.length > 0) {
                // Kanal bulundu, videolarını çek
                const channelId = data.items[0].id.channelId;
                console.log('Kanal ID bulundu:', channelId);
                const videoApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`;
                return fetch(proxyUrl + videoApiUrl, {
                    method: 'GET',
                    headers: {
                        'Origin': window.location.origin,
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
            } else {
                // Kanal bulunamadı, test channel ID'lerini dene
                console.log('Kanal bulunamadı, test ID\'leri deneniyor...');
                return testChannelIds();
            }
        })
        .then(res => {
            if (res && res.json) {
                return res.json();
            } else {
                return res; // testChannelIds'den gelen sonuç
            }
        })
        .then(data => {
            console.log('Video verisi:', data);
            displayVideos(data);
        })
        .catch(error => {
            console.error('YouTube API hatası:', error);
            const youtubeGrid = document.querySelector('.youtube-grid');
            if (youtubeGrid) {
                youtubeGrid.innerHTML = `<p style="text-align: center; color: #c0c0c0; grid-column: 1/-1;">Video yüklenirken hata oluştu: ${error.message}. CORS sorunu olabilir.</p>`;
            }
        });
}

function testChannelIds() {
    console.log('Test channel ID\'leri deneniyor...');
    
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    
    const promises = TEST_CHANNEL_IDS.map(channelId => {
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1`;
        return fetch(proxyUrl + apiUrl, {
            method: 'GET',
            headers: {
                'Origin': window.location.origin,
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(res => res.json())
            .then(data => ({ channelId, data }))
            .catch(error => ({ channelId, error: error.message }));
    });
    
    return Promise.all(promises).then(results => {
        console.log('Test sonuçları:', results);
        
        // Çalışan bir channel ID bul
        const workingResult = results.find(result => 
            result.data && result.data.items && result.data.items.length > 0
        );
        
        if (workingResult) {
            console.log('Çalışan channel ID bulundu:', workingResult.channelId);
            const videoApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${workingResult.channelId}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`;
            return fetch(proxyUrl + videoApiUrl, {
                method: 'GET',
                headers: {
                    'Origin': window.location.origin,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
        } else {
            throw new Error('Hiçbir channel ID çalışmıyor');
        }
    });
}

function displayVideos(data) {
    const youtubeGrid = document.querySelector('.youtube-grid');
    if (!youtubeGrid) {
        console.log('YouTube grid bulunamadı');
        return;
    }
    
    youtubeGrid.innerHTML = '';
    
    if (data.items && data.items.length > 0) {
        data.items.forEach(item => {
            if (item.id.kind === 'youtube#video') {
                const videoId = item.id.videoId;
                const snippet = item.snippet;
                const videoCard = document.createElement('div');
                videoCard.className = 'video-card';
                videoCard.innerHTML = `
                    <div class="video-thumbnail">
                        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" alt="${snippet.title}">
                            <div class="play-button"><i class="fas fa-play"></i></div>
                        </a>
                    </div>
                    <div class="video-info">
                        <h3>${snippet.title}</h3>
                        <p>${snippet.description.substring(0, 80)}...</p>
                        <span class="video-date">${new Date(snippet.publishedAt).toLocaleDateString('tr-TR')}</span>
                    </div>
                `;
                youtubeGrid.appendChild(videoCard);
                console.log('Video kartı eklendi:', snippet.title);
            }
        });
    } else {
        console.log('Video bulunamadı, statik veriler gösteriliyor');
        displayStaticVideos();
    }
}

function displayStaticVideos() {
    const youtubeGrid = document.querySelector('.youtube-grid');
    if (!youtubeGrid) return;
    
    const staticVideos = [
        {
            id: 'dQw4w9WgXcQ',
            title: 'Web Geliştirme İpuçları',
            description: 'Modern web geliştirme teknikleri ve best practices hakkında detaylı bilgiler.',
            date: '1 hafta önce'
        },
        {
            id: 'jNQXAC9IVRw',
            title: 'Mobil Uygulama Geliştirme',
            description: 'React Native ile mobil uygulama geliştirme süreçleri ve püf noktaları.',
            date: '2 hafta önce'
        },
        {
            id: 'kJQP7kiw5Fk',
            title: 'UI/UX Tasarım Prensipleri',
            description: 'Kullanıcı deneyimini artıran tasarım prensipleri ve uygulamaları.',
            date: '3 hafta önce'
        }
    ];
    
    staticVideos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <div class="video-thumbnail">
                <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg" alt="${video.title}">
                    <div class="play-button"><i class="fas fa-play"></i></div>
                </a>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
                <span class="video-date">${video.date}</span>
            </div>
        `;
        youtubeGrid.appendChild(videoCard);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM yüklendi, YouTube videoları çekiliyor...');
    fetchYouTubeVideos();
}); 