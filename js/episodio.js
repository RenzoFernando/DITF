/**
 * DITF Analysis Project - episodio.js v2.2
 * Author: Renzo Fernando Mosquera Daza & Gemini
 * Description: Script for episode pages, handling parallax and scroll animations.
 */
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Creates a subtle parallax effect on the hero banner for a more immersive feel.
     * Uses requestAnimationFrame for smoother performance.
     */
    const setupParallax = () => {
        const heroBackground = document.querySelector('.episode-hero-background');
        const heroContent = document.querySelector('.episode-hero-content');

        if (!heroBackground || !heroContent) return;

        let ticking = false;

        const updateParallax = () => {
            const scrollValue = window.scrollY;
            // The scale(1.1) is added to prevent blank spaces from appearing at the edges during transform
            heroBackground.style.transform = `translateY(${scrollValue * 0.3}px) scale(1.1)`;
            heroContent.style.transform = `translateY(${scrollValue * 0.15}px)`;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    };

    /**
     * Sets up Intersection Observer for scroll-triggered animations on article sections.
     */
    const setupScrollAnimations = () => {
        const animatedElements = document.querySelectorAll('.content-section');
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2, // A bit of the element needs to be visible
            rootMargin: '0px 0px -50px 0px' // Start animation a bit before it's fully in view
        });

        // Add reveal class to all sections for the CSS to target
        animatedElements.forEach(el => {
            el.classList.add('reveal-on-scroll');
            observer.observe(el);
        });

        // Inject animation styles dynamically to keep CSS files cleaner and more modular.
        const style = document.createElement('style');
        style.innerHTML = `
            .reveal-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
            }
            .reveal-on-scroll.is-visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    };

    /**
     * Manages the header's appearance on scroll.
     */
    const setupHeaderScroll = () => {
        const header = document.querySelector('.page-header');
        if (!header) return;

        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            header.classList.toggle('scrolled', currentScrollY > 50);

            // Hide on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    };


    // --- Initializations ---
    setupParallax();
    setupScrollAnimations();
    setupHeaderScroll();
});
