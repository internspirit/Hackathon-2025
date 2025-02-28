import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:quizathlon/widgets/button.dart';
import 'package:quizathlon/widgets/textfields.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final emailController = TextEditingController(),
      passController = TextEditingController();

  void loginUser() async {
    showDialog(
      context: context,
      builder: (context) => Center(child: CircularProgressIndicator()),
    );

    try {
      FirebaseAuth.instance.signInWithEmailAndPassword(
        email: emailController.text,
        password: passController.text,
      );
      if (context.mounted) {
        Navigator.pop(context);
      }
    } catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF6B48D6),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.quiz, size: 50, color: Colors.white),
            SizedBox(height: 10),
            Text(
              "Quiz-Athlon",
              style: TextStyle(
                fontSize: 20,
                letterSpacing: 5,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            MyTextField(
              hint: "Email",
              controller: emailController,
              i: Icons.email,
              obscuretext: false,
            ),
            MyTextField(
              hint: "Password",
              obscuretext: true,
              controller: passController,
              i: Icons.password,
            ),
            MyButton(
              text: "Login",
              onTap: () async {
                loginUser();
              },
            ),
            SizedBox(height: 10),
          ],
        ),
      ),
    );
  }
}
