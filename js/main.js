// ========================================
// MAIN.JS - JavaScript Principal
// Sitio Web de Julián David Góngora
// ========================================

// ========================================
// MENÚ MÓVIL - Toggle
// ========================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(event) {
        const isClickInside = navMenu.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
        
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// ANIMACIÓN DE CONTADORES
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const suffix = element.dataset.suffix || '';
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

// ========================================
// INTERSECTION OBSERVER - Animaciones al Scroll
// ========================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animar contadores de estadísticas
            if (entry.target.classList.contains('stat-number')) {
                const text = entry.target.textContent.trim();
                const numberMatch = text.match(/\d+/);
                
                if (numberMatch) {
                    const target = parseInt(numberMatch[0]);
                    const suffix = text.replace(numberMatch[0], '');
                    entry.target.dataset.suffix = suffix;
                    
                    // Solo animar una vez
                    if (!entry.target.dataset.animated) {
                        entry.target.dataset.animated = 'true';
                        animateCounter(entry.target, target);
                    }
                }
            }

            // Animar barras de progreso de habilidades
            if (entry.target.classList.contains('skill-item')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar && !progressBar.dataset.animated) {
                    progressBar.dataset.animated = 'true';
                    const targetWidth = progressBar.style.width;
                    progressBar.style.width = '0';
                    setTimeout(() => {
                        progressBar.style.width = targetWidth;
                    }, 100);
                }
            }
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', function() {
    const elementsToObserve = document.querySelectorAll(
        '.timeline-item, .achievement-card, .skill-category, .skill-item, ' +
        '.stat-number, .info-card, .value-card, .interest-card, ' +
        '.education-card, .cert-card, .project-card, .soft-skill-card'
    );
    
    elementsToObserve.forEach(el => observer.observe(el));
});

// ========================================
// FUNCIÓN PARA DESCARGAR CV
// ========================================
function descargarCV(event) {
    event.preventDefault();
    alert('¡Gracias por tu interés! Esta funcionalidad descargará el CV en formato PDF.\n\nPróximamente disponible.');
    // En producción, aquí iría la lógica real para descargar el PDF
    // window.location.href = 'assets/CV-Julian-David.pdf';
}

// ========================================
// EFECTO PARALLAX SUAVE EN HERO
// ========================================
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = Math.max(0, 1 - (scrolled / 600));
    }
    
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ========================================
// ANIMACIÓN DEL CURSOR TYPING
// ========================================
const cursor = document.querySelector('.cursor');
if (cursor) {
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 530);
}

// ========================================
// SMOOTH SCROLL PARA ENLACES INTERNOS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// PRELOADER (Opcional)
// ========================================
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    }
});

// ========================================
// ANIMACIONES DE ENTRADA PARA ELEMENTOS
// ========================================
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.fade-in-element');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// ========================================
// DETECTAR PÁGINA ACTIVA EN NAVEGACIÓN
// ========================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ========================================
// TOOLTIPS (Opcional - para información adicional)
// ========================================
function initTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        });
        
        trigger.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initTooltips);

// ========================================
// LAZY LOADING DE IMÁGENES (Opcional)
// ========================================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ========================================
// COPIAR AL PORTAPAPELES (Para email, teléfono, etc.)
// ========================================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Mostrar notificación de éxito
        showNotification('¡Copiado al portapapeles!');
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Agregar event listeners a elementos copiables
document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            copyToClipboard(textToCopy);
        });
    });
});

// ========================================
// DETECTAR SI EL USUARIO ESTÁ EN MÓVIL
// ========================================
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamiento según dispositivo
window.addEventListener('resize', function() {
    if (!isMobile()) {
        // Cerrar menú móvil si se redimensiona a desktop
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }
});

// ========================================
// PREVENIR ZOOM EN INPUTS EN iOS
// ========================================
if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (parseFloat(getComputedStyle(input).fontSize) < 16) {
            input.style.fontSize = '16px';
        }
    });
}

// ========================================
// LOG DE CARGA EXITOSA
// ========================================
console.log('%c✓ JavaScript cargado correctamente', 'color: #6366f1; font-weight: bold; font-size: 14px;');
console.log('%cSitio web de Julián David Góngora', 'color: #ec4899; font-size: 12px;');
console.log('%cDesarrollado con HTML, CSS y JavaScript', 'color: #10b981; font-size: 10px;');