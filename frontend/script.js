// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// HERO BUTTON
// ============================================

const heroBtn = document.getElementById('heroBtn');
if (heroBtn) {
    heroBtn.addEventListener('click', function() {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// ============================================
// FORMULAIRE DE CONTACT — FORMSPREE
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = '⏳ Envoi en cours...';
        submitBtn.disabled = true;

        // Laisser Formspree gérer l'envoi (pas de preventDefault)
        // Après 3 secondes, remettre le bouton normal
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 3000);
    });
}

// ============================================
// ANIMATION AU SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
    observer.observe(el);
});

// ============================================
// ACTIVE NAV LINK
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        if (pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-link:not(.cta-btn)').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current && current !== '') {
            link.style.color = 'var(--accent)';
        }
    });
});

// ============================================
// PARALLAX HERO
// ============================================

document.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `center ${window.scrollY * 0.5}px`;
    }
});

// ============================================
// VALIDATION FORMULAIRE EN TEMPS RÉEL
// ============================================

const nameInput  = document.getElementById('name');
const emailInput = document.getElementById('email');

if (nameInput) {
    nameInput.addEventListener('blur', function() {
        this.style.borderColor = this.value.length < 2 ? '#ff6b6b' : '';
    });
}

if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
        this.style.borderColor = (!isValid && this.value !== '') ? '#ff6b6b' : '';
    });
}

// ============================================
// BURGER MENU MOBILE
// ============================================

const burgerBtn = document.getElementById('burgerBtn');
const navMenu   = document.querySelector('.nav-menu');
const navbar    = document.querySelector('.navbar');

if (burgerBtn && navMenu) {
    burgerBtn.addEventListener('click', function() {
        burgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        navbar.classList.toggle('menu-open');
        document.body.classList.toggle('menu-open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            burgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
            navbar.classList.remove('menu-open');
            document.body.classList.remove('menu-open');
        });
    });
}

console.log('%cDigitCI Agency', 'color: #F97316; font-size: 16px; font-weight: bold;');