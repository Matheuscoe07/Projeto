import 'dart:html';

import 'package:flutter/material.dart';
import 'package:Flutter/Util/util.dart' as util;
// ignore: library_prefixes
import 'package:Flutter/Util/enum.dart' as ENUM;

class LoginPage extends StatelessWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        toolbarHeight: 72,
        backgroundColor: Colors.black,
        title: const Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Tweezer', 
              style: TextStyle(color: Colors.white),
            ),
          ],
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Bem vindo ao Tweezer!',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            const Text(
              'Para acessar o Tweezer, basta entrar utilizando sua conta Spotify!',
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all<Color>(Colors.green),
              ),
              onPressed: () {
                Navigator.pushNamed(context, '/auth');
              },
              child: const Text('Comece Já'),
            ),
          ],
        ),
      ),
    );
  }
}

void chamarAutenticacaoSpotify() {
  try {
    String tokenReact = util.Util.generateRandomString(16);
    //dispatch(setTokenReact(tokenReact));

    String authUrlWithToken =
        '${ENUM.ENUM.enderecosIP['SERVICO_API_SPOTIFY2']}/api_spotify/login/$tokenReact';
    print(authUrlWithToken);

    window.location.href = authUrlWithToken;
  } catch (error) {
    print('Erro de rede');
  }

}

