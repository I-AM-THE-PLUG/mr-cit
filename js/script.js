// Banner Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Banner Slider
    const bannerSlides = document.querySelectorAll('.banner-slide');
    const bannerDots = document.querySelectorAll('.dot');
    const bannerPrevBtn = document.querySelector('.banner-prev');
    const bannerNextBtn = document.querySelector('.banner-next');
    let currentBannerSlide = 0;
    let bannerInterval;

    // Function to show a specific banner slide
    function showBannerSlide(n) {
        // Hide all slides
        bannerSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        bannerDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Calculate current slide index
        currentBannerSlide = (n + bannerSlides.length) % bannerSlides.length;
        
        // Show current slide and activate corresponding dot
        bannerSlides[currentBannerSlide].classList.add('active');
        bannerDots[currentBannerSlide].classList.add('active');
    }

    // Next banner slide function
    function nextBannerSlide() {
        showBannerSlide(currentBannerSlide + 1);
    }

    // Previous banner slide function
    function prevBannerSlide() {
        showBannerSlide(currentBannerSlide - 1);
    }

    // Start auto-sliding
    function startBannerAutoSlide() {
        bannerInterval = setInterval(nextBannerSlide, 5000);
    }

    // Stop auto-sliding
    function stopBannerAutoSlide() {
        clearInterval(bannerInterval);
    }

    // Event listeners for dots
    bannerDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopBannerAutoSlide();
            showBannerSlide(index);
            startBannerAutoSlide();
        });
    });

    // Event listeners for arrows
    if (bannerPrevBtn) {
        bannerPrevBtn.addEventListener('click', () => {
            stopBannerAutoSlide();
            prevBannerSlide();
            startBannerAutoSlide();
        });
    }

    if (bannerNextBtn) {
        bannerNextBtn.addEventListener('click', () => {
            stopBannerAutoSlide();
            nextBannerSlide();
            startBannerAutoSlide();
        });
    }

    // Pause auto-slide on hover
    const banner = document.querySelector('.hero-banner');
    if (banner) {
        banner.addEventListener('mouseenter', stopBannerAutoSlide);
        banner.addEventListener('mouseleave', startBannerAutoSlide);
    }

    // Initialize banner
    if (bannerSlides.length > 0) {
        showBannerSlide(0);
        startBannerAutoSlide();
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Change icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // ===== LANGUAGE TOGGLE FUNCTIONALITY - FIXED =====
    const langButtons = document.querySelectorAll('.lang-btn-float');
    const floatingToggle = document.querySelector('.floating-language-toggle');
    
    // Function to set active language
    function setActiveLanguage(lang) {
        console.log('Setting language to:', lang);
        
        // Update ALL language button states
        langButtons.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update ALL content with language data attributes
        updateAllContent(lang);
        
        // Update document language attribute for accessibility
        document.documentElement.lang = lang;
        
        // Store language preference
        localStorage.setItem('preferredLanguage', lang);
    }
    
    // Function to update all content
    function updateAllContent(lang) {
        console.log('Updating content for language:', lang);
        
        // Update page title based on language
        const titles = {
            en: 'City Institute of Higher Learning',
            fr: 'Institut Supérieur de la Ville',
            zh: '城市高等学习学院',
            es: 'Instituto Superior de la Ciudad'
        };
        
        if (titles[lang]) {
            // Get current page name
            const currentPage = document.title.includes('|') 
                ? document.title.substring(document.title.indexOf('|')) 
                : '';
            document.title = titles[lang] + currentPage;
        }
        
        // Update floating toggle tooltip
        const tooltips = {
            en: 'Language',
            fr: 'Langue',
            zh: '语言',
            es: 'Idioma'
        };
        
        if (floatingToggle && tooltips[lang]) {
            floatingToggle.setAttribute('data-label', lang);
        }
        
        // Update ALL elements with data-language attributes
        document.querySelectorAll('[data-en], [data-fr], [data-zh], [data-es]').forEach(element => {
            const text = element.dataset[lang];
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else if (element.tagName === 'IMG') {
                    element.alt = text;
                } else {
                    element.textContent = text;
                }
            }
        });
        
        // Update meta tags for SEO
        updateMetaTags(lang);
    }
    
    // Function to update meta tags
    function updateMetaTags(lang) {
        // Update language meta tag
        let langMeta = document.querySelector('meta[name="language"]');
        if (!langMeta) {
            langMeta = document.createElement('meta');
            langMeta.name = 'language';
            document.head.appendChild(langMeta);
        }
        langMeta.content = lang;
        
        // Update OG locale
        let ogLocale = document.querySelector('meta[property="og:locale"]');
        if (!ogLocale) {
            ogLocale = document.createElement('meta');
            ogLocale.setAttribute('property', 'og:locale');
            document.head.appendChild(ogLocale);
        }
        // Map language codes to locale codes
        const localeMap = {
            en: 'en_US',
            fr: 'fr_FR',
            zh: 'zh_CN',
            es: 'es_ES'
        };
        ogLocale.content = localeMap[lang] || lang;
    }
    
    // Add click events to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            console.log('Language button clicked:', lang);
            if (lang) {
                setActiveLanguage(lang);
            }
        });
    });
    
    // Load saved language preference
    function loadSavedLanguage() {
        // Check URL parameter first (e.g., ?lang=fr)
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        
        // Check localStorage
        const savedLang = localStorage.getItem('preferredLanguage');
        
        // Check browser language
        const browserLang = navigator.language.substring(0, 2);
        
        // Define supported languages
        const supportedLangs = ['en', 'fr', 'zh', 'es'];
        
        // Priority: URL > Saved > Browser > Default (en)
        let lang = 'en';
        
        if (urlLang && supportedLangs.includes(urlLang)) {
            lang = urlLang;
        } else if (savedLang && supportedLangs.includes(savedLang)) {
            lang = savedLang;
        } else if (browserLang && supportedLangs.includes(browserLang)) {
            lang = browserLang;
        }
        
        console.log('Loading language:', lang);
        setActiveLanguage(lang);
    }
    
    // Initialize language on page load
    loadSavedLanguage();
    
    // Also initialize on page show (for browser back/forward)
    window.addEventListener('pageshow', loadSavedLanguage);
    
    // ===== SLIDER FUNCTIONALITY =====
    const sliderTrack = document.querySelector('.slider-track');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    if (sliderTrack && slides.length > 0) {
        // Set initial position
        updateSliderPosition();
        
        // Next slide function
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSliderPosition();
        }
        
        // Previous slide function
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSliderPosition();
        }
        
        // Update slider position
        function updateSliderPosition() {
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        // Add event listeners for slider controls
        if (sliderPrev) {
            sliderPrev.addEventListener('click', prevSlide);
        }
        
        if (sliderNext) {
            sliderNext.addEventListener('click', nextSlide);
        }
        
        // Auto-slide for featured programmes slider
        let sliderInterval = setInterval(nextSlide, 7000);
        
        // Pause auto-slide on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(sliderInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                sliderInterval = setInterval(nextSlide, 7000);
            });
        }
    }

    // Image loading optimization
    function optimizeImageLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading="lazy" for better performance
            if (!img.loading) {
                img.loading = 'lazy';
            }
            
            // Add error handling
            img.onerror = function() {
                console.warn('Image failed to load:', this.src);
                this.style.backgroundColor = '#f0f0f0';
                this.style.padding = '20px';
                this.style.textAlign = 'center';
                
                // Create fallback text
                const fallbackText = document.createElement('div');
                fallbackText.textContent = 'Image: ' + this.alt;
                fallbackText.style.color = '#666';
                fallbackText.style.fontSize = '14px';
                fallbackText.style.padding = '10px';
                
                this.parentNode.insertBefore(fallbackText, this.nextSibling);
            };
        });
    }

    // Run image optimization
    optimizeImageLoading();
    
    // Preload banner images for smoother transitions
    function preloadBannerImages() {
        const bannerImages = [
            'images/welcome.jpg',
            'images/explore.jpg', 
            'images/research.jpg',
            'images/community.jpg',
            'images/community2.jpg'
        ];
        
        bannerImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Preload images after page loads
    window.addEventListener('load', preloadBannerImages);
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (email && email.includes('@')) {
                alert('Thank you for subscribing!');
                this.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});