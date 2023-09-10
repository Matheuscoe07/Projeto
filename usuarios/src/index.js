import express from "express";
import bodyParser from "body-parser";
import { UsuarioController, router } from './usuarioController.js';
import ENUM from '../../Util/src/enums.js';

const app = express();

app.use(bodyParser.json());

app.use('/usuarios', router)

app.listen(ENUM.portas.PORTA_USUARIO, () => {
  console.log(`Usuários: Porta ${ENUM.portas.PORTA_USUARIO}`);
});


