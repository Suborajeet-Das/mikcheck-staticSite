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

// Meet the Team Section Slider
const teamMembers = [
  {
    name: "Rahul Upadhya",
    role: "Founder & Product Lead",
    about:
      "Rahul leads the MiCheck vision — connecting artists and venues through seamless collaboration and cutting-edge design.",
    photo: "./image/team1.jpg",
  },
  {
    name: "Priya Nair",
    role: "Marketing & Partnerships",
    about:
      "Priya builds strong relationships with venues and artists, ensuring MiCheck grows as a trusted network for the music industry.",
    photo: "./image/team2.jpg",
  },
  {
    name: "Arjun Mehta",
    role: "Lead Developer",
    about:
      "Arjun drives the technical foundation behind MiCheck, turning creative ideas into smooth, scalable digital experiences.",
    photo: "./image/team3.jpg",
  },
  {
    name: "Simran Kaur",
    role: "Design & Community",
    about:
      "Simran crafts MiCheck’s visual identity and engages with our growing community of musicians and fans worldwide.",
    photo: "./image/team4.jpg",
  },
];

let currentMember = 0;

const nameEl = document.getElementById("team-name");
const roleEl = document.getElementById("team-role");
const aboutEl = document.getElementById("team-about");
const photoEl = document.getElementById("team-photo");

const prevBtn = document.getElementById("prev-member");
const nextBtn = document.getElementById("next-member");

function updateTeamMember(index) {
  const member = teamMembers[index];
  nameEl.textContent = member.name;
  roleEl.textContent = member.role;
  aboutEl.textContent = member.about;
  photoEl.src = member.photo;
}

nextBtn.addEventListener("click", () => {
  currentMember = (currentMember + 1) % teamMembers.length;
  updateTeamMember(currentMember);
});

prevBtn.addEventListener("click", () => {
  currentMember = (currentMember - 1 + teamMembers.length) % teamMembers.length;
  updateTeamMember(currentMember);
});
