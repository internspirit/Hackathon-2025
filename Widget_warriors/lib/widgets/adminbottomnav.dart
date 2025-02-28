import 'package:flutter/material.dart';
import 'package:quizathlon/adminpanel/screens/addquiz.dart';
import 'package:quizathlon/adminpanel/screens/adminhome.dart';
import 'package:quizathlon/adminpanel/screens/managerounds.dart';
import 'package:quizathlon/adminpanel/screens/participation.dart';

class BottomNavAdmin extends StatefulWidget {
  const BottomNavAdmin({super.key});

  @override
  State<BottomNavAdmin> createState() => _BottomNavAdminState();
}

class _BottomNavAdminState extends State<BottomNavAdmin> {
 int _selectedIndex = 0;

  // Pages
  final List<Widget> _pages = [
    Home(),
    ParticipantsPage(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_selectedIndex], // Display selected page

      // Bottom Navigation Bar
      bottomNavigationBar: BottomAppBar(
        shape: CircularNotchedRectangle(),
        notchMargin: 8,
        child: Container(
          height: 60,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              IconButton(
                icon: Icon(Icons.home, color: _selectedIndex == 0 ? Colors.deepPurple : Colors.grey),
                onPressed: () => _onItemTapped(0),
              ),
              SizedBox(width: 40), // Space for Floating Button
              IconButton(
                icon: Icon(Icons.people, color: _selectedIndex == 1 ? Colors.deepPurple : Colors.grey),
                onPressed: () => _onItemTapped(1),
              ),
            ],
          ),
        ),
      ),

      // Floating Add Button
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.of(context)
          .push(MaterialPageRoute(builder: (context)=>AddQuizScreen()));
        },
        backgroundColor: Colors.deepPurple,
        shape:CircleBorder(),
        child: Icon(Icons.add, color: Colors.white),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }
}


