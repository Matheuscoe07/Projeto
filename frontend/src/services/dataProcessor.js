import img1 from '../images/img1.jpg'

const albums = [
    { id: 1, titulo: 'Here comes the sun 1aaaaaaa', artista: 'Beatles', imagem: img1 },
    { id: 2, titulo: 'Here comes the sun 2', artista: 'Beatles', imagem: img1 },
    { id: 3, titulo: 'Here comes the sun 3', artista: 'Beatles', imagem: img1 },
    { id: 4, titulo: 'Here comes the sun 4', artista: 'Beatles', imagem: img1 },
    { id: 5, titulo: 'Here comes the sun 5', artista: 'Beatles', imagem: img1 },
    { id: 6, titulo: 'Here comes the sun 6', artista: 'Beatles', imagem: img1 },
    { id: 7, titulo: 'Here comes the sun 7', artista: 'Beatles', imagem: img1 },
    { id: 8, titulo: 'Here comes the sun 8', artista: 'Beatles', imagem: img1 },
    { id: 9, titulo: 'Here comes the sun 9', artista: 'Beatles', imagem: img1 },
    { id: 10, titulo: 'Here comes the sun 10', artista: 'Beatles', imagem: img1 }
];

const artistas = [
   { id: 1, nome: 'Bey Hive', seguidores: 120, imagem: img1 },
   { id: 2, nome: 'Here comes the suaaaaaaaaaaaaaaaaaaaaa2', seguidores: 120, imagem: img1 },
   { id: 3, nome: 'Here comes the sun 3', seguidores: 120, imagem: img1 },
   { id: 4, nome: 'Here comes the sun 4', seguidores: 120, imagem: img1 },
   { id: 5, nome: 'Here comes the sun 5', seguidores: 120, imagem: img1 },
   { id: 6, nome: 'Here comes the sun 6', seguidores: 120, imagem: img1 },
   { id: 7, nome: 'Here comes the sun 7', seguidores: 120, imagem: img1 },
   { id: 8, nome: 'Here comes the sun 8', seguidores: 120, imagem: img1 },
   { id: 9, nome: 'Here comes the sun 9', seguidores: 120, imagem: img1 },
   { id: 10, nome: 'Here comes the sun 10', seguidores: 120, imagem: img1 }
];

export default class SpotifyDataProcessor {

   getPopularAlbuns() {
      return albums;
   }
  
   getPopularArtistas() {
      return artistas;
   }
  
   //  transformSpotifyData(data) {
   //    // Lógica para transformar o formato dos dados do Spotify
   //  }
  }
  

