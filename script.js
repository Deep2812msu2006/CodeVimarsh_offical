// ============================================
// MOBILE NAVIGATION
// ============================================

const hamburger = document.getElementById('hamburger');
const mobileNavPanel = document.getElementById('mobileNavPanel');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const mobileNavClose = document.getElementById('mobileNavClose');
const mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');

// Open mobile navigation panel
if (hamburger) {
    hamburger.addEventListener('click', function() {
        mobileNavPanel.classList.add('active');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close mobile navigation panel
function closeMobileNav() {
    mobileNavPanel.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
}

if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
}

if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', closeMobileNav);
}

// Close mobile nav when clicking on navigation links
mobileNavButtons.forEach(button => {
    button.addEventListener('click', function() {
        closeMobileNav();
    });
}

// Close mobile nav on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNavPanel.classList.contains('active')) {
        closeMobileNav();
    }
});

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================

const navbar = document.getElementById('navbar');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu functionality removed - using sidebar instead

// Active sidebar button on scroll
const sections = document.querySelectorAll('section[id]');
const sidebarButtons = document.querySelectorAll('.sidebar-btn');

function activateSidebarButton() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sidebarButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('href') === `#${sectionId}`) {
                    btn.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateSidebarButton);

// ============================================
// THEME TOGGLE
// ============================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('.theme-icon');

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
body.classList.add(`${currentTheme}-theme`);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
    }
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]:not(.contact-btn)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SIDEBAR BUTTON INTERACTIONS
// ============================================

sidebarButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        // Add active state
        this.style.transform = 'translateX(10px)';
    });

    btn.addEventListener('mouseleave', function() {
        // Reset transform
        this.style.transform = 'translateX(0)';
    });

    // Add click animation
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.mv-card, .domain-card, .project-card, .event-card, .team-card, .testimonial-card'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
});

// Custom animation handler
function handleScrollAnimation() {
    animateElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation();

// ============================================
// FORM HANDLING
// ============================================

const joinForm = document.getElementById('joinForm');

joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        domain: document.getElementById('domain').value,
        message: document.getElementById('message').value
    };

    // Validation
    if (!formData.name || !formData.email || !formData.domain) {
        alert('Please fill in all required fields.');
        return;
    }

    // Simulate form submission
    const submitButton = joinForm.querySelector('.btn-submit');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        alert(`Thank you, ${formData.name}! Your application has been received. We'll contact you soon at ${formData.email}.`);
        joinForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================

const gradientBlobs = document.querySelectorAll('.gradient-blob');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    const heroHeight = heroSection.offsetHeight;

    if (scrolled < heroHeight) {
        gradientBlobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.3;
            blob.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// ============================================
// ENHANCED INTERACTIONS
// ============================================

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
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

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll handlers
window.addEventListener('scroll', throttle(() => {
    activateSidebarButton();
    handleScrollAnimation();
}, 100));

// ============================================
// REGISTRATION MODAL
// ============================================

const registrationModal = document.getElementById('registrationModal');
const modalClose = document.getElementById('modalClose');
const cancelBtn = document.getElementById('cancelBtn');
const registrationForm = document.getElementById('registrationForm');
const modalEventName = document.getElementById('modalEventName');
const modalEventDate = document.getElementById('modalEventDate');
const registerButtons = document.querySelectorAll('.btn-register');

// Open modal when register button is clicked
registerButtons.forEach(button => {
    button.addEventListener('click', function() {
        const eventName = this.getAttribute('data-event');
        const eventDate = this.getAttribute('data-date');
        
        modalEventName.textContent = eventName;
        modalEventDate.textContent = `Date: ${eventDate}`;
        registrationModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal functions
function closeModal() {
    registrationModal.classList.remove('active');
    document.body.style.overflow = '';
    registrationForm.reset();
}

modalClose.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// Close modal when clicking overlay
registrationModal.addEventListener('click', function(e) {
    if (e.target === registrationModal || e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && registrationModal.classList.contains('active')) {
        closeModal();
    }
});

// Handle form submission
registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        prn: document.getElementById('prn').value,
        name: document.getElementById('reg-name').value,
        email: document.getElementById('reg-email').value,
        class: document.getElementById('class').value,
        branch: document.getElementById('branch').value,
        event: modalEventName.textContent,
        date: modalEventDate.textContent
    };
    
    // Validation
    if (!formData.prn || !formData.name || !formData.email || !formData.class || !formData.branch) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitButton = registrationForm.querySelector('.btn-submit-reg');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert(`Registration successful!\n\nEvent: ${formData.event}\nName: ${formData.name}\nPRN: ${formData.prn}\nEmail: ${formData.email}\nClass: ${formData.class}\nBranch: ${formData.branch}\n\nWe'll contact you soon with further details.`);
        closeModal();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// ============================================
// CONTACT PANEL
// ============================================

const contactPanel = document.getElementById('contactPanel');
const panelOverlay = document.getElementById('panelOverlay');
const panelClose = document.getElementById('panelClose');
const contactBtn = document.querySelector('.sidebar-btn.contact-btn');
const contactMessageForm = document.getElementById('contactMessageForm');

// Open contact panel
if (contactBtn && contactPanel) {
    contactBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Contact button clicked');
        
        // Show overlay first
        if (panelOverlay) {
            panelOverlay.style.display = 'block';
            panelOverlay.classList.add('active');
        }
        
        // Show panel
        if (contactPanel) {
            contactPanel.style.display = 'block';
            contactPanel.style.visibility = 'visible';
            setTimeout(() => {
                contactPanel.classList.add('active');
            }, 50);
        }
        
        document.body.style.overflow = 'hidden';
    });
}

// Close contact panel
function closeContactPanel() {
    if (contactPanel) {
        contactPanel.classList.remove('active');
        setTimeout(() => {
            contactPanel.style.display = 'none';
        }, 400);
    }
    if (panelOverlay) {
        panelOverlay.classList.remove('active');
        setTimeout(() => {
            panelOverlay.style.display = 'none';
        }, 300);
    }
    document.body.style.overflow = '';
    if (contactMessageForm) {
        contactMessageForm.reset();
    }
}

if (panelClose) {
    panelClose.addEventListener('click', function(e) {
        e.stopPropagation();
        closeContactPanel();
    });
}

if (panelOverlay) {
    panelOverlay.addEventListener('click', function(e) {
        if (e.target === panelOverlay) {
            closeContactPanel();
        }
    });
}

// Close panel on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && contactPanel && contactPanel.classList.contains('active')) {
        closeContactPanel();
    }
});

// Handle contact message form submission
if (contactMessageForm) {
    contactMessageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const messageInput = document.getElementById('contact-message');
        
        const formData = {
            name: nameInput ? nameInput.value : '',
            email: emailInput ? emailInput.value : '',
            message: messageInput ? messageInput.value : ''
        };
        
        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactMessageForm.querySelector('.btn-submit-contact');
        if (!submitButton) return;
        
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert(`Message sent successfully!\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nWe'll get back to you soon at ${formData.email}.`);
            closeContactPanel();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Set initial active sidebar button
    activateSidebarButton();
    
    // Initialize animations
    handleScrollAnimation();
    
    console.log('Code Vimarsh website loaded successfully!');
});
