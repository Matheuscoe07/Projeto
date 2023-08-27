const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');
app.use(bodyParser.json());

class BarramentoService {

   constructor() {
      if (BarramentoService.instance) {
        return BarramentoService.instance;
      }
      this.bdBarramento = {};
      BarramentoService.instance = this;
   }

   async obterTodosEventos() {
      return this.bdBarramento;
   }

   async adicionarEvento(tipo, dado) {
      const evento = {}, idEvento = uuidv4();
      evento.idEvento = idEvento
      evento.tipoEvento = tipo
      evento[tipo] = dado
      this.bdBarramento[idEvento] = evento;
      console.log(this.bdBarramento[idEvento])
      return this.bdBarramento[idEvento];
   }
}

module.exports = BarramentoService;