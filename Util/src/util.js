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

    static async sendRequestPOST(strRequest, evento, checkPort=true) {
        let port, isPortOpen = true;
        if(checkPort){
            port = Util.extrairPorta(strRequest);
            isPortOpen = await Util.checkPort(port);
        }
        if(isPortOpen) {
            try {
                await axios.post(strRequest, evento);
                return {status: true, msg: 'Sucesso'};
            }catch (error) {
                return {status: false, msg: `Endpoit Inválido: ${strRequest}`};
            }
        } else {
            return {status: false, msg: `Serviço inoperante: Porta ${port}`};
        }
    }

    static async sendRequestGET(strRequest, checkPort=true) {
        let port, isPortOpen = true;
        if(checkPort){
            port = Util.extrairPorta(strRequest);
            isPortOpen = await Util.checkPort(port);
        }
        if(isPortOpen) {
            try {
                return await axios.get(strRequest);
            }catch (error) {
                return {status: false, msg: `Endpoit Inválido: ${strRequest}`};
            }
        } else {
            return {status: false, msg: `Serviço inoperante: Porta ${port}`};
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

    static generateRandomString (length) {
        let text = "";
        let possible ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
}


module.exports = Util;
