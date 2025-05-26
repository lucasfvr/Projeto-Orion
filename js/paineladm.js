const formularioJogo = document.getElementById('form-jogo');
const listaJogos = document.getElementById('lista-jogos');
const campoImagemJogo = document.getElementById('imagem');
const modalDetalhesJogo = $('#modal-detalhes-jogo');
const totalJogosPainel = document.getElementById('total-jogos');
const btnExcluirJogosSelecionados = document.getElementById('btn-excluir-jogos-selecionados');
const btnAmpliarImagem = document.getElementById('btn-ampliar-imagem');

const formularioUsuario = document.getElementById('form-usuario');
const listaUsuarios = document.getElementById('lista-usuarios');
const modalDetalhesUsuario = $('#modal-detalhes-usuario');
const totalUsuariosPainel = document.getElementById('total-usuarios');
const btnExcluirUsuariosSelecionados = document.getElementById('btn-excluir-usuarios-selecionados');

const modalConfirmacao = $('#modal-confirmacao');
const corpoModalConfirmacao = document.getElementById('corpo-modal-confirmacao');
const btnAcaoConfirmacao = document.getElementById('btn-acao-confirmacao');
const modalSucesso = $('#modal-sucesso');
const corpoModalSucesso = document.getElementById('corpo-modal-sucesso');
const modalVisualizadorImagem = $('#modal-visualizador-imagem');
const imagemAmpliada = document.getElementById('imagem-ampliada');

const totalJogosGeral = document.getElementById('total-jogos-geral');
const totalUsuariosGeral = document.getElementById('total-usuarios-geral');

let acaoConfirmacaoPendente = null;
let idConfirmacaoPendente = null;
let dadosFormularioPendente = null; // NOVO: Para guardar os dados do formulário de cadastro

campoImagemJogo.addEventListener('change', function () {
    const nomeArquivo = this.files[0] ? this.files[0].name : 'Escolher arquivo';
    document.querySelector('.custom-file-label').textContent = nomeArquivo;
});

function mostrarSecao(secao) {
    document.getElementById('painel-geral-secao').style.display = 'none';
    document.getElementById('painel-jogos-secao').style.display = 'none';
    document.getElementById('form-jogo-secao').style.display = 'none';
    document.getElementById('lista-jogos-secao').style.display = 'none';
    document.getElementById('painel-usuarios-secao').style.display = 'none';
    document.getElementById('form-usuario-secao').style.display = 'none';
    document.getElementById('lista-usuarios-secao').style.display = 'none';

    $('.nav-link').removeClass('active');
    $('.nav-item.has-treeview').removeClass('menu-open');

    if (secao === 'painel-geral') {
        document.getElementById('painel-geral-secao').style.display = 'block';
        atualizarContadoresPainelGeral();
        $('a[onclick="mostrarSecao(\'painel-geral\')"]').addClass('active');
    } else if (secao === 'painel-jogos') {
        document.getElementById('painel-jogos-secao').style.display = 'block';
        atualizarTotalJogosPainel();
        $('a[onclick="mostrarSecao(\'painel-jogos\')"]').addClass('active').closest('.nav-item.has-treeview').addClass('menu-open');
    } else if (secao === 'form-jogo') {
        document.getElementById('form-jogo-secao').style.display = 'block';
        $('a[onclick="mostrarSecao(\'form-jogo\')"]').addClass('active').closest('.nav-item.has-treeview').addClass('menu-open');
    } else if (secao === 'lista-jogos') {
        document.getElementById('lista-jogos-secao').style.display = 'block';
        carregarJogos();
        $('a[onclick="mostrarSecao(\'lista-jogos\')"]').addClass('active').closest('.nav-item.has-treeview').addClass('menu-open');
    } else if (secao === 'painel-usuarios') {
        document.getElementById('painel-usuarios-secao').style.display = 'block';
        atualizarTotalUsuariosPainel();
        $('a[onclick="mostrarSecao(\'painel-usuarios\')"]').addClass('active').closest('.nav-item.has-treeview').addClass('menu-open');
    } else if (secao === 'form-usuario') {
        document.getElementById('form-usuario-secao').style.display = 'block';
        $('a[onclick="mostrarSecao(\'form-usuario\')"]').addClass('active').closest('.nav-item.has-treeview').addClass('menu-open');
    } else if (secao === 'lista-usuarios') {
        document.getElementById('lista-usuarios-secao').style.display = 'block';
        carregarUsuarios();
        $('a[onclick="mostrarSecao(\'lista-usuarios\')"]').addClass('active').closest('.nav-item.has-treeview').addClass('menu-open');
    }
}

