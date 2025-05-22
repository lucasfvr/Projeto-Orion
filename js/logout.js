function logout(){
  let Perfilnav = document.querySelector(".perfilnav")
  let PerfilDrop = document.querySelector(".perfilDrop")
  let OcultarBtnLogin = document.querySelector(".logins-btn")
  let OcultarBtnLogout = document.querySelector(".cad-btn")
  const loginRealizado = document.querySelector(".loginRealizado")
  
  localStorage.removeItem("UsuarioLogado")
  PerfilDrop.classList.add("d-none")
  Perfilnav.classList.add("d-none")
  OcultarBtnLogin.classList.remove('d-none')
  OcultarBtnLogout.classList.remove('d-none')
  loginRealizado.classList.add("d-none")
}