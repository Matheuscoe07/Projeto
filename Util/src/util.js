const net = require("net");
const axios = require("axios");

class Util {

    static async checkPort(port) {
        return new Promise((resolve) => {
            const client = net.createConnection(port, '127.0.0.1', () => {
                client.end();
                resolve(true);
            });
            client.on('error', () => {
                resolve(false);
            });
        });
    }

    static async sendRequest(strRequest, evento) {
        const port = Util.extrairPorta(strRequest);
        const isPortOpen = await Util.checkPort(port);
        if (isPortOpen) {
            try {
                await axios.post(strRequest, evento);
                return {status: true, msg: 'Sucesso'};
            }catch (error) {
                return {status: false, msg: 'Endpoit Inválido'};
            }
        } else {
            return {status: false, msg: 'Serviço inoperante'};
        }
    }

    static extrairPorta(str) {
        const startIndexHTTP = str.indexOf(':') + 1; // Encontra o índice ":" do HTTP
        const startIndex = str.indexOf(':', startIndexHTTP) + 1; // Encontra o índice ":" da Porta
        const slashIndex = str.indexOf('/', startIndex); // Encontra o índice da próxima "/" a partir da Porta
        if (startIndex === -1 || slashIndex === -1) {
          // Caso os índices não sejam válidos ou não exista "/"
          return null;
        }
        return parseInt(str.substring(startIndex, slashIndex))
      }
}


module.exports = Util;
