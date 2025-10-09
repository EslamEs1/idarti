// Initialize AOS Animation Library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    disable: function() {
        // Disable animations on very small screens to prevent overflow
        var maxWidth = 768;
        return window.innerWidth < maxWidth;
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    // Get all forms with the 'needs-validation' class
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.from(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                // Here you would typically send the form data to a server
                // For demo purposes, we'll just show a success message
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> جاري الإرسال...';
                
                setTimeout(function() {
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success message
                    const successAlert = document.createElement('div');
                    successAlert.className = 'alert alert-success mt-3';
                    successAlert.role = 'alert';
                    successAlert.innerHTML = 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';
                    
                    form.appendChild(successAlert);
                    
                    // Remove the alert after 5 seconds
                    setTimeout(function() {
                        successAlert.remove();
                    }, 5000);
                }, 2000);
            }
            
            form.classList.add('was-validated');
        }, false);
    });
});

// Counter Animation
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 16ms is roughly 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, options);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for navbar height
                behavior: 'smooth'
            });
        }
    });
});

// Pricing Tabs Control - Only Clinic Available
document.addEventListener('DOMContentLoaded', function() {
    const academyTab = document.getElementById('academy-tab');
    const accountingTab = document.getElementById('accounting-tab');
    const comingSoonModal = new bootstrap.Modal(document.getElementById('comingSoonModal'));
    const comingSoonMessage = document.getElementById('comingSoonMessage');
    
    if (academyTab) {
        academyTab.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            comingSoonMessage.textContent = 'نظام إدارتي أكاديمي سيكون متاحاً قريباً! نحن نعمل بجد لتوفيره لك.';
            comingSoonModal.show();
        });
    }
    
    if (accountingTab) {
        accountingTab.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            comingSoonMessage.textContent = 'نظام إدارتي للمحاسبات سيكون متاحاً قريباً! نحن نعمل بجد لتوفيره لك.';
            comingSoonModal.show();
        });
    }
});
