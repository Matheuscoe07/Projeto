import 'package:flutter/material.dart';
import '../../pages/login_page.dart';

class WebAppBar extends StatelessWidget {
  const WebAppBar({Key? key}) : super(key: key);

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
          TextButton(
            onPressed: () {
                    Navigator.push(context,
                      MaterialPageRoute(builder: (context) => const LoginPage()));},
            style: TextButton.styleFrom(
              foregroundColor: Colors.white, 
              textStyle: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                decoration: TextDecoration.underline
              ),
            ), 
            child: const Text('Login ou Cadastre-se'),
          ),
        ],
      ),
    );
  }
}