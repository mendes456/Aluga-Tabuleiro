function loadComponent(id, file) {

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