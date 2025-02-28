import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  _SearchScreenState createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final TextEditingController _searchController = TextEditingController();
  final List<String> _allQuizzes = [
    "Football History Quiz",
    "Olympics Trivia",
    "Cricket World Cup Facts",
    "Basketball Rules & Regulations",
    "Tennis Grand Slam Challenge",
    "Hockey Champions Quiz",
    "Formula 1 Legends",
    "Badminton Basics",
  ];
  List<String> _filteredQuizzes = [];

  @override
  void initState() {
    super.initState();
    _filteredQuizzes = _allQuizzes; // Initially, show all quizzes
  }

  void _filterQuizzes(String query) {
    setState(() {
      _filteredQuizzes = _allQuizzes
          .where((quiz) => quiz.toLowerCase().contains(query.toLowerCase()))
          .toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Color(0xFF6B48D6),
        title: Text("Search Quizzes", style: GoogleFonts.poppins(fontSize: 20, fontWeight: FontWeight.bold)),
        centerTitle: true,
      ),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            _buildSearchBar(),
            SizedBox(height: 20),
            _buildQuizList(),
          ],
        ),
      ),
    );
  }

  Widget _buildSearchBar() {
    return TextField(
      controller: _searchController,
      onChanged: _filterQuizzes,
      decoration: InputDecoration(
        hintText: "Search for a quiz...",
        hintStyle: GoogleFonts.poppins(fontSize: 14, color: Colors.black54),
        prefixIcon: Icon(Icons.search, color: Colors.grey),
        filled: true,
        fillColor: Colors.grey[200],
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
      ),
    );
  }

  Widget _buildQuizList() {
    return Expanded(
      child: _filteredQuizzes.isNotEmpty
          ? ListView.builder(
              itemCount: _filteredQuizzes.length,
              itemBuilder: (context, index) {
                return _buildQuizCard(_filteredQuizzes[index]);
              },
            )
          : Center(
              child: Text(
                "No quizzes found",
                style: GoogleFonts.poppins(fontSize: 16, color: Colors.black54),
              ),
            ),
    );
  }

  Widget _buildQuizCard(String quizTitle) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      elevation: 4,
      child: ListTile(
        title: Text(quizTitle, style: GoogleFonts.poppins(fontSize: 16, fontWeight: FontWeight.bold)),
        trailing: Icon(Icons.arrow_forward_ios, color: Colors.grey),
        onTap: () {
          // Navigate to quiz details
        },
      ),
    );
  }
}
