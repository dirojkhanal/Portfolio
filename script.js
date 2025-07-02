/**
 * Portfolio Website JavaScript
 * Author: Diroj Khanal
 * Description: Interactive functionality for personal portfolio website
 */

// ============ CONSTANTS & VARIABLES ============
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const header = document.getElementById('header');

// ============ MOBILE MENU FUNCTIONALITY ============
/**
 * Show mobile menu
 */
function showMenu() {
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }
}

/**
 * Hide mobile menu
 */
function hideMenu() {
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }
}

/**
 * Close mobile menu when clicking on nav links
 */
function closeMobileMenu() {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });
}

// ============ SMOOTH SCROLLING ============
/**
 * Add smooth scrolling to navigation links
 */
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============ ACTIVE NAVIGATION HIGHLIGHTING ============
/**
 * Highlight active navigation link based on scroll position
 */
function scrollActiveLink() {
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const headerHeight = header.offsetHeight;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active-link'));
                // Add active class to current link
                if (correspondingLink) {
                    correspondingLink.classList.add('active-link');
                }
            }
        });
    });
}

// ============ HEADER SCROLL EFFECT ============
/**
 * Add shadow to header on scroll
 */
function scrollHeader() {
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    });
}

// ============ BACK TO TOP BUTTON ============
/**
 * Show/hide back to top button based on scroll position
 */
function showBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
}

/**
 * Scroll to top when back to top button is clicked
 */
function backToTopClick() {
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============ SCROLL REVEAL ANIMATIONS ============
/**
 * Reveal elements on scroll
 */
function scrollReveal() {
    const reveals = document.querySelectorAll('.project__card, .certificate__card');
    
    function checkReveal() {
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('reveal');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on initial load
}

// ============ FORM VALIDATION & SUBMISSION ============
/**
 * Validate form inputs
 */
function validateForm() {
    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    let isValid = true;
    
    // Reset errors
    [nameError, emailError, messageError].forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
    
    // Validate name
    if (!nameInput.value.trim()) {
        nameError.textContent = 'Name is required';
        nameError.classList.add('show');
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        nameError.classList.add('show');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required';
        emailError.classList.add('show');
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        isValid = false;
    }
    
    // Validate message
    if (!messageInput.value.trim()) {
        messageError.textContent = 'Message is required';
        messageError.classList.add('show');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        messageError.classList.add('show');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Handle form submission
 */
function handleFormSubmission() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateForm()) {
                // Simulate form submission
                const formButton = contactForm.querySelector('.form__button');
                const formSuccess = document.getElementById('form-success');
                
                // Disable button and show loading state
                formButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                formButton.disabled = true;
                
                // Simulate API call delay
                setTimeout(() => {
                    // Show success message
                    formSuccess.classList.add('show');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    formButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    formButton.disabled = false;
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.classList.remove('show');
                    }, 5000);
                }, 2000);
            }
        });
    }
}

/**
 * Add real-time validation to form inputs
 */
function addRealTimeValidation() {
    const inputs = contactForm.querySelectorAll('.form__input');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateForm();
        });
        
        input.addEventListener('input', () => {
            // Clear error when user starts typing
            const inputName = input.getAttribute('name');
            const errorElement = document.getElementById(`${inputName}-error`);
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        });
    });
}

// ============ TYPING ANIMATION ============
/**
 * Create typing animation for hero subtitle
 */
