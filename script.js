// Comprehensive Button JavaScript for Bugema University Website

document.addEventListener('DOMContentLoaded', function() {
    initializeButtons();
    initializeRippleEffects();
    initializeLoadingStates();
    initializeFormValidation();
    initializeScrollEffects();
    initializeSlideshow();
    initializeThemeToggle();
    initializeMobileMenu();
});

// Initialize all button interactions
function initializeButtons() {
    const buttons = document.querySelectorAll('.btn, .btn-gradient, .btn-primary, .btn-secondary, .btn-small');
    
    buttons.forEach(button => {
        // Add click feedback
        button.addEventListener('click', function(e) {
            handleButtonClick(e, this);
        });
        
        // Add hover sound effect (optional)
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Handle button click events
function handleButtonClick(event, button) {
    // Create ripple effect
    createRipple(event, button);
    
    // Add haptic feedback simulation
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // Handle different button types
    if (button.classList.contains('btn-loading')) {
        return; // Don't interfere with loading buttons
    }
    
    // Simulate loading for async operations
    if (button.classList.contains('async-action')) {
        simulateAsyncOperation(button);
    }
    
    // Track button analytics
    trackButtonClick(button);
}

// Create ripple effect on buttons
function createRipple(event, button) {
    if (!button.classList.contains('btn-ripple')) return;
    
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Simulate async operations (form submissions, API calls, etc.)
function simulateAsyncOperation(button) {
    const originalText = button.textContent;
    const originalClasses = button.className;
    
    // Set loading state
    button.classList.add('btn-loading');
    button.disabled = true;
    
    // Simulate operation (replace with actual async calls)
    setTimeout(() => {
        button.classList.remove('btn-loading');
        button.disabled = false;
        
        // Random success/error for demo (remove in production)
        if (Math.random() > 0.2) {
            showSuccessState(button);
            setTimeout(() => {
                resetButton(button, originalText, originalClasses);
            }, 2000);
        } else {
            showErrorState(button);
            setTimeout(() => {
                resetButton(button, originalText, originalClasses);
            }, 2000);
        }
    }, 2000);
}

// Show success state
function showSuccessState(button) {
    button.classList.add('btn-success');
    button.innerHTML = '<i class="fas fa-check"></i> Success!';
    
    // Show notification
    showNotification('Operation completed successfully!', 'success');
}

// Show error state
function showErrorState(button) {
    button.classList.add('btn-error');
    button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
    
    // Show notification
    showNotification('Operation failed. Please try again.', 'error');
}

// Reset button to original state
function resetButton(button, originalText, originalClasses) {
    button.textContent = originalText;
    button.className = originalClasses;
}

// Initialize ripple effects for all buttons
function initializeRippleEffects() {
    const rippleButtons = document.querySelectorAll('.btn-ripple');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
}

// Initialize loading states for forms
function initializeLoadingStates() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitButton = form.querySelector('button[type="submit"], .btn-primary');
            if (submitButton) {
                e.preventDefault();
                simulateAsyncOperation(submitButton);
            }
        });
    });
}

// Initialize form validation with button feedback
function initializeFormValidation() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

// Validate individual field
function validateField(field) {
    const submitButton = field.form?.querySelector('button[type="submit"]');
    if (!submitButton) return;
    
    let isValid = true;
    
    // Basic validation rules
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
    }
    
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(field.value);
    }
    
    if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        isValid = phoneRegex.test(field.value.replace(/\s/g, ''));
    }
    
    // Update button state based on validation
    if (isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        updateFormSubmitButton(field.form, true);
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
        updateFormSubmitButton(field.form, false);
    }
}

// Update form submit button state
function updateFormSubmitButton(form, isValid) {
    const submitButton = form.querySelector('button[type="submit"], .btn-primary');
    if (!submitButton) return;
    
    if (isValid) {
        submitButton.disabled = false;
        submitButton.classList.remove('disabled');
    } else {
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
    }
}

// Initialize scroll effects for buttons
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all buttons
    document.querySelectorAll('.btn, .btn-gradient').forEach(button => {
        observer.observe(button);
    });
}

// Track button clicks for analytics
function trackButtonClick(button) {
    const trackingData = {
        buttonText: button.textContent.trim(),
        buttonClass: button.className,
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        sessionId: getSessionId()
    };
    
    // Store in localStorage for demo (replace with actual analytics)
    let clicks = JSON.parse(localStorage.getItem('buttonClicks') || '[]');
    clicks.push(trackingData);
    localStorage.setItem('buttonClicks', JSON.stringify(clicks));
    
    // Send to analytics service (replace with actual tracking)
    console.log('Button clicked:', trackingData);
}

