document.addEventListener('DOMContentLoaded', function() {
  // Scroll suave para links âncora
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Fechar menu mobile se estiver aberto
        const menu = document.getElementById('menu-links');
        if (menu.classList.contains('ativo')) {
          menu.classList.remove('ativo');
          document.getElementById('menu-toggle').classList.remove('ativo');
          document.body.style.overflow = '';
        }
      }
    });
  });
  
  // Animações ao scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.card, section h2, .banner-texto');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.classList.add('fade-in');
      }
    });
  };
  
  // Ativar animações
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
  
  // Efeito hover nos cards
  document.querySelectorAll('.card-hover').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
  
  // Validação básica de formulários
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      const inputs = this.querySelectorAll('input[required], select[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = '#e74c3c';
          isValid = false;
          
          // Resetar cor após 2 segundos
          setTimeout(() => {
            input.style.borderColor = '';
          }, 2000);
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        const errorMessage = document.createElement('div');
        errorMessage.className = 'message error';
        errorMessage.textContent = 'Por favor, preencha todos os campos obrigatórios!';
        this.prepend(errorMessage);
        
        setTimeout(() => {
          errorMessage.remove();
        }, 3000);
      }
    });
  });
});