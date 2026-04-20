// 🛒 PUXAR CARRINHO
let pedidos = JSON.parse(localStorage.getItem("carrinho")) || [];

/*// 🔐 VERIFICAR LOGIN
function verificarLogin() {
    let logado = localStorage.getItem("usuarioLogado");

    if (!logado) {
        alert("Você precisa fazer login primeiro!");
        window.location.href = "login.html";
    }
}*/

// 🧾 RENDERIZAR PEDIDOS
function renderPedidos() {
    const lista = document.getElementById("lista-pedidos");

    if (!lista) return;

    lista.innerHTML = "";

    if (pedidos.length === 0) {
        lista.innerHTML = "<p>Seu carrinho está vazio 🛒</p>";
        document.getElementById("total").innerText = "0.00";
        return;
    }

    pedidos.forEach((item, index) => {
        lista.innerHTML += `
            <div class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>${item.nome}</strong><br>
                    R$ ${item.preco.toFixed(2)}
                </div>
                <button class="btn btn-sm btn-danger" onclick="removerItem(${index})">
                    ❌
                </button>
            </div>
        `;
    });

    calcularTotal();
}

// ❌ REMOVER ITEM
function removerItem(index) {
    pedidos.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(pedidos));
    renderPedidos();
}

// 💰 CALCULAR TOTAL
function calcularTotal() {
    let periodo = document.getElementById("periodo").value;

    if (periodo === "") {
        document.getElementById("total").innerText = "0.00";
        document.getElementById("data-devolucao").innerText = "--/--/----";
        return;
    }

    let dias = parseInt(periodo);
    let multiplicador = dias / 7;

    let total = 0;

    pedidos.forEach(item => {
        total += item.preco * multiplicador;
    });

    document.getElementById("total").innerText = total.toFixed(2);

    calcularData(dias);
}

// 📅 CALCULAR DATA DE DEVOLUÇÃO
function calcularData(dias) {
    let hoje = new Date();
    hoje.setDate(hoje.getDate() + dias);

    document.getElementById("data-devolucao").innerText =
        hoje.toLocaleDateString("pt-BR");
}

// 💳 FINALIZAR PEDIDO
function finalizarPedido() {
    if (pedidos.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    let metodo = document.getElementById("metodoPagamento").value;

    if (metodo === "cartao") {
        alert("Pagamento aprovado no cartão 💳");
    } else {
        alert("Pagamento via Pix confirmado ✅");
    }

    localStorage.removeItem("carrinho");
    window.location.href = "sucesso.html";
}

// 🔄 TROCAR TIPO DE PAGAMENTO
function atualizarPagamento() {
    const metodo = document.getElementById("metodoPagamento").value;

    const pix = document.getElementById("pagamento-pix");
    const cartao = document.getElementById("pagamento-cartao");

    if (metodo === "pix") {
        pix.style.display = "block";
        cartao.style.display = "none";
    } else {
        pix.style.display = "none";
        cartao.style.display = "block";
    }
}

// 🚀 INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", function () {

   /* verificarLogin(); */

    renderPedidos();

    // 📅 PERÍODO
    const periodo = document.getElementById("periodo");
    if (periodo) {
        periodo.addEventListener("change", calcularTotal);
    }

    // 💳 PAGAMENTO
    const metodo = document.getElementById("metodoPagamento");
    if (metodo) {
        metodo.addEventListener("change", atualizarPagamento);
        atualizarPagamento();
    }

});

// Mostrar forma de pagamento
const metodoPagamento = document.getElementById("metodoPagamento");
const pagamentoPix = document.getElementById("pagamento-pix");
const pagamentoCartao = document.getElementById("pagamento-cartao");

metodoPagamento.addEventListener("change", function () {
    if (this.value === "pix") {
        pagamentoPix.style.display = "block";
        pagamentoCartao.style.display = "none";
    } else if (this.value === "cartao") {
        pagamentoPix.style.display = "none";
        pagamentoCartao.style.display = "block";
    } else {
        pagamentoPix.style.display = "none";
        pagamentoCartao.style.display = "none";
    }
});


//  MÁSCARAS DOS INPUTS DO CARTÃO 

// Seleciona os inputs
const numeroCartao = document.querySelector('input[placeholder="Número do cartão"]');
const nomeCartao = document.querySelector('input[placeholder="Nome no cartão"]');
const validadeCartao = document.querySelector('input[placeholder="Validade (MM/AA)"]');
const cvvCartao = document.querySelector('input[placeholder="CVV"]');


// Número do cartão → 0000 0000 0000 0000
numeroCartao.addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, ""); // remove tudo que não é número
    valor = valor.substring(0, 16); // máximo 16 números
    valor = valor.replace(/(\d{4})(?=\d)/g, "$1 ");
    this.value = valor;
});


// Nome no cartão → somente letras
nomeCartao.addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
});


// Validade → MM/AA
validadeCartao.addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "");
    valor = valor.substring(0, 4);

    if (valor.length > 2) {
        valor = valor.replace(/(\d{2})(\d+)/, "$1/$2");
    }

    this.value = valor;
});


// CVV → apenas 3 números
cvvCartao.addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "");
    this.value = valor.substring(0, 3);
});