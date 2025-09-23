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

// YouTube API ile videoları çek ve göster (CORS proxy olmadan)
const YOUTUBE_API_KEY = 'AIzaSyDnq-5Gr4CRtyPPTvAVSqKoZ_676Ttku8Q';
const CHANNEL_HANDLE = '@akupelikilinc';
const MAX_RESULTS = 6;

async function fetchYouTubeVideos() {
    const grid = document.getElementById('youtubeGrid');
    const loading = document.getElementById('youtubeLoading');
    const errorBox = document.getElementById('youtubeError');
    try {
        // Serverless proxy (ör: Vercel) üzerinden çağır
        const resp = await fetch(`/api/youtube?handle=${encodeURIComponent(CHANNEL_HANDLE)}&max=${MAX_RESULTS}`);
        if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
        const data = await resp.json();
        displayVideos(data);
    } catch (err) {
        console.error('YouTube hata:', err);
        if (loading) loading.style.display = 'none';
        if (errorBox) errorBox.style.display = 'block';
        displayStaticVideos();
    } finally {
        if (loading) loading.style.display = 'none';
    }
}

function displayVideos(data) {
    const youtubeGrid = document.getElementById('youtubeGrid');
    if (!youtubeGrid) return;
    youtubeGrid.innerHTML = '';

    if (data.items && data.items.length > 0) {
        data.items.forEach(item => {
            if (item.id && (item.id.kind === 'youtube#video' || item.id.videoId)) {
                const videoId = item.id.videoId || (item.id.kind === 'youtube#video' ? item.id.videoId : null);
                const snippet = item.snippet;
                if (!videoId || !snippet) return;
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
                        <p>${(snippet.description || '').substring(0, 100)}...</p>
                        <span class="video-date">${snippet.publishedAt ? new Date(snippet.publishedAt).toLocaleDateString('tr-TR') : ''}</span>
                    </div>
                `;
                youtubeGrid.appendChild(videoCard);
            }
        });
    }
    if (!youtubeGrid.children.length) {
        displayStaticVideos();
    }
}

function displayStaticVideos() {
    const youtubeGrid = document.getElementById('youtubeGrid');
    if (!youtubeGrid) return;
    if (youtubeGrid.children.length) return;

    const staticVideos = [
        { id: 'dQw4w9WgXcQ', title: 'Web Geliştirme İpuçları', description: 'Modern web geliştirme teknikleri ve pratik ipuçları.', date: '1 hafta önce' },
        { id: 'jNQXAC9IVRw', title: 'Mobil Uygulama Geliştirme', description: 'React Native ile geliştirme süreci.', date: '2 hafta önce' },
        { id: 'kJQP7kiw5Fk', title: 'UI/UX Tasarım Prensipleri', description: 'Kullanıcı odaklı tasarım prensipleri.', date: '3 hafta önce' }
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
    fetchYouTubeVideos();
});