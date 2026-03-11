/**
 * FORKS OUT RESTAURANT WEBSITE
 * Vanilla JavaScript - No Frameworks
 * 
 * Features:
 * - Mobile hamburger menu toggle
 * - Smooth scroll navigation
 * - Sticky header behavior
 * - Testimonials slider
 * - Menu filtering
 * - Gallery lightbox
 * - Form validation
 * - Scroll reveal animations
 */

// ==========================================
// 1. DOM CONTENT LOADED - INITIALIZE ALL
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initTestimonialsSlider();
    initMenuFiltering();
    initGalleryLightbox();
    initFormValidation();
    initScrollReveal();
    initReservationForm();
    initContactForm();
});

// ==========================================
// 2. HEADER & NAVIGATION
// ==========================================
function initHeader() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    // Add scrolled class on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth Scroll Navigation
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// 3. TESTIMONIALS SLIDER
// ==========================================
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    
    if (!slider) return;
    
    const items = slider.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testimonials-dots .dot');
    const prevBtn = document.querySelector('.testimonials-prev');
    const nextBtn = document.querySelector('.testimonials-next');
    
    if (items.length === 0) return;
    
    let currentIndex = 0;
    let autoSlideInterval;
    
    // Show testimonial at index
    function showTestimonial(index) {
        items.forEach((item, i) => {
            item.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
        });
        
        items[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // Next testimonial
    function nextTestimonial() {
        const newIndex = (currentIndex + 1) % items.length;
        showTestimonial(newIndex);
    }
    
    // Previous testimonial
    function prevTestimonial() {
        const newIndex = (currentIndex - 1 + items.length) % items.length;
        showTestimonial(newIndex);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextTestimonial();
            resetAutoSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevTestimonial();
            resetAutoSlide();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
            resetAutoSlide();
        });
    });
    
    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextTestimonial, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Initialize
    showTestimonial(0);
    startAutoSlide();
    
    // Pause on hover
    slider.addEventListener('mouseenter', function() {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', function() {
        startAutoSlide();
    });
}

// ==========================================
// 4. MENU FILTERING
// ==========================================
function initMenuFiltering() {
    const categoryBtns = document.querySelectorAll('.menu-category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (categoryBtns.length === 0 || menuItems.length === 0) return;
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter items
            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// ==========================================
// 5. GALLERY LIGHTBOX
// ==========================================
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length === 0) return;
    
    // Create lightbox if it doesn't exist
    let lightbox = document.querySelector('.lightbox');
    
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-nav lightbox-prev">&#10094;</button>
            <button class="lightbox-nav lightbox-next">&#10095;</button>
            <div class="lightbox-content">
                <img src="" alt="Gallery Image">
            </div>
        `;
        document.body.appendChild(lightbox);
    }
    
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const images = [];
    
    // Collect all gallery images
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            images.push({
                src: img.src,
                alt: img.alt
            });
            
            item.addEventListener('click', function() {
                currentImageIndex = index;
                openLightbox();
            });
        }
    });
    
    function openLightbox() {
        const image = images[currentImageIndex];
        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        const image = images[currentImageIndex];
        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        const image = images[currentImageIndex];
        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;
    }
    
    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });
}

// ==========================================
// 6. FORM VALIDATION
// ==========================================
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(form)) {
                // Show success message
                const successMsg = form.querySelector('.form-success');
                if (successMsg) {
                    successMsg.classList.add('show');
                    form.reset();
                    
                    setTimeout(() => {
                        successMsg.classList.remove('show');
                    }, 5000);
                }
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const fields = form.querySelectorAll('[data-required]');
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    const errorElement = field.parentElement.querySelector('.form-error');
    
    let isValid = true;
    let errorMessage = '';
    
    // Required validation
    if (field.hasAttribute('data-required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(field)} is required`;
    }
    
    // Email validation
    if (isValid && fieldName === 'email' && value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (isValid && fieldName === 'phone' && value) {
        const phonePattern = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phonePattern.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Date validation (must be today or future)
    if (isValid && fieldName === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            errorMessage = 'Please select today or a future date';
        }
    }
    
    // Guests validation
    if (isValid && fieldName === 'guests' && value) {
        const guests = parseInt(value);
        if (guests < 1 || guests > 20) {
            isValid = false;
            errorMessage = 'Number of guests must be between 1 and 20';
        }
    }
    
    // Show/hide error
    if (errorElement) {
        if (!isValid) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
            field.style.borderColor = '#e74c3c';
        } else {
            errorElement.classList.remove('show');
            field.style.borderColor = '';
        }
    }
    
    return isValid;
}

function clearFieldError(field) {
    const errorElement = field.parentElement.querySelector('.form-error');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
    field.style.borderColor = '';
}

function getFieldLabel(field) {
    const label = field.parentElement.querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : 'This field';
}

// ==========================================
// 7. SCROLL REVEAL ANIMATIONS
// ==========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if (revealElements.length === 0) return;
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

// ==========================================
// 8. RESERVATION FORM SPECIFIC
// ==========================================
function initReservationForm() {
    const reservationForm = document.querySelector('.reservation-form');
    
    if (!reservationForm) return;
    
    // Set minimum date to today
    const dateInput = reservationForm.querySelector('input[name="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Handle form submission
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Log reservation data (replace with actual submission)
            console.log('Reservation Data:', data);
            
            // Show success
            const successMsg = this.querySelector('.form-success');
            if (successMsg) {
                successMsg.classList.add('show');
                this.reset();
                
                setTimeout(() => {
                    successMsg.classList.remove('show');
                }, 5000);
            }
        }
    });
}

// ==========================================
// 9. CONTACT FORM SPECIFIC
// ==========================================
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Log contact data (replace with actual submission)
            console.log('Contact Form Data:', data);
            
            // Show success
            const successMsg = this.querySelector('.form-success');
            if (successMsg) {
                successMsg.classList.add('show');
                this.reset();
                
                setTimeout(() => {
                    successMsg.classList.remove('show');
                }, 5000);
            }
        }
    });
}

// ==========================================
// 10. UTILITY FUNCTIONS
// ==========================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// 11. PRELOADER (Optional Enhancement)
// ==========================================
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ==========================================
// 12. PARALLAX EFFECT (Optional Enhancement)
// ==========================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, 16));
}

// Initialize parallax if elements exist
initParallax();
