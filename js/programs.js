// Main JavaScript for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            
            if (navLinks.classList.contains('show')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
                document.body.style.overflow = 'hidden';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('show');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        });
    }
    
    // Language Toggle (if not already handled in programs.js)
    const langButtons = document.querySelectorAll('.lang-btn');
    if (langButtons.length > 0 && !document.querySelector('.lang-btn-float')) {
        // Only run if floating toggle doesn't exist (for other pages)
        langButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const lang = this.dataset.lang;
                langButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Update language
                updatePageLanguage(lang);
                localStorage.setItem('preferredLang', lang);
            });
        });
        
        // Initialize language
        const currentLang = localStorage.getItem('preferredLang') || 'en';
        updatePageLanguage(currentLang);
    }
    
    function updatePageLanguage(lang) {
        document.querySelectorAll('[data-en]').forEach(element => {
            if (element.dataset[lang]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = element.dataset[lang];
                } else if (element.tagName === 'IMG') {
                    element.alt = element.dataset[lang];
                } else {
                    element.textContent = element.dataset[lang];
                }
            }
        });
    }
    
    // Dropdown menu functionality
    const dropdownParents = document.querySelectorAll('.dropdown-parent');
    dropdownParents.forEach(parent => {
        parent.addEventListener('mouseenter', function() {
            const dropdown = this.querySelector('.dropdown');
            if (dropdown) {
                dropdown.style.display = 'block';
            }
        });
        
        parent.addEventListener('mouseleave', function() {
            const dropdown = this.querySelector('.dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
            }
        });
        
        // Mobile dropdown toggle
        const dropdownLink = parent.querySelector('a');
        if (dropdownLink && window.innerWidth <= 768) {
            dropdownLink.addEventListener('click', function(e) {
                const dropdown = parent.querySelector('.dropdown');
                if (dropdown) {
                    e.preventDefault();
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
            });
        }
    });
});