document.addEventListener('DOMContentLoaded', function() {
  // Modal de novo lançamento
  const btnNovoLancamento = document.getElementById('btnNovoLancamento');
  const modalNovoLancamento = document.getElementById('modalNovoLancamento');
  const closeModal = document.querySelector('.close-modal');
  
  if (btnNovoLancamento && modalNovoLancamento) {
    btnNovoLancamento.addEventListener('click', function() {
      modalNovoLancamento.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
    
    closeModal.addEventListener('click', function() {
      modalNovoLancamento.style.display = 'none';
      document.body.style.overflow = '';
    });
    
    window.addEventListener('click', function(e) {
      if (e.target === modalNovoLancamento) {
        modalNovoLancamento.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }
  
  // Formulário de novo lançamento
  const formNovoLancamento = document.getElementById('formNovoLancamento');
  
  if (formNovoLancamento) {
    formNovoLancamento.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simular salvamento
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.innerHTML = 'Salvar Lançamento';
        submitBtn.disabled = false;
        modalNovoLancamento.style.display = 'none';
        document.body.style.overflow = '';
        
        // Aqui você pode adicionar a lógica para salvar o lançamento
        showMessage('Lançamento salvo com sucesso!', 'success');
        formNovoLancamento.reset();
      }, 1500);
    });
  }
  
  // Filtros do extrato
  const btnFiltrar = document.getElementById('btnFiltrar');
  const btnLimpar = document.getElementById('btnLimpar');
  
  if (btnFiltrar && btnLimpar) {
    btnFiltrar.addEventListener('click', function() {
      // Simular filtragem
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Filtrando...';
      
      setTimeout(() => {
        this.innerHTML = 'Aplicar Filtros';
        showMessage('Filtros aplicados com sucesso!', 'success');
      }, 1000);
    });
    
    btnLimpar.addEventListener('click', function() {
      document.getElementById('periodo').value = 'tudo';
      document.getElementById('tipo').value = 'todos';
      document.getElementById('categoria').value = 'todas';
      showMessage('Filtros limpos com sucesso!', 'success');
    });
  }
});

function showMessage(text, type) {
  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = text;
  
  const container = document.querySelector('.container-extrato');
  if (container) {
    container.prepend(message);
    
    setTimeout(() => {
      message.remove();
    }, 3000);
  }
}