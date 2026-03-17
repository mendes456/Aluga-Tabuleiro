
// VALIDAÇÃO DO FORMATO DO CAMPO EMAIL
const campoEmail = document.getElementById('email');
const erroEmail = document.getElementById('emailError');

campoEmail.addEventListener('input', () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (regexEmail.test(campoEmail.value)) {
        campoEmail.style.borderColor = "#2ecc71"; // Verde enquanto digita certo
        erroEmail.textContent = "";
    } else {
        campoEmail.style.borderColor = "#e74c3c"; // Vermelho se estiver errado
        erroEmail.textContent = "E-mail inválido";
    }
});

// Quando o usuário sai do campo (blur)
campoEmail.addEventListener('blur', () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Se estiver tudo certo ao sair, volta para a cor neutra do seu CSS
    if (regexEmail.test(campoEmail.value)) {
        campoEmail.style.borderColor = "#e2d9c5"; 
    }
});



// VALIDAÇÃO DO FORMATO DO CAMPO TELEFONE
const campoTelefone = document.getElementById('phone');

campoTelefone.addEventListener('input', (evento) => {
    let valor = evento.target.value;

    // 1. Primeiro, removemos tudo que não é número
    valor = valor.replace(/\D/g, "");

    // 2. Se não houver nada, para por aqui
    if (!valor) {
        evento.target.value = "";
        return;
    }

// 3. VALIDAÇÃO FORMATO TELEFONE = (+55) XX-XXXXXXXXX
    // Adicionamos o fixo (+55) e um espaço
    let formatado = "(+55) ";

    // Se o usuário digitou os 2 números do DDD
    if (valor.length > 0) {
        // Pega os dois primeiros dígitos para o DDD
        formatado += valor.substring(0, 2);
    }

    // Se ele digitou mais que o DDD, precisamos do traço (-)
    if (valor.length > 2) {
        // Adiciona o traço e o restante dos números (até 9 dígitos do celular)
        formatado += "-" + valor.substring(2, 11);
    }

    // 4. Devolvemos o texto formatado para o campo
    evento.target.value = formatado;
});




// VALIDAÇÃO DO FORMATO DO CAMPO CEP E BUSCA NA API
const campoCep = document.getElementById('cep');
const campoLogradouro = document.getElementById('logradouro');

// 1. Escuta quando o usuário digita no CEP. 
// Blur: usar esse em vez do input para só disparar quando o usuário sai do campo
campoCep.addEventListener('blur', () => {
    let cep = campoCep.value.replace(/\D/g, '');

    if (cep.length === 8) {
        // Mostra um aviso visual que está buscando
        campoLogradouro.value = "Buscando endereço...";
        // Fetch é para buscar algo na internet, no caso a API
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(resposta => resposta.json())
            .then(dados => {
                // Se a API retornar que o CEP não existe
                if (dados.erro) {
                    alert("Ops! Esse CEP não foi encontrado. Verifique o número.");
                    campoCep.value = ""; // Limpa o campo
                    campoLogradouro.value = ""; // Limpa o aviso de busca
                    campoCep.focus(); // Devolve o foco para o usuário tentar de novo
                } else {
                    // CEP encontrado com sucesso
                    campoLogradouro.value = dados.logradouro;
                    document.getElementById('number').focus();
                }
            })
            .catch(() => {
                alert("Não conseguimos conectar à base de dados de CEP.");
                campoLogradouro.value = "";
            });
    } else if (cep.length > 0) {
        // Se o usuário digitou menos que 8 números
        alert("O CEP deve conter exatamente 8 números.");
        campoCep.value = "";
    }
});


//VALIDAÇÃO DAS SENHAS
// --- 1. SELEÇÃO DE ELEMENTOS ---
const campoSenha = document.getElementById('password');
const confirmaInput = document.getElementById('confirmPassword');
const btnOlhinho = document.getElementById('togglePassword');
const mensagemErro = document.getElementById('matchError'); // Para o erro de igualdade
const dicaTexto = document.querySelector('.password-hint');

// Bloqueia o campo de confirmação logo de cara
confirmaInput.disabled = true;

// --- 2. LÓGICA DO OLHINHO ---
btnOlhinho.addEventListener('click', function() {
    const tipo = campoSenha.type === 'password' ? 'text' : 'password';
    campoSenha.type = tipo;
    this.textContent = tipo === 'password' ? '👁️' : '🙈';
});

// --- 3. VALIDAÇÃO RIGOROSA DA SENHA (REGRA) ---
campoSenha.addEventListener('input', () => {
    const valor = campoSenha.value;
    const temLetra = /[a-zA-Z]/.test(valor);
    const temNumero = /[0-9]/.test(valor);
    const temSeis = valor.length === 6;

    if (temLetra && temNumero && temSeis) {
        // SUCESSO
        dicaTexto.style.color = "#2ecc71"; // Verde
        dicaTexto.textContent = "Senha dentro do padrão! ✅";
        campoSenha.style.borderColor = "#2ecc71";
        confirmaInput.disabled = false; // LIBERA o próximo campo
    } else {
        // AINDA NÃO ESTÁ PRONTO (Mantém neutro enquanto digita)
        dicaTexto.style.color = "#888888"; 
        dicaTexto.textContent = "6 caracteres (letras e números).";
        confirmaInput.disabled = true; // BLOQUEIA o próximo campo
        confirmaInput.value = ""; // Limpa a confirmação se a senha mudar
    }
});

// EVENTO DE ERRO: Quando o usuário clica fora ou tenta mudar de campo sem estar certo
campoSenha.addEventListener('blur', () => {
    const valor = campoSenha.value;
    const regraOk = /[a-zA-Z]/.test(valor) && /[0-9]/.test(valor) && valor.length === 6;

    if (valor.length > 0 && !regraOk) {
        dicaTexto.style.color = "#e74c3c"; // VERMELHO de erro
        dicaTexto.textContent = "Erro: A senha precisa de letras e números (6 dígitos)!";
        campoSenha.style.borderColor = "#e74c3c";
    }
});

// --- 4. COMPARAÇÃO DE SENHAS ---
function compararSenhas() {
    if (confirmaInput.value.length > 0) {
        if (campoSenha.value === confirmaInput.value) {
            mensagemErro.textContent = "As senhas coincidem!";
            mensagemErro.style.color = "#2ecc71";
            confirmaInput.style.borderColor = "#2ecc71";
        } else {
            mensagemErro.textContent = "As senhas não são iguais.";
            mensagemErro.style.color = "#e74c3c";
            confirmaInput.style.borderColor = "#e74c3c";
        }
    }
}

confirmaInput.addEventListener('input', compararSenhas);