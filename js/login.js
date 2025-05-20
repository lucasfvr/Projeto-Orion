    let Perfilnav = document.querySelector(".perfilnav")
    let PerfilDrop = document.querySelector(".perfilDrop")
    const loginRealizado = document.querySelector(".loginRealizado")

function login(){
    const usuario = document.getElementById("email").value
    const senha = document.getElementById("senha").value
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



    if(userkey === true && senhakey === true){
        localStorage.setItem("UsuarioLogado", JSON.stringify(
        {
            usuario: usuario,
            senha: senha,
        }));

    console.log(senhakey)
    console.log(userkey)

        senhaErro.innerHTML = ` `
        loginRealizado.classList.remove("d-none")
        PerfilDrop.classList.remove("d-none")
        Perfilnav.classList.remove("d-none")
    }    
}

function logout(){
    const loginRealizado = document.querySelector(".loginRealizado")

    localStorage.removeItem("UsuarioLogado")
    loginRealizado.classList.add("d-none")
    PerfilDrop.classList.add("d-none")
    Perfilnav.classList.add("d-none")
}

document.querySelector("#lgnBtn").addEventListener("click", login)
document.querySelector(".logout").addEventListener("click", logout)
