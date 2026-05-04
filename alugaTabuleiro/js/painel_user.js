<<<<<<< Updated upstream
// js/Painel_user.js

document.addEventListener("DOMContentLoaded", () => {
=======
document.addEventListener('DOMContentLoaded', () => {
>>>>>>> Stashed changes
    const user = obterUsuarioLogado();

    // se não estiver logado, volta para login
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // preencher título de boas-vindas
    const titulo = document.querySelector(".painel-boas-vindas h1");
    if (titulo) {
        titulo.textContent = `Olá, ${user.nome}`;
    }

    // preencher campos do formulário
    const campos = [
        "nome",
        "email",
        "telefone",
        "cep",
        "logradouro",
        "numero",
        "complemento",
        "password"
    ];

    campos.forEach(id => {
        const input = document.getElementById(id);

        if (input) {
            // password pega de "senha"
            input.value = (id === "password")
                ? (user.senha || "")
                : (user[id] || "");
        }
    });

    // máscara telefone
    configurarMascaraTelefone();

    // carregar pedidos vindos do carrinho
    renderizarPedidos();
});


// PEDIDOS = ITENS DO CARRINHO
function renderizarPedidos() {
    const tabela = document.querySelector("#pedidos tbody");

    if (!tabela) return;

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    tabela.innerHTML = "";

<<<<<<< Updated upstream
    if (carrinho.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="5">Nenhum pedido encontrado 🛒</td>
            </tr>
        `;
=======
document.addEventListener('DOMContentLoaded', () => {
    const user = obterUsuarioLogado();
    if (!user) {
        window.location.href = "login.html";
>>>>>>> Stashed changes
        return;
    }

    const hoje = new Date().toLocaleDateString("pt-BR");

    carrinho.forEach((item, index) => {
        tabela.innerHTML += `
            <tr>
                <td>#${1000 + index}</td>
                <td>${hoje}</td>
                <td>--/--/----</td>
                <td>Em andamento</td>
                <td>R$ ${item.preco.toFixed(2)}</td>
            </tr>
        `;
    });
}


// MÁSCARA TELEFONE
function configurarMascaraTelefone() {
    const inputTelefone = document.getElementById("telefone");

    if (inputTelefone) {
        inputTelefone.addEventListener("input", (e) => {
            let v = e.target.value;

            // remove tudo que não for número
            v = v.replace(/\D/g, "");

            // limita em 11 dígitos
            v = v.slice(0, 11);

            // aplica máscara
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


// LOGOUT
function logout() {
    localStorage.removeItem("usuario_logado");

    alert("Logout realizado com sucesso!");

    window.location.href = "index.html";
}