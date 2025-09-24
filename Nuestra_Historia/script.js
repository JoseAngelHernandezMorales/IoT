/* ========================================
   SCRIPT.JS - FUNCIONALIDADES INTERACTIVAS
   PÁGINA A&A - ANGELICA & ANGEL
   ======================================== */

// ===========================
// VARIABLES GLOBALES
// ===========================

// Variables para el carrusel
let currentSlide = 0;
const totalSlides = 5;

// Array de colores de fondo aleatorios con gradientes hermosos
const backgroundColors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Azul-Púrpura (Original)
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // Rosa-Rojo
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // Azul claro-Cian
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', // Verde-Turquesa
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', // Rosa-Amarillo
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', // Turquesa-Rosa claro
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', // Rosa suave
    'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)', // Amarillo-Naranja
    'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)', // Azul cielo
    'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)'  // Rosa-Amarillo dorado
];

// ===========================
// FUNCIONES DEL CARRUSEL
// ===========================

/**
 * Inicializa los puntos indicadores del carrusel
 * Crea un punto por cada slide y les asigna eventos de click
 */
function initCarouselDots() {
    const dotsContainer = document.getElementById('carouselDots');
    
    // Crear un dot por cada slide
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'carousel-dot';
        
        // Marcar el primer dot como activo
        if (i === 0) {
            dot.classList.add('active');
        }
        
        // Agregar evento click para ir al slide específico
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

/**
 * Cambia el slide del carrusel en la dirección especificada
 * @param {number} direction - Dirección del cambio (1 para siguiente, -1 para anterior)
 */
function changeSlide(direction) {
    currentSlide += direction;
    
    // Validar límites del carrusel (circular)
    if (currentSlide >= totalSlides) {
        currentSlide = 0; // Volver al primer slide
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1; // Ir al último slide
    }
    
    // Actualizar la visualización del carrusel
    updateCarousel();
}

/**
 * Va directamente a un slide específico
 * @param {number} slideIndex - Índice del slide al que ir
 */
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

/**
 * Actualiza la visualización del carrusel
 * Mueve los slides y actualiza los puntos indicadores
 */
function updateCarousel() {
    const slides = document.getElementById('carouselSlides');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Mover los slides usando transform translateX
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Actualizar los puntos indicadores
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

/**
 * Auto-play del carrusel
 * Avanza automáticamente al siguiente slide
 */
function autoPlayCarousel() {
    changeSlide(1);
}

// ===========================
// FUNCIÓN DE CAMBIO DE COLOR
// ===========================

/**
 * Cambia el color de fondo de la página de manera aleatoria
 * Selecciona un gradiente aleatorio del array de colores
 */
function changeBackgroundColor() {
    // Seleccionar un índice aleatorio
    const randomIndex = Math.floor(Math.random() * backgroundColors.length);
    
    // Aplicar el nuevo gradiente al body
    document.body.style.background = backgroundColors[randomIndex];
    
    // Agregar efecto visual al botón (feedback táctil)
    const button = document.querySelector('.color-button');
    button.style.transform = 'scale(0.95)';
    
    // Restaurar el tamaño original del botón después de 150ms
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    // Opcional: Mostrar mensaje en consola para debugging
    console.log(`Color cambiado a: ${backgroundColors[randomIndex]}`);
}

// ===========================
// EFECTOS DE ANIMACIÓN
// ===========================

/**
 * Configura las animaciones que aparecen cuando se hace scroll
 * Utiliza Intersection Observer para detectar cuando los elementos son visibles
 */
function animateOnScroll() {
    // Seleccionar todos los elementos que queremos animar
    const elementsToAnimate = document.querySelectorAll('.person-card, .timeline-content');
    
    // Crear un observer para detectar cuando los elementos entran en la vista
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Elemento es visible, aplicar animaciones
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        // Configuración del observer
        threshold: 0.1, // Activar cuando el 10% del elemento sea visible
        rootMargin: '0px 0px -50px 0px' // Margen para activar la animación antes
    });
    
    // Configurar estado inicial y observar cada elemento
    elementsToAnimate.forEach(element => {
        // Estado inicial (invisible y desplazado hacia abajo)
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Comenzar a observar el elemento
        observer.observe(element);
    });
}

/**
 * Configura efectos especiales para los corazones
 * Agrega interactividad hover a todos los elementos con clase 'heart'
 */
