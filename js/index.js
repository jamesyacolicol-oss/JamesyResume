// Highlighting logic for Navbar
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar nav a");

function changeActiveNav() {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        // Check if the scroll position is within the section
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        // If we found a current section, highlight it
        if (current && link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
        // Default to Home if no section is active (e.g., at the very top)
        else if (!current && link.getAttribute("href") === "#home") {
            link.classList.add("active");
        }
    });
}

// 1. Run immediately on page load
window.addEventListener("DOMContentLoaded", () => {
    changeActiveNav();
    initTypewriter();
    initScrollAnimations();
});

// 2. Run every time the user scrolls
window.addEventListener("scroll", changeActiveNav);

// --- Scroll-triggered Fade In/Out Animations ---
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    // IntersectionObserver for triggering animations
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% of element is visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Remove active class when out of view for fade-out effect
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// --- Typewriter Effect for Role Tags ---
function initTypewriter() {
    const roles = [
        "Web Developer",
        "Flutter Developer",
        "Frontend",
        "Backend",
        "Software Developer",
    ];

    const textEl = document.querySelector(".typing-text");
    const cursorEl = document.querySelector(".typing-cursor");

    if (!textEl || !cursorEl) return;

    const typeSpeed = 80;     // ms per character when typing
    const eraseSpeed = 40;    // ms per character when erasing
    const pauseDuration = 1200; // ms to pause after fully typed

    let roleIndex = 0;
    let charIndex = 0;
    let isTyping = true;
    let isErasing = false;

    function type() {
        if (isTyping) {
            // Type characters one by one
            if (charIndex < roles[roleIndex].length) {
                charIndex++;
                textEl.textContent = roles[roleIndex].substring(0, charIndex);
                textEl.style.width = "auto";
                setTimeout(type, typeSpeed);
            } else {
                // Finished typing, pause then erase
                isTyping = false;
                setTimeout(erase, pauseDuration);
            }
        }
    }

    function erase() {
        if (charIndex > 0) {
            charIndex--;
            textEl.textContent = roles[roleIndex].substring(0, charIndex);
            setTimeout(erase, eraseSpeed);
        } else {
            // Finished erasing, move to next role
            roleIndex = (roleIndex + 1) % roles.length;
            isTyping = true;
            setTimeout(type, 300);
        }
    }

    // Start the cycle
    setTimeout(type, 500);
}