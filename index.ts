import { app } from "./config/expressConfig";
import dotenv from "dotenv";
// apague essa linha e aperte ctrl + s para restart no server, na volta ctrl + z
dotenv.config();

app.listen(process.env.PORT, () => {
    console.log("Servidor rodando na porta ", process.env.PORT, "!" );
})

/*import AlbumService from "./src/domains/Album/AlbumService";

async function main() {
    const body = {
        ID_Album: 1,
        Nome: "album_teste",
        ArtistaID: 3,
        Data_Lancamento: new Date("1973-01-01"),
        Capa: null,
        Num_Musicas: 13,

    }

    const album = await AlbumService.create(body);

    console.log(album);
}
main()*/

/*import UsuarioService from "./src/domains/Usuario/UsuarioService";

async function main() {
    const body = {
        ID_Usuario: 2,
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


/*import ArtistaService from "./src/domains/Artista/ArtistaService";

async function main() {
    const body = {
        ID_Artista: 3,
        Nome: "TZ",
        Foto: null,
        Num_Streams: 40035676
    }

    const artista = await ArtistaService.create(body);

    console.log(artista);
}

main()*/


/*import MusicaService from "./src/domains/Musica/MusicaService";

async function main() {
    const body = {
        ID_Musica: 4,
        Nome: "musica_teste",
        ArtistaID: 3,
        Genero: "Pop",
        AlbumID: 1,
        Num_Streams: 500000,
        Data_Lancamento: new Date("2023-01-01"),
    };

    const musica = await MusicaService.create(body);

    console.log(musica);
}

main();*/


/*import MusicasUsuarioService from "./src/domains/Musicas_Usuario/Musicas_UsuarioService";

async function main() {
    const body = {
        UsuarioID: 2,
        ID_Musica: 1,
        Data_Criacao: new Date("2023-01-01"),
    };

    const musicasUsuario = await MusicasUsuarioService.create(body);

    console.log(musicasUsuario);
}

main();*/