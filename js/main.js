document.addEventListener('DOMContentLoaded', () => {
    // Inizializzazione delle particelle
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });

    // Animazioni allo scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(element => {
        observer.observe(element);
    });
});

// Gestione menu mobile migliorata
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');

    function closeMenu() {
        navLinks.classList.remove('active');
        if (menuOverlay) menuOverlay.style.display = 'none';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                if (menuOverlay) menuOverlay.style.display = 'block';
            } else {
                if (menuOverlay) menuOverlay.style.display = 'none';
            }
        });
    }
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    // Chiudi menu dopo click su voce
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
});

// Scroll ancorato con compensazione header
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight + 16 : 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                // Aggiorna attivo
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
});

// Terms of Service Modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('termsModal');
    const termsLinks = document.querySelectorAll('a[href="#terms"]');
    const closeBtn = document.querySelector('.close-modal');

    // Apri il modal quando si clicca sui link dei terms
    termsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Previene lo scroll della pagina sottostante
        });
    });

    // Chiudi il modal quando si clicca sulla X
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Ripristina lo scroll della pagina
    });

    // Chiudi il modal quando si clicca fuori dal contenuto
    window.addEventListener('click', function(e) {
        if (e.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
});

// Gestione della navigazione
document.addEventListener('DOMContentLoaded', function() {
    // Gestione click menu
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Se il link è per la pagina VPS, permetti la navigazione normale
            if (this.getAttribute('href') === 'vps.html') {
                return true; // Permetti la navigazione normale
            }
            
            // Per gli altri link (quelli con #) previeni il comportamento di default
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const sectionId = this.getAttribute('href').substring(1);
                // ... resto del codice per lo scroll ...
            }
        });
    });
});

// Gestione modal supporto
document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti elementi DOM
    const supportLink = document.getElementById('supportLink');
    const supportModal = document.getElementById('supportModal');
    const closeModalBtn = supportModal.querySelector('.close-modal');
    const supportForm = document.getElementById('supportForm');
    const formSuccess = document.getElementById('formSuccess');
    
    // Apri il modal quando viene clictato il link
    supportLink.addEventListener('click', function(e) {
        e.preventDefault();
        supportModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Previene lo scrolling
    });
    
    // Chiudi il modal quando viene cliccato il bottone X
    closeModalBtn.addEventListener('click', function() {
        supportModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Ripristina lo scrolling
    });
    
    // Chiudi il modal quando viene cliccato fuori dal contenuto
    window.addEventListener('click', function(e) {
        if (e.target === supportModal) {
            supportModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Gestione invio form
    supportForm.addEventListener('submit', function(e) {
        // Formspree gestirà l'invio, ma possiamo aggiungere funzionalità extra
        
        // Mostra il messaggio di successo dopo l'invio
        supportForm.addEventListener('formspree:success', function() {
            supportForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Resetta il form dopo 3 secondi
            setTimeout(function() {
                supportForm.reset();
            }, 3000);
        });
    });
});

// Dropdown "Altro" mobile/desktop: click per aprire/chiudere, chiudi su click fuori o su voce
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.nav-links .dropdown');
    const dropdownToggle = dropdown ? dropdown.querySelector('.dropdown-toggle') : null;
    const dropdownMenu = dropdown ? dropdown.querySelector('.dropdown-menu') : null;

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const isOpen = dropdown.classList.toggle('open');
            if (isOpen) {
                // Blocca lo scroll della pagina solo su mobile
                if (window.innerWidth < 900) {
                    document.body.style.overflow = 'hidden';
                }
            } else {
                document.body.style.overflow = '';
            }
        });

        // Chiudi il dropdown quando clicchi fuori
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target) && !e.target.classList.contains('dropdown-toggle')) {
                dropdown.classList.remove('open');
                document.body.style.overflow = '';
            }
        });

        // Chiudi il dropdown dopo click su una voce
        dropdownMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                dropdown.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }
});