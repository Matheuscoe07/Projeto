export default class ApiSpotifyModel {

   formatarTopMusicasGlobais(responseData) {
      const topArtistasGlobais = responseData.map(entry => ({
         rank: entry.chartEntryData.currentRank,
         artists: entry.trackMetadata.artists.map(artist => ({
            nome: artist.name,
            uriAPI: artist.spotifyUri.split(':')[2]
         })),
         uriAPI: entry.trackMetadata.trackUri.split(':')[2],
         nome: entry.trackMetadata.trackName,
         imagem: entry.trackMetadata.displayImageUri
      }));

      console.log(JSON.stringify(topArtistasGlobais, null, 2));
      return topArtistasGlobais;
   }

   formatarTopAlbunsGlobais(responseData) {
      const topAlbunsGlobais = responseData.map(entry => ({
         rank: entry.chartEntryData.currentRank,
         artists: entry.albumMetadata.artists.map(artist => ({
            nome: artist.name,
            uriAPI: artist.spotifyUri.split(':')[2]
         })),
         uriAPI: entry.albumMetadata.albumUri.split(':')[2],
         nome: entry.albumMetadata.albumName,
         imagem: entry.albumMetadata.displayImageUri
      }));

      // console.log(JSON.stringify(topAlbunsGlobais, null, 2));
      return topAlbunsGlobais;
   }

   formatarTopArtistasGlobais(responseData) {
      const topArtistasGlobais = responseData.map(entry => ({
         rank: entry.chartEntryData.currentRank,
         artistName: entry.artistMetadata.artistName,
         artistUri: entry.artistMetadata.artistUri.split(':')[2],
         artistImg: entry.artistMetadata.displayImageUri
      }));

      // console.log(JSON.stringify(topArtistasGlobais, null, 2));
      return topArtistasGlobais;
   }

   async formatarMusciasEncontradas(responseData) {
      const musicasEncontradas = responseData.tracks.items.map(item => ({
         id: item.id,
         name: item.name,
         urlSpotifyPublic: item.external_urls.spotify,
         apiSpotify: item.uri,
         previewTrack: item.preview_url,
         popularity: item.popularity,
         iconeMusica: item.album.images[1].url,
         artistas: item.artists.map(artist => ({
            id: artist.id,
            name: artist.name,
         })),
      }));

      return musicasEncontradas.sort((a, b) => b.popularity - a.popularity);;
   }

}