function atualizarContadoresPainelGeral() {
    let jogos = JSON.parse(localStorage.getItem('jogos')) || [];
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    totalJogosGeral.textContent = jogos.length;
    totalUsuariosGeral.textContent = usuarios.length;
}

function mostrarModalConfirmacao(tipoAcao, id = null, dadosForm = null) { // NOVO: Adicionado 'dadosForm'
    acaoConfirmacaoPendente = tipoAcao;
    idConfirmacaoPendente = id;
    dadosFormularioPendente = dadosForm; // NOVO: Salva os dados do formulário
    let mensagem = '';
    let titulo = '';

    if (tipoAcao === 'todos-jogos') {
        let jogos = JSON.parse(localStorage.getItem('jogos')) || [];
        if (jogos.length === 0) {
            mostrarModalSucesso('Não há jogos para remover!', 'info');
            return;
        }
        mensagem = 'Tem certeza que deseja excluir TODOS os jogos cadastrados? Esta ação é irreversível.';
        titulo = 'Confirmar Limpeza Total de Jogos';
    } else if (tipoAcao === 'todos-usuarios') {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (usuarios.length === 0) {
            mostrarModalSucesso('Não há usuários para remover!', 'info');
            return;
        }
        mensagem = 'Tem certeza que deseja excluir TODOS os usuários cadastrados? Esta ação é irreversível.';
        titulo = 'Confirmar Limpeza Total de Usuários';
    } else if (tipoAcao === 'jogo-individual') {
        mensagem = 'Tem certeza que deseja excluir este jogo?';
        titulo = 'Confirmar Exclusão';
    } else if (tipoAcao === 'jogos-selecionados') {
        const contagem = document.querySelectorAll('.checkbox-jogo:checked').length;
        if (contagem === 0) { mostrarModalSucesso('Nenhum jogo selecionado para exclusão.', 'info'); return; }
        mensagem = `Tem certeza que deseja excluir ${contagem} jogo(s) selecionado(s)?`;
        titulo = 'Confirmar Exclusão Múltipla';
    } else if (tipoAcao === 'usuario-individual') {
        mensagem = 'Tem certeza que deseja excluir este usuário?';
        titulo = 'Confirmar Exclusão de Usuário';
    } else if (tipoAcao === 'usuarios-selecionados') {
        const contagem = document.querySelectorAll('.checkbox-usuario:checked').length;
        if (contagem === 0) { mostrarModalSucesso('Nenhum usuário selecionado para exclusão.', 'info'); return; }
        mensagem = `Tem certeza que deseja excluir ${contagem} usuário(s) selecionado(s)?`;
        titulo = 'Confirmar Exclusão Múltipla de Usuários';
    } else if (tipoAcao === 'cadastrar-jogo') { // NOVO TIPO DE AÇÃO
        mensagem = `Tem certeza que deseja cadastrar o jogo "${dadosForm.titulo}"?`;
        titulo = 'Confirmar Cadastro de Jogo';
    } else if (tipoAcao === 'cadastrar-usuario') { // NOVO TIPO DE AÇÃO
        mensagem = `Tem certeza que deseja cadastrar o usuário "${dadosForm.nome}"?`;
        titulo = 'Confirmar Cadastro de Usuário';
    }

    modalConfirmacao.find('.modal-title').html(`<i class="fas fa-exclamation-triangle mr-2"></i> ${titulo}`);
    corpoModalConfirmacao.textContent = mensagem;
    modalConfirmacao.modal('show');
}

