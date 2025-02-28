import 'package:google_ml_kit/google_ml_kit.dart';
//import 'package:mlkit/mlkit.dart';

class AIService {
  static Future<Map<String, dynamic>> extractTransactionDetails(
      String sms) async {
    final entityExtractor = EntityExtractor(
        language: EntityExtractorLanguage
            .english); // ✅ Changed 'en' to EntityExtractorLanguage.english
    final result = await entityExtractor.annotateText(sms);

    String? amount, receiver;
    for (var annotation in result) {
      if (annotation.entities.first.type == EntityType.money) {
        // ✅ Corrected
        amount = annotation.text;
      } else if (annotation.entities.first.type == EntityType.address) {
        // ✅ Corrected
        receiver = annotation.text;
      }
    }

    return {
      "amount": amount ?? "Unknown",
      "receiver": receiver ?? "Unknown",
      "category": categorizeExpense(receiver)
    };
  }

  /// Categorize transactions
  static String categorizeExpense(String? receiver) {
    Map<String, String> categoryMap = {
      "Big Bazaar": "Grocery",
      "Apollo Pharmacy": "Medical",
      "Netflix": "Entertainment",
      "Amazon": "Shopping",
      "HP Petrol Pump": "Petrol",
      "LIC Insurance": "Insurance",
      "Mutual Fund SIP": "Investments",
      "Zomato": "Food"
    };

    return categoryMap[receiver] ?? "Others";
  }
}
