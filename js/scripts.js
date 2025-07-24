/**
 * DITF Analysis Project - scripts.js v2.2
 * Author: Renzo Fernando Mosquera Daza & Gemini
 * Description: Main script for the index page, handling dynamic content and interactions.
 */
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Generates the list of episode cards dynamically.
     */
    const generateEpisodeList = () => {
        const episodes = [
            { num: 1, title: 'Sola y solitario' }, { num: 2, title: 'Lo que significa conectarse' },
            { num: 3, title: 'Títere de combate' }, { num: 4, title: 'Flap Flap' },
            { num: 5, title: 'Tu espina, mi insignia' }, { num: 6, title: 'Darling in the FRANXX' },
            { num: 7, title: 'Moratoria de estrellas fugaces' }, { num: 8, title: 'Chicos × Chicas' },
            { num: 9, title: 'Bomba triangular' }, { num: 10, title: 'La ciudad de la eternidad' },
            { num: 11, title: 'Cambio de compañeros' }, { num: 12, title: 'El jardín donde todo empezó' },
            { num: 13, title: 'La bestia y el príncipe' }, { num: 14, title: 'Castigo y confesión' },
            { num: 15, title: 'Jian' }, { num: 16, title: 'Los días de nuestras vidas' },
            { num: 17, title: 'Edén' }, { num: 18, title: 'Cuando florecen los cerezos' },
            { num: 19, title: 'Inhumanidad' }, { num: 20, title: 'Un nuevo mundo' },
            { num: 21, title: 'Por ti, mi amor' }, { num: 22, title: 'Pioneros' },
            { num: 23, title: 'Darling in the FRANXX' }, { num: 24, title: 'Nunca me dejes ir' }
        ];

        const container = document.querySelector('.episodes-list');
        if (!container) return;

        container.innerHTML = ''; // Clear existing content

        const fragment = document.createDocumentFragment();
        episodes.forEach(ep => {
            const card = document.createElement('a');
            card.href = `episodios/episodio${ep.num}.html`;
            card.className = 'episode-card'; // Animation class will be added by the observer
            card.innerHTML = `
                <div class="episode-header">
                    <div class="episode-number">${String(ep.num).padStart(2, '0')}</div>
                    <h3>${ep.title}</h3>
                </div>
                <div class="episode-content">
                    <span class="episode-cta">Leer mi Análisis →</span>
                </div>
            `;
            fragment.appendChild(card);
        });
        container.appendChild(fragment);
    };

    /**
     * Sets up Intersection Observer for scroll-triggered animations.
     */
    const setupScrollAnimations = () => {
        const scrollElements = document.querySelectorAll('.animate-on-scroll');
        if (scrollElements.length === 0) return;

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    target.classList.add('is-visible');

                    // Stagger animations for grid items for a more dynamic feel
                    const gridItems = target.querySelectorAll('.point-card, .episode-card, .gallery-item');
                    if (gridItems.length > 0) {
                        gridItems.forEach((item, index) => {
                            item.style.transitionDelay = `${index * 80}ms`;
                        });
                    }
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        });

        scrollElements.forEach(element => {
            scrollObserver.observe(element);
        });
    };

    /**
     * Manages the navbar's appearance on scroll.
     */
    const setupNavbar = () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            navbar.classList.toggle('scrolled', currentScrollY > 50);

            // Hide navbar on scroll down, show on scroll up for a cleaner reading experience
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    };

    /**
     * Manages the back-to-top button visibility and functionality.
     */
    const setupBackToTopButton = () => {
        const backToTopButton = document.querySelector('.back-to-top');
        if(!backToTopButton) return;

        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    /**
     * Manages the image gallery lightbox functionality.
     */
    const setupLightbox = () => {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        const lightboxImg = document.getElementById('lightbox-img');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');

        if (galleryItems.length === 0) return;

        let currentImageIndex;
        const images = Array.from(galleryItems).map(item => item.href);

        const openLightbox = (index) => {
            currentImageIndex = index;
            lightboxImg.src = images[currentImageIndex];
            lightbox.classList.add('active');
            document.body.classList.add('lightbox-active');
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.classList.remove('lightbox-active');
        };

        const showNextImage = () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            lightboxImg.src = images[currentImageIndex];
        };

        const showPrevImage = () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            lightboxImg.src = images[currentImageIndex];
        };

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(index);
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);

        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') showNextImage();
                if (e.key === 'ArrowLeft') showPrevImage();
            }
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    };

    // --- Initializations ---
    generateEpisodeList();
    setupScrollAnimations();
    setupNavbar();
    setupBackToTopButton();
    setupLightbox();

    // Trigger load animations after a short delay to prevent FOUC
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