function createTypingAnimation() {
    const subtitle = document.querySelector('.hero__subtitle');
    if (!subtitle) return;
    
    const text = 'Passionate Frontend Developer';
    const originalText = subtitle.textContent;
    
    // Only animate if the text matches
    if (originalText.includes('Passionate Frontend Developer')) {
        subtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Add blinking cursor
                subtitle.innerHTML += '<span class="cursor">|</span>';
                
                // Add cursor animation styles
                const style = document.createElement('style');
                style.textContent = `
                    .cursor {
                        animation: blink 1s infinite;
                    }
                    @keyframes blink {
                        0%, 50% { opacity: 1; }
                        51%, 100% { opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
                
                // Remove cursor after 3 seconds
                setTimeout(() => {
                    const cursor = subtitle.querySelector('.cursor');
                    if (cursor) cursor.remove();
                }, 3000);
            }
        };
        
        // Start typing animation after hero loads
        setTimeout(typeWriter, 1000);
    }
}

// ============ INTERSECTION OBSERVER FOR ANIMATIONS ============
/**
 * Use Intersection Observer for better performance
 */
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToObserve = document.querySelectorAll('.project__card, .certificate__card, .skills__group');
    elementsToObserve.forEach(el => observer.observe(el));
}

// ============ THEME DETECTION ============
/**
 * Detect user's preferred color scheme
 */
function detectTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // User prefers dark mode - you can add dark mode styles here
        console.log('Dark mode preferred');
    }
    
    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            console.log('Switched to dark mode');
        } else {
            console.log('Switched to light mode');
        }
    });
}

// ============ KEYBOARD NAVIGATION ============
/**
 * Improve keyboard navigation accessibility
 */
function improveKeyboardNavigation() {
    // Trap focus in mobile menu when open
    const firstFocusableElement = navMenu.querySelector('a, button, input, textarea, select');
    const lastFocusableElement = navMenu.querySelector('.nav__close');
    
    document.addEventListener('keydown', (e) => {
        if (navMenu.classList.contains('show-menu')) {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    firstFocusableElement.focus();
                }
            } else if (e.key === 'Escape') {
                navMenu.classList.remove('show-menu');
                navToggle.focus();
            }
        }
    });
}

// ============ PERFORMANCE OPTIMIZATION ============
/**
 * Debounce function for scroll events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Optimize scroll events
 */
function optimizeScrollEvents() {
    const debouncedScrollHandler = debounce(() => {
        scrollActiveLink();
        showBackToTop();
        scrollHeader();
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
}

// ============ ERROR HANDLING ============
/**
 * Global error handler
 */
function setupErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
        // You could send this to an error reporting service
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        // You could send this to an error reporting service
    });
}

// ============ LAZY LOADING ============
/**
 * Lazy load images for better performance
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============ INITIALIZATION ============
/**
 * Initialize all functionality when DOM is loaded
 */
function init() {
    // Mobile menu functionality
    showMenu();
    hideMenu();
    closeMobileMenu();
    
    // Navigation and scrolling
    initSmoothScrolling();
    optimizeScrollEvents();
    
    // Animations and effects
    scrollReveal();
    initIntersectionObserver();
    createTypingAnimation();
    
    // Form functionality
    if (contactForm) {
        handleFormSubmission();
        addRealTimeValidation();
    }
    
    // Back to top button
    backToTopClick();
    
    // Accessibility improvements
    improveKeyboardNavigation();
    
    // Theme and performance
    detectTheme();
    lazyLoadImages();
    
    // Error handling
    setupErrorHandling();
    
    console.log('Portfolio website initialized successfully!');
}

// ============ DOCUMENT READY ============
/**
 * Wait for DOM to be fully loaded before initializing
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============ ADDITIONAL FEATURES ============
/**
 * Add copy email functionality
 */
function addCopyEmailFeature() {
    const emailElements = document.querySelectorAll('.contact__text');
    
    emailElements.forEach(element => {
        if (element.textContent.includes('@')) {
            element.style.cursor = 'pointer';
            element.title = 'Click to copy email';
            
            element.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(element.textContent);
                    
                    // Show temporary success message
                    const originalText = element.textContent;
                    element.textContent = 'Email copied!';
                    element.style.color = 'var(--success-color)';
                    
                    setTimeout(() => {
                        element.textContent = originalText;
                        element.style.color = '';
                    }, 2000);
                } catch (err) {
                    console.log('Failed to copy email:', err);
                }
            });
        }
    });
}

/**
 * Add Easter egg functionality
 */
function addEasterEgg() {
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg activated!
            document.body.style.transform = 'rotate(360deg)';
            document.body.style.transition = 'transform 2s ease-in-out';
            
            setTimeout(() => {
                document.body.style.transform = '';
                alert('🎉 Easter egg activated! You found the secret code!');
            }, 2000);
            
            konamiCode = [];
        }
    });
}

// Initialize additional features after main initialization
setTimeout(() => {
    addCopyEmailFeature();
    addEasterEgg();
}, 1000);

// ============ EXPORT FOR TESTING ============
// Export functions for potential testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        debounce,
        init
    };
}
