
function login(){
    // e.preventDefault();
    const usuario = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    const teste = document.getElementById("teste")
    const teste1 = document.getElementById("teste1")
    const loginRealizado = document.querySelector(".loginRealizado")
    const emailErro = document.querySelector(".emailErro")
    const senhaErro = document.querySelector(".senhaErro")

    let RegUsuario = JSON.parse(localStorage.getItem("RegistrodeUsuarios"))

    const checarUsuario = RegUsuario.find(p=>p.nome == usuario)

    let userkey = false
    let senhakey = false

    if(checarUsuario == "")alert("funcionou")

    if(checarUsuario.nome == usuario){
        userkey = true       
    }

    if(checarUsuario.senha == senha){
        senhakey = true
    }else{
        senhaErro.innerHTML = `<p class="mt-1 mb-1 fs-5 text text-danger">Senha ou email estão incorretos!</p>`
    }

    console.log(senhakey)
    console.log(userkey)

    if(userkey === true && senhakey === true){
        localStorage.setItem("UsuarioLogado", JSON.stringify(
        {
            usuario: usuario,
            senha: senha,
        }));


        senhaErro.innerHTML = ` `
        loginRealizado.classList.remove("d-none")
        teste.classList.remove("d-none")
        teste1.classList.remove("d-none")
    }    
}

function logout(){
    const loginRealizado = document.querySelector(".loginRealizado")

    localStorage.removeItem("UsuarioLogado")
    loginRealizado.classList.add("d-none")
    teste.classList.add("d-none")
    teste1.classList.add("d-none")
}

document.querySelector("#lgnBtn").addEventListener("click", login)
document.querySelector(".logout").addEventListener("click", logout)
