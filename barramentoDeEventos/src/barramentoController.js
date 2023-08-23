const express = require("express");
const barramentoService = require('./barramentoService');
const router = express.Router();
const util = require("../../Util/src/util");
const tiposEventos = require("../../Util/src/tiposEventos"); // Importa os tipos de eventos

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
      await this.barramentoService.adicionarEvento(dados);

      switch (tipo) {
         case tiposEventos.USUARIO_LOGADO:
            // console.log("ENTREIII")
            util.sendRequest(5001, "http://127.0.0.1:5001/usuarios/eventos", dados);
            break;
         case tiposEventos.USUARIO:
            util.sendRequest(8888, "https://127.0.0.1:8888/login", evento);
            break;
         case tiposEventos.POST:
            util.sendRequest(5002, "http://127.0.0.1:5002/eventos", evento);
            break;
         case tiposEventos.COMENTARIO:
            util.sendRequest(5003, "http://127.0.0.1:5003/eventos", evento);
            break;
         case tiposEventos.CURTIDA:
            util.sendRequest(5004, "http://127.0.0.1:5004/eventos", evento);
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
   res.status(200).send({ msg: "Sucesso", resultado: req.body });
});

router.get("/", async (req, res) => {
   const controller = new BarramentoController();
   await controller.obterTodos(req, res);
 });
 
module.exports = router;
