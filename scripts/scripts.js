function cadastrar() {
    let nome = document.getElementById("cadastrarNome").value;
    let email = document.getElementById("cadastrarEmail").value;
    let senha = document.getElementById("cadastrarSenha").value;

    if(!nome || !email || !senha) { 
        document.getElementById('mensagemErro').innerText = '*Preencha todos os campos';
        return;
    };

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const hasUser = usuarios?.some((user) => user.email === email);

    if(hasUser) {
        alert('Usuário existente!');
    } else {
        usuarios.push({
            nome: nome,
            email: email,
            senha: senha
        });

        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Usuário cadastrado com sucesso!');
        window.location.href = '../index.html';
    }
}

function login() {
    let email = document.getElementById("loginEmail").value;
    let senha = document.getElementById("loginSenha").value;

    let listaDeEmailsArmazenados = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioAutenticado = listaDeEmailsArmazenados.find(user => user.email === email && user.senha === senha);

    if(usuarioAutenticado){
        alert('Login bem-sucedido!');
        window.location.href = './pages/designers.html';
    } else {
        alert('Usuário não cadastrado!');
    }
}

function deslogar() {
    localStorage.removeItem('usuarios');
    window.location.href = '../index.html';
}