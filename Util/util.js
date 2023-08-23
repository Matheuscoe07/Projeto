const net = require("net");
const axios = require("axios");

// import { post } from 'axios'; // Import the 'axios' module

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

    static async sendRequest(port, strRequest, evento) {
        const isPortOpen = await Util.checkPort(port);
        if (isPortOpen) {
          axios.post(strRequest, evento);
        } else {
          console.log(`Porta ${port} não está disponível`);
        }
    }
}

module.exports = Util;
// Example usage
// Util.sendRequest(8080, 'http://example.com/api', { data: 'sample' });
