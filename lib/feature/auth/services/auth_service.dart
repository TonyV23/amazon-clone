// ignore_for_file: use_build_context_synchronously

import 'package:amazon_clone/constants/error_handling.dart';
import 'package:amazon_clone/constants/utils.dart';
import 'package:amazon_clone/models/user.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:amazon_clone/constants/global_variables.dart';

class AuthService {
//  signup user

  void signupUser({
    required BuildContext context,
    required String name,
    required String email,
    required String password,
  }) async {
    try {
      User user = User(
          id: 0,
          name: name,
          email: email,
          password: password,
          address: '',
          type: '',
          token: '');

      http.Response res = await http.post(Uri.parse('$signupUrl/api/signup'),
          body: user.toJson(),
          headers: <String, String>{
            'Content-Type': 'Application/json; charset=UTF-8'
          });
      httpErrorHandle(
          response: res,
          context: context,
          onSuccess: () {
            showSnackBar(context, "Account was created successfully");
          });
    } catch (error) {
      showSnackBar(context, error.toString());
    }
  }
}
