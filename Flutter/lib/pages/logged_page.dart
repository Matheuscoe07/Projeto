
import 'package:flutter/material.dart';

class LoggedPage extends StatelessWidget {
  const LoggedPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tweezer'),
      ),
      body: const Center(
        child: Text(
          'Bem vindo ao Tweezer',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
