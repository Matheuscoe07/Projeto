import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/material.dart';

import 'dart:async';

import 'package:flutter/services.dart';
import 'package:flutter_js/flutter_js.dart';

import 'dart:html'; 
import 'package:Flutter/Util/enum.dart' as util;';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        toolbarHeight: 72,
        backgroundColor: Colors.black,
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
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

// Import this library for using window.location.href

void chamarAutenticacaoSpotify() {
  try {
    String tokenReact = util.generateRandomString(16);
    dispatch(setTokenReact(tokenReact));

    String authUrlWithToken =
        '${ENUM.enderecosIP['SERVICO_API_SPOTIFY2']}/api_spotify/login/$tokenReact';
    print(authUrlWithToken);

    window.location.href = authUrlWithToken;
  } catch (error) {
    print('Erro de rede');
  }
}

// Replace `util.generateRandomString(16)` with the actual implementation of your random string generation.
// Replace `dispatch(setTokenReact(tokenReact))` with the appropriate function calls in your Dart code.