import 'package:sms_advanced/sms_advanced.dart';
import 'firebase_service.dart';
import 'ai_service.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart'; // Custom AI-based transaction ex // Firebase initialization
import 'dart:async'; // For asynchronous operations (Stream, Future)

class SmsService {
  final SmsQuery query = SmsQuery();

  /// Fetches UPI transactions from the last X months
  Future<List<Map<String, dynamic>>> fetchPastUPIMessages(
      int monthsBack) async {
    List<SmsMessage> messages = await query.getAllSms;
    ; // Ensure parentheses if it's a function

    DateTime now = DateTime.now();
    DateTime filterDate = DateTime(now.year, now.month - monthsBack, now.day);

    // Filter SMS messages based on date and transaction keywords
    List<SmsMessage> filteredMessages = messages.where((msg) {
      DateTime smsDate = msg.date!;
      return smsDate.isAfter(filterDate) &&
          (msg.body?.contains("credited") == true ||
              msg.body?.contains("debited") == true);
    }).toList(); // Convert to a list to avoid lazy iteration issues

    // Process messages asynchronously and collect results
    List<Map<String, dynamic>> transactions = await Future.wait(
      filteredMessages.map((msg) async {
        var details = await AIService.extractTransactionDetails(msg.body ?? "");
        return {
          "amount": details["amount"],
          "receiver": details["receiver"],
          "date": msg.date.toString(), // Fixed `smsDate` reference
        };
      }),
    );

    return transactions;
  }

  /// Listen for new SMS transactions
  void startListening() {
    SmsReceiver receiver = SmsReceiver();
    if (receiver.onSmsReceived != null) {
      receiver.onSmsReceived!.listen((SmsMessage msg) async {
        if (msg.body != null) {
          var details = await AIService.extractTransactionDetails(msg.body!);
          await FirebaseService.storeTransaction(details);
        }
      });
    } else {
      print("SMS Receiver stream is null.");
    }
  }
}
