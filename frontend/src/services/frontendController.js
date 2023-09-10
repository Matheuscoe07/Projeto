const express = require("express");
const frontendService = require('./frontendService');
const router = express.Router();

class frontendController {

   constructor() {
      this.frontendService = new frontendService(); // Instancie a service
   }
  
   async efetuarLogin(req, res) {
      window.location.href = 'http://localhost:3000/?authenticated=true';
      console.log(req.body.data);
      res.status(200).send({ msg: "Sucesso"});
   }

}


router.post("/login", (req, res) => {
   const controller = new frontendController();
   controller.efetuarLogin(req, res);
});

module.exports = router;
