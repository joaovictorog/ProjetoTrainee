/*import UsuarioService from "./src/domains/Usuario/UsuarioService";

async function main() {
    const body = {
        ID_Usuario: 1,
        Email: "sljflksjl@gmail.com",
        Nome: "Luiz", 
        Senha: "1234",
        Plano: "premium",
        Foto: null
    }
    
    const usuario = await UsuarioService.create(body)

    console.log(usuario)
}

main()*/

import MusicaService from "./src/domains/Musica/MusicaService";

async function main() {
    const body = {
        ID_Musica: 2,
        Nome: "Naquela Mesa",
        ArtistaID: 3,
        Genero: "MPB",
        AlbumID: 4,
        Num_Streams: 36805046,
        Data_Lancamento: new Date("1974-01-01"),
    }
    
    const usuario = await MusicaService.create(body)

    console.log(usuario)
}

main()