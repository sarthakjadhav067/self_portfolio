// ====== CUSTOM CURSOR ======
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
const cursorTrail = document.getElementById('cursor-trail');

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX - 7 + 'px';
  cursor.style.top = mouseY - 7 + 'px';

  cursorRing.style.left = mouseX - 20 + 'px';
  cursorRing.style.top = mouseY - 20 + 'px';

  // Create trail particles
  createTrail(mouseX, mouseY);
});

function createTrail(x, y) {
  const trail = document.createElement('div');
  trail.style.position = 'fixed';
  trail.style.width = '4px';
  trail.style.height = '4px';
  trail.style.background = 'rgba(0, 245, 255, 0.6)';
  trail.style.borderRadius = '50%';
  trail.style.pointerEvents = 'none';
  trail.style.zIndex = '9997';
  trail.style.left = x - 2 + 'px';
  trail.style.top = y - 2 + 'px';

  cursorTrail.appendChild(trail);

  let life = 20;
  const fade = setInterval(() => {
    life--;
    trail.style.opacity = life / 20;
    if (life <= 0) {
      clearInterval(fade);
      trail.remove();
    }
  }, 30);
}

// ====== HAMBURGER MENU ======
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when clicking links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ====== TYPED TEXT EFFECT ======
const typedText = document.getElementById('typed-text');
const textArray = [
  'Full Stack Developer',
  'Web Designer',
  'Problem Solver',
  'Tech Enthusiast'
];

let currentText = '';
let currentIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const fullText = textArray[currentIndex];

  if (!isDeleting) {
    currentText += fullText.charAt(charIndex);
    charIndex++;

    if (charIndex === fullText.length) {
      isDeleting = true;
      setTimeout(type, 2000);
      return;
    }
  } else {
    currentText = fullText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % textArray.length;
    }
  }

  typedText.textContent = currentText;
  setTimeout(type, isDeleting ? 50 : 100);
}

type();

// ====== PARTICLES ANIMATION ======
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= 0.002;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// ====== SCROLL REVEAL ======
const revealElements = document.querySelectorAll('section');

const revealOnScroll = () => {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add('reveal', 'visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ====== SKILL BARS ANIMATION ======
const skillFills = document.querySelectorAll('.skill-fill');

const animateSkills = () => {
  skillFills.forEach(fill => {
    const rect = fill.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      const width = fill.getAttribute('data-width');
      fill.style.width = width;
    }
  });
};

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// ====== CERTIFICATE UPLOAD ======
const certUpload = document.getElementById('cert-upload');
const certPreview = document.getElementById('cert-preview');
const certUploadBox = document.querySelector('.cert-upload');

certUploadBox.addEventListener('click', () => {
  certUpload.click();
});

certUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      certPreview.src = event.target.result;
      certPreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

// ====== CURSOR EFFECTS ON BUTTONS ======
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .sport-chip, .contact-card');

buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    cursorRing.style.width = '60px';
    cursorRing.style.height = '60px';
    cursorRing.style.opacity = '0.8';
  });

  button.addEventListener('mouseleave', () => {
    cursorRing.style.width = '40px';
    cursorRing.style.height = '40px';
    cursorRing.style.opacity = '0.6';
  });
});

// ====== SMOOTH SCROLL FOR NAVIGATION ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ====== CURSOR HIDE/SHOW ======
document.addEventListener('mouseleave', () => {
  cursor.style.display = 'none';
  cursorRing.style.display = 'none';
});

document.addEventListener('mouseenter', () => {
  cursor.style.display = 'block';
  cursorRing.style.display = 'block';
});
