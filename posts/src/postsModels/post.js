export default class Post {

    constructor(idUser, timeStamp, fotoPerfil, texto) {
        this.idUser = idUser;
        this.timeStamp = timeStamp;
        this.fotoPerfil = fotoPerfil;
        this.texto = texto;
        this.curtidas = [];
        this.postPai = null;
        this.postsFilhos = [];
    }

    toJSON() {
        return {
            idUser: this.idUser,
            timeStamp: this.timeStamp,
            fotoPerfil: this.fotoPerfil,
            texto: this.texto,
            curtidas: this.curtidas,
            postPai: this.postPai,
            primeiroPostFilho: this.primeiroPostFilho,
            primeiroPostIrmao: this.primeiroPostIrmao
        };
    }

    // Getter para idUser
    getUsuario() {
        return this.idUser;
    }

    // Getter para timeStamp
    getTimestamp() {
        return this.timeStamp;
    }

    // Getter para userName
    getNomeUsuario() {
        return this.userName;
    }

    // Getter para fotoPerfil
    getFotoPerfil() {
        return this.fotoPerfil;
    }

    // Getter para texto
    getTexto() {
        return this.texto;
    }

    // Getter para curtidas
    getCurtidas() {
        return this.curtidas;
    }

    // Getter para postPai
    getPostPai() {
        return this.postPai;
    }

    // Getter para postsFilhos
    getPostsFilhos() {
        return this.getPostsFilhos;
    }
}