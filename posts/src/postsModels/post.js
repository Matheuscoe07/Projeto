export default class Post {

    constructor(postJSON, postID) {
        this.postID = postID;
        this.userID = postJSON.post.userID;
        this.fotoPerfil = postJSON.post.fotoPerfil;
        this.musicaID = postJSON.post.musicaID;
        this.fotoMusica = postJSON.post.fotoMusica;
        this.nomeMusica = postJSON.post.nomeMusica;
        this.nomeArtista = postJSON.post.nomeArtista;
        this.timeStamp = postJSON.post.timeStamp;
        this.texto = postJSON.post.texto;
        this.curtidas = postJSON.post.curtidas;
        this.postPai = postJSON.post.postPai;
        this.postsFilhos = postJSON.post.postsFilhos;
    }

    //Getter para postID
    getPostID() {
        return this.postID;
    }

    // Getter para userID
    getUserID() {
        return this.userID;
    }

    // Getter para fotoPerfil
    getFotoPerfil() {
        return this.fotoPerfil;
    }

    // Getter para timeStamp
    getTimestamp() {
        return this.timeStamp;
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
        return this.postsFilhos;
    }
}
