/**
 * Rupesh Kumaran K R - Portfolio Scripts
 * Handles mobile nav toggle, smooth scrolling, skill filtering, dynamic year, and contact validation.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
    });

    // Close mobile menu on clicking any navigation link
    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Header elevation on scroll
  const header = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 4. Skills Category Tabs Filter
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-category-card');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Contact Form Validation & Mailto Action
  const form = document.getElementById('contactForm') as HTMLFormElement;
  const nameInput = document.getElementById('contactName') as HTMLInputElement;
  const emailInput = document.getElementById('contactEmail') as HTMLInputElement;
  const messageInput = document.getElementById('contactMsg') as HTMLTextAreaElement;
  const feedback = document.getElementById('formFeedback');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset errors
      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (messageError) messageError.textContent = '';
      if (feedback) {
        feedback.className = 'form-feedback';
        feedback.textContent = '';
      }

      const nameVal = nameInput?.value?.trim() || '';
      const emailVal = emailInput?.value?.trim() || '';
      const msgVal = messageInput?.value?.trim() || '';

      if (nameVal.length < 2) {
        if (nameError) nameError.textContent = 'Please enter your name (min 2 characters).';
        isValid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailVal)) {
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      if (msgVal.length < 10) {
        if (messageError) messageError.textContent = 'Please provide a message of at least 10 characters.';
        isValid = false;
      }

      if (isValid) {
        // Construct mailto link with encoded parameters
        const subject = encodeURIComponent('Portfolio Inquiry from ' + nameVal);
        const body = encodeURIComponent(
          'Name: ' + nameVal + '\n' +
          'Email: ' + emailVal + '\n\n' +
          'Message:\n' + msgVal
        );
        const mailtoUrl = 'mailto:rupeshk0392@gmail.com?subject=' + subject + '&body=' + body;

        if (feedback) {
          feedback.classList.add('success');
          feedback.textContent = 'Opening your email client to send your message to rupeshk0392@gmail.com...';
        }

        // Trigger mail client
        window.location.href = mailtoUrl;

        // Reset inputs
        form.reset();
      }
    });
  }
});
