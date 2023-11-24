function cadastrar() {
    let cadastrar = {};

    cadastrar.nome = document.getElementById("cadastrarNome").value;
    cadastrar.email = document.getElementById("cadastrarEmail").value;
    cadastrar.senha = document.getElementById("cadastrarSenha").value;

    console.log(JSON.parse(localStorage.getItem('info_usuario')));

    let listaDeEmailsArmazenados = new Array();
    listaDeEmailsArmazenados = JSON.parse(localStorage.getItem('info_usuario')) || [];

    console.log('email: ', cadastrar.email);
    console.log('listaDeEmailsArmazenados: ', listaDeEmailsArmazenados);

    const { email } = cadastrar;

    if(listaDeEmailsArmazenados.includes(email)) {
        console.log('O email já existe na lista.');
    } else {
        localStorage.setItem('info_usuario', JSON.stringify(cadastrar));
        alert('Conta criada com sucesso!');
    }
}

function login() {
    let login = {};

    login.email = document.getElementById("loginEmail").value;
    login.senha = document.getElementById("loginSenha").value;

    let listaDeEmailsArmazenados = JSON.parse(localStorage.getItem('email')) || [];

    if(listaDeEmailsArmazenados.includes(login.email)) {
        console.log('O email já existe na lista.');
    } else {
        console.log('O email não existe na lista ou é diferente');
    }
}

function deslogar() {

}