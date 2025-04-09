function inicialização(){

    const UserReg = localStorage.getItem("RegistrodeUsuarios")

    if(!UserReg){
        localStorage.setItem("RegistrodeUsuarios", JSON.stringify([
            {
                nome: "lucas",
                senha: "lucas"
            },
            {
                nome: "hyan@gmail.com",
                senha: "hyan"
            },
            {
                nome: "kauan@gmail.com",
                senha: "kauan"
            },
            {
                nome: "vitor@gmail.com",
                senha: "vitor"
            },
            {
                nome: "gesio@gmail.com",
                senha: "gesio"
            }
        ])
    )}

}

inicialização()

