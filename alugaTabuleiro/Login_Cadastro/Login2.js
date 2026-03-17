document.addEventListener('DOMContentLoaded', () => {
    const btnToggle = document.getElementById('toggleLoginPassword');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');

    // Olhinho
    if (btnToggle && passwordInput) {
        btnToggle.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            btnToggle.textContent = isPassword ? '🙈' : '👁️';
        });
    }

    // Validação ao enviar
    loginForm.addEventListener('submit', (e) => {
        const senha = passwordInput.value;
        const regraValida = /[a-zA-Z]/.test(senha) && /[0-9]/.test(senha) && senha.length === 6;

        if (!regraValida) {
            e.preventDefault();
            alert("A senha deve ter 6 caracteres, mesclando letras e números.");
        } else {
            alert("Login realizado com sucesso! (Simulação)");
        }
    });
});