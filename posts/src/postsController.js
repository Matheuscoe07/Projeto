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
      console.log(postJSON);
      if(postJSON.post.postPai == null) {
        let funcionou = this.postsService.criarPostagemNova(postJSON);
        if(funcionou){
          res.send("Postagem salva!");
        }
      }
    } catch(error){
      res.status(500).send(`erro: ${error}`);
    }
  }

}

router.post('/', async (req, res) => {
  const postsController = new PostsController();
  postsController.criarPost(req, res);
});

export { PostsController, router };