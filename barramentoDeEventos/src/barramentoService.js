import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid'; // Importe a função v4 como uuidv4

const app = express();
app.use(bodyParser.json());

export default class BarramentoService {

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

   async obterEvento(idEvento) {
      if (idEvento in this.bdBarramento) {
         return this.bdBarramento[idEvento]
      }
      return null;
   }
}