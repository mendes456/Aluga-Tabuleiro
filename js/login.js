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


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6}$/;

    const validateEmail = () => {
        const isValid = emailRegex.test(emailInput.value.trim());
        updateStatus('emailWrapper', 'emailError', isValid, isValid ? '' : 'Digite um e-mail no formato nome@dominio.com.');
        emailInput.setAttribute('aria-invalid', String(!isValid));
        return isValid;
    };

    const validatePassword = () => {
        const isValid = passwordRegex.test(passwordInput.value);
        updateStatus('passwordWrapper', 'passwordError', isValid, passwordInput.value.length > 0 ? 'A senha deve ter 6 caracteres (letras e números).' : '');
        passwordInput.setAttribute('aria-invalid', String(!isValid));
        return isValid;
    };

    // Validação de Email ao sair do campo
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', () => {
        if (emailInput.value.length > 0) {
            validateEmail();
        } else {
            const wrapper = document.getElementById('emailWrapper');
            const errorSpan = document.getElementById('emailError');
            wrapper.classList.remove('error-state', 'valid-state');
            if (errorSpan) errorSpan.textContent = '';
            emailInput.removeAttribute('aria-invalid');
        }
    });

    // --- 2. LÓGICA DE LOGIN (SUBMIT) ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            const senha = passwordInput.value;

            // Chama a função global do database.js
            if (typeof autenticarUsuario === "function") {
                if (autenticarUsuario(email, senha)) {
                    // Importante: use o nome exato do seu arquivo de destino
                    window.location.href = "painel_user.html"; 
                } else {
                    alert("Usuário ou senha não encontrados.");
                }
            } else {
                alert("Erro técnico: Banco de dados não carregado.");
            }
        });
    }

});
