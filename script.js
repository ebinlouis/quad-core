document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Create floating avatar element
    const floatingAvatar = document.createElement('img');
    floatingAvatar.className = 'floating-avatar';
    document.body.appendChild(floatingAvatar);
    
    // Create particles
    createParticles();
    
    // Create scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    
    // Update scroll progress
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
        
        // Call the enhanced scroll animation
        animateOnScroll();
    });
    
    // Enhanced scroll animation with avatar flow
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('animated');
                }, delay * 1000);
            }
        });

        // Timeline items animation with avatar flow
        const timelineItems = document.querySelectorAll('.timeline-item');
        const dots = document.querySelectorAll('.connector-dots .dot');
        const teamSection = document.querySelector('#team');
        
        if (teamSection) {
            const teamSectionTop = teamSection.offsetTop;
            const teamSectionHeight = teamSection.offsetHeight;
            const scrollPosition = window.scrollY;
            
            // Only activate if we're in the team section
            if (scrollPosition > teamSectionTop - 300 && scrollPosition < teamSectionTop + teamSectionHeight - 300) {
                const timelineConnector = document.querySelector('.timeline-connector');
                if (timelineConnector) timelineConnector.style.opacity = '1';
                
                timelineItems.forEach((item, index) => {
                    const itemTop = item.getBoundingClientRect().top;
                    const windowMiddle = window.innerHeight / 2;
                    
                    if (itemTop < windowMiddle + 100 && itemTop > windowMiddle - 200) {
                        item.classList.add('animated');
                        
                        // Update active dot
                        dots.forEach(dot => dot.classList.remove('active'));
                        if (dots[index]) dots[index].classList.add('active');
                        
                        // Get avatar image
                        const avatarImg = item.querySelector('.timeline-avatar img');
                        
                        if (avatarImg) {
                            // Position floating avatar
                            floatingAvatar.src = avatarImg.src;
                            floatingAvatar.style.opacity = '1';
                            floatingAvatar.style.transform = `translate(calc(-100% - 30px), ${window.scrollY + itemTop - 40}px)`;
                            
                            // Add pulse effect to current timeline avatar
                            avatarImg.style.transform = 'scale(1.1)';
                            avatarImg.style.boxShadow = '0 0 20px rgba(110, 69, 226, 0.7)';
                            avatarImg.style.transition = 'all 0.5s ease';
                        }
                    } else {
                        // Reset other avatars
                        const avatarImg = item.querySelector('.timeline-avatar img');
                        if (avatarImg) {
                            avatarImg.style.transform = '';
                            avatarImg.style.boxShadow = '';
                        }
                    }
                });
            } else {
                const timelineConnector = document.querySelector('.timeline-connector');
                if (timelineConnector) timelineConnector.style.opacity = '0';
                floatingAvatar.style.opacity = '0';
            }
        }
    }
    
    // Initial check
    animateOnScroll();
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add submission animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
                showSuccessMessage();
                this.reset();
            }, 300);
        });
    }
    
    function showSuccessMessage() {
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <p>Thank you for your message! We'll get back to you soon.</p>
            </div>
        `;
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.classList.add('show');
        }, 50);
        
        setTimeout(() => {
            successMsg.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(successMsg);
            }, 500);
        }, 3000);
    }
    
    // Gradient background animation for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            heroSection.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
        });
    }

    // Team group photo hover effects
    const teamGroup = document.querySelector('.team-group');
    if (teamGroup) {
        teamGroup.addEventListener('mouseenter', () => {
            const connectors = teamGroup.querySelectorAll('.connector');
            connectors.forEach((connector, index) => {
                setTimeout(() => {
                    connector.style.opacity = '0.7';
                }, index * 200);
            });
        });

        teamGroup.addEventListener('mouseleave', () => {
            const connectors = teamGroup.querySelectorAll('.connector');
            connectors.forEach(connector => {
                connector.style.opacity = '0';
            });
        });
    }
    
    // Dot click navigation
    document.querySelectorAll('.connector-dots .dot').forEach(dot => {
        dot.addEventListener('click', function() {
            const memberIndex = parseInt(this.getAttribute('data-member')) - 1;
            const timelineItems = document.querySelectorAll('.timeline-item');
            if (timelineItems[memberIndex]) {
                window.scrollTo({
                    top: timelineItems[memberIndex].offsetTop + document.querySelector('#team').offsetTop - 150,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Create particles function
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);
        
        const particleCount = window.innerWidth < 768 ? 20 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 2px and 6px
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation duration
            const duration = Math.random() * 30 + 20;
            particle.style.animationDuration = `${duration}s`;
            
            // Random delay
            particle.style.animationDelay = `${Math.random() * 10}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Feature card hover effects
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.animation = 'textGlow 1.5s ease-in-out infinite alternate';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = '';
                icon.style.animation = '';
            }
        });
    });

    // Features Side Scroll Functionality
    const featuresScroll = document.querySelector('.features-scroll');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');

    if (featuresScroll && scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            featuresScroll.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
        
        scrollRightBtn.addEventListener('click', () => {
            featuresScroll.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
        
        // Hide/show arrows based on scroll position
        featuresScroll.addEventListener('scroll', () => {
            const maxScroll = featuresScroll.scrollWidth - featuresScroll.clientWidth;
            scrollLeftBtn.style.display = featuresScroll.scrollLeft <= 10 ? 'none' : 'flex';
            scrollRightBtn.style.display = featuresScroll.scrollLeft >= maxScroll - 10 ? 'none' : 'flex';
        });
        
        // Initial check
        featuresScroll.dispatchEvent(new Event('scroll'));
    }

    // Intersection Observer for more performant scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
});