function mostrarModalSucesso(mensagem, tipo = 'sucesso') {
    let classeIcone = '';
    let classeBgCabecalho = '';
    let textoTitulo = '';

    if (tipo === 'sucesso') {
        classeIcone = 'fas fa-check-circle text-success';
        classeBgCabecalho = 'bg-success';
        textoTitulo = 'Sucesso!';
    } else if (tipo === 'info') {
        classeIcone = 'fas fa-info-circle text-info';
        classeBgCabecalho = 'bg-info';
        textoTitulo = 'Informação';
    } else if (tipo === 'erro') {
        classeIcone = 'fas fa-times-circle text-danger';
        classeBgCabecalho = 'bg-danger';
        textoTitulo = 'Erro!';
    }

    modalSucesso.find('.modal-header').removeClass('bg-success bg-info bg-danger').addClass(classeBgCabecalho);
    modalSucesso.find('.modal-title').html(`<i class="${classeIcone.split(' ')[0]} mr-2"></i> ${textoTitulo}`);
    corpoModalSucesso.innerHTML = `<i class="${classeIcone} mb-3"></i><br>${mensagem}`;
    modalSucesso.modal('show');
}

btnAcaoConfirmacao.addEventListener('click', function() {
    modalConfirmacao.modal('hide');
    if (acaoConfirmacaoPendente === 'jogo-individual') {
        excluirJogo(idConfirmacaoPendente);
        mostrarModalSucesso('Jogo removido com sucesso!', 'sucesso');
    } else if (acaoConfirmacaoPendente === 'jogos-selecionados') {
        const contagem = document.querySelectorAll('.checkbox-jogo:checked').length;
        excluirJogosSelecionados();
        mostrarModalSucesso(`${contagem} jogo(s) removido(s) com sucesso!`, 'sucesso');
    } else if (acaoConfirmacaoPendente === 'todos-jogos') {
        excluirTodosJogos();
        mostrarModalSucesso('Todos os jogos foram removidos. Arquivo vazio!', 'sucesso');
    } else if (acaoConfirmacaoPendente === 'usuario-individual') {
        excluirUsuario(idConfirmacaoPendente);
        mostrarModalSucesso('Usuário removido com sucesso!', 'sucesso');
    } else if (acaoConfirmacaoPendente === 'usuarios-selecionados') {
        const contagem = document.querySelectorAll('.checkbox-usuario:checked').length;
        excluirUsuariosSelecionados();
        mostrarModalSucesso(`${contagem} usuário(s) removido(s) com sucesso!`, 'sucesso');
    } else if (acaoConfirmacaoPendente === 'todos-usuarios') {
        excluirTodosUsuarios();
        mostrarModalSucesso('Todos os usuários foram removidos. Arquivo vazio!', 'sucesso');
    } else if (acaoConfirmacaoPendente === 'cadastrar-jogo') { // NOVO: Confirmação de cadastro de jogo
        finalizarCadastroJogo(dadosFormularioPendente);
    } else if (acaoConfirmacaoPendente === 'cadastrar-usuario') { // NOVO: Confirmação de cadastro de usuário
        finalizarCadastroUsuario(dadosFormularioPendente);
    }

    acaoConfirmacaoPendente = null;
    idConfirmacaoPendente = null;
    dadosFormularioPendente = null; // NOVO: Limpa os dados pendentes
    atualizarContadoresPainelGeral();
});

function atualizarTotalJogosPainel() {
    let jogos = JSON.parse(localStorage.getItem('jogos')) || [];
    totalJogosPainel.textContent = jogos.length;
}

