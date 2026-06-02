



// 🛒 CARREGAR CARRINHO DO LOCALSTORAGE
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ➕ ADICIONAR ITEM
function adicionarCarrinho(nome, preco) {

    carrinho.push({ nome, preco });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarCarrinho(); 
    atualizarContador();

   
}

// 🔄 ATUALIZAR CARRINHO
function atualizarCarrinho() {

    carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
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

// ATUALIZAR CONTADOR
function atualizarContador() {
    let carrinhoStorage = JSON.parse(localStorage.getItem("carrinho")) || [];
    let contador = document.getElementById("contador-carrinho");

    if (contador) {
        contador.textContent = carrinhoStorage.length;
    }
}

// ❌ REMOVER ITEM
function removerItem(index) {
    carrinho.splice(index, 1);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarCarrinho();
    atualizarContador();
}

// 🚀 IR PARA FINALIZAR COMPRA
function irParaFinalizarCompra() {
   

    // verifica se o carrinho está vazio
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! 🛒");
        return;
    }

    let logado = localStorage.getItem("usuario_logado");

    // verifica se está logado antes de ir para finalizar compra
    if (!logado) {
        alert("Você precisa estar logado para continuar!");
        window.location.href = "login.html";
        return;
    }

    // se estiver logado, vai para finalizar compra
    window.location.href = "finalizarCompra.html";
}

/*function irParaFinalizarCompra() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! 🛒");
        return;
    }

    window.location.href = "finalizarCompra.html";
}*/



// 🚀 INICIALIZAÇÃO

document.addEventListener("DOMContentLoaded", function () {

    let tentativas = 0;

    let intervalo = setInterval(() => {

        let lista = document.getElementById("lista-carrinho");

        if (lista || tentativas > 10) {
            atualizarCarrinho();
            atualizarContador();
            clearInterval(intervalo);
        }

        tentativas++;

    }, 100);

});



