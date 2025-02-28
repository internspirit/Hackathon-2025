import 'package:flutter/material.dart';
import 'package:quizathlon/userpanel/pages/homepage.dart';
import 'package:quizathlon/userpanel/pages/leaderboard.dart';
import 'package:quizathlon/userpanel/pages/profilepage.dart';
import 'package:quizathlon/userpanel/pages/search.dart';

class BottomNav extends StatefulWidget {
  const BottomNav({super.key});

  @override
  State<BottomNav> createState() => _BottomNavState();
}

class _BottomNavState extends State<BottomNav> {
  int selectedIndex = 0;

  final List<Widget> screens = [
    HomePage(),
    SearchScreen(),
    LeaderboardScreen(),
    ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: screens[selectedIndex],

      bottomNavigationBar: BottomAppBar(
        color: Color(0xFF6B48D6), // Purple background
        shape: CircularNotchedRectangle(),
        notchMargin: 6,
        child: Container(
          height: 60,
          padding: EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildNavItem(icon: Icons.home, label: "Home", index: 0),
              _buildNavItem(icon: Icons.search, label: "Search", index: 1),
              _buildNavItem(
                icon: Icons.leaderboard,
                label: "Leaderboard",
                index: 2,
              ),
              _buildNavItem(icon: Icons.person, label: "Profile", index: 3),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem({
    required IconData icon,
    required String label,
    required int index,
  }) {
    bool isSelected = selectedIndex == index;

    return GestureDetector(
      onTap: () {
        setState(() {
          selectedIndex = index;
        });
      },
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            icon,
            size: 26,
            color: isSelected ? Colors.orange : Colors.white,
          ),
          SizedBox(height: 2),
          Text(
            label,
            style: TextStyle(
              fontSize: 12, // Adjusted for better fit
              fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
              color: isSelected ? Colors.orange : Colors.white,
            ),
          ),
        ],
      ),
    );
  }
}
