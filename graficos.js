document.addEventListener('DOMContentLoaded', function() {
  // Verificar se existe gráfico na página
  const graficoMetas = document.getElementById('graficoMetas');
  if (graficoMetas) {
    initGraficoMetas();
  }

  // Verificar se existe gráfico de relatórios
  if (document.getElementById('graficoCategorias')) {
    initGraficoRelatorios();
  }
});

function initGraficoMetas() {
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const metasData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const ctx = document.getElementById('graficoMetas').getContext('2d');
  const graficoMetas = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: meses,
      datasets: [{
        label: 'Valor (R$)',
        data: metasData,
        backgroundColor: 'rgba(52, 152, 219, 0.7)',
        borderColor: 'rgba(41, 128, 185, 1)',
        borderWidth: 1,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Meta: R$ ${context.raw.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Valor (R$)'
          },
          ticks: {
            callback: function(value) {
              return 'R$ ' + value.toLocaleString('pt-BR');
            }
          }
        },
        x: {
          title: {
            display: true,
            text: 'Meses do Ano'
          }
        }
      }
    }
  });

  // Manipulação do formulário de metas
  const formMeta = document.getElementById('formMeta');
  if (formMeta) {
    formMeta.addEventListener('submit', function(e) {
      e.preventDefault();

      const mesIndex = parseInt(document.getElementById('mes').value);
      const metaValor = parseFloat(document.getElementById('meta').value);

      if (isNaN(mesIndex)) {
        showMessage('Por favor, selecione um mês válido', 'error');
        return;
      }

      if (isNaN(metaValor) || metaValor <= 0) {
        showMessage('Por favor, insira um valor válido para a meta', 'error');
        return;
      }

      // Atualiza os dados do gráfico
      metasData[mesIndex] = metaValor;
      graficoMetas.data.datasets[0].data = metasData;
      graficoMetas.update();

      // Reseta o formulário
      formMeta.reset();

      // Feedback visual
      showMessage('Meta adicionada com sucesso!', 'success');
    });
  }
}

function initGraficoRelatorios() {
  // Gráfico de categorias
  const ctxCategorias = document.getElementById('graficoCategorias').getContext('2d');
  new Chart(ctxCategorias, {
    type: 'doughnut',
    data: {
      labels: ['Moradia', 'Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Outros'],
      datasets: [{
        data: [1200, 900, 600, 450, 300, 780],
        backgroundColor: [
          '#2c3e50',
          '#3498db',
          '#e74c3c',
          '#f39c12',
          '#2ecc71',
          '#9b59b6'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: R$ ${value.toLocaleString('pt-BR')} (${percentage}%)`;
            }
          }
        }
      }
    }
  });

  // Gráfico Receitas vs Despesas
  const ctxReceitasDespesas = document.getElementById('graficoReceitasDespesas').getContext('2d');
  new Chart(ctxReceitasDespesas, {
    type: 'bar',
    data: {
      labels: ['Receitas', 'Despesas', 'Saldo'],
      datasets: [{
        data: [8450, 5230, 3220],
        backgroundColor: [
          'rgba(46, 204, 113, 0.7)',
          'rgba(231, 76, 60, 0.7)',
          'rgba(52, 152, 219, 0.7)'
        ],
        borderColor: [
          'rgba(46, 204, 113, 1)',
          'rgba(231, 76, 60, 1)',
          'rgba(52, 152, 219, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return 'R$ ' + value.toLocaleString('pt-BR');
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

  // Gráfico de evolução
  const ctxEvolucao = document.getElementById('graficoEvolucao').getContext('2d');
  new Chart(ctxEvolucao, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
      datasets: [
        {
          label: 'Receitas',
          data: [4000, 3800, 4200, 4500, 4800],
          borderColor: 'rgba(46, 204, 113, 1)',
          backgroundColor: 'rgba(46, 204, 113, 0.1)',
          tension: 0.3,
          fill: true
        },
        {
          label: 'Despesas',
          data: [3200, 3000, 2800, 3100, 2900],
          borderColor: 'rgba(231, 76, 60, 1)',
          backgroundColor: 'rgba(231, 76, 60, 0.1)',
          tension: 0.3,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return 'R$ ' + value.toLocaleString('pt-BR');
            }
          }
        }
      }
    }
  });
}

function showMessage(text, type) {
  // Remove mensagens existentes
  const existingMessages = document.querySelectorAll('.message');
  existingMessages.forEach(msg => msg.remove());

  // Cria nova mensagem
  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = text;

  // Insere a mensagem antes do formulário
  const form = document.querySelector('form');
  if (form) {
    form.parentNode.insertBefore(message, form);
  }

  // Remove a mensagem após 5 segundos
  setTimeout(() => {
    message.remove();
  }, 5000);
}
  