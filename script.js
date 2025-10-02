// Expansão de imagens do slider (modal)
document.addEventListener('DOMContentLoaded', function() {
  // Modal de imagem expandida
  var imgs = document.querySelectorAll('.expand-img');
  var modal = document.getElementById('imgModal');
  var modalImg = document.getElementById('modalImg');
  var closeBtn = document.querySelector('.modal .close');

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
      if(e.target === modal) modal.style.display = "none";
    };
  }

  // Feedback ao clicar em "Encontrar" na barra de pesquisa
  var btnEncontrar = document.getElementById('btnEncontrar');
  if (btnEncontrar) {
    btnEncontrar.onclick = function(e) {
      e.preventDefault();
      alert('Funcionalidade de busca em desenvolvimento!');
    };
  }

  // Exemplo de validação de formulário (procure por forms com id="cadastroForm")
  var cadastroForm = document.getElementById('cadastroForm');
  if (cadastroForm) {
    cadastroForm.onsubmit = function(e) {
      var email = document.getElementById('email');
      if(email && !email.value.includes('@')) {
        alert('Digite um e-mail válido!');
        e.preventDefault();
      }
    }
  }
});

// Navegação por setas no slider custom-grid-hs1
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('sliderHS1');
  const left = document.getElementById('arrowLeft');
  const right = document.getElementById('arrowRight');
  if (slider && left && right) {
    left.onclick = () => slider.scrollBy({ left: -300, behavior: 'smooth' });
    right.onclick = () => slider.scrollBy({ left: 300, behavior: 'smooth' });
  }
});