// Get session ID for tracking
function getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
}

// Show notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('notification-show');
    }, 100);
}

// Add notification styles to page
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
        border-left: 4px solid #1e40af;
    }
    
    .notification-show {
        transform: translateX(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        padding: 1rem;
        gap: 0.75rem;
    }
    
    .notification-success {
        border-left-color: #10b981;
    }
    
    .notification-error {
        border-left-color: #ef4444;
    }
    
    .notification-info {
        border-left-color: #3b82f6;
    }
    
    .notification i {
        font-size: 1.2rem;
        color: #1e40af;
    }
    
    .notification-success i {
        color: #10b981;
    }
    
    .notification-error i {
        color: #ef4444;
    }
    
    .notification-info i {
        color: #3b82f6;
    }
    
    .notification span {
        flex: 1;
        font-size: 0.9rem;
        color: #2c3e50;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #64748b;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: all 0.2s ease;
    }
    
    .notification-close:hover {
        background: #f1f5f9;
        color: #1e40af;
    }
`;

// Add notification styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Export functions for global access
window.ButtonUtils = {
    showLoading: simulateAsyncOperation,
    showSuccess: showSuccessState,
    showError: showErrorState,
    showNotification: showNotification,
    validateField: validateField
};

// Initialize Welcome Slideshow
function initializeSlideshow() {
    const slideshow = document.querySelector('.welcome-slideshow');
    if (!slideshow) return;
    
    const slides = slideshow.querySelectorAll('.slide');
    const indicators = slideshow.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds per slide
    
    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Function to go to next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // Function to start automatic slideshow
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    // Function to stop automatic slideshow
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Add click events to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlideshow();
            showSlide(index);
            startSlideshow(); // Restart automatic slideshow after manual selection
        });
    });
    
    // Pause slideshow on hover
    slideshow.addEventListener('mouseenter', stopSlideshow);
    slideshow.addEventListener('mouseleave', startSlideshow);
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopSlideshow();
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
            startSlideshow();
        } else if (e.key === 'ArrowRight') {
            stopSlideshow();
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
            startSlideshow();
        }
    });
    
    // Add touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slideshow.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slideshow.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            stopSlideshow();
            if (diff > 0) {
                // Swipe left - next slide
                const nextIndex = (currentSlide + 1) % slides.length;
                showSlide(nextIndex);
            } else {
                // Swipe right - previous slide
                const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(prevIndex);
            }
            startSlideshow();
        }
    }
    
    // Add visibility change detection to pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopSlideshow();
        } else {
            startSlideshow();
        }
    });
    
}

// Function to go to next slide
function nextSlide() {
const nextIndex = (currentSlide + 1) % slides.length;
showSlide(nextIndex);
}

// Function to start automatic slideshow
function startSlideshow() {
slideInterval = setInterval(nextSlide, slideDuration);
}

// Function to stop automatic slideshow
function stopSlideshow() {
clearInterval(slideInterval);
}

// Add click events to indicators
indicators.forEach((indicator, index) => {
indicator.addEventListener('click', () => {
stopSlideshow();
showSlide(index);
startSlideshow(); // Restart automatic slideshow after manual selection
});
});

// Pause slideshow on hover
slideshow.addEventListener('mouseenter', stopSlideshow);
slideshow.addEventListener('mouseleave', startSlideshow);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
if (e.key === 'ArrowLeft') {
stopSlideshow();
const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
showSlide(prevIndex);
startSlideshow();
} else if (e.key === 'ArrowRight') {
stopSlideshow();
const nextIndex = (currentSlide + 1) % slides.length;
showSlide(nextIndex);
startSlideshow();
}
});

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

slideshow.addEventListener('touchstart', (e) => {
touchStartX = e.changedTouches[0].screenX;
});

slideshow.addEventListener('touchend', (e) => {
touchEndX = e.changedTouches[0].screenX;
handleSwipe();
});

function handleSwipe() {
const swipeThreshold = 50;
const diff = touchStartX - touchEndX;

if (Math.abs(diff) > swipeThreshold) {
stopSlideshow();
if (diff > 0) {
// Swipe left - next slide
const nextIndex = (currentSlide + 1) % slides.length;
showSlide(nextIndex);
} else {
// Swipe right - previous slide
const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
showSlide(prevIndex);
}
startSlideshow();
}
}

// Add visibility change detection to pause when tab is not visible
document.addEventListener('visibilitychange', () => {
if (document.hidden) {
stopSlideshow();
} else {
startSlideshow();
}
});

// Initialize first slide and start automatic slideshow
showSlide(0);
startSlideshow();

// Make slideshow functions globally accessible
window.SlideshowUtils = {
nextSlide: () => {
stopSlideshow();
nextSlide();
startSlideshow();
},
prevSlide: () => {
stopSlideshow();
const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
showSlide(prevIndex);
startSlideshow();
},
goToSlide: (index) => {
stopSlideshow();
showSlide(index);
startSlideshow();
},
pause: stopSlideshow,
resume: startSlideshow
};

// Initialize Theme Toggle
function initializeThemeToggle() {
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

if (!themeToggle || !themeIcon) return;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
setTheme(currentTheme);

// Add click event listener
themeToggle.addEventListener('click', () => {
const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
setTheme(newTheme);
saveThemePreference(newTheme);

// Add animation effect
themeToggle.style.transform = 'rotate(360deg) scale(0.9)';
setTimeout(() => {
themeToggle.style.transform = 'rotate(0deg) scale(1)';
}, 300);
});

// Add keyboard shortcut (Ctrl/Cmd + Shift + D)
document.addEventListener('keydown', (e) => {
if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
e.preventDefault();
themeToggle.click();
}
});

// Listen for system theme changes
if (window.matchMedia) {
const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkModeQuery.addListener((e) => {
if (!localStorage.getItem('theme')) {
// Only auto-switch if user hasn't manually set a preference
setTheme(e.matches ? 'dark' : 'light');
}
});
}
}

// Set theme function
function setTheme(theme) {
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

if (theme === 'dark') {
body.classList.add('dark-mode');
if (themeIcon) {
themeIcon.classList.remove('fa-moon');
themeIcon.classList.add('fa-sun');
}
} else {
body.classList.remove('dark-mode');
if (themeIcon) {
themeIcon.classList.remove('fa-sun');
themeIcon.classList.add('fa-moon');
}
}

// Update meta theme-color for mobile browsers
updateMetaThemeColor(theme);

// Dispatch theme change event
const event = new CustomEvent('themeChanged', { detail: { theme } });
document.dispatchEvent(event);
}

// Save theme preference
function saveThemePreference(theme) {
localStorage.setItem('theme', theme);

// Show notification
const message = theme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled';
showNotification(message, 'info');
}

// Update meta theme-color for mobile browsers
function updateMetaThemeColor(theme) {
let metaThemeColor = document.querySelector('meta[name="theme-color"]');
if (!metaThemeColor) {
metaThemeColor = document.createElement('meta');
metaThemeColor.name = 'theme-color';
document.head.appendChild(metaThemeColor);
}

if (theme === 'dark') {
metaThemeColor.content = '#1a1a1a'; // Dark grey theme color
} else {
metaThemeColor.content = '#1e40af'; // Light theme color (header color)
}
}

// Get current theme
function getCurrentTheme() {
return document.body.classList.contains('dark-mode') ? 'dark' : 'light';
}

// Toggle theme programmatically
function toggleTheme() {
const currentTheme = getCurrentTheme();
const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
setTheme(newTheme);
saveThemePreference(newTheme);
}

// Auto-detect system theme
function detectSystemTheme() {
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
return 'dark';
}
return 'light';
}

// Initialize mobile menu toggle
function initializeMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('.header-nav');
    const navList = document.getElementById('navList');

    if (toggle && nav) {
        toggle.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
            // Change icon
            const icon = toggle.querySelector('i');
            if (nav.classList.contains('nav-open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Close menu when clicking outside or on a link
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                nav.classList.remove('nav-open');
                const icon = toggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });

        // Close menu when clicking on a nav link
        if (navList) {
            navList.addEventListener('click', function(e) {
                if (e.target.tagName === 'A') {
                    nav.classList.remove('nav-open');
                    const icon = toggle.querySelector('i');
                    icon.className = 'fas fa-bars';
                }
            });
        }
    }
}

// Make theme functions globally accessible
window.ThemeUtils = {
setTheme: setTheme,
getCurrentTheme: getCurrentTheme,
toggleTheme: toggleTheme,
detectSystemTheme: detectSystemTheme
};
