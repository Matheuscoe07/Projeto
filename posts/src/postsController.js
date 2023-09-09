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
      if(novoPost){
        res.send(novoPost);
      }
      if(postJSON.post.postPai != null) {
        this.postsService.atualizarPostagem(novoPost.getPostID(), postJSON.post.postPai);
      }
    } catch(error) {
      res.status(500).send(`erro: ${error}`);
    }
  }

  async getPosts(req, res) {
    try {
       const publicacoes = await this.postsService.getBdPosts();
       res.status(200).json({...publicacoes});
    } catch(error) {
      res.status(500).send(`erro: ${error}`);
    }
  }

  async getPostsFilhos(req, res) {
    const {idPublicacaoPai} = req.body;
    try {
       const publicacoes = this.postsService.getPostsFilhos;
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
          console.log('DESCUTIR');
          publicacao = this.postsService.descurtirPost(idPublicacao, idUsuario);
        }else{
          publicacao = this.postsService.curtirPost(idPublicacao, idUsuario);
          console.log('CURTIR: ', publicacao);
        }
        res.status(200).json(publicacao);
    } catch(error) {
      res.status(500).send(`erro: ${error}`);
    }
  }
}

router.get('/posts-filhos', async (req, res) => {
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