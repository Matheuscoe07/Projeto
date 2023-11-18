import 'package:Flutter/widgets/top_albuns.dart';
import 'package:Flutter/widgets/top_artistas.dart';
import 'package:Flutter/widgets/top_musicas.dart';
import 'package:flutter/material.dart';
import 'package:Flutter/widgets/appbar/web_appbar.dart';
import 'package:Flutter/widgets/appbar/mobile_appbar.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);


  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, constraints) {
        return Scaffold(
          drawer: constraints.maxWidth > 800 ? null : Drawer(
            child: ListView(
              padding: EdgeInsets.zero,
              children: <Widget>[
                const DrawerHeader(
                  decoration: BoxDecoration(
                    color: Colors.blue,
                  ),
                  child: Text('Tweezer', 
                  style: TextStyle(
                    fontSize: 64,
                  ),
                  ),
                ),
                ListTile(
                  title: const Text('Home'),
                  onTap: () {
                    Navigator.pop(context);
                  },
                ),
                ListTile(
                  title: const Text('Login ou Cadastre-se'),
                  onTap: () {
                    Navigator.push(context,
                      Navigator.pushNamed(context, '/login') as Route<Object?>);
                  },
                ),
              ],
            ),

          ),
          appBar: constraints.maxWidth > 800 ? const PreferredSize(
            preferredSize: Size(double.infinity, 72),
            child: WebAppBar())
            : const PreferredSize(
            preferredSize: Size(double.infinity, 56),
            child: MobileAppBar()  
            ),                
              body: Center(
                child: Container(
                  color: Color.fromARGB(255, 54, 54, 54),
                  child: const Center(
                    child: Text(
                      'Faça login para acessar os conteúdos exclusivos',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ),
      );
    });
  }
}