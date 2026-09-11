// Smooth scroll behavior enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navigation smooth scroll
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) {
                return;
            }

            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Scroll animations for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });

    const fancyNav = document.querySelector('.fancy-nav');
    if (fancyNav) {
        const fancyItems = fancyNav.querySelectorAll('.fancy-nav__item');
        const fancyImgs = fancyNav.querySelectorAll('.fancy-nav__img');
        const fancyTabList = fancyNav.querySelector('.fancy-nav__tabs');
        const fancyTabs = fancyNav.querySelectorAll('.fancy-nav__tab');

        const setFancyImage = function(index) {
            fancyImgs.forEach((imgElem, imgIndex) => {
                imgElem.style.opacity = imgIndex === index ? '1' : '0';
            });
        };

        const addTabAnimationClasses = function(tab) {
            const closeBtn = tab.querySelector('.fancy-nav__close-btn');
            const image = tab.querySelector('.fancy-nav__tab-img');
            const description = tab.querySelector('.fancy-nav__tab-description');

            closeBtn.classList.add('is-visible');
            image.classList.add('is-visible');
            description.classList.add('is-visible');
        };

        const removeTabAnimationClasses = function(tab) {
            const closeBtn = tab.querySelector('.fancy-nav__close-btn');
            const image = tab.querySelector('.fancy-nav__tab-img');
            const description = tab.querySelector('.fancy-nav__tab-description');

            closeBtn.classList.remove('is-visible');
            image.classList.remove('is-visible');
            description.classList.remove('is-visible');
        };

        const openFancyTab = function(index) {
            const currentTab = fancyTabs[index];
            if (!currentTab) {
                return;
            }

            fancyTabList.classList.add('is-visible');
            fancyTabList.setAttribute('aria-hidden', 'false');
            currentTab.classList.add('is-visible');
            addTabAnimationClasses(currentTab);
        };

        const closeFancyTab = function(index) {
            const currentTab = fancyTabs[index];
            if (!currentTab) {
                return;
            }

            fancyTabList.classList.remove('is-visible');
            fancyTabList.setAttribute('aria-hidden', 'true');
            currentTab.classList.remove('is-visible');
            removeTabAnimationClasses(currentTab);
        };

        fancyItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(item);

            item.addEventListener('mouseover', function() {
                setFancyImage(index);
            });

            item.addEventListener('focus', function() {
                setFancyImage(index);
            });

            item.addEventListener('click', function() {
                openFancyTab(index);
            });

            item.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openFancyTab(index);
                }
            });
        });

        fancyTabs.forEach((tab, index) => {
            const closeBtn = tab.querySelector('.fancy-nav__close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', function(event) {
                    event.stopPropagation();
                    closeFancyTab(index);
                });
            }
        });

        fancyTabList.addEventListener('click', function(event) {
            if (event.target === fancyTabList) {
                fancyTabs.forEach((tab, index) => {
                    if (tab.classList.contains('is-visible')) {
                        closeFancyTab(index);
                    }
                });
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                fancyTabs.forEach((tab, index) => {
                    if (tab.classList.contains('is-visible')) {
                        closeFancyTab(index);
                    }
                });
            }
        });
    }

    // Add active state to navigation links based on scroll position
    window.addEventListener('scroll', function() {
        let currentSection = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button, .submit-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Initialize project card hover effects
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
        });
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .cta-button, .submit-button {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .project-image {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Preload animations
window.addEventListener('load', function() {
    console.log('Portfolio loaded - all animations ready');
});
