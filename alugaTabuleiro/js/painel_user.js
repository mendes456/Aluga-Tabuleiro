// js/Painel_user.js
document.addEventListener('DOMContentLoaded', () => {
    const user = obterUsuarioLogado();

    if (!user) {
        window.location.href = "Login3.html";
        return;
    }

    // 1. Preencher Título
    document.querySelector('header h1').textContent = `Olá, ${user.nome}`;

    // 2. Lista de IDs para preencher automaticamente
    const campos = ['nome', 'email', 'telefone', 'cep', 'logradouro', 'numero', 'complemento', 'password'];

    campos.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            // No caso da senha, o campo no objeto é 'senha', mas o ID no HTML é 'password'
            input.value = (id === 'password') ? user.senha : user[id];
        }
    });

    renderizarPedidos();
});

function renderizarPedidos() {
    const tabela = document.querySelector('#pedidos tbody');
    if (!tabela) return;

    const fakes = [
        { id: "#5502", data: "20/03/2026", dev: "25/03/2026", status: "Em andamento", total: "R$ 120,00" },
        { id: "#4890", data: "10/01/2026", dev: "15/01/2026", status: "Finalizado", total: "R$ 85,00" }
    ];

    tabela.innerHTML = fakes.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.data}</td>
            <td>${p.dev}</td>
            <td>${p.status}</td>
            <td>${p.total}</td>
        </tr>
    `).join('');
}

// js/Painel_user.js

document.addEventListener('DOMContentLoaded', () => {
    const user = obterUsuarioLogado();
    if (!user) {
        window.location.href = "Login3.html";
        return;
    }

    // 1. Preencher os campos
    renderizarDadosUsuario(user);
    
    // 2. Ativar a máscara e formatar o que já veio do banco
    configurarMascaraTelefone();
    
    renderizarPedidos();
});

function configurarMascaraTelefone() {
    const inputTelefone = document.getElementById('telefone');

    if (inputTelefone) {
        inputTelefone.addEventListener('input', (e) => {
            let v = e.target.value;
            
            // Remove tudo o que não for dígito
            v = v.replace(/\D/g, "");
            
            // Limita a 11 dígitos (DDD + 9 números)
            v = v.slice(0, 11);

            // Aplica a formatação (XX) XXXXX-XXXX 
            if (v.length > 10) {
                v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
            } else if (v.length > 5) {
                v = v.replace(/^(\d{2})(\d{5})/, "($1) $2");
            } else if (v.length > 2) {
                v = v.replace(/^(\d{2})/, "($1) ");
            }
            
            e.target.value = v;
        });
    }
}