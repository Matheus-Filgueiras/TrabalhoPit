document.addEventListener('DOMContentLoaded', function() {
  // Modal de nova meta
  const btnNovaMeta = document.getElementById('btnNovaMeta');
  const modalNovaMeta = document.getElementById('modalNovaMeta');
  const closeModal = document.querySelector('.close-modal');
  
  if (btnNovaMeta && modalNovaMeta) {
    btnNovaMeta.addEventListener('click', function() {
      modalNovaMeta.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
    
    closeModal.addEventListener('click', function() {
      modalNovaMeta.style.display = 'none';
      document.body.style.overflow = '';
    });
    
    window.addEventListener('click', function(e) {
      if (e.target === modalNovaMeta) {
        modalNovaMeta.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }
  
  // Formulário de nova meta
  const formNovaMeta = document.getElementById('formNovaMeta');
  const listaMetas = document.getElementById('listaMetas');
  
  if (formNovaMeta && listaMetas) {
    // Carregar metas salvas
    carregarMetas();
    
    formNovaMeta.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nome = document.getElementById('nomeMeta').value;
      const valorTotal = parseFloat(document.getElementById('valorMeta').value);
      const valorAtual = parseFloat(document.getElementById('valorAtual').value);
      const data = document.getElementById('dataMeta').value;
      
      if (!nome || isNaN(valorTotal) || isNaN(valorAtual) || !data) {
        showMessage('Por favor, preencha todos os campos corretamente', 'error');
        return;
      }
      
      const porcentagem = Math.min(Math.round((valorAtual / valorTotal) * 100), 100);
      
      const meta = {
        nome,
        valorTotal,
        valorAtual,
        data,
        porcentagem
      };
      
      adicionarMeta(meta);
      formNovaMeta.reset();
      modalNovaMeta.style.display = 'none';
      document.body.style.overflow = '';
      atualizarGrafico();
    });
  }
  
  function adicionarMeta(meta) {
    const metas = JSON.parse(localStorage.getItem('metas')) || [];
    metas.push(meta);
    localStorage.setItem('metas', JSON.stringify(metas));
    renderizarMetas();
  }
  
  function carregarMetas() {
    renderizarMetas();
    atualizarGrafico();
  }
  
  function renderizarMetas() {
    const metas = JSON.parse(localStorage.getItem('metas')) || [];
    listaMetas.innerHTML = '<h2>Suas Metas</h2>';
    
    if (metas.length === 0) {
      listaMetas.innerHTML += '<p class="sem-metas">Você ainda não tem metas cadastradas</p>';
      return;
    }
    
    metas.forEach((meta, index) => {
      const status = meta.porcentagem >= 100 ? 'concluida' : 
                    meta.porcentagem >= 50 ? 'andamento' : 'atrasada';
      
      const dataFormatada = new Date(meta.data).toLocaleDateString('pt-BR');
      
      const metaItem = document.createElement('div');
      metaItem.className = `meta-item ${status}`;
      metaItem.innerHTML = `
        <div class="meta-info">
          <h3>${meta.nome}</h3>
          <p>R$ ${meta.valorAtual.toFixed(2)} de R$ ${meta.valorTotal.toFixed(2)}</p>
          <p class="meta-prazo">Prazo: ${dataFormatada}</p>
          <div class="meta-progresso">
            <div class="progresso-bar" style="width: ${meta.porcentagem}%"></div>
            <span>${meta.porcentagem}% concluído</span>
          </div>
        </div>
        <div class="meta-acoes">
          <button class="btn-meta btn-editar" data-index="${index}"><i class="fas fa-edit"></i></button>
          <button class="btn-meta btn-excluir" data-index="${index}"><i class="fas fa-trash"></i></button>
        </div>
      `;
      
      listaMetas.appendChild(metaItem);
    });
    
    // Adicionar eventos aos botões
    document.querySelectorAll('.btn-editar').forEach(btn => {
      btn.addEventListener('click', function() {
        editarMeta(parseInt(this.getAttribute('data-index')));
      });
    });
    
    document.querySelectorAll('.btn-excluir').forEach(btn => {
      btn.addEventListener('click', function() {
        excluirMeta(parseInt(this.getAttribute('data-index')));
      });
    });
  }
  
  function editarMeta(index) {
    const metas = JSON.parse(localStorage.getItem('metas')) || [];
    const meta = metas[index];
    
    document.getElementById('nomeMeta').value = meta.nome;
    document.getElementById('valorMeta').value = meta.valorTotal;
    document.getElementById('valorAtual').value = meta.valorAtual;
    document.getElementById('dataMeta').value = meta.data;
    
    // Remover a meta antiga
    metas.splice(index, 1);
    localStorage.setItem('metas', JSON.stringify(metas));
    
    // Abrir modal
    modalNovaMeta.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  
  function excluirMeta(index) {
    if (confirm('Tem certeza que deseja excluir esta meta?')) {
      const metas = JSON.parse(localStorage.getItem('metas')) || [];
      metas.splice(index, 1);
      localStorage.setItem('metas', JSON.stringify(metas));
      renderizarMetas();
      atualizarGrafico();
    }
  }
  
  function atualizarGrafico() {
    const metas = JSON.parse(localStorage.getItem('metas')) || [];
    const ctx = document.getElementById('graficoMetas').getContext('2d');
    
    // Se já existe um gráfico, destruir antes de criar um novo
    if (window.graficoMetas) {
      window.graficoMetas.destroy();
    }
    
    if (metas.length === 0) {
      // Mostrar mensagem quando não há metas
      ctx.font = '16px Arial';
      ctx.fillStyle = '#666';
      ctx.textAlign = 'center';
      ctx.fillText('Nenhuma meta cadastrada', ctx.canvas.width/2, ctx.canvas.height/2);
      return;
    }
    
    const labels = metas.map(meta => meta.nome);
    const dados = metas.map(meta => meta.porcentagem);
    const cores = metas.map(meta => 
      meta.porcentagem >= 100 ? '#27ae60' :
      meta.porcentagem >= 50 ? '#f39c12' : '#e74c3c'
    );
    
    window.graficoMetas = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Progresso (%)',
          data: dados,
          backgroundColor: cores,
          borderColor: '#fff',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        }
      }
    });
  }
  
  function showMessage(text, type) {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    const container = document.querySelector('.container-metas');
    if (container) {
      container.prepend(message);
      
      setTimeout(() => {
        message.remove();
      }, 3000);
    }
  }
});