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
    OcultarBtnLogout.classList.add('d-none')
  }
})