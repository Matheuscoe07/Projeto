import 'package:Flutter/pages/home_page.dart';
import 'package:Flutter/pages/logged_page.dart';
import 'package:Flutter/pages/login_page.dart';
import 'package:flutter/material.dart';


class AppWidget extends StatelessWidget {
  const AppWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Tweezer',
      home: const HomePage(),
      initialRoute: '/',
      routes: {
        '/' : (context) => const HomePage(),
        '/login' : (context) => const LoginPage(),
        '/auth' : (context) {
          chamarAutenticacaoSpotify();
          return LoggedPage();
},
      },
    );
  }
}