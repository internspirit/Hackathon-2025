package com.example.expensetracker;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsMessage;
import android.util.Log;
import com.google.firebase.firestore.FirebaseFirestore;

public class SmsReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent.getAction().equals("android.provider.Telephony.SMS_RECEIVED")) {
            Bundle bundle = intent.getExtras();
            if (bundle != null) {
                Object[] pdus = (Object[]) bundle.get("pdus");
                if (pdus != null) {
                    for (Object pdu : pdus) {
                        SmsMessage smsMessage = SmsMessage.createFromPdu((byte[]) pdu);
                        String messageBody = smsMessage.getMessageBody();
                        String sender = smsMessage.getOriginatingAddress();

                        Log.d("SmsReceiver", "Received SMS: " + messageBody);

                        // Send data to Firebase Firestore
                        FirebaseFirestore db = FirebaseFirestore.getInstance();
                        db.collection("transactions").add(new Transaction(sender, messageBody));
                    }
                }
            }
        }
    }

    // Transaction Data Class
    public class Transaction {
        String sender;
        String message;

        public Transaction(String sender, String message) {
            this.sender = sender;
            this.message = message;
        }
    }
}
