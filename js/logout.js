function logout(){
  let Perfilnav = document.querySelector(".perfilnav")
  let PerfilDrop = document.querySelector(".perfilDrop")
  
  localStorage.removeItem("UsuarioLogado")
  PerfilDrop.classList.add("d-none")
  Perfilnav.classList.add("d-none")
  // OcultarBtnLogin.classList.remove('d-none')
  // OcultarBtnLogout.classList.remove('d-none')
  // loginRealizado.classList.add("d-none")
  closeDialog()


  // mensagem ao efetuar logout 
  setTimeout(dialog1(), 2000);
  setTimeout(() => {
    closeDialog1()
  }, timeout = 6000);

  window.location.reload()
}

function verificaUsuarioLogado(){
  let Perfilnav = document.querySelector(".perfilnav")
  let PerfilDrop = document.querySelector(".perfilDrop")
  let UsuarioLogado = localStorage.getItem("UsuarioLogado")

  if(UsuarioLogado){
    Perfilnav.classList.remove("d-none")
    PerfilDrop.classList.remove("d-none")
  }else{
    Perfilnav.classList.add("d-none")
    PerfilDrop.classList.add("d-none")
  }
}

// confirmacao de logout

function dialog(){
  let modal = document.querySelector('.dialog')

  modal.showModal()
}
function closeDialog(){
  let modal = document.querySelector('.dialog')
  modal.close()
}

// mensagem ao efetuar logout 

function dialog1(){
  let modal = document.querySelector('.dialog1')

  modal.showModal()
}
function closeDialog1(){
  let modal = document.querySelector('.dialog1')
  modal.close()
}