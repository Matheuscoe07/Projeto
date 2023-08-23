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

   async adicionarEvento(evento) {
      this.bdBarramento[uuidv4()] = evento;
      return this.bdBarramento;
   }
}

module.exports = BarramentoService;