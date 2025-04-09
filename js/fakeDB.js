function inicialização(){

    const UserReg = localStorage.getItem("RegistrodeUsuarios")

    if(!UserReg){
        localStorage.setItem("RegistrodeUsuarios", JSON.stringify([
            {
                nome: "lucas",
                senha: "lucas"
            },

        ])
    )}

}

inicialização()

