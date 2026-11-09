/**
 * ==========================================================================
 * ALFAJRIA SAFIRA PUTRI - BESPOKE EDITORIAL PORTFOLIO JAVASCRIPT
 * ==========================================================================
 * Fitur:
 * 1. Live Clock Widget (Waktu Lokal Cimahi / WIB)
 * 2. Dynamic Typing Effect (Spesialisasi RPL)
 * 3. Sticky Island Navbar & Scrollspy (Indikator Menu Aktif)
 * 4. Mobile Menu Navigation
 * 5. Salin Email ke Clipboard dengan Notifikasi Toast
 * 6. Validasi Form Kontak & Feedback Interaktif
 * 7. Modal Download CV & Cetak PDF Otomatis
 * 8. Tombol Kembali ke Atas (Back to Top)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. UPDATE TAHUN DI FOOTER & JAM LOKAL CIMAHI (WIB)
  // --------------------------------------------------------------------------
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  const liveClockEl = document.getElementById('live-clock');
  function updateClock() {
    if (!liveClockEl) return;
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      liveClockEl.textContent = `${formatter.format(now)} WIB`;
    } catch (e) {
      liveClockEl.textContent = 'Cimahi, ID';
    }
  }
  updateClock();
  setInterval(updateClock, 15000);

  // --------------------------------------------------------------------------
  // 2. SISTEM NOTIFIKASI TOAST ELEGAN
  // --------------------------------------------------------------------------
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'info', duration = 3500) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-circle-info';
    if (type === 'success') iconClass = 'fa-circle-check';
    if (type === 'danger') iconClass = 'fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => {
        toast.remove();
      });
    }, duration);
  }

  // --------------------------------------------------------------------------
  // 3. EFEK MENGETIK OTOMATIS (DYNAMIC TYPING)
  // --------------------------------------------------------------------------
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      'Frontend Web Developer',
      'UI/UX Enthusiast',
      'Rekayasa Perangkat Lunak Graduate',
      'Clean Code & Responsive Web'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 85;
    const deletingSpeed = 40;
    const pauseDelay = 2000;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentRole.length) {
        speed = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
      }

      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }

  // --------------------------------------------------------------------------
  // 4. NAVBAR SCROLL EFFECT & MOBILE MENU
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-item, .nav-item-link, .nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);

      const icon = navToggle.querySelector('i');
      if (isOpen) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars-staggered';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          const icon = navToggle.querySelector('i');
          icon.className = 'fa-solid fa-bars-staggered';
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        const icon = navToggle.querySelector('i');
        icon.className = 'fa-solid fa-bars-staggered';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. SCROLLSPY (NAVIGASI AKTIF SAAT SCROLL)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);

  // --------------------------------------------------------------------------
  // 6. MODAL DOWNLOAD CV & PRINT PDF
  // --------------------------------------------------------------------------
  const cvModal = document.getElementById('cv-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const triggerDownloadBtns = [
    document.getElementById('nav-download-cv-btn'),
    document.getElementById('hero-download-cv-btn'),
    document.getElementById('footer-download-cv')
  ];
  const optionPrintPdf = document.getElementById('option-print-pdf');
  const footerPrintCv = document.getElementById('footer-print-cv');

  function openCvModal() {
    if (cvModal) {
      cvModal.classList.add('active');
      cvModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCvModal() {
    if (cvModal) {
      cvModal.classList.remove('active');
      cvModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  triggerDownloadBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCvModal();
      });
    }
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCvModal);
  }

  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) {
        closeCvModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal && cvModal.classList.contains('active')) {
      closeCvModal();
    }
  });

  function handlePrintCv() {
    closeCvModal();
    showToast('Mempersiapkan lembar cetak CV resmi...', 'info', 2000);
    setTimeout(() => {
      window.print();
    }, 450);
  }

  if (optionPrintPdf) {
    optionPrintPdf.addEventListener('click', handlePrintCv);
  }

  if (footerPrintCv) {
    footerPrintCv.addEventListener('click', (e) => {
      e.preventDefault();
      handlePrintCv();
    });
  }

  // --------------------------------------------------------------------------
  // 7. SALIN EMAIL KE CLIPBOARD DENGAN 1-KLIK
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('email-text');

  if (copyEmailBtn && emailTextEl) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = emailTextEl.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        showToast(`Email ${email} berhasil disalin!`, 'success');
        
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Tersalin!</span>';
        setTimeout(() => {
          copyEmailBtn.innerHTML = '<i class="fa-regular fa-copy"></i> <span>Salin</span>';
        }, 2200);
      } catch (err) {
        showToast('Gagal menyalin email secara otomatis.', 'danger');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. FORMULIR KONTAK & VALIDASI
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');
    const submitBtn = document.getElementById('form-submit-btn');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(inputEl, errorElId, message) {
      inputEl.classList.add('error');
      const errorEl = document.getElementById(errorElId);
      if (errorEl) errorEl.textContent = message;
    }

    function clearError(inputEl, errorElId) {
      inputEl.classList.remove('error');
      const errorEl = document.getElementById(errorElId);
      if (errorEl) errorEl.textContent = '';
    }

    nameInput.addEventListener('input', () => clearError(nameInput, 'name-error'));
    emailInput.addEventListener('input', () => clearError(emailInput, 'email-error'));
    subjectInput.addEventListener('input', () => clearError(subjectInput, 'subject-error'));
    messageInput.addEventListener('input', () => clearError(messageInput, 'message-error'));

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      if (!nameInput.value.trim()) {
        showError(nameInput, 'name-error', 'Nama lengkap wajib diisi.');
        isValid = false;
      }

      if (!emailInput.value.trim()) {
        showError(emailInput, 'email-error', 'Alamat email wajib diisi.');
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'email-error', 'Format email tidak valid.');
        isValid = false;
      }

      if (!subjectInput.value.trim()) {
        showError(subjectInput, 'subject-error', 'Subjek pesan wajib diisi.');
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        showError(messageInput, 'message-error', 'Isi pesan tidak boleh kosong.');
        isValid = false;
      } else if (messageInput.value.trim().length < 8) {
        showError(messageInput, 'message-error', 'Pesan minimal berisi 8 karakter.');
        isValid = false;
      }

      if (isValid) {
        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Mengirim pesan...</span>';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
          showToast('Terima kasih! Pesan Anda telah berhasil terkirim.', 'success', 4500);
          contactForm.reset();
        }, 1100);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. ANIMASI HALUS MUNCUL SAAT SCROLL (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(
    '.bento-tile, .academic-rose-card, .skills-card-box, .contact-card-glass, .pastel-tech-tile, .soft-chic-card'
  );

  revealElements.forEach(el => el.classList.add('reveal-item'));

  const scrollObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => scrollObserver.observe(el));

  // --------------------------------------------------------------------------
  // 10. TOMBOL KEMBALI KE ATAS
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 320) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
