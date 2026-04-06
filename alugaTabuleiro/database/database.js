

// Salva um usuário no "banco" (lista de usuários)
function salvarUsuario(novoUsuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios_cadastrados')) || [];
    
    if (usuarios.find(u => u.email === novoUsuario.email)) {
        return { sucesso: false, mensagem: "E-mail já cadastrado!" };
    }

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios_cadastrados', JSON.stringify(usuarios));
    return { sucesso: true };
}

// Valida o login e cria a "sessão" com TUDO que foi cadastrado
function autenticarUsuario(email, senha) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios_cadastrados')) || [];
    const encontrou = usuarios.find(u => u.email === email && u.senha === senha);

    if (encontrou) {
        // Guarda a ficha COMPLETA do usuário para o Painel ler
        localStorage.setItem('usuario_logado', JSON.stringify(encontrou));
        return true;
    }
    return false;
}

// Busca os dados de quem está logado
function obterUsuarioLogado() {
    const dados = localStorage.getItem('usuario_logado');
    return dados ? JSON.parse(dados) : null;
}