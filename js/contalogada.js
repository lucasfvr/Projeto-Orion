// Metodo para manter asuario logado 
let Perfilnav = document.querySelector(".perfilnav")
let PerfilDrop = document.querySelector(".perfilDrop")
let OcultarBtnLogin = document.querySelector(".logins-btn")
let OcultarBtnLogout = document.querySelector(".cad-btn")

addEventListener("DOMContentLoaded", function() {
  let continuarlogado = localStorage.getItem("UsuarioLogado")

  if(continuarlogado){
    Perfilnav.classList.remove('d-none')
    PerfilDrop.classList.remove('d-none')
    OcultarBtnLogin.classList.add('d-none')
    if (OcultarBtnLogout) {
        OcultarBtnLogout.classList.add('d-none')
    }
  }
})

// Metodo para mudar perfil logado

function mudarftperfil(){
  const PerfilHyan  = document.querySelector(".perfilHyan")

  let imgArmazenada = JSON.parse(localStorage.getItem("profiles"))
  let perfilhyan  = document.querySelector(".imgperfil")
  let checarimg = imgArmazenada.find(p=>p.name == "Hyan")

    perfilhyan.innerHTML = `<img id="imgperfil" src="${checarimg.img}" alt="" width="50" height="50" style="border-radius: 50%;">`
    console.log(checarimg);
  
  }
  mudarftperfil()