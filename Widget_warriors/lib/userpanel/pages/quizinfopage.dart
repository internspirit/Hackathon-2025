import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:quizathlon/adminpanel/screens/managerounds.dart';

class QuizInfo extends StatefulWidget {
  const QuizInfo({super.key});

  @override
  State<QuizInfo> createState() => _QuizInfoState();
}

class _QuizInfoState extends State<QuizInfo> {
  int indexx = 0;
  List<String> Category = ["All", "Upcoming", "Ongoing", "Past"];
  List<Map<String, dynamic>> quizzes = [];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: Color(0xFF6B48D6),
        title: Text(
          "Admin Panel",
          style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
        ),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(height: 20),
          Center(child: Icon(Icons.quiz, size: 40)),
          Text(
            'Quiz-Athlon',
            style: TextStyle(fontWeight: FontWeight.w600, fontSize: 24),
          ),
          SizedBox(height: 10),
          Container(width: 100, height: 2.5, color: Colors.black),
          SizedBox(height: 12),

          // Category Selection
          SizedBox(
            height: 60,
            child: ListView.builder(
              itemCount: Category.length,
              scrollDirection: Axis.horizontal,
              itemBuilder: (context, index) {
                return GestureDetector(
                  onTap: () {
                    setState(() {
                      indexx = index;
                    });
                  },
                  child: Container(
                    margin: EdgeInsets.symmetric(horizontal: 8, vertical: 5),
                    padding: EdgeInsets.symmetric(horizontal: 17),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(15),
                      color: indexx == index ? Color(0xFF6B48D6) : Colors.white,
                      boxShadow: [
                        if (indexx == index)
                          BoxShadow(color: Color(0xFF6B48D6), blurRadius: 7),
                      ],
                    ),
                    child: Center(
                      child: Text(
                        Category[index],
                        style: TextStyle(
                          fontSize: 18,
                          color: indexx == index ? Colors.white : Colors.black,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),

          SizedBox(height: 12),

          // Quiz List
          Expanded(
            child: ListView.builder(
              itemCount: quizzes.length,
              itemBuilder: (context, index) {
                Map<String, dynamic> quiz = quizzes[index];
                String quizStatus = _getQuizStatus(quiz["date"]);

                if (Category[indexx] != "All" &&
                    Category[indexx] != quizStatus) {
                  return SizedBox.shrink();
                }

                return Card(
                  margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  elevation: 3,
                  child: ListTile(
                    title: Text(quiz["title"]),
                    subtitle: Text(
                      "Date: ${DateFormat('yyyy-MM-dd').format(quiz["date"])}",
                    ),
                    leading: Icon(Icons.quiz),
                    trailing: Text(
                      quizStatus,
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    onTap: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (context) => AdminHomePage(),
                        ),
                      );
                    },
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  String _getQuizStatus(DateTime date) {
    DateTime now = DateTime.now();
    if (date.isAfter(now)) {
      return "Upcoming";
    } else if (date.year == now.year &&
        date.month == now.month &&
        date.day == now.day) {
      return "Ongoing";
    } else {
      return "Past";
    }
  }
}
