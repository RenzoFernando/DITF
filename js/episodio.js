document.addEventListener('DOMContentLoaded', () => {

    // --- Efecto Parallax para el Banner ---
    const setupParallax = () => {
        const heroBackground = document.querySelector('.episode-hero-background');
        const heroContent = document.querySelector('.episode-hero-content');

        if (heroBackground) {
            window.addEventListener('scroll', () => {
                const scrollValue = window.scrollY;
                // Mueve el fondo más lento que el scroll para crear profundidad
                heroBackground.style.transform = `translateY(${scrollValue * 0.3}px)`;
                // Mueve el contenido ligeramente más rápido para separarlo del fondo
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrollValue * 0.15}px)`;
                }
            });
        }
    };

    setupParallax();

    // --- Animación de Aparición para las Secciones ---
    const setupScrollAnimations = () => {
        const animatedElements = document.querySelectorAll('.content-section');

        if (animatedElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2 // El elemento debe ser un 20% visible
            });

            animatedElements.forEach(el => {
                // Preparamos los elementos para la animación desde CSS
                el.classList.add('reveal-on-scroll');
                observer.observe(el);
            });

            // Añadimos los estilos de animación al head
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
        }
    };

    setupScrollAnimations();
});