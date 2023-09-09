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
      const getJSON = req.body;
      if(getJSON == null) {
        this.postsService.getBdPosts();
      } else {
        
      }

    } catch(error) {
      res.status(500).send(`erro: ${error}`);
    }
  }

  async curtir(req, res) {
    try {
      const curtidaJSON = req.body;
      
    } catch(error) {
      res.status(500).send(`erro: ${error}`);
    }
  }

}

router.post('/', async (req, res) => {
  const postsController = new PostsController();
  postsController.criarPost(req, res);
});

router.post('/curtir', async (req, res) => {
  const postsController = new PostsController();
  postsController.curtir(req, res);
});

router.get('/', async (req, res) => {
  const postsController = new PostsController();
  postsController.getPosts(req, res);
});

export { PostsController, router };