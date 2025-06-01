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

    // Riduci la distanza di repulse su mobile
    if (window.innerWidth <= 900) {
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            window.pJSDom[0].pJS.interactivity.modes.repulse.distance = 60;
        }
    }

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
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                if (menuOverlay) menuOverlay.style.display = 'block';
                document.body.classList.add('no-scroll');
            } else {
                if (menuOverlay) menuOverlay.style.display = 'none';
                document.body.classList.remove('no-scroll');
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
    const closeBtn = modal ? modal.querySelector('.close-modal') : null;

    // Apri il modal quando si clicca sui link dei terms
    if (modal && closeBtn) {
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
    }
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
    const closeModalBtn = supportModal ? supportModal.querySelector('.close-modal') : null;
    const supportForm = document.getElementById('supportForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (supportLink && supportModal && closeModalBtn && supportForm && formSuccess) {
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
    }
});

// Dropdown "More" desktop: click per aprire/chiudere, chiudi su click fuori o su voce
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.nav-links .dropdown');
    const dropdownToggle = dropdown ? dropdown.querySelector('.dropdown-toggle') : null;
    const dropdownMenu = dropdown ? dropdown.querySelector('.dropdown-menu') : null;

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            // Solo su desktop (>900px)
            if (window.innerWidth > 900) {
                e.preventDefault();
                // Chiudi altri dropdown aperti (se presenti)
                document.querySelectorAll('.nav-links .dropdown.open').forEach(d => {
                    if (d !== dropdown) d.classList.remove('open');
                });
                dropdown.classList.toggle('open');
            }
        });

        // Chiudi il dropdown quando clicchi fuori (solo desktop)
        document.addEventListener('mousedown', function(e) {
            if (window.innerWidth > 900) {
                if (dropdown.classList.contains('open') && !dropdown.contains(e.target)) {
                    dropdown.classList.remove('open');
                }
            }
        });

        // Chiudi il dropdown dopo click su una voce (solo desktop)
        dropdownMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth > 900) {
                    dropdown.classList.remove('open');
                }
            });
        });
    }
});

// Typewriter animation for hero section
document.addEventListener('DOMContentLoaded', function() {
    // Modifica qui le parole che vuoi far ruotare:
    const words = ["Gamers", "Developers", "Creators", "Innovators", "Dreamers"];
    let i = 0;
    let j = 0;
    const el1 = document.getElementById('dynamic-word');
    const el2 = document.getElementById('dynamic-word-2');
    const speed = 150; // ms per carattere
    const pause = 1000; // ms di pausa tra una parola e l'altra

    function typeWord(el, word, cb) {
        let k = 0;
        el.innerHTML = '';
        function type() {
            if (k < word.length) {
                el.innerHTML = word.slice(0, k + 1) + '<span class="cursor" style="margin-left:-0.2em;">|</span>';
                k++;
                setTimeout(type, speed);
            } else {
                el.innerHTML = word + '<span class="cursor" style="margin-left:-0.2em;">|</span>';
                setTimeout(cb, pause);
            }
        }
        type();
    }

    function eraseWord(el, cb) {
        let word = el.textContent;
        let k = word.length;
        function erase() {
            if (k > 0) {
                el.innerHTML = word.slice(0, k - 1) + '<span class="cursor" style="margin-left:-0.2em;">|</span>';
                k--;
                setTimeout(erase, speed / 1.5);
            } else {
                el.innerHTML = '<span class="cursor" style="margin-left:-0.2em;">|</span>';
                setTimeout(cb, speed * 2);
            }
        }
        erase();
    }

    function loopType() {
        let nextI = (i + 1) % words.length;
        let nextJ = (j + 1) % words.length;
        eraseWord(el1, () => {
            typeWord(el1, words[nextI], () => {
                i = nextI;
            });
        });
        eraseWord(el2, () => {
            typeWord(el2, words[nextJ], () => {
                j = nextJ;
                setTimeout(loopType, pause);
            });
        });
    }

    // Inizializza con cursore
    if (el1 && el2) {
        el1.innerHTML = words[i] + '<span class="cursor" style="margin-left:-0.2em;">|</span>';
        el2.innerHTML = words[j] + '<span class="cursor" style="margin-left:-0.2em;">|</span>';
        setTimeout(loopType, 1500);
    }
});