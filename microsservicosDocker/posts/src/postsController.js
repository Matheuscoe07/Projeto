import express from "express";
import PostsService from './postsService.js';
const router = express.Router();

class PostsController {

  constructor() {
    this.postsService = new PostsService();
  }

  async criarPost(req, res) {
    try {
      const postJSON = req.body;
      const novoPost = this.postsService.criarPostagemNova(postJSON);
      if(!novoPost){
        throw new Error(`Erro ao criar novo Post.`);
      }
      if(postJSON.post.postPai != null) {
        this.postsService.atualizarPostagem(novoPost.getPostID(), postJSON.post.postPai);
      }
      res.status(200).send(novoPost);
    } catch(error) {
      res.status(500).send(`erro: ${error}`);
    }
  }

  async getPosts(req, res) {
    try {
       const publicacoes = await this.postsService.getBdPosts();
       res.status(200).json(publicacoes);
    } catch(error) {
      res.status(500).send(`erro: ${error}`);
    }
  }

  async getPostsFilhos(req, res) {
    const idPostPai = req.params.idPostPai;
    if(!idPostPai){
      throw new Error(`Parametros não passados corretamente.`);
    }
    try {
       const publicacoes = await this.postsService.getPostsFilhos(idPostPai);
       res.status(200).json(publicacoes);
    } catch(error) {
      res.status(500).send(`erro: ${error}`);
    }
  }

  async curtir(req, res) {
    try {
      const {idPublicacao, idUsuario} = req.body;
      if(!idPublicacao || !idUsuario){
        throw new Error(`Parametros não passados corretamente.`);
      }
        let publicacao = this.postsService.getIdPost(idPublicacao);
        if(publicacao.curtidas.includes(idUsuario)){
          publicacao = this.postsService.descurtirPost(idPublicacao, idUsuario);
        }else{
          publicacao = this.postsService.curtirPost(idPublicacao, idUsuario);
        }
        res.status(200).json(publicacao);
    } catch(error) {
      res.status(500).send(`erro: ${error}`);
    }
  }
}

router.get('/posts-filhos/:idPostPai', async (req, res) => {
  const postsController = new PostsController();
  postsController.getPostsFilhos(req, res);
});

router.post('/curtir', async (req, res) => {
  const postsController = new PostsController();
  postsController.curtir(req, res);
});

router.post('/', async (req, res) => {
  const postsController = new PostsController();
  postsController.criarPost(req, res);
});

router.get('/', async (req, res) => {
  const postsController = new PostsController();
  postsController.getPosts(req, res);
});


export { PostsController, router };