function setupHeartEffects() {
    const hearts = document.querySelectorAll('.heart');
    
    hearts.forEach(heart => {
        // Efecto hover: agrandar el corazón
        heart.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.3)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        // Efecto mouseout: volver al tamaño original
        heart.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Efecto click: animación especial
        heart.addEventListener('click', function() {
            this.style.transform = 'scale(1.5)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

/**
 * Efecto de parallax suave para el header
 * Mueve el header más lento que el scroll para crear profundidad
 */
function setupParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        
        // Mover el header a la mitad de la velocidad del scroll
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

/**
 * Configura efectos adicionales para mejorar la experiencia
 */
function setupAdditionalEffects() {
    // Efecto hover para las tarjetas de persona
    const personCards = document.querySelectorAll('.person-card');
    personCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
        });
    });
    
    // Efecto para los elementos de timeline
    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach((item, index) => {
        // Alternar la posición para crear efecto zigzag
        if (index % 2 === 0) {
            item.style.marginLeft = '1rem';
            item.style.marginRight = '3rem';
        } else {
            item.style.marginLeft = '3rem';
            item.style.marginRight = '1rem';
        }
    });
}

// ===========================
// FUNCIONES DE UTILIDAD
// ===========================

/**
 * Función para mostrar mensajes de loading (opcional)
 */
function showLoading() {
    console.log('Cargando página A&A...');
}

/**
 * Función para ocultar el loading
 */
function hideLoading() {
    console.log('Página A&A cargada exitosamente! 💕');
}

/**
 * Función para detectar si es un dispositivo móvil
 * @returns {boolean} true si es móvil, false si no
 */
function isMobileDevice() {
    return window.innerWidth <= 768;
}

/**
 * Ajustes específicos para dispositivos móviles
 */
function setupMobileOptimizations() {
    if (isMobileDevice()) {
        // Reducir la velocidad de autoplay en móviles
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(autoPlayCarousel, 7000); // 7 segundos en vez de 5
        
        // Desactivar parallax en móviles para mejor rendimiento
        window.removeEventListener('scroll', setupParallaxEffect);
        
        console.log('Optimizaciones móviles aplicadas');
    }
}

// ===========================
// VARIABLES PARA INTERVALOS
// ===========================
let autoPlayInterval;

// ===========================
// INICIALIZACIÓN DE LA PÁGINA
// ===========================

/**
 * Función principal que inicializa todos los componentes
 * Se ejecuta cuando el DOM está completamente cargado
 */
function initializePage() {
    showLoading();
    
    // Inicializar componentes del carrusel
    initCarouselDots();
    
    // Configurar animaciones
    animateOnScroll();
    
    // Configurar efectos especiales
    setupHeartEffects();
    setupParallaxEffect();
    setupAdditionalEffects();
    
    // Optimizaciones móviles
    setupMobileOptimizations();
    
    // Iniciar auto-play del carrusel cada 5 segundos
    autoPlayInterval = setInterval(autoPlayCarousel, 5000);
    
    hideLoading();
}

// ===========================
// EVENT LISTENERS PRINCIPALES
// ===========================

/**
 * Event listener que se ejecuta cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

/**
 * Event listener para cambios de tamaño de ventana
 * Útil para ajustes responsive dinámicos
 */
window.addEventListener('resize', function() {
    // Reajustar optimizaciones si cambia el tamaño
    setTimeout(setupMobileOptimizations, 100);
});

/**
 * Event listener para cuando la página se va a cerrar
 * Limpia los intervalos para evitar memory leaks
 */
window.addEventListener('beforeunload', function() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
});

// ===========================
// FUNCIONES ADICIONALES PARA INTERACCIÓN
// ===========================

/**
 * Función para pausar/reanudar el autoplay del carrusel
 */
function toggleAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        console.log('AutoPlay pausado');
    } else {
        autoPlayInterval = setInterval(autoPlayCarousel, 5000);
        console.log('AutoPlay reanudado');
    }
}

/**
 * Función para agregar eventos de teclado (opcional)
 */
function setupKeyboardEvents() {
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowLeft':
                changeSlide(-1);
                break;
            case 'ArrowRight':
                changeSlide(1);
                break;
            case ' ': // Barra espaciadora
                event.preventDefault();
                toggleAutoPlay();
                break;
            case 'c': // Tecla 'c' para cambiar color
                changeBackgroundColor();
                break;
        }
    });
}

// Inicializar eventos de teclado
document.addEventListener('DOMContentLoaded', function() {
    setupKeyboardEvents();
});

/* ========================================
   FIN DEL ARCHIVO SCRIPT.JS
   
   FUNCIONALIDADES IMPLEMENTADAS:
   ✅ Carrusel automático con navegación
   ✅ Cambio de color de fondo aleatorio
   ✅ Animaciones de scroll
   ✅ Efectos hover interactivos
   ✅ Parallax effect
   ✅ Optimizaciones móviles
   ✅ Controles de teclado
   ✅ Gestión de memoria
   
   CONTROLES DE TECLADO:
   - ← → : Navegar carrusel
   - Espacio: Pausar/reanudar autoplay
   - C: Cambiar color de fondo
   ======================================== */