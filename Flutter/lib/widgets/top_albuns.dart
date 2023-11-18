import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'dart:convert';
import 'package:Flutter/Util/util.dart';

class Album {
  final int rank;
  final List<Map<String, dynamic>> albums;
  final String uriAPI;
  final String nome;
  final String imagem;

  Album({
    required this.rank,
    required this.albums,
    required this.uriAPI,
    required this.nome,
    required this.imagem,
  });
}

Future<List<Album>> chamarListaAlbums() async {
  try {
    var imgList = await Util.sendRequestGET(
        'http://127.0.0.1:8888/api_spotify/top-globais/albuns', null, null, false);
    var imgListDecoded = json.decode(imgList['data']);
    // print(imgListDecoded);
    if (imgListDecoded == null) {
      throw Exception("Invalid data format");
    }

    List<Album> albums = (imgListDecoded as List<dynamic>)
        .map((item) => Album(
              rank: item['rank'] ?? 0,
              albums: List<Map<String, dynamic>>.from(item['albuns'] ?? []),
              uriAPI: item['uriAPI'] ?? "",
              nome: item['nome'] ?? "",
              imagem: item['imagem'] ?? "",
            ))
        .toList();
        print(albums[0]);

    return albums.sublist(0,15);
  } catch (error) {
    print('Erro: $error');
    throw error;
  }
}

class TopAlbuns extends StatelessWidget {
  const TopAlbuns({Key? key}) : super(key: key);


  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Album>>(
      future: chamarListaAlbums(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(
            child: CircularProgressIndicator(),
          );
        } else if (snapshot.hasError || !snapshot.hasData || snapshot.data!.isEmpty) {
          return Center(
            child: Text('Erro ao carregar albums'),
          );
        } else {
          return CarouselSlider(
            options: CarouselOptions(
              height: 400,
              autoPlay: true,
              aspectRatio: 2,
              viewportFraction: 0.5,
              enlargeCenterPage: true,
            ),
            items: snapshot.data!.map((album) {
              return Container(
                margin: const EdgeInsets.all(5.0),
                child: ClipRRect(
                  borderRadius: const BorderRadius.all(Radius.circular(16.0)),
                  child: Stack(
                    children: <Widget>[
                      Image.network(album.imagem, fit: BoxFit.cover, width: 1000.0),
                      Positioned(
                        bottom: 0.0,
                        left: 0.0,
                        right: 0.0,
                        child: Container(
                          decoration: const BoxDecoration(
                            gradient: LinearGradient(
                              colors: [
                                Color.fromARGB(200, 0, 0, 0),
                                Color.fromARGB(0, 0, 0, 0)
                              ],
                              begin: Alignment.bottomCenter,
                              end: Alignment.topCenter,
                            ),
                          ),
                          padding: const EdgeInsets.symmetric(
                              vertical: 10.0, horizontal: 20.0),
                          child: Text(
                            'No. ${album.rank} ${album.nome}}',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 20.0,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              );
            }).toList(),
          );
        }
      },
    );
  }
}
