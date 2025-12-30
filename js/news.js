// News Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Filter Functionality
    const filterButtons = document.querySelectorAll('.news-filter');
    const newsCards = document.querySelectorAll('.news-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter news cards
            newsCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'flex';
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                }
                
                // Add animation
                card.style.animation = 'fadeIn 0.5s ease forwards';
            });
        });
    });
    
    // Load More Button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentItems = 9; // Initial number of visible items
    
    // Initially hide extra items
    const allNewsCards = document.querySelectorAll('.news-card');
    for (let i = currentItems; i < allNewsCards.length; i++) {
        allNewsCards[i].style.display = 'none';
    }
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Show next set of items
            for (let i = currentItems; i < currentItems + 3 && i < allNewsCards.length; i++) {
                allNewsCards[i].style.display = 'flex';
                allNewsCards[i].style.animation = 'fadeIn 0.5s ease forwards';
            }
            
            currentItems += 3;
            
            // Hide button if all items are visible
            if (currentItems >= allNewsCards.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to your server
            console.log('Subscribing email:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
    
    // Add hover effect to news cards
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize mobile menu (reusing from main script)
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
});