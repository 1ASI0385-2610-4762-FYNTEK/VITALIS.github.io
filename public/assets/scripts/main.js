document.addEventListener('DOMContentLoaded', () => {
    console.log("Ecosistema Zen de VITALIS: Micro-interacciones inicializadas.");

    initButtonRipples();
    initSmoothScroll();
    initMobileMenu();
});

function initButtonRipples() {
    const buttons = document.querySelectorAll('.btn, .btn-navbar-white, .btn-dark-block, .btn-navbar-outline');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const existingRipple = this.querySelector('.zen-ripple');
            if (existingRipple) {
                existingRipple.remove();
            }

            const ripple = document.createElement('span');
            ripple.classList.add('zen-ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

            this.appendChild(ripple);

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a, .footer-nav-links a, .hero-actions a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const navbarOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initMobileMenu() {
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const navMenuContainer = document.getElementById('nav-menu-container');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (!hamburgerToggle || !navMenuContainer) return;

    hamburgerToggle.addEventListener('click', () => {
        hamburgerToggle.classList.toggle('is-active');
        navMenuContainer.classList.toggle('is-open');

        if (navMenuContainer.classList.contains('is-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenuContainer.classList.contains('is-open')) {
                hamburgerToggle.classList.remove('is-active');
                navMenuContainer.classList.remove('is-open');
                document.body.style.overflow = '';
            }
        });
    });
}

/**
 * Conecta el flujo del Navbar redireccionando al entorno de Login Habitual
 */
function openLogin() {
    setTimeout(() => {
        window.location.href = 'public/assets/HTML/login.html';
    }, 150);
}