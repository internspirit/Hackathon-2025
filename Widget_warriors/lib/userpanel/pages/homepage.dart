import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:quizathlon/userpanel/pages/round1.dart';
import 'package:quizathlon/userpanel/pages/round2.dart';
import 'package:quizathlon/widgets/adminbottomnav.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Color(0xFF6B48D6),
        title: Text(
          "Quiz-Athlon",
          style: GoogleFonts.poppins(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        centerTitle: true,
        iconTheme: IconThemeData(color: Colors.white),
      ),
      drawer: _buildSidebar(context), // Sidebar
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeader(),
            SizedBox(height: 20),
            _buildRegistrationSection(),
            SizedBox(height: 20),
            _buildQuizRounds(context),
          ],
        ),
      ),
    );
  }
}

Widget _buildSidebar(BuildContext context) {
  return Drawer(
    child: Column(
      children: [
        DrawerHeader(
          decoration: BoxDecoration(color: Color(0xFF6B48D6)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Icon(Icons.sports_esports, size: 60, color: Colors.white),
              SizedBox(height: 10),
              Text(
                "Sports Quiz",
                style: GoogleFonts.poppins(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              Text(
                "Compete & Learn!",
                style: GoogleFonts.poppins(fontSize: 14, color: Colors.white70),
              ),
            ],
          ),
        ),
        ListTile(
          leading: Icon(Icons.home, color: Colors.deepPurple),
          title: Text("Home", style: GoogleFonts.poppins(fontSize: 16)),
          onTap: () {
            Navigator.pop(context);
          },
        ),
        ListTile(
          leading: Icon(Icons.info, color: Colors.deepPurple),
          title: Text("About", style: GoogleFonts.poppins(fontSize: 16)),
          onTap: () {
            // Navigate to About screen (if implemented)
          },
        ),
        Divider(),
        ListTile(
          leading: Icon(Icons.admin_panel_settings, color: Colors.redAccent),
          title: Text(
            "Admin Panel",
            style: GoogleFonts.poppins(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => BottomNavAdmin()),
            );
          },
        ),
        ListTile(
          leading: Icon(Icons.logout, color: Colors.redAccent),
          title: Text(
            "Logout",
            style: GoogleFonts.poppins(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          onTap: () {
            FirebaseAuth.instance.signOut();
          },
        ),
      ],
    ),
  );
}

Widget _buildHeader() {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(
        "Welcome to the Competitive Sports Quiz!",
        style: GoogleFonts.poppins(
          fontSize: 18,
          fontWeight: FontWeight.bold,
          color: Colors.black,
        ),
      ),
      SizedBox(height: 10),
      Text(
        "Test your knowledge of sports history, rules, and key events. Compete in quizzes and track your progress!",
        style: GoogleFonts.poppins(fontSize: 14, color: Colors.black54),
      ),
    ],
  );
}

Widget _buildRegistrationSection() {
  return Container(
    padding: EdgeInsets.all(16),
    decoration: BoxDecoration(
      color: Color(0xFFEDE7F6),
      borderRadius: BorderRadius.circular(12),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Compete and learn!",
          style: GoogleFonts.poppins(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: Colors.black,
          ),
        ),
        SizedBox(height: 5),
        Text(
          "Only for students aged 14-16 years",
          style: GoogleFonts.poppins(fontSize: 14, color: Colors.black54),
        ),
        SizedBox(height: 10),
        ElevatedButton(
          onPressed: () {},
          style: ElevatedButton.styleFrom(backgroundColor: Color(0xFF6B48D6)),
          child: Text(
            "Search quizzes",
            style: GoogleFonts.poppins(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),
      ],
    ),
  );
}

Widget _buildQuizRounds(BuildContext context) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(
        "Regular quizzes",
        style: GoogleFonts.poppins(
          fontSize: 18,
          fontWeight: FontWeight.bold,
          color: Colors.black,
        ),
      ),
      SizedBox(height: 10),
      _buildQuizCard(
        context,
        "Level 1: Easy",
        "100 questions, 25 random, 150s timer, auto-submit",
        Round1QuizScreen(),
      ),
      SizedBox(height: 10),
      _buildQuizCard(
        context,
        "Level 2: Moderate",
        "100 questions, 25 random, 60s timer, scoring 1 point per correct answer",
        RoundTwoScreen(),
      ),
    ],
  );
}

Widget _buildQuizCard(
  BuildContext context,
  String title,
  String details,
  Widget screen,
) {
  return GestureDetector(
    onTap: () {
      Navigator.push(context, MaterialPageRoute(builder: (context) => screen));
    },
    child: Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      elevation: 4,
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: GoogleFonts.poppins(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 5),
            Text(
              details,
              style: GoogleFonts.poppins(fontSize: 14, color: Colors.black54),
            ),
          ],
        ),
      ),
    ),
  );
}
