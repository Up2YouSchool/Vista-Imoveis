// Adiciona um único "ouvinte" que espera a página carregar completamente
document.addEventListener('DOMContentLoaded', function () {

  // ===============================================
  // ======== FUNCIONALIDADE DO MENU MOBILE ========
  // ===============================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinksContainer = document.getElementById('nav-links-container');

  if (hamburgerBtn && navLinksContainer) {
    hamburgerBtn.addEventListener('click', function () {
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
    imgs.forEach(function (img) {
      img.onclick = function () {
        modal.style.display = "flex";
        modalImg.src = this.src;
      }
    });

    closeBtn.onclick = function () {
      modal.style.display = "none";
    };

    modal.onclick = function (e) {
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
    btnEncontrar.onclick = function (e) {
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

  /* ---------- Galeria móvel (empilha imagens no modal) ---------- */
  const openBtn = document.getElementById('openGalleryMobile');
  const galleryModal = document.getElementById('galleryModal');
  const galleryList = galleryModal ? galleryModal.querySelector('.gallery-list') : null;
  const galleryClose = galleryModal ? galleryModal.querySelector('.gallery-close') : null;
  const imgModal = document.getElementById('imgModal');
  const imgModalImg = document.getElementById('modalImg');

  function openGalleryModal() {
    if (!galleryList) return;
    galleryList.innerHTML = '';
    // pega imagens principais (expand-img) e imagens do bottom-slider
    const images = [
      ...document.querySelectorAll('.expand-img'),
      ...document.querySelectorAll('.bottom-slider img'),
      ...document.querySelectorAll('.slider img')
    ];
    images.forEach(img => {
      const clone = img.cloneNode(true);
      clone.removeAttribute('width');
      clone.removeAttribute('height');
      clone.style.width = '100%';
      clone.style.height = 'auto';
      clone.classList.add('gallery-item');
      // ao clicar na imagem do modal, abre modal grande
      clone.addEventListener('click', () => {
        openImageModal(clone.src, clone.alt || '');
      });
      galleryList.appendChild(clone);
    });
    galleryModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeGalleryModal() {
    if (!galleryModal) return;
    galleryModal.style.display = 'none';
    document.body.style.overflow = '';
    if (galleryList) galleryList.innerHTML = '';
  }

  function openImageModal(src, alt) {
    if (!imgModal || !imgModalImg) return;
    imgModalImg.src = src;
    imgModalImg.alt = alt;
    imgModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeImageModal() {
    if (!imgModal) return;
    imgModal.style.display = 'none';
    document.body.style.overflow = '';
    if (imgModalImg) imgModalImg.src = '';
  }

  if (openBtn) openBtn.addEventListener('click', openGalleryModal);
  if (galleryClose) galleryClose.addEventListener('click', closeGalleryModal);
  if (galleryModal) {
    galleryModal.addEventListener('click', function (e) {
      if (e.target === galleryModal) closeGalleryModal();
    });
  }

  // ligações para modal de imagem expandida
  document.querySelectorAll('.slider img, .expand-img, .bottom-slider img').forEach(img => {
    img.addEventListener('click', (e) => {
      openImageModal(e.currentTarget.src, e.currentTarget.alt || '');
    });
  });
  // fechar modal de imagem
  const imgClose = imgModal ? imgModal.querySelector('.close') : null;
  if (imgClose) imgClose.addEventListener('click', closeImageModal);
  if (imgModal) imgModal.addEventListener('click', (e) => { if (e.target === imgModal) closeImageModal(); });

  // ===============================================
  // ========== CADASTRO DE IMÓVEIS ================
  // ===============================================
  const btnCadastrarImovel = document.getElementById('btn-cadastrar-imovel');

  if (btnCadastrarImovel) {
    const inputTitulo = document.getElementById('titulo-imovel');
    const inputEndereco = document.getElementById('endereco-imovel');
    const inputPreco = document.getElementById('preco-imovel');
    const inputMetros = document.getElementById('metros-imovel');
    const inputQuartos = document.getElementById('quartos-imovel');
    const inputBanheiros = document.getElementById('banheiros-imovel');
    const mensagemStatus = document.getElementById('mensagem-cadastro-imovel');
    btnCadastrarImovel.addEventListener('click', async () => {
      try {
        const dadosDoImovel = {
          titulo: inputTitulo.value,
          endereco: inputEndereco.value,
          preco: parseFloat(inputPreco.value),
          metros_quadrados: parseFloat(inputMetros.value),
          quartos: parseInt(inputQuartos.value),
          banheiros: parseInt(inputBanheiros.value)
        };

        if (!dadosDoImovel.titulo || !dadosDoImovel.endereco) {
          throw new Error('Título e Endereço são obrigatórios.');
        }

        mensagemStatus.textContent = 'Cadastrando...';
        mensagemStatus.style.color = 'blue';

        const novoImovel = await criarImovel(dadosDoImovel);

        mensagemStatus.textContent = `Imóvel "${novoImovel.titulo}" cadastrado com sucesso! (ID: ${novoImovel.id})`;
        mensagemStatus.style.color = 'green';
        inputTitulo.value = '';
        inputEndereco.value = '';
        inputPreco.value = '';
        inputMetros.value = '';
        inputQuartos.value = '';
        inputBanheiros.value = '';

      } catch (error) {
        mensagemStatus.textContent = `Erro: ${error.message}`;
        mensagemStatus.style.color = 'white';
      }
    });
  }
});

// =============================================================================================
// ========= LOGIN DE CORRETOR, CADASTRO DE IMOVEIS E CADASTRO DE CORRETORES ===================
// =============================================================================================

document.addEventListener('DOMContentLoaded', () => {

  const formLogin = document.getElementById('form-login');

  if (formLogin) {
    const inputEmail = document.getElementById('login-email');
    const inputSenha = document.getElementById('login-senha');
    const mensagemStatus = document.getElementById('login-mensagem');

    formLogin.addEventListener('submit', async (evento) => {
      evento.preventDefault();

      mensagemStatus.textContent = '';

      const email = inputEmail.value;
      const senha = inputSenha.value;

      try {
        mensagemStatus.textContent = 'Autenticando...';
        mensagemStatus.style.color = 'white';

        await login(email, senha);

        mensagemStatus.textContent = 'Login realizado com sucesso! Redirecionando...';
        mensagemStatus.style.color = 'green';

        setTimeout(() => {
          window.location.href = 'cadastro-imovel.html';
        }, 2000);

      } catch (error) {
        mensagemStatus.textContent = `Erro: ${error.message}`;
        mensagemStatus.style.color = 'white';
      }
    });
  }

  const formCadastroVendedor = document.getElementById('form-cadastro-vendedor');

  if (formCadastroVendedor) {
    const inputNome = document.getElementById('cadastro-nome');
    const inputEmail = document.getElementById('cadastro-email');
    const inputCreci = document.getElementById('cadastro-creci');
    const inputSenha = document.getElementById('cadastro-senha');
    const inputSenhaConfirma = document.getElementById('cadastro-senha-confirma');
    const mensagemStatus = document.getElementById('cadastro-mensagem');

    formCadastroVendedor.addEventListener('submit', async (evento) => {
      evento.preventDefault();

      mensagemStatus.textContent = '';

      const nome = inputNome.value;
      const email = inputEmail.value;
      const creci = inputCreci.value;
      const senha = inputSenha.value;
      const senhaConfirma = inputSenhaConfirma.value;

      try {
        if (senha !== senhaConfirma) {
          throw new Error('As senhas não conferem.');
        }

        mensagemStatus.textContent = 'Cadastrando...';
        mensagemStatus.style.color = 'white';

        const dadosCorretor = { nome, email, senha, creci };

        const novoCorretor = await cadastrarCorretor(dadosCorretor);

        mensagemStatus.textContent = `Corretor "${novoCorretor.nome}" cadastrado com sucesso! Você já pode fazer o login.`;
        mensagemStatus.style.color = 'green';

        formCadastroVendedor.reset();

      } catch (error) {
        mensagemStatus.textContent = `Erro: ${error.message}`;
        mensagemStatus.style.color = 'red';
      }
    });
  }
});