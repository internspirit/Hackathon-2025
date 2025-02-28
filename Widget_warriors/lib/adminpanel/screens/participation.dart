import 'package:flutter/material.dart';

class ParticipantsPage extends StatelessWidget {
  // Dummy list of participants with scores
  final List<Map<String, dynamic>> participants = [
    {"name": "John Doe", "score": 85, "status": "Passed"},
    {"name": "Alice Smith", "score": 72, "status": "Passed"},
    {"name": "Bob Johnson", "score": 45, "status": "Failed"},
    {"name": "Charlie Brown", "score": 90, "status": "Passed"},
    {"name": "David Lee", "score": 60, "status": "Passed"},
    {"name": "Eve Adams", "score": 30, "status": "Failed"},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Participants"),
        backgroundColor: Colors.deepPurple,
        centerTitle: true,
      ),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSummaryCard(),
            SizedBox(height: 20),
            Text("Participants List", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            SizedBox(height: 10),
            Expanded(child: _buildParticipantsList()),
          ],
        ),
      ),
    );
  }

  // Widget to show total participants and passing percentage
  Widget _buildSummaryCard() {
    int totalParticipants = participants.length;
    int passed = participants.where((p) => p["status"] == "Passed").length;
    double passPercentage = (passed / totalParticipants) * 100;

    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.deepPurple.shade100,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("Total Participants", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              Text("$totalParticipants", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.deepPurple)),
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("Pass Rate", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              Text("${passPercentage.toStringAsFixed(1)}%", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.green)),
            ],
          ),
        ],
      ),
    );
  }

  // Widget to show the list of participants
  Widget _buildParticipantsList() {
    return ListView.builder(
      itemCount: participants.length,
      itemBuilder: (context, index) {
        var participant = participants[index];
        return Card(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          elevation: 3,
          child: ListTile(
            leading: Icon(Icons.person, size: 40, color: Colors.deepPurple),
            title: Text(participant["name"], style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            subtitle: Text("Score: ${participant["score"]}"),
            trailing: Text(
              participant["status"],
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: participant["status"] == "Passed" ? Colors.green : Colors.red,
              ),
            ),
          ),
        );
      },
    );
  }
}
