export default class Post {

    constructor(postJSON) {
        this.postID = postJSON.postID;
        this.userID = postJSON.post.userID;
        this.timeStamp = postJSON.post.timeStamp;
        this.fotoPerfil = postJSON.post.fotoPerfil;
        this.texto = postJSON.post.texto;
        this.curtidas = postJSON.post.curtidas;
        this.postPai = postJSON.post.postPai;
        this.postsFilhos = postJSON.post.postsFilhos;
    }

    toJSON() {
        return { postID: this.postID,
            post: {
                userID: this.userID,
                timeStamp: this.timeStamp,
                fotoPerfil: this.fotoPerfil,
                texto: this.texto,
                curtidas: this.curtidas,
                postPai: this.postPai,
                postsFilhos: this.postsFilhos
            }
        }
    }

    // Getter para userID
    getUserID() {
        return this.userID;
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