// ─── Toast Notification Helper ────────────────────────────────────────────────
function showToast(message, type = 'success') {
    // Remove any existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('show'));
    });

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 5000);
}

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
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Loading state
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            showToast('Your request has been received. A specialist will contact you within 24 hours.', 'success');
            form.reset();
        } else {
            return response.json().then(data => {
                const msg = data.errors
                    ? data.errors.map(e => e.message).join(', ')
                    : 'Something went wrong. Please try again.';
                showToast(msg, 'error');
            });
        }
    })
    .catch(() => {
        showToast('Unable to send your request. Please check your connection and try again.', 'error');
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

// ─── Tawk.to Support Button ───────────────────────────────────────────────────
const supportBtn = document.getElementById('supportBtn');

if (supportBtn) {
    supportBtn.addEventListener('click', function () {
        if (typeof Tawk_API !== 'undefined' && typeof Tawk_API.maximize === 'function') {
            Tawk_API.maximize();
        } else {
            window.open('https://tawk.to/chat/6996a5bac324771c3f1656b7/1jhq7eovi', '_blank');
        }
    });
}