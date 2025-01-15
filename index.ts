import UsuarioService from "./src/domains/Usuario/UsuarioService";

async function main() {
    const body = {
        ID_Usuario: 0,
        Email: "vasco@gmail.com",
        Nome: "Ari",
        Senha: "1234",
        Plano: "Premium",
        Foto: null
    }

    const Usuario = await UsuarioService.create (body)

    console.log(Usuario);
}

main()