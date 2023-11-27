function cadastrar() {
    let email = document.getElementById("cadastrarEmail").value;
    let senha = document.getElementById("cadastrarSenha").value;
    let confirmarSenha = document.getElementById("cadastrarConfirmarSenha").value;

    if(!email || !senha || !confirmarSenha) { 
        popup('Preencha todos os campos!');
        return;
    };

    if(!senha !== !confirmarSenha) {
        popup('Senhas diferentes!');
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const hasUser = usuarios?.some((user) => user.email === email);

    if(hasUser) {
        popup('Usuário existente!');
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
        popup('Preencha todos os campos!');
        return;
    };

    let listaDeEmailsArmazenados = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioAutenticado = listaDeEmailsArmazenados.find(user => user.email === email && user.senha === senha);

    if(usuarioAutenticado){
        window.location.href = '/pages/designers.html';
    } else {
        popup('Usuário não cadastrado!')
    }
}

function deslogar() {
    localStorage.removeItem('usuarios');
    window.location.href = '/index.html';
}

function popup(mensagem){
    const alerta = document.getElementById('alertaErro');
    alerta.innerHTML = mensagem;
    alerta.style.display = 'block';

    setTimeout(function() {
        alerta.style.display = 'none';
    }, 3000);
}