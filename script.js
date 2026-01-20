// ========================================
// SMOOTH SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ========================================
// NAVIGATION ACTIVE STATE
// ========================================

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.access-card, .timeline-item, .project-card, .skill-category, ' +
        '.soft-skill-card, .passion-block, .connection-card, .stat-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                skillObserver.unobserve(bar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
});

// ========================================
// TERMINAL TYPING EFFECT (HOME PAGE)
// ========================================

if (document.querySelector('.terminal-body')) {
    const terminalBody = document.querySelector('.terminal-body');
    const cursor = terminalBody.querySelector('.typing-cursor');
    
    // Add cursor blink
    if (cursor) {
        cursor.style.animation = 'blink 1s infinite';
    }
}

// ========================================
// NETWORK NODES ANIMATION (HOME PAGE)
// ========================================

const nodes = document.querySelectorAll('.node');
nodes.forEach((node, index) => {
    // Random float animation
    const duration = 4 + Math.random() * 4;
    const delay = Math.random() * 2;
    node.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    
    // Pulse effect
    setInterval(() => {
        node.style.boxShadow = `0 0 ${20 + Math.random() * 20}px var(--accent-green)`;
    }, 2000 + Math.random() * 3000);
});

// Connect nodes with lines (visual effect)
if (document.querySelector('.network-bg')) {
    const networkBg = document.querySelector('.network-bg');
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    networkBg.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = networkBg.offsetWidth;
        canvas.height = networkBg.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawConnections() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const nodeElements = Array.from(nodes);
        nodeElements.forEach((node1, i) => {
            nodeElements.slice(i + 1).forEach(node2 => {
                const rect1 = node1.getBoundingClientRect();
                const rect2 = node2.getBoundingClientRect();
                const networkRect = networkBg.getBoundingClientRect();
                
                const x1 = rect1.left - networkRect.left + rect1.width / 2;
                const y1 = rect1.top - networkRect.top + rect1.height / 2;
                const x2 = rect2.left - networkRect.left + rect2.width / 2;
                const y2 = rect2.top - networkRect.top + rect2.height / 2;
                
                const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                
                if (distance < 400) {
                    const opacity = (1 - distance / 400) * 0.3;
                    ctx.strokeStyle = `rgba(0, 255, 136, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
            });
        });
    }

    setInterval(drawConnections, 50);
}

// ========================================
// CARDS HOVER EFFECT
// ========================================

const cards = document.querySelectorAll('.access-card, .project-card, .tool-card, .soft-skill-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// STATS COUNTER ANIMATION
// ========================================

const statNumbers = document.querySelectorAll('.stat-number');

statNumbers.forEach(stat => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = stat.textContent;
                
                // Only animate if it's a number
                if (!isNaN(text)) {
                    const target = parseInt(text);
                    let current = 0;
                    const increment = target / 50;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current);
                        }
                    }, 20);
                }
                
                observer.unobserve(stat);
            }
        });
    }, observerOptions);
    
    observer.observe(stat);
});

// ========================================
// PARALLAX EFFECT FOR HERO SECTIONS
// ========================================

const heroSections = document.querySelectorAll('.hero, .page-hero');

heroSections.forEach(hero => {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroTop = hero.offsetTop;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroTop + heroHeight) {
            const parallax = (scrolled - heroTop) * 0.5;
            const overlay = hero.querySelector('.hero-overlay');
            if (overlay) {
                overlay.style.transform = `translateY(${parallax}px)`;
            }
        }
    });
});

// ========================================
// DYNAMIC TIMELINE CONNECTIONS
// ========================================

if (document.querySelector('.timeline')) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 100);
                    observer.unobserve(item);
                }
            });
        }, observerOptions);
        
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--accent-green);
    color: var(--primary-dark);
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 6px 20px rgba(0, 255, 136, 0.5)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 15px rgba(0, 255, 136, 0.3)';
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================

// Add mobile menu button for responsive design
if (window.innerWidth <= 768) {
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelector('.nav-links');
    
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '☰';
    menuBtn.style.cssText = `
        display: block;
        background: none;
        border: none;
        color: var(--accent-green);
        font-size: 2rem;
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    nav.querySelector('.nav-container').insertBefore(menuBtn, navLinks);
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    });
}

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c🔒 SYSTÈME SÉCURISÉ', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cPortfolio de Cathy Descoutures', 'color: #00d4ff; font-size: 14px;');
console.log('%cÉtudiante BUT3 Informatique | Spécialiste Réseau & Cybersécurité', 'color: #a0a0a0; font-size: 12px;');
console.log('%c« Connecter, Sécuriser, Innover »', 'color: #00ff88; font-style: italic;');

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images when added
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ========================================
// KEYBOARD NAVIGATION
// ========================================

document.addEventListener('keydown', (e) => {
    // Escape key to close any open modals (future feature)
    if (e.key === 'Escape') {
        // Close modal logic here
    }
    
    // Ctrl/Cmd + K for quick navigation (future feature)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Open quick navigation
    }
});

// ========================================
// LOADING ANIMATION
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
