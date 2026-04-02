function buscarJogos() {

    let input = document.getElementById("busca").value.toLowerCase();

    let jogos = document.querySelectorAll(".jogo");

    jogos.forEach(function(jogo){

        let titulo = jogo.querySelector(".card-title").textContent.toLowerCase();

        let categoria = jogo.parentElement
            .getAttribute("data-categoria")
            .toLowerCase();

        if (
            titulo.includes(input) ||
            categoria.includes(input)
        ) {
            jogo.parentElement.style.display = "";
        } else {
            jogo.parentElement.style.display = "none";
        }

    });

}