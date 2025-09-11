 // Mobile menu functionality
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMenu = document.getElementById('close-menu');
        
        if (hamburgerMenu && mobileMenu && closeMenu) {
        hamburgerMenu.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            hamburgerMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        }
        
        // Dark mode toggle
        const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                document.querySelectorAll('.toggle-button').forEach(btn => {
                    btn.classList.toggle('dark');
                });
            });
        });
        
        // Service card animation on scroll
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        function handleScroll() {
            const serviceCards = document.querySelectorAll('.service-card');
            
            serviceCards.forEach(card => {
                if (isInViewport(card)) {
                    card.classList.add('visible');
                }
            });
        }
        
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('DOMContentLoaded', handleScroll);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                if (hamburgerMenu) hamburgerMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });