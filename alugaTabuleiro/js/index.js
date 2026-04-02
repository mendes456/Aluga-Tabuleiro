
// 🛒 CARREGAR CARRINHO DO LOCALSTORAGE
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ➕ ADICIONAR ITEM
function adicionarCarrinho(nome, preco) {

    carrinho.push({ nome, preco });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarCarrinho(); // 🔥 atualiza na hora

   
}

// 🔄 ATUALIZAR CARRINHO
function atualizarCarrinho() {
    let lista = document.getElementById("lista-carrinho");
    let total = 0;
    let vazio = document.getElementById("carrinho-vazio");
    let contador = document.getElementById("contador-carrinho");

    if (!lista) return;

    lista.innerHTML = "";

    if (carrinho.length === 0) {
        vazio.style.display = "block";
    } else {
        vazio.style.display = "none";
    }

    carrinho.forEach((item, index) => {
        total += item.preco;

        lista.innerHTML += `
            <li class="list-group-item item-carrinho">
                ${item.nome} - R$ ${item.preco.toFixed(2)}
                <button class="btn-remover" onclick="removerItem(${index})">🗑️</button>
            </li>
        `;
    });

    document.getElementById("total").textContent = total.toFixed(2);

    if (contador) {
        contador.textContent = carrinho.length;
    }
}

// ❌ REMOVER ITEM
function removerItem(index) {
    carrinho.splice(index, 1);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarCarrinho();
}

// 🚀 IR PARA FINALIZAR COMPRA
function irParaFinalizarCompra() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! 🛒");
        return;
    }

    window.location.href = "finalizarCompra.html";
}

// 🚀 INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", function () {
    atualizarCarrinho();
});