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

// tawk.to toggle via custom button
const supportBtn = document.getElementById('supportBtn');
if (supportBtn) {
    supportBtn.addEventListener('click', function() {
        if (typeof Tawk_API !== 'undefined' && Tawk_API.toggle) {
            Tawk_API.toggle();
        } else {
            alert('Chat is initializing. Please try again in a moment.');
        }
    });
}