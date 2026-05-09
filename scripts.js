// =====================
// MENU MOBILE
// Abre e fecha o menu no celular
// =====================
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#primary-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');

    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Fecha o menu mobile quando um link é clicado
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// =====================
// SCROLL SUAVE
// Faz os links internos descerem suavemente até cada seção
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const targetId = anchor.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// =====================
// CABEÇALHO AO ROLAR
// Adiciona uma classe no header depois que a página começa a rolar
// =====================
const header = document.querySelector('.site-header');

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// =====================
// GALERIA DO PORTFÓLIO
// Abre uma janela com mais fotos quando clicar em um projeto
// =====================
const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioModal = document.querySelector('#portfolio-modal');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const modalGallery = document.querySelector('#modal-gallery');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');

function openPortfolioModal(item) {
  if (!portfolioModal || !modalTitle || !modalDescription || !modalGallery) {
    return;
  }

  const title = item.dataset.title || 'Projeto';
  const description = item.dataset.description || 'Fotos do projeto selecionado.';
  const images = (item.dataset.images || '')
    .split(',')
    .map(image => image.trim())
    .filter(Boolean);

  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalGallery.innerHTML = '';

  images.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image;
    img.alt = `${title} - foto ${index + 1}`;
    modalGallery.appendChild(img);
  });

  portfolioModal.classList.add('open');
  portfolioModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closePortfolioModal() {
  if (!portfolioModal) {
    return;
  }

  portfolioModal.classList.remove('open');
  portfolioModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

portfolioItems.forEach(item => {
  item.addEventListener('click', () => openPortfolioModal(item));

  item.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPortfolioModal(item);
    }
  });
});

closeModalButtons.forEach(button => {
  button.addEventListener('click', closePortfolioModal);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closePortfolioModal();
  }
});
