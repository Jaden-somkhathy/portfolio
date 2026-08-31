// ============================================================
// Mobile menu toggle
// ============================================================
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });
}

// ============================================================
// Scroll-spy: highlight the current section in the nav
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

function updateActiveLink() {
    const scrollY = window.scrollY;

    sections.forEach(sec => {
        const top = sec.offsetTop - 160;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// ============================================================
// Scroll-reveal: fades and slides elements in once, on entry
// ============================================================
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${(i % 6) * 70}ms`;
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('is-visible'));
}

// ============================================================
// Animated topology background (hero canvas)
// A network of connected, drifting nodes that keeps moving
// continuously behind the hero content.
// ============================================================
(function initTopology() {
    const canvas = document.getElementById('topology-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width, height, dpr, nodes;
    const NODE_COUNT_DIVISOR = 11000; // fewer nodes on smaller screens
    const LINK_DISTANCE = 170;
    const accent = 'rgba(124, 92, 252,';

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        dpr = window.devicePixelRatio || 1;
        width = rect.width;
        height = rect.height;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const count = Math.max(24, Math.floor((width * height) / NODE_COUNT_DIVISOR));
        nodes = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
        }));
    }

    function step() {
        ctx.clearRect(0, 0, width, height);

        nodes.forEach(n => {
            n.x += n.vx;
            n.y += n.vy;

            if (n.x <= 0 || n.x >= width) n.vx *= -1;
            if (n.y <= 0 || n.y >= height) n.vy *= -1;

            n.x = Math.min(Math.max(n.x, 0), width);
            n.y = Math.min(Math.max(n.y, 0), height);
        });

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < LINK_DISTANCE) {
                    ctx.strokeStyle = `${accent} ${0.28 * (1 - dist / LINK_DISTANCE)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        nodes.forEach(n => {
            ctx.fillStyle = `${accent} 0.8)`;
            ctx.beginPath();
            ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });

        if (!prefersReducedMotion) {
            requestAnimationFrame(step);
        }
    }

    resize();
    step();
    window.addEventListener('resize', resize);
})();