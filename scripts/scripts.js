function validarPagina() {
    const paginaAtual = window.location.pathname;

    if (paginaAtual === '/pages/designers.html') {
        const modais = [
            {
                modal_title: 'CONHEÇA OS DESIGNERS',
                modal_text: 'Conheça nossos Designers, e selecione o que secaixa melhor na função na qual você procura! Cada membro do nosso time é especializado em uma área dentro de Design, temos uma diversidade de habilidades para atender o seu trabalho.',
                modal_button: 'arrow_forward'
            },
            {
                modal_title: 'VAMOS LÁ!',
                modal_text: 'Com o cursor do mouse, passe por cima de alguma foto de um dos membros de nossa equipe para conhecer suas informações básicas e habilidades. Clicando na foto você vai ser redirecionado para o portifólio daquele Designer.',
                modal_button: 'done'
            }
        ];

        const modal = document.querySelector('dialog');
        const modal_title = document.getElementById('modal-title');
        const modal_text = document.getElementById('modal-text');
        const modal_button = document.getElementById('modal-button');
        const fechar = document.querySelector('dialog button');

        function exibirModal(indice) {
            modal_title.innerHTML = modais[indice].modal_title;
            modal_text.innerHTML = modais[indice].modal_text;
            modal_button.innerHTML = modais[indice].modal_button;
            modal.showModal();
        }

        exibirModal(0);

        fechar.onclick = function () {
            exibirModal(1);

            if (modal_button.innerHTML === 'done') {
                fechar.onclick = function () {
                    modal.close();
                };
            }
        };
    }
}

window.onload = validarPagina;

function verificarLogin() {
    const autenticado = localStorage.getItem('autenticado') === 'true';
    const paginaAtual = window.location.pathname;
    const paginasSemAutenticacao = ['/index.html', '/pages/cadastrar.html'];
    const precisaAutenticacao = !paginasSemAutenticacao.includes(paginaAtual);
    
    if (autenticado && !precisaAutenticacao) {
        window.location.href = '/pages/designers.html';
    } 
    
    if (!autenticado && precisaAutenticacao) {
        window.location.href = '/index.html';
    }
}

verificarLogin();

function cadastrar() {
    let email = document.getElementById("cadastrarEmail").value;
    let senha = document.getElementById("cadastrarSenha").value;
    let confirmarSenha = document.getElementById("cadastrarConfirmarSenha").value;

    if(!email || !senha || !confirmarSenha) { 
        alerta('Preencha todos os campos!');
        return;
    };

    if(senha !== confirmarSenha) {
        alerta('Senhas diferentes!');
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioExistente = usuarios?.some((user) => user.email === email);

    if(usuarioExistente) {
        alerta('Usuário existente!');
    } else {
        usuarios.push({
            email: email,
            senha: senha
        });

        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        window.location.href = '/index.html';
    }
}

function login() {
    let email = document.getElementById("loginEmail").value;
    let senha = document.getElementById("loginSenha").value;

    if(!email || !senha) { 
        alerta('Preencha todos os campos!');
        return;
    };

    let listaDeEmailsArmazenados = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioAutenticado = listaDeEmailsArmazenados.find(user => user.email === email && user.senha === senha);

    if(usuarioAutenticado){
        localStorage.setItem('autenticado', 'true');
        window.location.href = '/pages/designers.html';
    } else {
        alerta('Usuário não cadastrado!')
    }
}

function deslogar() {
    localStorage.setItem('autenticado', 'false');
    window.location.href = '/index.html';
}

function alerta(mensagem){
    const alerta = document.getElementById('alertaErro');
    alerta.innerHTML = mensagem;
    alerta.style.display = 'block';

    setTimeout(function() {
        alerta.style.display = 'none';
    }, 3000);
}