document.addEventListener('DOMContentLoaded', function() {
  // Verificar se a página de relatórios existe
  if (document.getElementById('graficoCategorias')) {
    // Filtro de período personalizado
    const periodoRelatorio = document.getElementById('periodoRelatorio');
    const rangePersonalizado = document.getElementById('rangePersonalizado');
    
    periodoRelatorio.addEventListener('change', function() {
      rangePersonalizado.style.display = this.value === 'personalizado' ? 'flex' : 'none';
    });
    
    // Botão Gerar Relatório
    const btnGerarRelatorio = document.querySelector('.btn-gerar-relatorio');
    btnGerarRelatorio.addEventListener('click', function() {
      // Simular carregamento
      const originalText = btnGerarRelatorio.innerHTML;
      btnGerarRelatorio.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando...';
      btnGerarRelatorio.disabled = true;
      
      // Simular processamento
      setTimeout(() => {
        btnGerarRelatorio.innerHTML = originalText;
        btnGerarRelatorio.disabled = false;
        
        // Mostrar mensagem de sucesso
        const mensagem = document.createElement('div');
        mensagem.className = 'message success';
        mensagem.textContent = 'Relatório atualizado com sucesso!';
        document.querySelector('.filtros-relatorios').appendChild(mensagem);
        
        setTimeout(() => {
          mensagem.remove();
        }, 3000);
      }, 1500);
    });
    
    // Botões de exportação
    document.querySelectorAll('.btn-relatorio').forEach(btn => {
      btn.addEventListener('click', function() {
        const action = this.querySelector('.fa-download') ? 'exportar' : 'imprimir';
        alert(`Função de ${action} será implementada em breve!`);
      });
    });
  }
});