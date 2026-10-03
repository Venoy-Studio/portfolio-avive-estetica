/**
 * Avive Estética — Website Clone para Portfólio
 * Script principal de interatividade, sliders, modais e contatos fictícios.
 */

(function () {
  'use strict';

  // --- CONTATOS FICTÍCIOS CONFIGURÁVEIS ---
  const FICTITIOUS_CONFIG = {
    phoneFormatted: '(22) 99999-0000',
    phoneRaw: '5522999990000',
    address: 'Av. John Kennedy, 500 - Sala 201 - Centro, Araruama - RJ, 28970-000',
    addressQuery: 'Av. John Kennedy, 500 - Centro, Araruama - RJ',
    instagramHandle: '@aviveestetica.demo',
    instagramUrl: 'https://instagram.com/aviveestetica.demo',
    clinicName: 'Avive Estética'
  };

  // Helper para gerar URL do WhatsApp
  function getWhatsAppUrl(text) {
    return `https://wa.me/${FICTITIOUS_CONFIG.phoneRaw}?text=${encodeURIComponent(text)}`;
  }

  // Helper para data atual YYYY-MM-DD
  function getTodayString() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // --- DADOS DOS SERVIÇOS & PLANOS ---
  const TREATMENTS_DATA = [
    {
      name: 'Cuidados faciais',
      tag: 'FACIAL',
      description: 'Um olhar atento para as necessidades da sua pele, com um plano de cuidado pensado para você.',
      items: [
        'Limpeza e cuidado da pele',
        'Hidratação facial profunda',
        'Avaliação personalizada e protocolo sob medida'
      ]
    },
    {
      name: 'Cuidados corporais',
      tag: 'CORPORAL',
      description: 'Tempo para desacelerar, cuidar do corpo e encontrar mais bem-estar na sua rotina.',
      items: [
        'Cuidados com a pele do corpo',
        'Bem-estar, relaxamento e drenagem',
        'Avaliação personalizada de contorno'
      ]
    },
    {
      name: 'Cuidado personalizado',
      tag: 'INTEGRADO',
      description: 'Seus objetivos são o ponto de partida. Juntas, encontramos o próximo passo do seu cuidado.',
      items: [
        'Escuta dos seus objetivos',
        'Orientação individual e diagnóstico estético',
        'Plano de acompanhamento contínuo'
      ]
    }
  ];

  const TESTIMONIALS_DATA = [
    {
      name: 'Mariana',
      photo: 'optimized/mariana.webp',
      text: 'Um atendimento acolhedor faz toda a diferença. Saí me sentindo ouvida e com mais vontade de reservar um tempo para cuidar de mim.'
    },
    {
      name: 'Renata',
      photo: 'optimized/renata.webp',
      text: 'Gostei da atenção aos detalhes e da conversa tranquila sobre o que fazia sentido para mim. Foi uma experiência leve e especial.'
    },
    {
      name: 'Camila',
      photo: 'optimized/camila.webp',
      text: 'Encontrei um espaço em que pude desacelerar e falar sobre meus objetivos sem pressa. O cuidado começou já na primeira conversa.'
    },
    {
      name: 'Helena',
      photo: 'optimized/helena.webp',
      text: 'A forma de receber e orientar transmite carinho. Saí com a sensação de ter dedicado um momento importante a mim mesma.'
    },
    {
      name: 'Juliana',
      photo: 'optimized/juliana.webp',
      text: 'Foi bom encontrar uma equipe que valoriza a naturalidade e respeita o meu ritmo. Me senti à vontade para perguntar e conversar.'
    }
  ];

  // --- INICIALIZAÇÃO APÓS DOM READY ---
  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgressBar();
    initMobileMenu();
    initScrollReveal();
    initComparisonSliders();
    initTestimonialsCarousel();
    initModals();
    initSmoothAnchors();
  });

  // 1. Barra de progresso de rolagem no cabeçalho
  function initScrollProgressBar() {
    const progressBar = document.querySelector('.header-progress-bar');
    if (!progressBar) return;

    let ticking = false;
    const updateProgress = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const progress = scrollHeight > 0 ? Math.max(0, Math.min(1, window.scrollY / scrollHeight)) : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  // 2. Menu Mobile Drawer
  function initMobileMenu() {
    const toggleBtn = document.querySelector('.menu-toggle');
    const nav = document.getElementById('site-navigation');
    const backdrop = document.querySelector('.menu-backdrop');
    const header = document.querySelector('header');
    if (!toggleBtn || !nav) return;

    const openMenu = () => {
      toggleBtn.classList.add('is-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.setAttribute('aria-label', 'Fechar menu');
      nav.classList.add('mobile-open');
      if (backdrop) backdrop.classList.add('is-open');
      if (header) header.classList.add('menu-activated');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      toggleBtn.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Abrir menu');
      nav.classList.remove('mobile-open');
      if (backdrop) backdrop.classList.remove('is-open');
      if (header) header.classList.remove('menu-activated');
      document.body.style.overflow = '';
    };

    toggleBtn.addEventListener('click', () => {
      const isOpen = nav.classList.contains('mobile-open');
      if (isOpen) closeMenu();
      else openMenu();
    });

    if (backdrop) {
      backdrop.addEventListener('click', closeMenu);
    }

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('mobile-open')) {
        closeMenu();
        toggleBtn.focus();
      }
    });

    const mql = window.matchMedia('(min-width: 768px)');
    mql.addEventListener('change', (e) => {
      if (e.matches) closeMenu();
    });
  }

  // 3. Revelação suave ao rolar (IntersectionObserver)
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => observer.observe(el));
  }

  // 4. Sliders interativos de Antes e Depois (Comparison Slider)
  function initComparisonSliders() {
    const cards = document.querySelectorAll('.comparison-card');

    cards.forEach(card => {
      const frame = card.querySelector('.comparison-frame');
      const range = card.querySelector('.comparison-range');
      if (!frame || !range) return;

      const setPosition = (pos) => {
        const clamped = Math.max(0, Math.min(100, Math.round(pos)));
        frame.style.setProperty('--comparison-position', `${clamped}%`);
        range.value = clamped;
        range.setAttribute('aria-valuetext', `${clamped}% antes, ${100 - clamped}% depois`);
      };

      // Evento nativo do input range
      range.addEventListener('input', (e) => {
        setPosition(e.target.value);
      });

      // Pointer / Mouse / Touch no frame
      let isDragging = false;

      const handlePointer = (e) => {
        const rect = frame.getBoundingClientRect();
        if (!rect.width) return;
        const x = e.clientX;
        const percentage = ((x - rect.left) / rect.width) * 100;
        setPosition(percentage);
      };

      frame.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        isDragging = true;
        frame.setPointerCapture(e.pointerId);
        range.focus({ preventScroll: true });
        handlePointer(e);
      });

      frame.addEventListener('pointermove', (e) => {
        if (isDragging) {
          handlePointer(e);
        }
      });

      const stopDrag = (e) => {
        if (isDragging) {
          isDragging = false;
          try {
            frame.releasePointerCapture(e.pointerId);
          } catch (_) {}
        }
      };

      frame.addEventListener('pointerup', stopDrag);
      frame.addEventListener('pointercancel', stopDrag);
    });
  }

  // 5. Carrossel de Depoimentos
  function initTestimonialsCarousel() {
    const swiperContainer = document.querySelector('.slider-container');
    if (!swiperContainer) return;

    // Se a biblioteca Swiper estiver carregada via script, use Swiper oficial
    if (typeof Swiper !== 'undefined') {
      new Swiper('.slider-container', {
        slidesPerView: 1,
        spaceBetween: 25,
        speed: 450,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        },
        keyboard: {
          enabled: true,
          onlyInViewport: true
        },
        grabCursor: true,
        rewind: true,
        breakpoints: {
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        },
        a11y: {
          prevSlideMessage: 'Depoimento anterior',
          nextSlideMessage: 'Próximo depoimento',
          paginationBulletMessage: 'Ir para o depoimento {{index}}',
          slideLabelMessage: '{{index}} de {{slidesLength}}',
          containerMessage: 'Depoimentos de clientes'
        }
      });
      return;
    }

    // Fallback nativo ultra-leve de carrossel caso Swiper CDN demore ou esteja offline
    initFallbackCarousel(swiperContainer);
  }

  function initFallbackCarousel(container) {
    const wrapper = container.querySelector('.swiper-wrapper');
    const slides = container.querySelectorAll('.swiper-slide');
    const prevBtn = container.querySelector('.swiper-button-prev');
    const nextBtn = container.querySelector('.swiper-button-next');
    const pagination = container.querySelector('.swiper-pagination');
    if (!wrapper || !slides.length) return;

    let currentIndex = 0;

    const getSlidesPerView = () => {
      const w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 768) return 2;
      return 1;
    };

    const getMaxIndex = () => Math.max(0, slides.length - getSlidesPerView());

    const updateCarousel = () => {
      const spv = getSlidesPerView();
      const maxIndex = getMaxIndex();
      if (currentIndex > maxIndex) currentIndex = maxIndex;

      const gap = 25; // 2.5rem
      const slideWidthPercent = 100 / spv;
      wrapper.style.display = 'flex';
      wrapper.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
      wrapper.style.transform = `translateX(-${currentIndex * (100 / spv)}%)`;

      slides.forEach(slide => {
        slide.style.flex = `0 0 calc(${slideWidthPercent}% - ${(gap * (spv - 1)) / spv}px)`;
        slide.style.marginRight = `${gap}px`;
      });

      // Bullets
      if (pagination) {
        pagination.innerHTML = '';
        for (let i = 0; i <= maxIndex; i++) {
          const bullet = document.createElement('span');
          bullet.className = `swiper-pagination-bullet ${i === currentIndex ? 'swiper-pagination-bullet-active' : ''}`;
          bullet.style.cursor = 'pointer';
          bullet.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
          });
          pagination.appendChild(bullet);
        }
      }

      if (prevBtn) prevBtn.classList.toggle('swiper-button-disabled', currentIndex === 0);
      if (nextBtn) nextBtn.classList.toggle('swiper-button-disabled', currentIndex >= maxIndex);
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        } else {
          currentIndex = getMaxIndex();
          updateCarousel();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < getMaxIndex()) {
          currentIndex++;
          updateCarousel();
        } else {
          currentIndex = 0;
          updateCarousel();
        }
      });
    }

    // Touch swipe simples
    let touchStartX = 0;
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0 && currentIndex < getMaxIndex()) {
          currentIndex++;
        } else if (diff < 0 && currentIndex > 0) {
          currentIndex--;
        }
        updateCarousel();
      }
    }, { passive: true });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
  }

  // 6. Sistema de Modais (Agendamento, Detalhes de Tratamento, Privacidade)
  function initModals() {
    // Referências dos modais
    const bookingOverlay = document.getElementById('booking-modal-overlay');
    const bookingModal = document.getElementById('booking-modal');
    const detailsOverlay = document.getElementById('details-modal-overlay');
    const detailsModal = document.getElementById('details-modal');
    const privacyOverlay = document.getElementById('privacy-modal-overlay');
    const privacyModal = document.getElementById('privacy-modal');

    // Estado do agendamento
    let currentStep = 1;
    let selectedService = 'Avaliação personalizada';
    let userName = '';
    let userDate = '';
    let userPeriod = 'Manhã';

    // Abrir Modal de Agendamento
    window.openBookingModal = (initialService = 'Avaliação personalizada') => {
      selectedService = initialService;
      currentStep = 1;
      const serviceSelect = document.getElementById('booking-service');
      if (serviceSelect) serviceSelect.value = initialService;

      const dateInput = document.getElementById('booking-date');
      if (dateInput) {
        dateInput.min = getTodayString();
        if (!dateInput.value) dateInput.value = getTodayString();
      }

      showStep(1);
      clearBookingError();
      if (bookingOverlay) {
        bookingOverlay.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
      }
    };

    window.closeBookingModal = () => {
      if (bookingOverlay) {
        bookingOverlay.setAttribute('hidden', '');
        document.body.style.overflow = '';
      }
    };

    // Abrir Modal de Detalhes de Tratamento
    window.openDetailsModal = (treatmentIndex) => {
      const treatment = TREATMENTS_DATA[treatmentIndex];
      if (!treatment) return;

      const titleEl = document.getElementById('details-title');
      const descEl = document.getElementById('details-desc');
      const listEl = document.getElementById('details-list');
      const ctaBtn = document.getElementById('details-cta');

      if (titleEl) titleEl.textContent = treatment.name;
      if (descEl) descEl.textContent = treatment.description;
      if (listEl) {
        listEl.innerHTML = treatment.items.map(item => `
          <li>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${item}</span>
          </li>
        `).join('');
      }

      if (ctaBtn) {
        ctaBtn.onclick = () => {
          window.closeDetailsModal();
          window.openBookingModal(treatment.name);
        };
      }

      if (detailsOverlay) {
        detailsOverlay.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
      }
    };

    window.closeDetailsModal = () => {
      if (detailsOverlay) {
        detailsOverlay.setAttribute('hidden', '');
        document.body.style.overflow = '';
      }
    };

    // Abrir Modal de Privacidade
    window.openPrivacyModal = () => {
      if (privacyOverlay) {
        privacyOverlay.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
      }
    };

    window.closePrivacyModal = () => {
      if (privacyOverlay) {
        privacyOverlay.setAttribute('hidden', '');
        document.body.style.overflow = '';
      }
    };

    // Passos do Agendamento
    function showStep(step) {
      currentStep = step;
      document.querySelectorAll('.booking-step-pane').forEach(pane => {
        pane.style.display = 'none';
      });

      const activePane = document.getElementById(`booking-step-${step}`);
      if (activePane) activePane.style.display = 'block';

      // Atualizar indicador de passos
      const stepIndicators = document.querySelectorAll('.steps span');
      stepIndicators.forEach((ind, idx) => {
        ind.classList.toggle('active', idx + 1 <= step);
      });

      // Botões do footer
      const backBtn = document.getElementById('booking-back-btn');
      const nextBtn = document.getElementById('booking-next-btn');
      const submitBtn = document.getElementById('booking-submit-btn');

      if (backBtn) backBtn.style.display = step > 1 ? 'inline-flex' : 'none';
      if (nextBtn) nextBtn.style.display = step < 3 ? 'inline-flex' : 'none';
      if (submitBtn) submitBtn.style.display = step === 3 ? 'inline-flex' : 'none';

      const smallNote = document.getElementById('booking-small-note');
      if (smallNote) smallNote.style.display = step === 3 ? 'block' : 'none';

      // Se for passo 3, preencher revisão
      if (step === 3) {
        updateReviewSummary();
      }
    }

    function setBookingError(msg) {
      const err = document.getElementById('booking-error');
      if (err) {
        err.textContent = msg;
        err.style.display = 'block';
      }
    }

    function clearBookingError() {
      const err = document.getElementById('booking-error');
      if (err) {
        err.textContent = '';
        err.style.display = 'none';
      }
    }

    function updateReviewSummary() {
      const revService = document.getElementById('review-service');
      const revName = document.getElementById('review-name');
      const revDateTime = document.getElementById('review-datetime');

      const dateParts = userDate.split('-');
      const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : userDate;

      if (revService) revService.textContent = selectedService;
      if (revName) revName.textContent = userName;
      if (revDateTime) revDateTime.textContent = `${formattedDate} — ${userPeriod}`;
    }

    // Navegação dos botões de agendamento
    const nextBtn = document.getElementById('booking-next-btn');
    const backBtn = document.getElementById('booking-back-btn');
    const submitBtn = document.getElementById('booking-submit-btn');
    const consentCheck = document.getElementById('booking-consent');

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        clearBookingError();

        if (currentStep === 1) {
          const serviceSelect = document.getElementById('booking-service');
          selectedService = serviceSelect ? serviceSelect.value : 'Avaliação personalizada';
          showStep(2);
        } else if (currentStep === 2) {
          const nameInput = document.getElementById('booking-name');
          const dateInput = document.getElementById('booking-date');
          const periodSelect = document.getElementById('booking-period');

          userName = nameInput ? nameInput.value.trim() : '';
          userDate = dateInput ? dateInput.value : '';
          userPeriod = periodSelect ? periodSelect.value : 'Manhã';

          if (!userName || userName.split(/\s+/).length < 2) {
            setBookingError('Informe seu nome e sobrenome.');
            return;
          }

          const today = getTodayString();
          if (!userDate || userDate < today) {
            setBookingError('Escolha uma data a partir de hoje.');
            return;
          }

          showStep(3);
        }
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        clearBookingError();
        if (currentStep > 1) {
          showStep(currentStep - 1);
        }
      });
    }

    if (consentCheck && submitBtn) {
      consentCheck.addEventListener('change', () => {
        submitBtn.classList.toggle('disabled', !consentCheck.checked);
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        clearBookingError();
        if (!consentCheck || !consentCheck.checked) {
          e.preventDefault();
          setBookingError('Para continuar, leia e aceite a autorização de contato.');
          return;
        }

        const dateParts = userDate.split('-');
        const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : userDate;

        const messageText = `Olá, Avive! Gostaria de solicitar uma avaliação.\nNome: ${userName}\nInteresse: ${selectedService}\nPreferência: ${formattedDate} — ${userPeriod}\nAutorizo o uso destas informações para responder à minha solicitação. Entendo que o horário depende de confirmação da equipe.`;

        submitBtn.href = getWhatsAppUrl(messageText);

        setTimeout(() => {
          window.closeBookingModal();
        }, 1200);
      });
    }

    // Fechamento de Modais com clique fora ou botão X
    [
      { overlay: bookingOverlay, close: window.closeBookingModal },
      { overlay: detailsOverlay, close: window.closeDetailsModal },
      { overlay: privacyOverlay, close: window.closePrivacyModal }
    ].forEach(({ overlay, close }) => {
      if (!overlay) return;
      overlay.addEventListener('click', (e) => {
        if (e.target.classList.contains('overlay') || e.target.closest('.modal-close')) {
          close();
        }
      });
    });

    // Tecla ESC fecha modais abertos
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (bookingOverlay && !bookingOverlay.hasAttribute('hidden')) window.closeBookingModal();
        if (detailsOverlay && !detailsOverlay.hasAttribute('hidden')) window.closeDetailsModal();
        if (privacyOverlay && !privacyOverlay.hasAttribute('hidden')) window.closePrivacyModal();
      }
    });

    // Gatilhos em botões pela página
    document.querySelectorAll('.open-booking-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const service = btn.getAttribute('data-service') || 'Avaliação personalizada';
        window.openBookingModal(service);
      });
    });

    document.querySelectorAll('.open-treatment-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(btn.getAttribute('data-treatment-index'), 10) || 0;
        window.openDetailsModal(idx);
      });
    });

    document.querySelectorAll('.open-privacy-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.openPrivacyModal();
      });
    });
  }

  // 7. Rolagem suave para âncoras internas
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

})();
