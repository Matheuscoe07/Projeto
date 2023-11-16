import 'package:flutter/material.dart';

class TopArtistas extends StatefulWidget {
  const TopArtistas({Key? key}) : super(key: key);


  @override
  State<TopArtistas> createState() => _TopArtistasState();
}

class _TopArtistasState extends State<TopArtistas>
    with TickerProviderStateMixin {
  List<String> assets = [
    'assets/img1.png',
    'assets/img2.png',
    'assets/img3.png'
  ];
  final color = [
    Colors.red,
    Colors.amber,
    Colors.teal,
    Colors.blueGrey,
    Colors.blue,
  ];
  int currentindex = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Center(
            child: SingleChildScrollView(
          child: Column(children: [
            const SizedBox(
              height: 30,
            ),
            SizedBox(
              height: 300,
              width: MediaQuery.of(context).size.width,
              child: PageView.builder(
                itemCount: assets.length,
                padEnds: false,
                pageSnapping: false,
                physics: BouncingScrollPhysics(),
                reverse: true,
                controller:
                    PageController(initialPage: 3, viewportFraction: 0.7),
                itemBuilder: (context, index) {
                  return Container(
                    margin: const EdgeInsets.all(8),
                    clipBehavior: Clip.antiAlias,
                    decoration: BoxDecoration(
                        //  color: color[index],
                        borderRadius: BorderRadius.circular(25)),
                    child: Image.asset(
                      assets[index],
                      fit: BoxFit.cover,
                    ),
                  );
                },
              ),
            ),
            SizedBox(
              height: 150,
              width: MediaQuery.of(context).size.width,
              child: PageView.builder(
                itemCount: assets.length,
                physics: BouncingScrollPhysics(),
                controller:
                    PageController(initialPage: 0, viewportFraction: 0.7),
                onPageChanged: (value) {
                  currentindex = value;
                  setState(() {});
                },
                itemBuilder: (context, index) {
                  return Container(
                    margin: const EdgeInsets.all(8),
                    clipBehavior: Clip.antiAlias,
                    decoration: BoxDecoration(
                        //  color: color[index],
                        borderRadius: BorderRadius.circular(25)),
                    child: Image.asset(
                      assets[index],
                      fit: BoxFit.cover,
                    ),
                  );
                },
              ),
            ),
            TabPageSelector(
              controller: TabController(
                  length: assets.length,
                  initialIndex: currentindex,
                  vsync: this),
              selectedColor: Colors.red,
              color: Colors.grey,
              borderStyle: BorderStyle.none,
            ),
            SizedBox(
              height: 300,
              width: MediaQuery.of(context).size.width,
              child: PageView.builder(
                physics: BouncingScrollPhysics(),
                controller:
                    PageController(initialPage: 3, viewportFraction: 0.7),
                itemBuilder: (context, index) {
                  print(index % assets.length);
                  return Container(
                    margin: const EdgeInsets.all(8),
                    clipBehavior: Clip.antiAlias,
                    decoration: BoxDecoration(
                        //  color: color[index],
                        borderRadius: BorderRadius.circular(25)),
                    child: Image.asset(
                      assets[index % assets.length],
                      fit: BoxFit.cover,
                    ),
                  );
                },
              ),
            ),
          ]),
        )));
  }
}