document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = hamburger.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Sticky Header Effect
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Carousel Functionality for Renewable Energy Page
    const gallery = document.querySelector('.project-gallery');
    if (gallery) {
        const items = gallery.querySelectorAll('.gallery-item');
        // Start with the middle item (index 1)
        let currentIndex = 1; 
        let intervalId;

        function updateCarousel() {
            items.forEach((item, index) => {
                item.classList.remove('active', 'prev', 'next', 'large');
                
                if (index === currentIndex) {
                    item.classList.add('active');
                } else if (index === (currentIndex - 1 + items.length) % items.length) {
                    item.classList.add('prev');
                } else if (index === (currentIndex + 1) % items.length) {
                    item.classList.add('next');
                }
            });
        }

        // Add click event to items
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                // Reset timer on manual interaction
                resetTimer();
            });
        });

        function startTimer() {
            intervalId = setInterval(() => {
                currentIndex = (currentIndex + 1) % items.length;
                updateCarousel();
            }, 4000);
        }

        function resetTimer() {
            clearInterval(intervalId);
            startTimer();
        }

        // Start auto-rotation
        startTimer();

        // Pause on hover
        gallery.addEventListener('mouseenter', () => clearInterval(intervalId));
        gallery.addEventListener('mouseleave', () => startTimer());

        // Initialize
        updateCarousel();
    }
});