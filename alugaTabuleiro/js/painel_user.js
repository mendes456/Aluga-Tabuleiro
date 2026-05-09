// js/painel_user.js

document.addEventListener("DOMContentLoaded", () => {

    // pega usuário logado
    const user = obterUsuarioLogado();

    // se não existir usuário
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // =========================
    // BOAS-VINDAS
    // =========================

    const titulo = document.querySelector(".painel-boas-vindas h1");

    if (titulo) {
        titulo.textContent = `Olá, ${user.nome}`;
    }

    // =========================
    // PREENCHER FORMULÁRIO
    // =========================

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

    campos.forEach((id) => {

        const input = document.getElementById(id);

        if (input) {

            // password vem de "senha"
            if (id === "password") {
                input.value = user.senha || "";
            } else {
                input.value = user[id] || "";
            }
        }
    });

    // ativa máscara
    configurarMascaraTelefone();

    // renderiza pedidos
    renderizarPedidos();
});


// ======================================
// PEDIDOS = ITENS DO CARRINHO
// ======================================

function renderizarPedidos() {

    const tabela = document.querySelector("#pedidos tbody");

    if (!tabela) return;

    const carrinho =
        JSON.parse(localStorage.getItem("carrinho")) || [];

    tabela.innerHTML = "";

    // carrinho vazio
    if (carrinho.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="5">
                    Nenhum pedido encontrado 🛒
                </td>
            </tr>
        `;

        return;
    }

    const hoje =
        new Date().toLocaleDateString("pt-BR");

    carrinho.forEach((item, index) => {

        tabela.innerHTML += `
            <tr>
                <td>#${1000 + index}</td>
                <td>${hoje}</td>
                <td>--/--/----</td>
                <td>Em andamento</td>
                <td>R$ ${Number(item.preco).toFixed(2)}</td>
            </tr>
        `;
    });
}


// ======================================
// MÁSCARA TELEFONE
// ======================================

function configurarMascaraTelefone() {

    const inputTelefone =
        document.getElementById("telefone");

    if (!inputTelefone) return;

    inputTelefone.addEventListener("input", (e) => {

        let v = e.target.value;

        // remove caracteres
        v = v.replace(/\D/g, "");

        // máximo 11 números
        v = v.slice(0, 11);

        // celular
        if (v.length > 10) {

            v = v.replace(
                /^(\d{2})(\d{5})(\d{4})$/,
                "($1) $2-$3"
            );

        }
        // telefone normal
        else if (v.length > 6) {

            v = v.replace(
                /^(\d{2})(\d{4})(\d+)/,
                "($1) $2-$3"
            );

        }
        // ddd
        else if (v.length > 2) {

            v = v.replace(
                /^(\d{2})(\d+)/,
                "($1) $2"
            );
        }

        e.target.value = v;
    });
}


// ======================================
// LOGOUT
// ======================================

function logout() {

    localStorage.removeItem("usuario_logado");

    alert("Logout realizado com sucesso!");

    window.location.href = "index.html";
}