// Smooth scroll for nav links
document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form handling with Formspree
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you! A recovery specialist will contact you within 24 hours.');
            form.reset();
        } else {
            response.json().then(data => {
                if (data.errors) {
                    alert(data.errors.map(error => error.message).join(', '));
                } else {
                    alert('Oops! There was a problem submitting your form.');
                }
            });
        }
    })
    .catch(error => {
        alert('Oops! There was a problem submitting your form.');
    });
});

// tawk.to toggle with connection check and fallback
const supportBtn = document.getElementById('supportBtn');
if (supportBtn) {
    let tawkReady = false;

    // Listen for tawk.to load event
    if (typeof Tawk_API !== 'undefined') {
        Tawk_API.onLoad = function() {
            tawkReady = true;
            console.log('tawk.to loaded');
        };
    }

    supportBtn.addEventListener('click', function() {
        if (typeof Tawk_API !== 'undefined' && Tawk_API.toggle) {
            // Try to toggle the widget
            Tawk_API.toggle();

            // If after 5 seconds the widget still isn't ready, offer a fallback
            setTimeout(function() {
                if (!tawkReady) {
                    const useFallback = confirm('Chat is taking a while to connect. Would you like to open it in a new tab instead?');
                    if (useFallback) {
                        window.open('https://tawk.to/chat/6996a5bac324771c3f1656b7/1jhq7eovi', '_blank');
                    }
                }
            }, 5000);
        } else {
            // Widget not loaded at all – offer fallback immediately
            const useFallback = confirm('Chat is currently unavailable. Would you like to open it in a new tab?');
            if (useFallback) {
                window.open('https://tawk.to/chat/6996a5bac324771c3f1656b7/1jhq7eovi', '_blank');
            }
        }
    });
}