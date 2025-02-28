import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class LeaderboardScreen extends StatelessWidget {
  const LeaderboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFF8E8EE),
      appBar: AppBar(
        backgroundColor: Color(0xFF6B48D6),
        title: Text("Leaderboard", style: GoogleFonts.poppins(fontSize: 20, fontWeight: FontWeight.bold)),
      ),
      body: Column(
        children: [
          SizedBox(height: 20),
          _buildTopPlayers(),
          SizedBox(height: 20),
          _buildLeaderboardList(),
        ],
      ),
    );
  }

  Widget _buildTopPlayers() {
    return Container(
      padding: EdgeInsets.all(16),
      margin: EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: Color(0xFF6B48D6),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          Text("#4 You are doing better than 60% of players!", style: GoogleFonts.poppins(fontSize: 14, color: Colors.white)),
          SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildPlayerRank("Alena Donin", "1,469 QP", "assets/avatar1.png", 2),
              _buildPlayerRank("Davis Curtis", "2,569 QP", "assets/avatar2.png", 1),
              _buildPlayerRank("Craig Gouse", "1,053 QP", "assets/avatar3.png", 3),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPlayerRank(String name, String score, String avatar, int position) {
    return Column(
      children: [
        CircleAvatar(radius: position == 1 ? 35 : 30, backgroundImage: AssetImage(avatar)),
        SizedBox(height: 5),
        Text(name, style: GoogleFonts.poppins(fontSize: 12, color: Colors.white)),
        Text(score, style: GoogleFonts.poppins(fontSize: 12, color: Colors.yellow)),
      ],
    );
  }

  Widget _buildLeaderboardList() {
    return Expanded(
      child: ListView.builder(
        itemCount: 10,
        itemBuilder: (context, index) {
          return ListTile(
            leading: CircleAvatar(backgroundImage: AssetImage("assets/avatar${index % 3 + 1}.png")),
            title: Text("Player ${index + 5}", style: GoogleFonts.poppins(fontSize: 16)),
            trailing: Text("${(1000 - index * 50)} QP", style: GoogleFonts.poppins(fontSize: 16, fontWeight: FontWeight.bold)),
          );
        },
      ),
    );
  }
}
