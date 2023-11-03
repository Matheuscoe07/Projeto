import 'dart:io';
import 'dart:convert';

class Util {
  static String generateRandomString(int length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return List.generate(length, (index) => possible[index % possible.length]).join();
  }
}