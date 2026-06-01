// Cache the navbar and its initial position to prevent jittering when scrolling
const navbar = document.querySelector('nav');
const stickyPosition = navbar.offsetTop;

// 1. Smooth scroll for anchor links (Accounts for sticky header height)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculate the target position minus the navbar height to prevent overlapping
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 20; 
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 2. Making the navigation bar sticky at the top of the page
window.addEventListener('scroll', () => {
    const body = document.body;
    // Use the cached stickyPosition rather than navbar.offsetTop
    if (window.scrollY >= stickyPosition) {
        navbar.classList.add("sticky");
        body.classList.add('sticky-nav-padding');
    } else {
        navbar.classList.remove("sticky");
        body.classList.remove('sticky-nav-padding');
    }
});

// 3. Adding animations on scroll (Ensures smooth fade-in)
document.addEventListener("DOMContentLoaded", function() {
    // Temporarily hide elements via JS before the observer catches them
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
    });

    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('element-visible');
                // Reveal the element smoothly
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.15 // Triggers when 15% of the section is visible
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// 4. Highlight active menu item on scroll
window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;
    let links = document.querySelectorAll('nav ul li a');
    let sections = document.querySelectorAll('section');
    const navbarHeight = navbar.offsetHeight;
    
    sections.forEach(section => {
        // Adjust calculations so the active state triggers properly considering the header
        const sectionTop = section.offsetTop - navbarHeight - 50; 
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            links.forEach(link => {
                link.classList.remove('active');
                if (section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                    link.classList.add('active');
                }
            });
        }
    });
});