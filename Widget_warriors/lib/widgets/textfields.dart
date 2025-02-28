import 'package:flutter/material.dart';

class MyTextField extends StatefulWidget {
  final String hint;
  final TextEditingController controller;
  final IconData i;
  final bool obscuretext;
  const MyTextField({
    super.key,
    required this.hint,
    required this.controller,
    required this.i,
    required this.obscuretext,
  });

  @override
  State<MyTextField> createState() => _MyTextFieldState();
}

class _MyTextFieldState extends State<MyTextField> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: TextField(
        obscureText: widget.obscuretext,
        controller: widget.controller,
        decoration: InputDecoration(
          border: OutlineInputBorder(
            borderSide: BorderSide.none,
            borderRadius: BorderRadius.circular(100),
          ),
          suffixIcon: Row(
            mainAxisSize: MainAxisSize.min,
            children: [Icon(widget.i), SizedBox(width: 10)],
          ),
          fillColor: Colors.white,
          filled: true,
          hintText: widget.hint,
          contentPadding: EdgeInsets.symmetric(horizontal: 20),
        ),
      ),
    );
  }
}
