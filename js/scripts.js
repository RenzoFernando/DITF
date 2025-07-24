document.addEventListener('DOMContentLoaded', () => {

    // --- Generador de la lista de episodios ---
    const generateEpisodeList = () => {
        const episodes = [
            { num: 1, title: 'Sola y solitario' }, { num: 2, title: 'Lo que significa conectarse' },
            { num: 3, title: 'Títere de combate' }, { num: 4, title: 'Flap Flap' },
            { num: 5, title: 'Tu espina, mi insignia' }, { num: 6, title: 'Darling in the FRANXX' },
            { num: 7, title: 'Moratoria de estrellas fugaces' }, { num: 8, title: 'Chicos x Chicas' },
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

        container.innerHTML = '';

        episodes.forEach(ep => {
            const card = document.createElement('a');
            card.href = `episodios/episodio${ep.num}.html`;
            card.className = 'episode-card animate-on-scroll';
            card.innerHTML = `
                <div class="episode-header">
                    <div class="episode-number">${String(ep.num).padStart(2, '0')}</div>
                    <h3>${ep.title}</h3>
                </div>
                <div class="episode-content">
                    <span class="episode-cta">Leer mi Análisis</span>
                </div>
            `;
            container.appendChild(card);
        });
    };

    generateEpisodeList();

    // --- Lógica de Animaciones de Scroll ---
    const setupScrollAnimations = () => {
        const scrollElements = document.querySelectorAll('.animate-on-scroll');

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    target.classList.add('is-visible');

                    const gridItems = target.querySelectorAll('.point-card, .episode-card, .gallery-item');
                    if (gridItems.length > 0) {
                        gridItems.forEach((item, index) => {
                            item.style.transitionDelay = `${index * 70}ms`;
                        });
                    }

                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        scrollElements.forEach(element => {
            scrollObserver.observe(element);
        });
    };

    setupScrollAnimations();

    // --- Lógica de la Barra de Navegación ---
    const setupNavbar = () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
            });
        }
    };

    setupNavbar();

    // --- Lógica del botón "Volver Arriba" ---
    const setupBackToTopButton = () => {
        const backToTopButton = document.querySelector('.back-to-top');
        if(backToTopButton) {
            window.addEventListener('scroll', () => {
                backToTopButton.classList.toggle('visible', window.scrollY > 300);
            });

            backToTopButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    setupBackToTopButton();

    // lógica para la Galería Lightbox ---
    const setupLightbox = () => {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        const lightboxImg = document.getElementById('lightbox-img');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');

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

        // Cerrar con la tecla Escape y navegar con flechas del teclado
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
                if (e.key === 'ArrowRight') {
                    showNextImage();
                }
                if (e.key === 'ArrowLeft') {
                    showPrevImage();
                }
            }
        });

        // Cerrar al hacer clic fuera de la imagen
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    };

    setupLightbox();

    document.body.classList.add('loaded');
});