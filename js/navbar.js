const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-links a");
const overlay = document.querySelector(".menu-overlay");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navbar.classList.remove("active");
    overlay.classList.remove("active");
});


navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        hamburger.classList.remove("active");
    });
});

// Navbar scroll code for all pages
const tabContainer = document.querySelector(".tab-container");

window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        tabContainer.classList.add("scrolled");
    } else {
        tabContainer.classList.remove("scrolled");
    }
});