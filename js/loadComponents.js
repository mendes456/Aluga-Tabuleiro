function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;

            // Quando carregar o header
            if (id === "header") {
                ativarMenu();
                ativarAcessibilidade();
                atualizarHeaderUsuario();
            }
        });
}

// MENU MOBILE
function ativarMenu() {
    const menu = document.getElementById("menu");

    if (menu) {
        menu.addEventListener("show.bs.collapse", function () {
            document.body.classList.add("menu-aberto");
        });

        menu.addEventListener("hide.bs.collapse", function () {
            document.body.classList.remove("menu-aberto");
        });
    }
}

// USUÁRIO LOGADO NO HEADER
function atualizarHeaderUsuario() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario_logado"));

    const btnLogin = document.getElementById("btnLogin");
    const btnPainel = document.getElementById("btnPainel");
    const nomeUsuario = document.getElementById("nomeUsuario");

    // evita erro se ainda não existir
    if (!btnLogin || !btnPainel || !nomeUsuario) return;

    if (usuarioLogado) {
        // esconde botão login
        btnLogin.style.display = "none";

        // mostra botão painel
        btnPainel.style.display = "inline-block";

        // mostra nome do usuário
        nomeUsuario.style.display = "inline-block";
        nomeUsuario.innerText = `Olá, ${usuarioLogado.nome}`;
    }
}

// CARREGAR COMPONENTES
loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");






/*function loadComponent(id, file) {

    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;

            // 👇 RODA O SCRIPT SÓ QUANDO O HEADER EXISTIR
            if (id === "header") {
                ativarMenu();
                ativarAcessibilidade(); // 👈 NOVO

            }


        });

}

function ativarMenu() {
    const menu = document.getElementById('menu');

    if (menu) {
        menu.addEventListener('show.bs.collapse', function () {
            document.body.classList.add('menu-aberto');
        });

        menu.addEventListener('hide.bs.collapse', function () {
            document.body.classList.remove('menu-aberto');
        });
    }
}




loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");


//PAINEL DE USER
document.addEventListener("DOMContentLoaded", function () {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario_logado"));

    const btnLogin = document.getElementById("btnLogin");
    const btnPainel = document.getElementById("btnPainel");
    const nomeUsuario = document.getElementById("nomeUsuario");

    if (usuarioLogado) {
        // esconde login
        btnLogin.style.display = "none";

        // mostra painel
        btnPainel.style.display = "inline-block";

        // mostra nome do usuário
        nomeUsuario.style.display = "inline-block";
        nomeUsuario.innerText = `Olá, ${usuarioLogado.nome}`;
    }
});*/