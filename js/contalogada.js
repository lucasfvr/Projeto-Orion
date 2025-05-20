// Metodo para manter asuario logado 

let Perfilnav = document.querySelector(".perfilnav")
let PerfilDrop = document.querySelector(".perfilDrop")

addEventListener("DOMContentLoaded", function() {
  let continuarlogado = localStorage.getItem("UsuarioLogado")

  if(continuarlogado){
    Perfilnav.classList.remove('d-none')
    PerfilDrop.classList.remove('d-none')
  }
})