formularioJogo.addEventListener('submit', function (e) {
    e.preventDefault();

    if (campoImagemJogo.files.length === 0) {
        mostrarModalSucesso("Por favor, selecione uma imagem para o jogo.", 'info');
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function () {
        const novoJogoDados = { // NOVO: Objeto temporário para guardar os dados
            titulo: document.getElementById('titulo').value,
            genero: document.getElementById('genero').value,
            desenvolvedora: document.getElementById('desenvolvedora').value,
            anoLancamento: document.getElementById('ano').value,
            imagem: leitor.result
        };
        mostrarModalConfirmacao('cadastrar-jogo', null, novoJogoDados); // NOVO: Chama a modal de confirmação de cadastro
    };

    leitor.readAsDataURL(campoImagemJogo.files[0]);
});

// NOVO: Função para finalizar o cadastro do jogo após a confirmação
function finalizarCadastroJogo(jogo) {
    let jogos = JSON.parse(localStorage.getItem('jogos')) || [];
    jogo.id = Date.now();
    jogos.push(jogo);
    localStorage.setItem('jogos', JSON.stringify(jogos));
    atualizarTotalJogosPainel();
    atualizarContadoresPainelGeral();
    mostrarModalSucesso("Jogo salvo com sucesso!", 'sucesso');
    formularioJogo.reset();
    document.querySelector('.custom-file-label').textContent = 'Escolher arquivo';
    mostrarSecao('lista-jogos');
}


function salvarJogo(jogo) { // Mantida por compatibilidade, mas o fluxo mudou para finalizarCadastroJogo
    let jogos = JSON.parse(localStorage.getItem('jogos')) || [];
    jogo.id = Date.now();
    jogos.push(jogo);
    localStorage.setItem('jogos', JSON.stringify(jogos));
    atualizarTotalJogosPainel();
    atualizarContadoresPainelGeral();
}

function carregarJogos() {
    listaJogos.innerHTML = '';
    let jogos = JSON.parse(localStorage.getItem('jogos')) || [];

    if (jogos.length === 0) {
        listaJogos.innerHTML = '<li class="list-group-item text-center text-muted">Nenhum jogo cadastrado.</li>';
        btnExcluirJogosSelecionados.style.display = 'none';
        return;
    }

    btnExcluirJogosSelecionados.style.display = 'inline-block';

    jogos.forEach(jogo => {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.setAttribute('data-id-jogo', jogo.id);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox-jogo';
        checkbox.value = jogo.id;
        checkbox.addEventListener('change', alternarBotaoExcluirJogosSelecionados);
        item.appendChild(checkbox);

        const conteudoWrapper = document.createElement('div');
        conteudoWrapper.className = 'conteudo-item-lista';
        conteudoWrapper.onclick = () => mostrarDetalhesJogo(jogo.id);

        const img = document.createElement('img');
        img.src = jogo.imagem || 'https://via.placeholder.com/60x60?text=Sem+Imagem';
        img.alt = jogo.titulo;
        conteudoWrapper.appendChild(img);

        const texto = document.createElement('div');
        texto.className = 'texto-item-lista';
        texto.innerHTML = `
            <strong>${jogo.titulo}</strong><br>
            <small class="text-muted">Gênero: ${jogo.genero}</small><br>
            <small class="text-muted">Desenvolvedora: ${jogo.desenvolvedora}</small><br>
            <small class="text-muted">Ano: ${jogo.anoLancamento}</small>
        `;
        conteudoWrapper.appendChild(texto);

        item.appendChild(conteudoWrapper);

        const btnExcluir = document.createElement('button');
        btnExcluir.className = 'btn btn-danger btn-sm ml-auto';
        btnExcluir.innerHTML = '<i class="fas fa-trash"></i>';
        btnExcluir.title = 'Excluir Jogo Individualmente';
        btnExcluir.onclick = (e) => {
            e.stopPropagation();
            mostrarModalConfirmacao('jogo-individual', jogo.id);
        };

        item.appendChild(btnExcluir);
        listaJogos.appendChild(item);
    });
    alternarBotaoExcluirJogosSelecionados();
}

function alternarBotaoExcluirJogosSelecionados() {
    const checkboxesMarcados = document.querySelectorAll('.checkbox-jogo:checked');
    if (checkboxesMarcados.length > 0) {
        btnExcluirJogosSelecionados.style.display = 'inline-block';
    } else {
        btnExcluirJogosSelecionados.style.display = 'none';
    }
}

btnExcluirJogosSelecionados.addEventListener('click', function() {
    mostrarModalConfirmacao('jogos-selecionados');
});

function excluirJogosSelecionados() {
    const checkboxesMarcados = document.querySelectorAll('.checkbox-jogo:checked');
    let jogos = JSON.parse(localStorage.getItem('jogos')) || [];
    const idsParaExcluir = Array.from(checkboxesMarcados).map(cb => parseInt(cb.value));

    jogos = jogos.filter(jogo => !idsParaExcluir.includes(jogo.id));
    localStorage.setItem('jogos', JSON.stringify(jogos));
    carregarJogos();
    atualizarTotalJogosPainel();
    atualizarContadoresPainelGeral();
}

function mostrarDetalhesJogo(id) {
    let jogos = JSON.parse(localStorage.getItem('jogos')) || [];
    const jogo = jogos.find(j => j.id === id);

    if (jogo) {
        document.getElementById('imagem-detalhe-jogo').src = jogo.imagem || 'https://via.placeholder.com/200x200?text=Sem+Imagem';
        document.getElementById('titulo-detalhe-jogo').textContent = jogo.titulo;
        document.getElementById('genero-detalhe-jogo').textContent = jogo.genero;
        document.getElementById('desenvolvedora-detalhe-jogo').textContent = jogo.desenvolvedora;
        document.getElementById('ano-detalhe-jogo').textContent = jogo.anoLancamento;

        btnAmpliarImagem.onclick = () => {
            modalVisualizadorImagem.modal('show');
            imagemAmpliada.src = jogo.imagem || 'https://via.placeholder.com/600x400?text=Sem+Imagem';
            modalDetalhesJogo.modal('hide');
        };

        modalDetalhesJogo.modal('show');
    }
}

function excluirJogo(id) {
    let jogos = JSON.parse(localStorage.getItem('jogos')) || [];
    jogos = jogos.filter(jogo => jogo.id !== id);
    localStorage.setItem('jogos', JSON.stringify(jogos));
    carregarJogos();
    atualizarTotalJogosPainel();
    atualizarContadoresPainelGeral();
}

function excluirTodosJogos() {
    localStorage.removeItem('jogos');
    carregarJogos();
    atualizarTotalJogosPainel();
    atualizarContadoresPainelGeral();
}

function atualizarTotalUsuariosPainel() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    totalUsuariosPainel.textContent = usuarios.length;
}

