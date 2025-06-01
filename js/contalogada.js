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

  let imgArmazenada = JSON.parse(localStorage.getItem("profiles"))
  let perfilhyannav  = document.querySelector(".imgperfilnav")
  let perfilhyanmenu  = document.querySelector(".imgperfilmenu")

  let checarimg = imgArmazenada.find(p=>p.name == "Lucas")

    perfilhyannav.innerHTML = `<img id="imgperfil" src="${checarimg.img}" alt="" width="65" height="65" style="border-radius: 50%; ">`
    perfilhyanmenu.innerHTML = `<img id="imgperfil" src="${checarimg.img}" alt="" width="65" height="65" style="border-radius: 50%;"> ${checarimg.name}`
  
}
addEventListener("DOMContentLoaded",  mudarftperfil())