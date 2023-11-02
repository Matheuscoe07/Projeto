
import 'package:flutter/material.dart';

class LoggedPage extends StatelessWidget {
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
