import 'package:flutter/rendering.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/material.dart';
import 'package:tweezer/pages/login_page.dart';
import 'package:tweezer/widgets/appbar/mobile_appbar.dart';
import 'package:tweezer/widgets/appbar/web_appbar.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

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
                  title: const Text('Global'),
                  onTap: () {
                    Navigator.pop(context);
                  },
                ),
                ListTile(
                  title: const Text('Login ou Cadastre-se'),
                  onTap: () {
                    Navigator.push(context,
                      MaterialPageRoute(builder: (context) => const LoginPage()));
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
          body: ListView(
            children: [
              Container(
                height: 300,
                color: Colors.red,
              ),
              Container(
                height: 300,
                color: Colors.blue,
              ),
              Container(
                height: 300,
                color: Colors.green,
              ),
              Container(
                height: 300,
                color: Colors.yellow,
              ),
              Container(
                height: 300,
                color: Colors.purple,
              ),
              Container(
                height: 300,
                color: Colors.orange,
              ),
              Container(
                height: 300,
                color: Colors.pink,
              ),
              Container(
                height: 300,
                color: Colors.teal,
              ),
              Container(
                height: 300,
                color: Colors.brown,
              ),
              Container(
                height: 300,
                color: Colors.grey,
              ),
              Container(
                height: 300,
                color: Colors.indigo,
              ),
              Container(
                height: 300,
                color: Colors.lime,
              ),
              Container(
                height: 300,
                color: Colors.cyan,
              ),
              Container(
                height: 300,
                color: Colors.amber,
              ),
              Container(
                height: 300,
                color: Colors.deepPurple,
              ),
              Container(
                height: 300,
                color: Colors.deepOrange,
              ),
              Container(
                height: 300,
                color: Colors.blueGrey,
              ),
              Container(
                height: 300,
                color: Colors.lightGreen,
              ),
              Container(
                height: 300,
                color: Colors.lightBlue,
              ),
              Container(
                height: 300,
                color: Colors.purpleAccent,
              ),
              Container(
                height: 300,
                color: Colors.redAccent,
              ),
              Container(
                height: 300,
                color: Colors.yellowAccent,
              ),
              Container(
                height: 300,
                color: Colors.greenAccent,
              ),
              Container(
                height: 300,
                color: Colors.blueAccent,
              ),
              Container(
                height: 300,
                color: Colors.tealAccent,
              ),
              Container(
                height: 300,
                color: Colors.pinkAccent,
              ),
              Container(
                height: 300,
                color: Colors.cyanAccent,
              ),
              Container(
                height: 300,
                color: Colors.amberAccent,
              ),
          ],
          ),
          );
      }
    );
  }
}