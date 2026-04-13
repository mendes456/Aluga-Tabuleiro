document.addEventListener('DOMContentLoaded', () => {
    // Função para gerenciar o visual de erro/sucesso
    const updateUI = (wrapperId, errorId, isValid, message = "") => {
        const wrapper = document.getElementById(wrapperId);
        const errorSpan = document.getElementById(errorId);
        if (isValid) {
            wrapper.classList.remove('error-state');
            wrapper.classList.add('valid-state');
            if (errorSpan) errorSpan.textContent = "";
        } else {
            wrapper.classList.remove('valid-state');
            wrapper.classList.add('error-state');
            if (errorSpan) errorSpan.textContent = message;
        }
    };

    // 1. Validação Nome)
    document.getElementById('nome').addEventListener('blur', (e) => {
    const regex = /^[A-Za-zÀ-ÿ\s]{5,20}$/;
    // O regex.test verificará se o valor atende aos novos requisitos
    const isValid = regex.test(e.target.value);    
    // Atualizamos a mensagem para refletir a nova regra
    updateUI(
        'nomeWrapper', 
        'nomeError', 
        isValid, 
        "O nome deve ter entre 5 e 20 caracteres (apenas letras)."
    );
});

    // 2. Validação Email
    document.getElementById('email').addEventListener('blur', (e) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        updateUI('emailWrapper', 'emailError', regex.test(e.target.value), "Formato de e-mail inválido.");
    });

    // 3. Máscara Telefone 
    
    const inputTelefone = document.getElementById('telefone');

    if (inputTelefone) {
        inputTelefone.addEventListener('input', (e) => {
            let v = e.target.value;
            
            // Remove tudo o que não for dígito
            v = v.replace(/\D/g, "");
            
            // Limita a 11 dígitos (DDD + 9 números)
            if (v.length > 11) v = v.slice(0, 11);

            // Aplica a formatação (XX) XXXXX-XXXX 
            if (v.length > 10) {
                v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
            } else if (v.length > 5) {
                v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
            } else if (v.length > 2) {
                v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
            } else {
                v = v.replace(/^(\d*)/, "($1");
            }
            
            e.target.value = v;
    });
    }

    // 4. CEP + API ViaCEP
    document.getElementById('cep').addEventListener('blur', async (e) => {
        const cep = e.target.value.replace(/\D/g, "");
        if (cep.length === 8) {
            const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await resp.json();
            if (!data.erro) {
                document.getElementById('logradouro').value = `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;
                updateUI('cepWrapper', null, true);
            } else {
                updateUI('cepWrapper', null, false);
                alert("CEP não encontrado.");
            }
        }
    });

    // 5. Senhas (6 dígitos alfanuméricos + Confirmação)
    const p1 = document.getElementById('password');
    const p2 = document.getElementById('confirmPassword');

    const validarSenhas = () => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6}$/;
        const match = (p1.value === p2.value && p1.value !== "");
        
        updateUI('passwordWrapper', null, regex.test(p1.value));
        updateUI('confirmWrapper', 'passwordError', match, match ? "" : "As senhas não coincidem ou não seguem o padrão (6 letras e números).");
    };

    p1.addEventListener('input', validarSenhas);
    p2.addEventListener('input', validarSenhas);
});


// Mostrar/Esconder Senha
const btnToggle = document.getElementById('toggleLoginPassword');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

if (btnToggle && passwordInput && confirmPasswordInput) {
    btnToggle.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        confirmPasswordInput.type = isPassword ? 'text' : 'password';
        btnToggle.textContent = isPassword ? '🙈' : '👁️';
    });
}

// CAMADA 2 - SALVAR DADOS E REDIRECIONAR

document.getElementById('cadastroForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Pegar os campos de senha para verificar igualdade e padrão
    const senhaValue = document.getElementById('password').value;
    const confirmacaoValue = document.getElementById('confirmPassword').value;
    const regexSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6}$/;

    // 2. Verificação básica de segurança antes de salvar
    if (senhaValue !== confirmacaoValue) {
        alert("Erro: As senhas não coincidem.");
        return;
    }

    if (!regexSenha.test(senhaValue)) {
        alert("Erro: A senha deve ter 6 caracteres, incluindo letras e números.");
        return;
    }

    // 3. Montando o objeto completo
    const novoUsuario = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        senha: senhaValue // Valor capturado corretamente
    };

    // 4. Chamar a função do database.js (que já está no escopo global)
    const resultado = salvarUsuario(novoUsuario);

    if (resultado.sucesso) {
        alert("Usuário cadastrado com sucesso!");
        window.location.href = "login.html"; // Certifique-se que o nome do arquivo está correto
    } else {
        alert(resultado.mensagem); 
    }
});