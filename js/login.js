
function login(){
    // e.preventDefault();
    const usuario = document.getElementById("email").value
    const senha = document.getElementById("senha").value
   
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
        alert("senha está errada")
    }

    console.log(senhakey)
    console.log(userkey)

    if(userkey === true && senhakey === true){alert("login realizado")
        localStorage.setItem("UsarioLogado", JSON.stringify)({
            usuario: usuario,
            tipo: senha,
        })
    }


}

document.querySelector("#lgnBtn").addEventListener("click", login)
