import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:quizathlon/auth/login.dart';
import 'package:quizathlon/data.dart';
import 'package:quizathlon/widgets/adminbottomnav.dart';
import 'package:quizathlon/widgets/bottomnavigation.dart';

class AuthChecker extends StatefulWidget {
  const AuthChecker({super.key});

  @override
  State<AuthChecker> createState() => _AuthCheckerState();
}

class _AuthCheckerState extends State<AuthChecker> {
  void getUserRole() async {
    globalUser = await FirebaseFirestore.instance
        .collection('Users')
        .doc(globalEmail)
        .get()
        .then((onValue) {
          return onValue.data()!['Role'];
        });
    setState(() {});
  }

  @override
  @override
  Widget build(BuildContext context) {
    return StreamBuilder(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          globalEmail = FirebaseAuth.instance.currentUser!.email!;
          if (globalUser == "Admin") {
            print('admin $globalEmail');
            return BottomNavAdmin();
          } else if (globalUser == 'Student') {
            print('student $globalEmail');
            return BottomNav();
          } else {
            getUserRole();
            return Center(child: CircularProgressIndicator());
          }
        } else {
          return RegisterPage();
        }
      },
    );
  }
}
