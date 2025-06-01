function login(){
    let OcultarBtnLogin = document.querySelector(".logins-btn")
    let OcultarBtnLogout = document.querySelector(".cad-btn")
    let Perfilnav = document.querySelector(".perfilnav")
    let PerfilDrop = document.querySelector(".perfilDrop")
    const loginRealizado = document.querySelector(".loginRealizado")
    const usuario = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    const LoginErro = document.querySelector(".senhaErro")

    let RegUsuario = JSON.parse(localStorage.getItem("RegistrodeUsuarios"))

    const checarUsuario = RegUsuario.find(p=>p.email == usuario)

    let userkey = false
    let senhakey = false

    if(checarUsuario == undefined){
        LoginErro.innerHTML = `<p class="mt-1 mb-1 fs-5 text text-danger">Email incorretos!</p>`
    }else{
        userkey = true
    }

    if(checarUsuario.senha == senha){
        senhakey = true
    }else{
        LoginErro.innerHTML = `<p class="mt-1 mb-1 fs-5 text text-danger">Senha incorretos!</p>`
    }

    if(userkey === true && senhakey === true){
        localStorage.setItem("UsuarioLogado", JSON.stringify(
        {
            usuario: usuario,
            senha: senha,
        }));

        console.log(senhakey)
        console.log(userkey)

        LoginErro.innerHTML = ` `
        loginRealizado.classList.remove("d-none")
        PerfilDrop.classList.remove("d-none")
        Perfilnav.classList.remove("d-none")
        OcultarBtnLogin.classList.add('d-none')
        OcultarBtnLogout.classList.add('d-none')
        window.location.href = "biblioteca.html"
    }    
}


