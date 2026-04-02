

let tamanhoFonte = 16;

function aumentarFonte() {
    tamanhoFonte += 2;
    document.documentElement.style.fontSize = tamanhoFonte + "px";
}

function diminuirFonte() {
    tamanhoFonte -= 2;
    document.documentElement.style.fontSize = tamanhoFonte + "px";
}

function fonteNormal() {
    tamanhoFonte = 16;
    document.documentElement.style.fontSize = "16px";
}

// 🌙 MODO ESCURO
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}


function ativarAcessibilidade() {

    document.querySelector(".btn-dark")?.addEventListener("click", toggleDarkMode);
    document.querySelector(".btn-aumentar")?.addEventListener("click", aumentarFonte);
    document.querySelector(".btn-diminuir")?.addEventListener("click", diminuirFonte);
    document.querySelector(".btn-normal")?.addEventListener("click", fonteNormal);

}
document.addEventListener("DOMContentLoaded", ativarAcessibilidade);