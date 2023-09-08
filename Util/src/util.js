import axios from "axios";
import net from "net";

export default class Util {

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

    static async sendRequestPOST(strRequest, jsonData={}, jsonHeader={} , checkPort=true) {
        let port, isPortOpen = true;
        if(checkPort){
            port = Util.extrairPorta(strRequest);
            isPortOpen = await Util.checkPort(port);
        }
        if(isPortOpen) {
            try {
                const response = await axios.post(strRequest, jsonData, {headers: jsonHeader});
                return {status: true, msg: 'Sucesso', data: response.data};
            }catch (error) {
                return {status: false, msg: `${error}`};
            }
        } else {
            return {status: false, msg: `Serviço inoperante: Porta ${port}`};
        }
    }

    static async sendRequestGET(strRequest, jsonHeader={}, jsonParams={}, checkPort=true) {
        let port, isPortOpen = true;
        if(checkPort){
            port = Util.extrairPorta(strRequest);
            isPortOpen = await Util.checkPort(port);
        }
        if(isPortOpen) {
            try {
                const response = await axios.get(strRequest, {params: jsonParams, headers: jsonHeader});
                return {status: true, msg: 'Sucesso', data: response.data};
            }catch (error) {
                return {status: false, msg: `${error}`};
            }
        } else {
            return {status: false, msg: `Serviço inoperante: Porta ${port}`};
        }
    }

    static async sendRequest(jsonRequest) {
        try {
            let response =  await axios(jsonRequest);
            return {status: true, msg: 'Sucesso', data: response.data};
        }catch (error) {
            return {status: false, msg: `${error}`};

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