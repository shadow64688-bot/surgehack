// ─── Mobile Menu Toggle ───────────────────────────────────────────────────────
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ─── Smooth Scroll for Nav Links ─────────────────────────────────────────────
document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ─── Contact Form (Formspree) ─────────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = this;
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you! A recovery specialist will contact you within 24 hours.');
            form.reset();
        } else {
            response.json().then(data => {
                if (data.errors) {
                    alert(data.errors.map(e => e.message).join(', '));
                } else {
                    alert('Oops! There was a problem submitting your form.');
                }
            });
        }
    })
    .catch(() => {
        alert('Oops! There was a problem submitting your form.');
    });
});

// ─── Tawk.to Support Button ───────────────────────────────────────────────────
// Waits for Tawk_API to be ready, then wires the headset button to maximize the chat.
// No reconnecting logic — Tawk.to handles its own connection internally.

const supportBtn = document.getElementById('supportBtn');

if (supportBtn) {
    supportBtn.addEventListener('click', function () {
        if (typeof Tawk_API !== 'undefined' && typeof Tawk_API.maximize === 'function') {
            Tawk_API.maximize();
        } else {
            // Tawk.to not loaded yet (e.g. slow connection) — open direct link
            window.open('https://tawk.to/chat/6996a5bac324771c3f1656b7/1jhq7eovi', '_blank');
        }
    });
}