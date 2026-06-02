package com.zeng.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {

        String username = credentials.get("username");
        String password = credentials.get("password");

        Map<String, Object> response = new HashMap<>();

        // HARDCODED LOGIN
        if ("Suvam".equals(username) && "Suvamkumar77@".equals(password)) {

            response.put("status", "success");
            response.put("message", "Welcome to ZEN G WORLD");
            response.put("token", "dummy-token-123");

            return ResponseEntity.ok(response);

        } else {

            response.put("status", "error");
            response.put("message", "Invalid Username or Password");

            return ResponseEntity.status(401).body(response);
        }
    }
}