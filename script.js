// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply saved theme on load
if (currentTheme === 'dark') {
    htmlElement.classList.add('dark');
    if (sunIcon && moonIcon) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

// Theme toggle click handler
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        
        // Update icons
        if (sunIcon && moonIcon) {
            sunIcon.classList.toggle('hidden');
            moonIcon.classList.toggle('hidden');
        }
        
        // Save preference
        const theme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = document.querySelector('.header').offsetHeight;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset - 20; // 20px padding

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Form Handling (Sign In)
const signinForm = document.getElementById('signin-form');
if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        console.log('Sign In attempt:', { email, password });
        alert('Sign in functionality would connect to your backend here. Email: ' + email);
        
        // In a real application, you would send this to your backend
        // Example: fetch('/api/signin', { method: 'POST', body: JSON.stringify({ email, password }) })
    });
}

// Form Handling (Sign Up)
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        console.log('Sign Up attempt:', { fullname, email, password });
        alert('Sign up functionality would connect to your backend here. Name: ' + fullname);
        
        // In a real application, you would send this to your backend
        // Example: fetch('/api/signup', { method: 'POST', body: JSON.stringify({ fullname, email, password }) })
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('.newsletter-input').value;
        
        console.log('Newsletter subscription:', email);
        alert('Thanks for subscribing! You will receive updates at: ' + email);
        
        // Reset form
        newsletterForm.reset();
    });
}

// Add animation on scroll for feature cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Hero Slideshow Carousel
const slides = document.querySelectorAll('.hero-slide');
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

if (slides.length > 0) {
  showSlide(0);
  setInterval(nextSlide, 5000); // every 5 seconds
}

// 3D Hover Tilt Effect for Feature Cards
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position within card
    const y = e.clientY - rect.top;  // Y position within card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Tilt angles
    const rotateX = ((y - centerY) / centerY) * 8; // max 8deg tilt
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(800px) rotateX(${ -rotateX }deg) rotateY(${ rotateY }deg) scale(1.08)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
});


// 3D Hover Tilt Effect for Feature Cards
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position within card
    const y = e.clientY - rect.top;  // Y position within card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Tilt angles
    const rotateX = ((y - centerY) / centerY) * 8; // max 8deg tilt
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(800px) rotateX(${ -rotateX }deg) rotateY(${ rotateY }deg) scale(1.08)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
});

// Team Slider JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.team-track');
    const members = document.querySelectorAll('.team-member');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const totalMembers = members.length;
    
    // Touch/swipe variables
    let startX = 0;
    let endX = 0;
    let isDragging = false;

    // Update slider position and active states
    function updateSlider(index) {
        // Ensure index is within bounds
        currentIndex = Math.max(0, Math.min(index, totalMembers - 1));
        
        // Move track
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        
        // Update active member
        members.forEach((member, i) => {
            member.classList.toggle('active', i === currentIndex);
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        nextBtn.style.opacity = currentIndex === totalMembers - 1 ? '0.3' : '1';
        nextBtn.style.pointerEvents = currentIndex === totalMembers - 1 ? 'none' : 'auto';
    }

    // Previous button
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            updateSlider(currentIndex - 1);
        }
    });

    // Next button
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalMembers - 1) {
            updateSlider(currentIndex + 1);
        }
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateSlider(index);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            if (currentIndex > 0) updateSlider(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            if (currentIndex < totalMembers - 1) updateSlider(currentIndex + 1);
        }
    });

    // Touch/Swipe events
    const slider = document.querySelector('.team-slider');

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        endX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const diff = startX - endX;
        const threshold = 50; // Minimum swipe distance
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentIndex < totalMembers - 1) {
                // Swiped left - go to next
                updateSlider(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                // Swiped right - go to previous
                updateSlider(currentIndex - 1);
            }
        }
        
        startX = 0;
        endX = 0;
    });

    // Mouse drag events (for desktop)
    let mouseDown = false;
    let startXMouse = 0;
    let endXMouse = 0;

    slider.addEventListener('mousedown', (e) => {
        mouseDown = true;
        startXMouse = e.clientX;
        slider.style.cursor = 'grabbing';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!mouseDown) return;
        endXMouse = e.clientX;
    });

    slider.addEventListener('mouseup', () => {
        if (!mouseDown) return;
        mouseDown = false;
        slider.style.cursor = 'grab';
        
        const diff = startXMouse - endXMouse;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentIndex < totalMembers - 1) {
                updateSlider(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                updateSlider(currentIndex - 1);
            }
        }
        
        startXMouse = 0;
        endXMouse = 0;
    });

    slider.addEventListener('mouseleave', () => {
        if (mouseDown) {
            mouseDown = false;
            slider.style.cursor = 'grab';
        }
    });

    // Initialize
    slider.style.cursor = 'grab';
    updateSlider(0);
});

function scrollToNewsletter() {
  const section = document.getElementById("newsletter");
  const header = document.querySelector(".header");
  
  if (section && header) {
    const headerHeight = header.offsetHeight;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const offset = sectionTop - headerHeight - 20; // adjust padding
    
    window.scrollTo({
      top: offset,
      behavior: "smooth"
    });
  } else {
    console.error("Newsletter section not found!");
  }
}