formularioUsuario.addEventListener('submit', function (e) {
    e.preventDefault();

    const novoUsuarioDados = { // NOVO: Objeto temporário para guardar os dados
        nome: document.getElementById('nome-usuario').value,
        email: document.getElementById('email-usuario').value,
        senha: document.getElementById('senha-usuario').value,
        sexo: document.getElementById('sexo-usuario').value,
        tipoUsuario: document.getElementById('tipo-usuario').value
    };
    mostrarModalConfirmacao('cadastrar-usuario', null, novoUsuarioDados); // NOVO: Chama a modal de confirmação de cadastro
});

// NOVO: Função para finalizar o cadastro do usuário após a confirmação
function finalizarCadastroUsuario(usuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuario.id = Date.now();
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    atualizarTotalUsuariosPainel();
    atualizarContadoresPainelGeral();
    mostrarModalSucesso("Usuário salvo com sucesso!", 'sucesso');
    formularioUsuario.reset();
    mostrarSecao('lista-usuarios');
}

function salvarUsuario(usuario) { // Mantida por compatibilidade, mas o fluxo mudou para finalizarCadastroUsuario
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuario.id = Date.now();
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    atualizarTotalUsuariosPainel();
    atualizarContadoresPainelGeral();
}

function carregarUsuarios() {
    listaUsuarios.innerHTML = '';
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarios.length === 0) {
        listaUsuarios.innerHTML = '<li class="list-group-item text-center text-muted">Nenhum usuário cadastrado.</li>';
        btnExcluirUsuariosSelecionados.style.display = 'none';
        return;
    }

    btnExcluirUsuariosSelecionados.style.display = 'inline-block';

    usuarios.forEach(usuario => {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.setAttribute('data-id-usuario', usuario.id);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox-usuario';
        checkbox.value = usuario.id;
        checkbox.addEventListener('change', alternarBotaoExcluirUsuariosSelecionados);
        item.appendChild(checkbox);

        const conteudoWrapper = document.createElement('div');
        conteudoWrapper.className = 'conteudo-item-lista';
        conteudoWrapper.onclick = () => mostrarDetalhesUsuario(usuario.id);

        const texto = document.createElement('div');
        texto.className = 'texto-item-lista';
        texto.innerHTML = `
            <strong>${usuario.nome}</strong><br>
            <small class="text-muted">E-mail: ${usuario.email}</small><br>
            <small class="text-muted">Tipo: ${usuario.tipoUsuario}</small>
        `;
        conteudoWrapper.appendChild(texto);

        item.appendChild(conteudoWrapper);

        const btnExcluir = document.createElement('button');
        btnExcluir.className = 'btn btn-danger btn-sm ml-auto';
        btnExcluir.innerHTML = '<i class="fas fa-trash"></i>';
        btnExcluir.title = 'Excluir Usuário Individualmente';
        btnExcluir.onclick = (e) => {
            e.stopPropagation();
            mostrarModalConfirmacao('usuario-individual', usuario.id);
        };

        item.appendChild(btnExcluir);
        listaUsuarios.appendChild(item);
    });
    alternarBotaoExcluirUsuariosSelecionados();
}

