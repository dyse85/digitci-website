// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// HERO BUTTON CLICK
// ============================================

const heroBtn = document.getElementById('heroBtn');
if (heroBtn) {
    heroBtn.addEventListener('click', function() {
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// ============================================
// FORM HANDLING
// ============================================

/*const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validation simple
        if (name && email && subject && message) {
            // Log les données (à remplacer par un appel API)
            console.log({
                name: name,
                email: email,
                subject: subject,
                message: message,
                timestamp: new Date().toISOString()
            });
            
            // Feedback utilisateur
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Message envoyé avec succès!';
            submitBtn.style.background = '#10b981';
            submitBtn.disabled = true;
            
            // Réinitialiser le formulaire
            this.reset();
            
            // Restaurer le bouton après 3 secondes
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        } else {
            alert('Veuillez remplir tous les champs correctement');
        }
    });
}  

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Ne pas empêcher l'envoi (Formspree gère)
        // Juste afficher un message
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Message en cours d\'envoi...';
        submitBtn.disabled = true;
    });
}*/

// ============================================
// GESTION DU FORMULAIRE DE CONTACT (BACKEND)
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // async = permet d'utiliser await (attendre les réponses)
    contactForm.addEventListener('submit', async function(e) {
        // e.preventDefault() = empêche le formulaire de se recharger
        // (on va gérer l'envoi nous-mêmes avec le backend)
        e.preventDefault();
        
        // ============================================
        // RÉCUPÉRER LES VALEURS DU FORMULAIRE
        // ============================================
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // ============================================
        // VALIDER QUE TOUT EST REMPLI
        // ============================================
        
        if (name && email && subject && message) {
            // Récupérer le bouton d'envoi
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Changer le texte pendant l'envoi
            submitBtn.textContent = '⏳ Envoi en cours...';
            submitBtn.disabled = true; // Désactiver le bouton
            
            try {
                // ============================================
                // ENVOYER LES DONNÉES AU BACKEND
                // ============================================
                // fetch() = fonction pour communiquer avec le serveur
                
                const response = await fetch('http://localhost:3000/api/contact', {
                    // method: 'POST' = envoyer des données (POST = créer quelque chose)
                    method: 'POST',
                    
                    // headers = informations sur les données qu'on envoie
                    headers: {
                        'Content-Type': 'application/json', // On envoie du JSON
                    },
                    
                    // body = le contenu à envoyer
                    // JSON.stringify() = transforme l'objet en texte JSON
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    })
                });
                
                // ============================================
                // RÉCUPÉRER LA RÉPONSE DU BACKEND
                // ============================================
                // await = attendre que le serveur réponde
                
                const data = await response.json();
                // response.json() = lire la réponse en format JSON
                
                // ============================================
                // VÉRIFIER SI L'ENVOI A RÉUSSI
                // ============================================
                
                if (response.ok) {
                    // response.ok = true si le code HTTP est 200-299 (succès)
                    
                    // Afficher un message de succès
                    submitBtn.textContent = '✓ Message envoyé avec succès!';
                    submitBtn.style.background = '#10b981'; // Vert
                    
                    // Vider le formulaire
                    this.reset();
                    
                    // Après 3 secondes, revenir à la normale
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                    
                    // Afficher dans la console (pour déboguer)
                    console.log('✅ Message envoyé:', data);
                } else {
                    // Si le serveur a renvoyé une erreur
                    alert('Erreur: ' + data.error);
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    console.error('❌ Erreur:', data);
                }
            } catch (error) {
                // catch = si quelque chose d'inattendu se passe
                // (par exemple: le serveur ne répond pas)
                
                console.error('❌ Erreur de connexion:', error);
                alert('Erreur de connexion au serveur. Est-ce qu\'il est lancé?');
                
                // Revenir à la normale
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        } else {
            // Si un champ est vide
            alert('Veuillez remplir tous les champs');
        }
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

// Appliquer l'observer aux éléments avec animations
const serviceCards = document.querySelectorAll('.service-card');
const portfolioItems = document.querySelectorAll('.portfolio-item');

serviceCards.forEach(card => {
    observer.observe(card);
});

portfolioItems.forEach(item => {
    observer.observe(item);
});

// ============================================
// ACTIVE NAV LINK HIGHLIGHT
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        
        if (pageYOffset >= sectionTop - 200) {
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
// PARALLAX SCROLL EFFECT
// ============================================

document.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollTop = window.scrollY;
    
    if (hero) {
        hero.style.backgroundPosition = `center ${scrollTop * 0.5}px`;
    }
});

// ============================================
// COUNTER ANIMATION (optionnel)
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 50);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 50);
}

// ============================================
// VALIDATION FORMULAIRE EN TEMPS RÉEL
// ============================================

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const numberInput = document.getElementById('number');
const messageInput = document.getElementById('message');

if (nameInput) {
    nameInput.addEventListener('blur', function() {
        if (this.value.length < 2) {
            this.style.borderColor = '#ff6b6b';
        } else {
            this.style.borderColor = '';
        }
    });
}

if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
        if (!isValid && this.value !== '') {
            this.style.borderColor = '#ff6b6b';
        } else {
            this.style.borderColor = '';
        }
    });
}

// ============================================
// BURGER MENU MOBILE
// ============================================

const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const body = document.body;

if (burgerBtn && navMenu) {
    burgerBtn.addEventListener('click', function() {
        burgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        navbar.classList.toggle('menu-open');
        body.classList.toggle('menu-open');
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            burgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
            navbar.classList.remove('menu-open');
            body.classList.remove('menu-open');
        });
    });
}


// ============================================
// LOG INITIALISATION
// ============================================

console.log('%cDigitCI Agency ✓', 'color: #ff8c00; font-size: 16px; font-weight: bold;');
console.log('Site chargé avec succès - Tous les scripts sont opérationnels');
