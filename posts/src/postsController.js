import express from "express";
import PostsService from './postsService.js';
const router = express.Router();

class PostsController {

  constructor() {
    this.postsService = new PostsService();
  }

  async criarPost(req, res) {
    const { dadosPost } = req.body;
    if(dadosPost.postID === null) {
      this.postsService.criarPostagemNova();
    }
  }

}

router.post('/', async (req, res) => {
  const postsController = PostsController();
  postsController.criarPost(req, res);
});

export { PostsController, router };