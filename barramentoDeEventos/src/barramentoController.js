const express = require("express");
const barramentoService = require('./barramentoService');
const router = express.Router();
const util = require("../../Util/src/util");
const ENUM = require("../../Util/src/enums"); // Importa os tipos de eventos

class BarramentoController {

   constructor() {
      this.barramentoService = new barramentoService(); // Instancie a service
   }

   async obterTodos(req, res) {
      try {
        const eventos = await this.barramentoService.obterTodosEventos();
        res.send(eventos);
      } catch (error) {
        res.status(500).send({
          error: "Ocorreu um erro ao obter os eventos."
        });
      }
   }

   async receberEventos(req, res){
      const {tipo, dados} = req.body;
      const evento = await this.barramentoService.adicionarEvento(tipo, dados);

      switch (tipo) {
         case ENUM.tiposEventos.USUARIO_LOGADO:
            // console.log("ENTREIII")
            await util.sendRequestPOST("http://127.0.0.1:5001/usuarios/eventos", dados);
            res.status(200).send({evento: evento});
            break;
         case tiposEventos.USUARIO:
            await util.sendRequestPOST("https://127.0.0.1:8888/login", evento);
            res.status(200).send({ msg: "Sucesso", resultado: req.body });
            break;
         case tiposEventos.POST:
            await util.sendRequestPOST("http://127.0.0.1:5002/eventos", evento);
            res.status(200).send({ msg: "Sucesso", resultado: req.body });
            break;
         case tiposEventos.COMENTARIO:
            await util.sendRequestPOST("http://127.0.0.1:5003/eventos", evento);
            res.status(200).send({ msg: "Sucesso", resultado: req.body });
            break;
         case tiposEventos.CURTIDA:
            await util.sendRequestPOST("http://127.0.0.1:5004/eventos", evento);
            res.status(200).send({ msg: "Sucesso", resultado: req.body });
            break;
         default:
            console.log("Tipo de evento não reconhecido:", evento.tipo);
            break;
      }
   }
}

router.post("/", async (req, res) => {
   const controller = new BarramentoController();
   controller.receberEventos(req, res);
});

router.get("/", async (req, res) => {
   const controller = new BarramentoController();
   await controller.obterTodos(req, res);
 });
 
module.exports = router;
