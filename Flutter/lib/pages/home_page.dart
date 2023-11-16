import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:Flutter/pages/login_page.dart';
import 'package:Flutter/widgets/appbar/web_appbar.dart';
import 'package:Flutter/widgets/appbar/mobile_appbar.dart';

final List<String> imgList = [
  'assets/img1.jpg',
  'assets/img2.jpg',
  'assets/img3.jpg',
  'assets/img4.jpg',
  'assets/img5.jpg',
];

class HomePage extends StatelessWidget {

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
              body: Container(
                color: const Color.fromARGB(255, 54, 54, 54),
                child: ListView(
                  children: [
                    Container(
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Text(
                        'Top 15 artistas globais',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    ),
                    CarouselSlider(
                      options: CarouselOptions(
                        height: 400,
                        autoPlay: true,
                        aspectRatio: 2,
                        viewportFraction: 0.5,
                        enlargeCenterPage: true,
                      ),
                      items: imageSliders,
                )
                ],
                ),
              )
              
            );
      }
      ); 
  }
}

final List<Widget> imageSliders = imgList
    .map((item) => Container(
          child: Container(
            margin: EdgeInsets.all(5.0),
            child: ClipRRect(
                borderRadius: BorderRadius.all(Radius.circular(100.0)),
                child: Stack(
                  children: <Widget>[
                    Image.network(item, fit: BoxFit.cover, width: 1000.0),
                    Positioned(
                      bottom: 0.0,
                      left: 0.0,
                      right: 0.0,
                      child: Container(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: [
                              Color.fromARGB(200, 0, 0, 0),
                              Color.fromARGB(0, 0, 0, 0)
                            ],
                            begin: Alignment.bottomCenter,
                            end: Alignment.topCenter,
                          ),
                        ),
                        padding: EdgeInsets.symmetric(
                            vertical: 10.0, horizontal: 20.0),
                        child: Text(
                          'No. ${imgList.indexOf(item)} image',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 20.0,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ],
                )),
          ),
        ))
    .toList();