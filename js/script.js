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
    supportBtn.addEventListener('click', function() {
        // If tawk.to API is ready, toggle the widget
        if (typeof Tawk_API !== 'undefined' && Tawk_API.toggle) {
            Tawk_API.toggle();
            
            // Optional: monitor if the widget actually opens
            // We'll set a timeout to detect if it's still "Reconnecting"
            setTimeout(function() {
                // You can't directly check the widget's connection state,
                // but we can show a non‑intrusive message after a few seconds.
                // This is a UX improvement, not a fix.
                console.log('If you see "Reconnecting", please check your network or try again later.');
            }, 5000);
        } else {
            // Widget not loaded at all – show a message with alternative contacts
            alert('Chat is temporarily unavailable. Please reach out via WhatsApp or Telegram, or use the contact form.');
        }
    });
}

// Optional: listen for tawk.to events (advanced)
if (typeof Tawk_API !== 'undefined') {
    Tawk_API.onLoad = function() {
        console.log('tawk.to widget loaded successfully.');
    };
    Tawk_API.onOffline = function() {
        console.log('tawk.to is offline.');
    };
    Tawk_API.onError = function(reason) {
        console.log('tawk.to error:', reason);
    };
}