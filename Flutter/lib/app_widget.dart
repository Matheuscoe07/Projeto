import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/material.dart';
import 'package:tweezer/pages/home_page.dart';
import 'package:tweezer/pages/login_page.dart';
import 'package:flutter_js/flutter_js.dart';


class AppWidget extends StatelessWidget {
  const AppWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Tweezer',
      home: HomePage(),
      initialRoute: '/',
      routes: {
        '/' : (context) => HomePage(),
        '/login' : (context) => LoginPage(),
        '/auth' : (context) => ApiSpotifyController(),
      },
    );
  }
}