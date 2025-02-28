import 'package:flutter/material.dart';

class QuizDetailsScreen extends StatefulWidget {
  final String quizTitle;
  
  QuizDetailsScreen({required this.quizTitle});

  @override
  _QuizDetailsScreenState createState() => _QuizDetailsScreenState();
}

class _QuizDetailsScreenState extends State<QuizDetailsScreen> {
  List<Map<String, dynamic>> questions = [];
  int correctPoints = 1;
  int wrongPoints = 0;

  void _addQuestion() {
    setState(() {
      questions.add({
        'question': '',
        'options': ['', '', '', ''],
        'correctIndex': 0,
      });
    });
  }

  void _updateQuestion(int index, String newValue) {
    setState(() {
      questions[index]['question'] = newValue;
    });
  }

  void _updateOption(int qIndex, int optIndex, String newValue) {
    setState(() {
      questions[qIndex]['options'][optIndex] = newValue;
    });
  }

  void _updateCorrectIndex(int qIndex, int newIndex) {
    setState(() {
      questions[qIndex]['correctIndex'] = newIndex;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.quizTitle),
        backgroundColor: Colors.orange,
      ),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Set Points:", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            Row(
              children: [
                Text("Correct Answer: "),
                SizedBox(width: 10),
                DropdownButton<int>(
                  value: correctPoints,
                  items: List.generate(11, (index) => DropdownMenuItem(value: index, child: Text(index.toString()))),
                  onChanged: (value) => setState(() => correctPoints = value!),
                ),
              ],
            ),
            Row(
              children: [
                Text("Wrong Answer: "),
                SizedBox(width: 10),
                DropdownButton<int>(
                  value: wrongPoints,
                  items: List.generate(6, (index) => DropdownMenuItem(
                  value: -index, 
                  child: Text((-index).toString())
                       )),
                  onChanged: (value) => setState(() => wrongPoints = value!),

                ),
              ],
            ),
            SizedBox(height: 20),
            Expanded(
              child: ListView.builder(
                itemCount: questions.length,
                itemBuilder: (context, index) {
                  return Card(
                    elevation: 3,
                    margin: EdgeInsets.only(bottom: 10),
                    child: Padding(
                      padding: EdgeInsets.all(10),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          TextField(
                            decoration: InputDecoration(labelText: "Question ${index + 1}"),
                            onChanged: (value) => _updateQuestion(index, value),
                          ),
                          ...List.generate(4, (optIndex) => RadioListTile(
                                title: TextField(
                                  decoration: InputDecoration(labelText: "Option ${optIndex + 1}"),
                                  onChanged: (value) => _updateOption(index, optIndex, value),
                                ),
                                value: optIndex,
                                groupValue: questions[index]['correctIndex'],
                                onChanged: (value) => _updateCorrectIndex(index, value as int),
                              )),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
            SizedBox(height: 10),
            ElevatedButton(
              onPressed: _addQuestion,
              style: ElevatedButton.styleFrom(backgroundColor: Colors.orange),
              child: Text("Add Question"),
            ),
          ],
        ),
      ),
    );
  }
}