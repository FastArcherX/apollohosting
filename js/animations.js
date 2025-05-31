// GSAP Animazioni
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
if (document.querySelector('.hero-content')) {
    gsap.from('.hero-content', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power4.out'
    });
}

// Feature Cards Animation
gsap.utils.toArray('.feature-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.2
    });
});

// Floating Elements Animation
const floatingElements = document.querySelectorAll('.float');
floatingElements.forEach((element, i) => {
    gsap.to(element, {
        y: '20',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: i * 0.2
    });
});