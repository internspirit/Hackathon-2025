import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../services/firebase_service.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Expense Tracker")),
      body: StreamBuilder(
        stream: FirebaseService.getTransactions(),
        builder: (context, AsyncSnapshot<QuerySnapshot> snapshot) {
          if (!snapshot.hasData) return CircularProgressIndicator();
          return ListView(
            children: snapshot.data!.docs.map((doc) {
              return ListTile(
                title: Text("${doc["receiver"]} - ₹${doc["amount"]}"),
                subtitle: Text("${doc["category"]} - ${doc["date"]}"),
              );
            }).toList(),
          );
        },
      ),
    );
  }
}
