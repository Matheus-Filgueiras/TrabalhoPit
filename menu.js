document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const menuLinks = document.getElementById('menu-links');
  
  // Função para alternar o menu
  function toggleMenu() {
    menuLinks.classList.toggle('ativo');
    menuToggle.classList.toggle('ativo');
    
    // Impedir/liberar scroll do body quando menu estiver aberto
    if (menuLinks.classList.contains('ativo')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  // Evento para o botão do menu
  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });
  }
  
  // Fechar menu ao clicar fora
  document.addEventListener('click', function(e) {
    if (menuLinks && menuToggle && 
        !menuLinks.contains(e.target) && 
        !menuToggle.contains(e.target) && 
        menuLinks.classList.contains('ativo')) {
      toggleMenu();
    }
  });
  
  // Gerenciar botão de ranking
  const btnRanking = document.querySelector('.btn-ranking');
  const rankingConteudo = document.getElementById('rankingConteudo');
  
  if (btnRanking && rankingConteudo) {
    btnRanking.addEventListener('click', function(e) {
      e.stopPropagation();
      rankingConteudo.classList.toggle('ativo');
    });
    
    // Fechar ranking ao clicar fora
    document.addEventListener('click', function(e) {
      if (!rankingConteudo.contains(e.target) && !btnRanking.contains(e.target)) {
        rankingConteudo.classList.remove('ativo');
      }
    });
  }
  
  // Marcar link ativo
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.menu-links a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (currentPage === linkPage) {
      link.classList.add('active');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const menuLinks = document.getElementById('menu-links');
  
  if (menuToggle && menuLinks) {
    menuToggle.addEventListener('click', function() {
      menuLinks.classList.toggle('ativo');
      this.classList.toggle('ativo');
      document.body.style.overflow = menuLinks.classList.contains('ativo') ? 'hidden' : '';
    });
  }
});