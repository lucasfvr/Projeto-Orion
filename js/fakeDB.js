const ObjUsuarios = [
    {
        nome: "Lucas",
        email: "lucas",
        senha: "lucas"
    },
    {
        nome: "Hyan",
        email: "hyan@gmail.com",
        senha: "hyan"
    },
    {
        nome: "Kauan",
        email: "kauan@gmail.com",
        senha: "kauan"
    },
    {
        nome: "Vitor",
        email: "vitor@gmail.com",
        senha: "vitor"
    },
    {
        nome: "Gésio",
        email: "gesio@gmail.com",
        senha: "gesio"
    },
]

function inicialização(){

    const UserReg = localStorage.getItem("RegistrodeUsuarios")

    if(!UserReg){
        localStorage.setItem("RegistrodeUsuarios", JSON.stringify(ObjUsuarios)
    )}
}

inicialização()

//cadastro de usuario  

function validNome(){
    const cadNome = document.querySelector("#floatingName").value
    const okname = document.querySelector("#okname")
    const noname = document.querySelector("#noname")

        // Verifica se o nome é válido 
    if(cadNome.length  < 3 || cadNome.length > 20){
        okname.classList.add("d-none")
        noname.classList.remove("d-none")
        return false
    }else{
        okname.classList.remove("d-none")
        noname.classList.add("d-none")
        return true
    }
}

function valiEmail(){
    const cadEmail = document.querySelector("#floatingEmail").value
    const okemail = document.querySelector("#okemail")
    const noemail = document.querySelector("#noemail")
    const emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

    // Verifica se a email é válida
    if(!cadEmail.match(emailRegex)){
        okemail.classList.add("d-none")
        noemail.classList.remove("d-none")
        return false
    }else{
        okemail.classList.remove("d-none")
        noemail.classList.add("d-none")
        return true
    }
}

function validSenha(){
    const cadSenha = document.querySelector("#floatingPassword").value
    const oksenha = document.querySelector("#oksenha")
    const nosenha = document.querySelector("#nosenha")

    // Verifica se a senha é válida
    if(cadSenha.length < 8 || cadSenha.length > 20){
        nosenha.classList.remove("d-none")
        oksenha.classList.add("d-none")
        return false
    }else{
        oksenha.classList.remove("d-none")
        nosenha.classList.add("d-none")
        return true
    }
}

function cadastro(){
    const cadNome = document.querySelector("#floatingName").value
    const cadEmail = document.querySelector("#floatingEmail").value
    const cadSenha = document.querySelector("#floatingPassword").value
    const MsgErro = document.querySelector(".erro")

    // Verifica se todos os campos foram preenchidos
    if(cadNome == "" || cadEmail == "" || cadSenha == ""){        
        MsgErro.classList.remove("d-none")
        MsgErro.innerHTML = `<p class="mt-1 mb-1 fs-5 text text-danger">Preencha todos os campos!</p>`
    }else{
        MsgErro.classList.add("d-none")
    }

    validNome()
    
    valiEmail()

    validSenha()

    if(validNome() && valiEmail() && validSenha()){
        MsgErro.classList.remove("d-none")
        adicionarUser()
        localStorage.setItem("RegistrodeUsuarios", JSON.stringify(ObjUsuarios))
    }
}

//Adicionando a conta ao fakeDB

function adicionarUser(){
    ObjUsuarios.push({
        nome: document.querySelector("#floatingName").value,
        email: document.querySelector("#floatingEmail").value,
        senha: document.querySelector("#floatingPassword").value
    });
}