function alternarBotaoExcluirUsuariosSelecionados() {
    const checkboxesMarcados = document.querySelectorAll('.checkbox-usuario:checked');
    if (checkboxesMarcados.length > 0) {
        btnExcluirUsuariosSelecionados.style.display = 'inline-block';
    } else {
        btnExcluirUsuariosSelecionados.style.display = 'none';
    }
}

btnExcluirUsuariosSelecionados.addEventListener('click', function() {
    mostrarModalConfirmacao('usuarios-selecionados');
});

function excluirUsuariosSelecionados() {
    const checkboxesMarcados = document.querySelectorAll('.checkbox-usuario:checked');
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const idsParaExcluir = Array.from(checkboxesMarcados).map(cb => parseInt(cb.value));

    usuarios = usuarios.filter(usuario => !idsParaExcluir.includes(usuario.id));
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    carregarUsuarios();
    atualizarTotalUsuariosPainel();
    atualizarContadoresPainelGeral();
}

function mostrarDetalhesUsuario(id) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.id === id);

    if (usuario) {
        document.getElementById('nome-detalhe-usuario').textContent = usuario.nome;
        document.getElementById('email-detalhe-usuario').textContent = usuario.email;
        document.getElementById('sexo-detalhe-usuario').textContent = usuario.sexo;
        document.getElementById('tipo-detalhe-usuario').textContent = usuario.tipoUsuario;
        modalDetalhesUsuario.modal('show');
    }
}

function excluirTodosUsuarios() {
    localStorage.removeItem('usuarios');
    carregarUsuarios();
    atualizarTotalUsuariosPainel();
    atualizarContadoresPainelGeral();
}

mostrarSecao('painel-geral');