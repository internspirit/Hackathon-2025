import 'package:cloud_firestore/cloud_firestore.dart';

class FirebaseService {
  static final _db = FirebaseFirestore.instance;

  static Future<void> storeTransaction(Map<String, dynamic> transaction) async {
    await _db.collection("transactions").add(transaction);
  }

  static Stream<QuerySnapshot> getTransactions() {
    return _db.collection("transactions").snapshots();
  }
}
