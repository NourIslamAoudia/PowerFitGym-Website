document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const header = document.querySelector('header');
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    const form = document.getElementById('form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Navigation toggle
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Burger Animation
        burger.classList.toggle('toggle');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
    
    // Scroll header change
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Accordion functionality
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            
            // Toggle active class on clicked item
            accordionItem.classList.toggle('active');
            
            // Close other items
            accordionBtns.forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.parentElement.classList.remove('active');
                }
            });
        });
    });
    
    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // In a real-world scenario, this would send data to a server
                // For demo purposes, we'll just show a success message
                
                // Check if success message already exists, if not create it
                let successMessage = form.querySelector('.success-message');
                if (!successMessage) {
                    successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Votre message a été envoyé avec succès. Nous vous contacterons bientôt!';
                    form.appendChild(successMessage);
                }
                
                // Show the success message
                successMessage.style.display = 'block';
                
                // Reset form
                form.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                // Show error message
                let errorMessage = form.querySelector('.error-message');
                if (!errorMessage) {
                    errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Veuillez remplir tous les champs du formulaire.';
                    form.appendChild(errorMessage);
                }
                
                // Show the error message
                errorMessage.style.display = 'block';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
    
    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Show success message
                let successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.style.display = 'block';
                successMessage.textContent = 'Merci de vous être abonné à notre newsletter!';
                
                // Insert after form
                this.parentNode.insertBefore(successMessage, this.nextSibling);
                
                // Reset form
                this.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Animation on scroll for services and pricing cards
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.service-card, .pricing-card');
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial setup for animations
    document.querySelectorAll('.service-card, .pricing-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Listen for scroll to trigger animations
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements in view
    animateOnScroll();
});