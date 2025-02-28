import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ProfileScreen extends StatelessWidget {
  ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFF8E8EE),
      appBar: AppBar(
        backgroundColor: Color(0xFF6B48D6),
        title: Text(
          "Profile",
          style: GoogleFonts.poppins(fontSize: 20, fontWeight: FontWeight.bold),
        ),
      ),
      body: Column(
        children: [
          SizedBox(height: 20),
          _buildProfileHeader(),
          SizedBox(height: 20),
          _buildRecentMatches(),
        ],
      ),
    );
  }

  Widget _buildProfileHeader() {
    return Container(
      padding: EdgeInsets.all(16),
      margin: EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: Color(0xFF6B48D6),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          CircleAvatar(
            child: Center(
              child: Icon(Icons.person, size: 30, color: Color(0xFF6B48D6)),
            ),
          ),
          SizedBox(height: 10),
          Text(
            "Madelyn Dias",
            style: GoogleFonts.poppins(
              fontSize: 18,
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildStatsBox("Points", "1000"),
              _buildStatsBox("Rank", "#1,438"),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatsBox(String title, String value) {
    return Column(
      children: [
        Text(
          title,
          style: GoogleFonts.poppins(fontSize: 14, color: Colors.white),
        ),
        Text(
          value,
          style: GoogleFonts.poppins(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: Colors.yellow,
          ),
        ),
      ],
    );
  }

  Widget _buildRecentMatches() {
    return Expanded(
      child: ListView(
        padding: EdgeInsets.symmetric(horizontal: 16),
        children: [],
      ),
    );
  }

  Widget _buildMatchCard(String avatar, String result, String points) {
    return Card(
      child: ListTile(
        leading: CircleAvatar(backgroundImage: AssetImage(avatar)),
        title: Text(
          "Match vs Opponent",
          style: GoogleFonts.poppins(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        subtitle: Text(
          result,
          style: TextStyle(color: result == "Win" ? Colors.green : Colors.red),
        ),
        trailing: Text(
          points,
          style: GoogleFonts.poppins(fontSize: 16, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}
