import 'package:flutter/material.dart';

class MobileAppBar extends StatelessWidget {
  const MobileAppBar({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AppBar(
        centerTitle: true,
        backgroundColor: Colors.black,
        title: const Text(
          'Tweezer', 
          style: TextStyle(color: Colors.white),
          ),

          actions: [
            IconButton(
              icon: const Icon(Icons.search),
              onPressed: () {},
            ),
            const SizedBox(width: 8,)
          ],
      );
  }
}