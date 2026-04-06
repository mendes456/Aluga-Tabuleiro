document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const btnToggle = document.getElementById('toggleLoginPassword');

    // Função para atualizar visual (Contextos Separados)
    const updateStatus = (wrapperId, errorId, isValid, message = "") => {
        const wrapper = document.getElementById(wrapperId);
        const errorSpan = document.getElementById(errorId);
        if (isValid) {
            wrapper.classList.remove('error-state');
            wrapper.classList.add('valid-state');
            if(errorSpan) errorSpan.textContent = "";
        } else {
            wrapper.classList.remove('valid-state');
            wrapper.classList.add('error-state');
            if(errorSpan) errorSpan.textContent = message;
        }
    };


    // Validação de Email ao sair do campo
    emailInput.addEventListener('blur', () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        updateStatus('emailWrapper', 'emailError', regex.test(emailInput.value), "E-mail inválido.");
    });

    // Validação de Senha (6 dígitos alfanuméricos)
    passwordInput.addEventListener('input', () => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6}$/;
        updateStatus('passwordWrapper', 'passwordError', regex.test(passwordInput.value), 
            passwordInput.value.length > 0 ? "A senha deve ter 6 caracteres (letras e números)." : "");
    });

    //Direcionar clique para Página do Usuário
    // login.js
    document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("Botão clicado! Tentando validar...");

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    if (autenticarUsuario(email, senha)) {
        console.log("Usuário ok! Redirecionando...");
        window.location.href = "painel_user.html";
    } else {
        console.log("Erro: Usuário não encontrado no localStorage");
        alert("E-mail ou senha incorretos.");
    }
});
    
   
});
