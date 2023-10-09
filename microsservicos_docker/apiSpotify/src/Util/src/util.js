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

    static mockJsonPosts() {
        return {
            "8cc6e9cb-b88c-4d50-b838-ab016dae18b7": {
                "postID": "8cc6e9cb-b88c-4d50-b838-ab016dae18b7",
                "userID": "22qpeqdz33fpzsxyqijpfksna",
                "fotoPerfil": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1014553485271185&height=300&width=300&ext=1696908983&hash=AeQnBaDWFtf-s6lZ2lg",
                "musicaID": "0e3yhVeNaTfKIWQRw9U9sY",
                "fotoMusica": "https://i.scdn.co/image/ab67616d00001e025a0fca95bfacb33ca3580a29",
                "nomeMusica": "Sacrifice",
                "nomeArtista": "Elton John",
                "timeStamp": "2023-09-10T03:38:53.057Z",
                "texto": "Melhor Cantor",
                "curtidas": [
                    "22qpeqdz33fpzsxyqijpfksna"
                ],
                "postPai": null,
                "postsFilhos": []
            },
            "d3c5815e-52d1-4f3a-b0bf-156863cef094": {
                "postID": "d3c5815e-52d1-4f3a-b0bf-156863cef094",
                "userID": "22qpeqdz33fpzsxyqijpfksna",
                "fotoPerfil": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1014553485271185&height=300&width=300&ext=1696908983&hash=AeQnBaDWFtf-s6lZ2lg",
                "musicaID": "2GYHyAoLWpkxLVa4oYTVko",
                "fotoMusica": "https://i.scdn.co/image/ab67616d00001e02ae373174b14e3eac81554402",
                "nomeMusica": "Alors on danse - Radio Edit",
                "nomeArtista": "Stromae",
                "timeStamp": "2023-09-10T03:38:30.695Z",
                "texto": "nao paro de ouvir!!!",
                "curtidas": [],
                "postPai": "441d114f-c61a-46ff-bcec-e15a44e8b174",
                "postsFilhos": []
            },
            "441d114f-c61a-46ff-bcec-e15a44e8b174": {
                "postID": "441d114f-c61a-46ff-bcec-e15a44e8b174",
                "userID": "fernandohm123",
                "fotoPerfil": "https://i.scdn.co/image/ab6775700000ee85ced044e5c57917388b2bfeb1",
                "musicaID": "2GYHyAoLWpkxLVa4oYTVko",
                "fotoMusica": "https://i.scdn.co/image/ab67616d00001e02ae373174b14e3eac81554402",
                "nomeMusica": "Alors on danse - Radio Edit",
                "nomeArtista": "Stromae",
                "timeStamp": "2023-09-10T03:38:14.622Z",
                "texto": "Essa eh top!!!",
                "curtidas": [],
                "postPai": null,
                "postsFilhos": [
                    "d3c5815e-52d1-4f3a-b0bf-156863cef094"
                ]
            },
            "3dc9b0cd-f0b9-448e-91b9-ca00274299e1": {
                "postID": "3dc9b0cd-f0b9-448e-91b9-ca00274299e1",
                "userID": "fernandohm123",
                "fotoPerfil": "https://i.scdn.co/image/ab6775700000ee85ced044e5c57917388b2bfeb1",
                "musicaID": "3hUxzQpSfdDqwM3ZTFQY0K",
                "fotoMusica": "https://i.scdn.co/image/ab67616d00001e0295f754318336a07e85ec59bc",
                "nomeMusica": "august",
                "nomeArtista": "Taylor Swift",
                "timeStamp": "2023-09-10T03:37:56.776Z",
                "texto": "Muito legal Mesmo",
                "curtidas": [],
                "postPai": "1800cb02-c7d1-4ff1-a91a-4ff8ffb9fb71",
                "postsFilhos": []
            },
            "1800cb02-c7d1-4ff1-a91a-4ff8ffb9fb71": {
                "postID": "1800cb02-c7d1-4ff1-a91a-4ff8ffb9fb71",
                "userID": "22qpeqdz33fpzsxyqijpfksna",
                "fotoPerfil": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1014553485271185&height=300&width=300&ext=1696908983&hash=AeQnBaDWFtf-s6lZ2lg",
                "musicaID": "3hUxzQpSfdDqwM3ZTFQY0K",
                "fotoMusica": "https://i.scdn.co/image/ab67616d00001e0295f754318336a07e85ec59bc",
                "nomeMusica": "august",
                "nomeArtista": "Taylor Swift",
                "timeStamp": "2023-09-10T03:37:35.065Z",
                "texto": "Demaiss",
                "curtidas": [
                    "22qpeqdz33fpzsxyqijpfksna",
                    "fernandohm123"
                ],
                "postPai": null,
                "postsFilhos": [
                    "3dc9b0cd-f0b9-448e-91b9-ca00274299e1"
                ]
            },
            "461eb969-75df-4a79-b231-fb40ee22a1ba": {
                "postID": "461eb969-75df-4a79-b231-fb40ee22a1ba",
                "userID": "22qpeqdz33fpzsxyqijpfksna",
                "fotoPerfil": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1014553485271185&height=300&width=300&ext=1696908983&hash=AeQnBaDWFtf-s6lZ2lg",
                "musicaID": "6zSpb8dQRaw0M1dK8PBwQz",
                "fotoMusica": "https://i.scdn.co/image/ab67616d00001e029f5cce8304c42d3a5463fd23",
                "nomeMusica": "Cold Heart - PNAU Remix",
                "nomeArtista": "Elton John & Dua Lipa & PNAU",
                "timeStamp": "2023-09-10T03:37:09.794Z",
                "texto": "Muito Legal!",
                "curtidas": [],
                "postPai": null,
                "postsFilhos": []
            }
        }
    }
}


