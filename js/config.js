
    const playerNameInput = document.getElementById('nome-jogador');
    if (playerNameInput) {
        playerNameInput.addEventListener('input', function() {
            const playerName = this.value;
            if (playerName) {
                document.querySelector('h1').innerText = `Bem-vindo, ${playerName}!`;
            } else {
                document.querySelector('h1').innerText = 'Informações do Meu Perfil';
            }
        });
    }