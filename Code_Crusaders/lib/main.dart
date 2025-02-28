import 'package:sms_advanced/sms_advanced.dart';
//import 'firebase_service.dart';
//import 'ai_service.dart';
import 'dart:async'; // For async operations
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'package:flutter/material.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  String sms =
      "Dear UPI user A/C X8565 debited by 370.0 on date 21Feb25 trf to DATTARAM CHODANK Refno 505247700323. If not u? call 1800111109. -SBI";
  extractUPIDetails(sms);
  //runApp(MyApp());
}

void extractUPIDetails(String sms) {
  RegExp amountRegex = RegExp(r'debited by\s+(\d+(?:\.\d+)?)');
  RegExp receiverRegex = RegExp(r'trf to\s+([A-Za-z\s]+)\s+Refno');
  RegExp refnoRegex = RegExp(r'Refno\s+(\d+)');

  String? amount = amountRegex.firstMatch(sms)?.group(1);
  String? receiver = receiverRegex.firstMatch(sms)?.group(1);
  String? refno = refnoRegex.firstMatch(sms)?.group(1);

  print("Amount: $amount, Receiver: $receiver, Refno: $refno");
}


/*class SmsService {
  final SmsQuery query = SmsQuery();

  /// Fetch UPI transactions from the past X months
  Future<List<Map<String, dynamic>>> fetchPastUPIMessages(int monthsBack) async {
    List<SmsMessage> messages = await query.getAllSms;

    DateTime now = DateTime.now();
    DateTime filterDate = now.subtract(Duration(days: 30 * monthsBack));

    // Filter SMS messages based on date & keywords
    List<SmsMessage> filteredMessages = messages.where((msg) {
      DateTime smsDate = msg.date!;
      return smsDate.isAfter(filterDate) &&
          (msg.body?.contains("credited") == true || msg.body?.contains("debited") == true);
    }).toList(); 

    // Process messages using AI for details extraction
    List<Map<String, dynamic>> transactions = await Future.wait(
      filteredMessages.map((msg) async {
        var details = await AIService.extractTransactionDetails(msg.body ?? "");
        return {
          "amount": details["amount"],
          "receiver": details["receiver"],
          "category": details["category"],
          "date": msg.date.toString(),
          "timestamp": FieldValue.serverTimestamp(),
        };
      }),
    );

    return transactions;
  }

  /// Start listening for new SMS transactions
  void startListening() {
    SmsReceiver receiver = SmsReceiver();
    receiver.onSmsReceived?.listen((SmsMessage msg) async {
      if (msg.body != null) {
        var details = await AIService.extractTransactionDetails(msg.body!);
        await FirebaseService.storeTransaction({
          "amount": details["amount"],
          "receiver": details["receiver"],
          "category": details["category"],
          "date": msg.date.toString(),
          "timestamp": FieldValue.serverTimestamp(),
        });
      }
    });
  }
}*/

/*class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: HomeScreen(),
    );
  }
}*/
