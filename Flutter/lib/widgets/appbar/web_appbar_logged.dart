import 'package:flutter/material.dart';
import '../../pages/login_page.dart';

class WebAppBarLogged extends StatelessWidget {
  const WebAppBarLogged({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      centerTitle: true,
      toolbarHeight: 72,
      backgroundColor: Colors.black,
      title: Row(
        children: [
          const Text(
            'Tweezer', 
            style: TextStyle(color: Colors.white),
          ),
          const Expanded(child: SizedBox()),
          const Expanded(child: SizedBox()),
        ],
      ),
    );
  }
}