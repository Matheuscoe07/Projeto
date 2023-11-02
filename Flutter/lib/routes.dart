import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';

void main() {
  final router = FluroRouter();
  // Adicione suas rotas aqui
  router.define('/auth', handler: Handler(
  handlerFunc: (context, params) {
    // Lógica de redirecionamento aqui
    print('Redirecionado co sucesso!');
    return Container(); // Você pode retornar um widget ou nulo, dependendo do que deseja exibir
  },
)); 
}
