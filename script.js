// Adiciona um único "ouvinte" que espera a página carregar completamente
document.addEventListener('DOMContentLoaded', function() {

  // ===============================================
  // ======== FUNCIONALIDADE DO MENU MOBILE ========
  // ===============================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinksContainer = document.getElementById('nav-links-container');

  if (hamburgerBtn && navLinksContainer) {
    hamburgerBtn.addEventListener('click', function() {
      // Adiciona ou remove a classe 'active' para mostrar/esconder o menu
      navLinksContainer.classList.toggle('active');
    });
  }

  // ===============================================
  // ===== EXPANSÃO DE IMAGENS (MODAL) =============
  // ===============================================
  const imgs = document.querySelectorAll('.expand-img');
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.querySelector('.modal .close');

  if (imgs && modal && modalImg && closeBtn) {
    imgs.forEach(function(img) {
      img.onclick = function() {
        modal.style.display = "flex";
        modalImg.src = this.src;
      }
    });

    closeBtn.onclick = function() {
      modal.style.display = "none";
    };

    modal.onclick = function(e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    };
  }

  // ===============================================
  // ====== FEEDBACK DO BOTÃO DE BUSCA =============
  // ===============================================
  const btnEncontrar = document.getElementById('btnEncontrar');
  if (btnEncontrar) {
    btnEncontrar.onclick = function(e) {
      e.preventDefault();
      alert('Funcionalidade de busca em desenvolvimento!');
    };
  }

  // ===============================================
  // ========= NAVEGAÇÃO SLIDER (SETAS) ============
  // ===============================================
  const slider = document.getElementById('sliderHS1');
  const left = document.getElementById('arrowLeft');
  const right = document.getElementById('arrowRight');
  if (slider && left && right) {
    left.onclick = () => slider.scrollBy({ left: -300, behavior: 'smooth' });
    right.onclick = () => slider.scrollBy({ left: 300, behavior: 'smooth' });
  }

});
