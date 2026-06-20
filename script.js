document.addEventListener('DOMContentLoaded', function() {
    // Language Toggle
    const langToggle = document.getElementById('langToggle');
    const langText = langToggle.querySelector('.lang-text');
    let currentLang = 'en';

    function toggleLanguage() {
        currentLang = currentLang === 'en' ? 'fa' : 'en';
        const html = document.documentElement;
        
        if (currentLang === 'fa') {
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'fa');
        } else {
            html.setAttribute('dir', 'ltr');
            html.setAttribute('lang', 'en');
        }

        // Handle hero name
        const heroName = document.querySelector('.hero-name');
        if (heroName) {
            heroName.textContent = heroName.getAttribute('data-' + currentLang);
        }

        // Handle "هستم" greeting suffix for Persian
        const greetingFa = document.querySelector('.hero-greeting-fa');
        if (greetingFa) {
            greetingFa.style.display = currentLang === 'fa' ? 'inline' : 'none';
        }

        // Update all text elements with data attributes
        document.querySelectorAll('[data-en]').forEach(function(el) {
            const text = el.getAttribute('data-' + currentLang);
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    // Don't update input values
                } else if (el.classList.contains('hero-name') || el.classList.contains('hero-greeting-fa')) {
                    // Skip - already handled above
                } else {
                    // Handle elements with child elements (like "About <span class='highlight'>Me</span>")
                    if (el.querySelector('.highlight')) {
                        if (text.includes('Me') && el.querySelector('.highlight')) {
                            el.innerHTML = 'About <span class="highlight">Me</span>';
                        } else if (text.includes('Skills') && el.querySelector('.highlight')) {
                            el.innerHTML = 'My <span class="highlight">Skills</span>';
                        } else if (text.includes('Projects') && el.querySelector('.highlight')) {
                            el.innerHTML = 'Featured <span class="highlight">Projects</span>';
                        } else if (text.includes('Touch') && el.querySelector('.highlight')) {
                            el.innerHTML = 'Get In <span class="highlight">Touch</span>';
                        } else {
                            el.textContent = text;
                        }
                    } else {
                        el.textContent = text;
                    }
                }
            }
        });

        // Update typed text strings
        if (currentLang === 'fa') {
            typedStrings = ['مهندس هوش مصنوعی', 'علاقه‌مند به تکنولوژی', 'حل‌کننده مشکلات', 'توسعه دهنده وب'];
        } else {
            typedStrings = ['AI Engineer', 'Technology Enthusiast', 'Problem Solver', 'Web Developer'];
        }

        // Update language toggle button text
        langText.textContent = currentLang === 'en' ? 'FA' : 'EN';
    }

    langToggle.addEventListener('click', toggleLanguage);

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        sections.forEach(function(section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });

    // Typing effect
    const typedText = document.getElementById('typedText');
    let typedStrings = ['AI Engineer', 'Technology Enthusiast', 'Problem Solver', 'Web Developer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = typedStrings[textIndex];
        if (isDeleting) {
            typedText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typedStrings.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // Create particles
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }

    // Scroll animations
    const animateElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(function(el) {
        observer.observe(el);
    });

    // Counter animation
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);

                function updateCount() {
                    count += increment;
                    if (count < target) {
                        entry.target.textContent = Math.floor(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.textContent = target;
                    }
                }
                updateCount();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function(counter) {
        counterObserver.observe(counter);
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = '<span>Sending...</span>';
        btn.disabled = true;
        
        // Submit form via fetch to Formspree
        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            if (response.ok) {
                // Success
                if (currentLang === 'fa') {
                    btn.innerHTML = '<span>پیام ارسال شد! ✓</span>';
                } else {
                    btn.innerHTML = '<span>Message Sent! ✓</span>';
                }
                btn.style.background = 'var(--secondary)';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(function(error) {
            // Error
            if (currentLang === 'fa') {
                btn.innerHTML = '<span>خطا در ارسال</span>';
            } else {
                btn.innerHTML = '<span>Error sending</span>';
            }
            btn.style.background = '#ef4444';
        })
        .finally(function() {
            setTimeout(function() {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
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
});