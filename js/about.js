/* js/about.js - About Page Specific JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality for About page
    const tabButtons = document.querySelectorAll('.about-tab');
    const sections = document.querySelectorAll('.about-section');
    
    // Function to switch tabs
    function switchTab(tabId) {
        // Remove active class from all tabs and sections
        tabButtons.forEach(btn => btn.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding section
        const activeTab = document.querySelector(`.about-tab[data-tab="${tabId}"]`);
        const activeSection = document.getElementById(tabId);
        
        if (activeTab && activeSection) {
            activeTab.classList.add('active');
            activeSection.classList.add('active');
            
            // Update URL hash without scrolling
            history.pushState(null, null, `#${tabId}`);
        }
    }
    
    // Add click event listeners to tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
            
            // On mobile, close the mobile menu if open
            const nav = document.querySelector('nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });
    
    // Check for hash in URL to open specific tab
    if (window.location.hash) {
        const hash = window.location.hash.substring(1); // Remove # symbol
        if (['overview', 'partnerships', 'personnel', 'career', 'gallery'].includes(hash)) {
            // Wait a bit for page to load, then switch tab
            setTimeout(() => {
                switchTab(hash);
                // Smooth scroll to tabs section
                const tabsSection = document.querySelector('.about-tabs');
                if (tabsSection) {
                    window.scrollTo({
                        top: tabsSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    }
    
    // Smooth scroll for internal links within the page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's the language toggle buttons
            if (this.classList.contains('lang-btn')) return;
            
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // If target is a section within tabs
                    if (['overview', 'partnerships', 'personnel', 'career', 'gallery'].includes(targetId)) {
                        switchTab(targetId);
                        
                        // Scroll to tabs section with offset
                        const tabsSection = document.querySelector('.about-tabs');
                        if (tabsSection) {
                            window.scrollTo({
                                top: tabsSection.offsetTop - 100,
                                behavior: 'smooth'
                            });
                        }
                    } else {
                        // Regular anchor link (like email links in personnel section)
                        if (targetSection.classList.contains('team-card')) {
                            // For team cards, scroll to personnel section first
                            switchTab('personnel');
                            
                            // Wait for tab to switch, then scroll to the specific card
                            setTimeout(() => {
                                targetSection.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'center'
                                });
                            }, 300);
                        } else {
                            targetSection.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                }
            }
        });
    });
    
    // Handle back/forward browser navigation
    window.addEventListener('popstate', function() {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            if (['overview', 'partnerships', 'personnel', 'career', 'gallery'].includes(hash)) {
                switchTab(hash);
            }
        } else {
            // If no hash, go back to overview
            switchTab('overview');
        }
    });
    
    // Initialize language functionality
    initLanguageToggle();
    
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Add hover effects to team cards
    initTeamCardHover();
    
    // Initialize gallery image lazy loading
    initImageLazyLoading();
});

// Language toggle functionality
function initLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('preferred-language') || 'en';
    
    // Function to set language
    function setLanguage(lang) {
        // Update button states
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Update all elements with language data attributes
        document.querySelectorAll('[data-en]').forEach(element => {
            if (element.hasAttribute(`data-${lang}`)) {
                const text = element.getAttribute(`data-${lang}`);
                
                // Handle different types of elements
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else if (element.tagName === 'IMG') {
                    element.alt = text;
                } else {
                    element.textContent = text;
                }
            }
        });
        
        // Save preference
        localStorage.setItem('preferred-language', lang);
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update page title based on language
        updatePageTitle(lang);
    }
    
    // Update page title based on language
    function updatePageTitle(lang) {
        const titleMap = {
            'en': 'About | City Institute of Higher Learning',
            'fr': 'À propos | Institut Supérieur de la Ville',
            'zh': '关于我们 | 城市高等学习学院',
            'es': 'Acerca de | Instituto Superior de la Ciudad'
        };
        
        if (titleMap[lang]) {
            document.title = titleMap[lang];
        }
    }
    
    // Add click event to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
    
    // Set initial language
    setLanguage(currentLang);
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnButton = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnButton && nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Team card hover effects
function initTeamCardHover() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--shadow-hover)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });
}

// Lazy loading for images
function initImageLazyLoading() {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
}

// Helper function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scrolling function
function smoothScrollTo(element, duration = 500) {
    const targetPosition = element.offsetTop - 100;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Update tab container scrolling on mobile
    const tabsContainer = document.querySelector('.tabs-container');
    if (tabsContainer && window.innerWidth < 768) {
        const activeTab = document.querySelector('.about-tab.active');
        if (activeTab) {
            tabsContainer.scrollLeft = activeTab.offsetLeft - 20;
        }
    }
    
    // Close mobile menu on resize to desktop
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (window.innerWidth >= 768 && nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
});

// Initialize on page load
window.addEventListener('load', function() {
    // Add loading animation to page
    document.body.classList.add('loaded');
    
    // Scroll tabs to active tab on mobile
    if (window.innerWidth < 768) {
        const tabsContainer = document.querySelector('.tabs-container');
        const activeTab = document.querySelector('.about-tab.active');
        if (tabsContainer && activeTab) {
            setTimeout(() => {
                tabsContainer.scrollLeft = activeTab.offsetLeft - 20;
            }, 300);
        }
    }
});