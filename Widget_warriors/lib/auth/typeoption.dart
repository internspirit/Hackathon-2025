import 'package:flutter/material.dart';
import 'package:quizathlon/auth/adminlogin.dart';
import 'package:quizathlon/auth/login.dart';
import 'package:quizathlon/widgets/button.dart';

class TypeOption extends StatelessWidget {
  const TypeOption({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF6B48D6),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.quiz, size: 50, color: Colors.white),
            Text(
              "Welcome everyone!",
              style: TextStyle(
                fontSize: 24,
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 50),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                MyButton(
                  text: "Login as student",
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => RegisterPage()),
                    );
                  },
                ),
                MyButton(
                  text: "Login as admin",
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => LoginAsAdmin()),
                    );
                  },
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
