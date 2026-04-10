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
window.addEventListener("DOMContentLoaded", changeActiveNav);

// 2. Run every time the user scrolls
window.addEventListener("scroll", changeActiveNav);