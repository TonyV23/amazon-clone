import 'package:amazon_clone/feature/auth/screens/auth_screen.dart';
import 'package:flutter/material.dart';

Route<dynamic> generateRouter(RouteSettings routeSettings){
  switch(routeSettings.name){
    case AuthScreen.routeName :
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_)=> AuthScreen()
      );

    default :
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_)=> Scaffold(
            body: Center(
              child: Text("The screen you are looking for does not exist"),
            ),
          )
      );

  }

}