import express from "express";
import cors from "cors"; // Importe o pacote cors
import bodyParser from "body-parser";
import { BarramentoController, router } from './barramentoController.js';

const app = express();
app.use(cors()); // Use o middleware cors
app.use(bodyParser.json());

app.use(bodyParser.json());
app.use(cors());

app.use('/eventos', router)

app.listen(10000, () => {
  console.log("Barramento de eventos. Porta 10000.");
});
