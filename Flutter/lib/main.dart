import 'package:Flutter/pages/home_page.dart';
import 'package:Flutter/widgets/top_artistas.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'app_widget.dart';
import 'dart:io';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Configuração da interface do sistema (opcional)
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual, overlays: [SystemUiOverlay.top]);
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    systemNavigationBarColor: Colors.transparent,
  ));
  
  // Configuração para aceitar conexões inseguras
  HttpOverrides.global = MyHttpOverrides();
  chamarListaArtistas();
  runApp(const AppWidget());
}

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..badCertificateCallback = (X509Certificate cert, String host, int port) => true;
  }

}


