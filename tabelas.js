document.addEventListener('DOMContentLoaded', function() {
  // Inicializar tabela de extrato se existir
  if (document.getElementById('tabelaExtrato')) {
    initExtrato();
  }
  
  // Inicializar tabela de ranking se existir
  if (document.querySelector('.tabela-ranking')) {
    initRanking();
  }
});

function initExtrato() {
  // Dados de exemplo para o extrato
  const lancamentos = [
    { data: '2023-05-15', descricao: 'Salário', categoria: 'Receita', valor: 4500.00, tipo: 'receita' },
    { data: '2023-05-10', descricao: 'Aluguel', categoria: 'Moradia', valor: 1200.00, tipo: 'despesa' },
    { data: '2023-05-08', descricao: 'Supermercado', categoria: 'Alimentação', valor: 350.50, tipo: 'despesa' },
    { data: '2023-05-05', descricao: 'Freelance', categoria: 'Receita', valor: 800.00, tipo: 'receita' },
    { data: '2023-05-01', descricao: 'Academia', categoria: 'Saúde', valor: 120.00, tipo: 'despesa' }
  ];
  
  // Preencher tabela
  const tabelaBody = document.querySelector('#tabelaExtrato tbody');
  
  lancamentos.forEach(lanc => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${formatarData(lanc.data)}</td>
      <td>${lanc.descricao}</td>
      <td>${lanc.categoria}</td>
      <td class="${lanc.tipo}">${formatarMoeda(lanc.valor)}</td>
      <td>
        <button class="btn-acao" data-id="${lanc.data}">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-acao" data-id="${lanc.data}">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    tabelaBody.appendChild(row);
  });
  
  // Adicionar eventos aos botões
  document.querySelectorAll('.btn-acao').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      if (this.querySelector('.fa-trash')) {
        if (confirm('Tem certeza que deseja excluir este lançamento?')) {
          this.closest('tr').remove();
          // Aqui você adicionaria a lógica para remover do banco de dados
          showMessage('Lançamento removido com sucesso!', 'success');
        }
      } else if (this.querySelector('.fa-edit')) {
        // Lógica para edição
        alert(`Editar lançamento ${id}`);
      }
    });
  });
  
  // Funções auxiliares
  function formatarData(data) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(data).toLocaleDateString('pt-BR', options);
  }
  
  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}

function initRanking() {
  // Dados de exemplo para o ranking
  const rankingData = [
    { posicao: 1, usuario: 'Campeão', pontuacao: 150, metas: 10 },
    { posicao: 2, usuario: 'Segundo Lugar', pontuacao: 135, metas: 9 },
    { posicao: 3, usuario: 'Terceiro Lugar', pontuacao: 120, metas: 8 },
    { posicao: 4, usuario: 'Participante', pontuacao: 105, metas: 7 },
    { posicao: 5, usuario: 'Iniciante', pontuacao: 90, metas: 6 }
  ];
  
  // Preencher tabela de ranking
  const tabelaRanking = document.querySelector('.tabela-ranking tbody');
  
  rankingData.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.posicao}º</td>
      <td>${item.usuario}</td>
      <td>${item.pontuacao}</td>
      <td>${item.metas}</td>
    `;
    tabelaRanking.appendChild(row);
  });
}

function showMessage(text, type) {
  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = text;
  
  const container = document.querySelector('.container-extrato') || document.querySelector('.container-ranking');
  if (container) {
    container.prepend(message);
    
    setTimeout(() => {
      message.remove();
    }, 3000);
  }
}