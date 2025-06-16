document.addEventListener('DOMContentLoaded', function() {
  // Validação do formulário de cadastro
  const formCadastro = document.getElementById('formCadastro');
  if (formCadastro) {
    formCadastro.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validar senha
      const senha = document.getElementById('senha');
      const confirmarSenha = document.getElementById('confirmarSenha');
      const senhaError = document.getElementById('senhaError');
      
      if (senha.value !== confirmarSenha.value) {
        senhaError.textContent = 'As senhas não coincidem';
        senhaError.style.color = '#e74c3c';
        confirmarSenha.focus();
        return;
      } else {
        senhaError.textContent = '';
      }
      
      // Validar termos
      const termos = document.getElementById('termos');
      if (!termos.checked) {
        showMessage('Você deve aceitar os termos de uso para se cadastrar', 'error');
        termos.focus();
        return;
      }
      
      // Simular envio do formulário
      this.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cadastrando...';
      
      setTimeout(() => {
        window.location.href = 'verificacao.html';
      }, 1500);
    });
  }
  
  // Validação do formulário de login
  const formLogin = document.getElementById('formLogin');
  if (formLogin) {
    formLogin.addEventListener('submit', function(e) {
      const email = this.querySelector('input[type="email"]');
      const senha = this.querySelector('input[type="password"]');
      
      if (!email.value || !senha.value) {
        e.preventDefault();
        showMessage('Por favor, preencha todos os campos', 'error');
      }
    });
  }
  
  // Validação em tempo real
  const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      if (this.checkValidity()) {
        this.style.borderColor = '#27ae60';
      } else {
        this.style.borderColor = '#e74c3c';
      }
    });
    
    input.addEventListener('blur', function() {
      this.style.borderColor = '';
    });
  });
  
  // Força da senha
  const senhaInput = document.getElementById('senha');
  if (senhaInput) {
    senhaInput.addEventListener('input', function() {
      const strength = checkPasswordStrength(this.value);
      updatePasswordStrengthIndicator(strength);
    });
  }
  
  function checkPasswordStrength(password) {
    let strength = 0;
    
    // Verifica o comprimento
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Verifica caracteres diversos
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Limita a força máxima a 5
    return Math.min(strength, 5);
  }
  
  function updatePasswordStrengthIndicator(strength) {
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (strengthBars && strengthText) {
      strengthBars.forEach((bar, index) => {
        bar.style.backgroundColor = index < strength ? getStrengthColor(strength) : '#ddd';
      });
      
      const strengthMessages = ['Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte'];
      strengthText.textContent = strengthMessages[strength - 1] || '';
      strengthText.style.color = getStrengthColor(strength);
    }
  }
  
  function getStrengthColor(strength) {
    const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];
    return colors[strength - 1] || '#ddd';
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
});