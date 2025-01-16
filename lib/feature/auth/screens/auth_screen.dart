import 'package:amazon_clone/common/widgets/costum_button.dart';
import 'package:amazon_clone/common/widgets/custom_text_field.dart';
import 'package:amazon_clone/constants/global_variables.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';

enum Auth{
  signup,
  signin,
}
class AuthScreen extends StatefulWidget {
  static const String routeName = "/auth-screen";
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  Auth _auth = Auth.signup;
  final signUpFormKey = GlobalKey<FormState>();
  final signInFormKey = GlobalKey<FormState>();

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _nameController = TextEditingController();

  @override
  void dispose() {
    _emailController;
    _passwordController;
    _nameController;

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlobalVariables.greyBackgroundColor,
      body: SafeArea(child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(child: Text("Welcome", style: TextStyle(fontSize: 22, fontWeight: FontWeight.w500),)),
          ListTile(tileColor : _auth == Auth.signup ? GlobalVariables.backgroundColor : GlobalVariables.greyBackgroundColor ,title: Text("Create account", style: TextStyle(fontWeight: FontWeight.bold),),leading: Radio(activeColor: GlobalVariables.secondaryColor, value: Auth.signup, groupValue: _auth, onChanged: (Auth? value) { setState(() {
            _auth = value!;
          }); },),),

          if (_auth == Auth.signup)
            Container(
              padding: EdgeInsets.all(8),
              color: GlobalVariables.backgroundColor,
              child: Form(
                key: signUpFormKey, child: Column(children: [
                  CustomTextField(controller: _emailController, hintText: "Email",),
                  Gap(10),
                  CustomTextField(controller: _nameController, hintText: "Name",),
                  Gap(10),
                  CustomTextField(controller: _passwordController, hintText: "Password",),
                  Gap(30),
                  CustomButton(text: "Sing up", onTap: (){}),
              ]),
              ),
            ),

          ListTile(tileColor : _auth == Auth.signin ? GlobalVariables.backgroundColor : GlobalVariables.greyBackgroundColor ,title: Text("Login", style: TextStyle(fontWeight: FontWeight.bold),),leading: Radio(activeColor: GlobalVariables.secondaryColor, value: Auth.signin, groupValue: _auth, onChanged: (Auth? value) { setState(() {
            _auth = value!;
          }); },),),

          if (_auth == Auth.signin)
            Container(
              padding: EdgeInsets.all(8),
              color: GlobalVariables.backgroundColor,
              child: Form(
                key: signUpFormKey, child: Column(children: [
                CustomTextField(controller: _emailController, hintText: "Email",),
                Gap(10),
                CustomTextField(controller: _passwordController, hintText: "Password",),
                Gap(30),
                CustomButton(text: "Login", onTap: (){}),
              ]),
              ),
            ),
        ],
      )),
    );
  }
}
