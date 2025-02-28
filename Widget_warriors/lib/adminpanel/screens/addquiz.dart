import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AddQuizScreen extends StatefulWidget {
  const AddQuizScreen({super.key});

  @override
  _AddQuizScreenState createState() => _AddQuizScreenState();
}

class _AddQuizScreenState extends State<AddQuizScreen> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _questionController = TextEditingController();
  String? _selectedCategory;
  String? _selectedDifficulty;
  String? _selectedTimeLimit;

  final List<String> categories = ["Football", "Cricket", "Basketball", "Olympics", "Tennis", "Hockey"];
  final List<String> difficultyLevels = ["Easy", "Medium", "Hard"];
  final List<String> timeLimits = ["60 sec", "120 sec", "150 sec"];

  void _submitQuiz() {
    if (_titleController.text.isNotEmpty &&
        _selectedCategory != null &&
        _selectedDifficulty != null &&
        _selectedTimeLimit != null &&
        _questionController.text.isNotEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Quiz Added Successfully!", style: GoogleFonts.poppins())),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Please fill all fields!", style: GoogleFonts.poppins())),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF6B48D6), // Matching leaderboard screen
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Text("Create Quiz", style: GoogleFonts.poppins(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildCard("Quiz Title", _titleController),
              _buildDropdown("Select Category", categories, (value) => setState(() => _selectedCategory = value)),
              _buildDropdown("Select Difficulty", difficultyLevels, (value) => setState(() => _selectedDifficulty = value)),
              _buildDropdown("Select Time Limit", timeLimits, (value) => setState(() => _selectedTimeLimit = value)),
              _buildCard("Enter Question", _questionController, maxLines: 3),
              SizedBox(height: 20),
              _buildSubmitButton(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCard(String hint, TextEditingController controller, {int maxLines = 1}) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 8.0),
      child: Card(
        color: Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
        elevation: 3,
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 15, vertical: 8),
          child: TextField(
            controller: controller,
            maxLines: maxLines,
            decoration: InputDecoration(
              hintText: hint,
              border: InputBorder.none,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDropdown(String hint, List<String> items, Function(String?) onChanged) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 8.0),
      child: Card(
        color: Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
        elevation: 3,
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 15, vertical: 8),
          child: DropdownButtonFormField<String>(
            decoration: InputDecoration(
              border: InputBorder.none,
            ),
            hint: Text(hint, style: GoogleFonts.poppins(fontSize: 14, color: Colors.black54)),
            items: items.map((item) => DropdownMenuItem(value: item, child: Text(item))).toList(),
            onChanged: onChanged,
          ),
        ),
      ),
    );
  }

  Widget _buildSubmitButton() {
    return Center(
      child: ElevatedButton(
        onPressed: _submitQuiz,
        style: ElevatedButton.styleFrom(
          backgroundColor: Color(0xFFFDB44B), // Matching button color from UI
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          padding: EdgeInsets.symmetric(horizontal: 40, vertical: 15),
        ),
        child: Text("Add Quiz", style: GoogleFonts.poppins(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
      ),
    );
  }
}
