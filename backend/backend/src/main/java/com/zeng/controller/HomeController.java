
package com.zeng.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/home")
@CrossOrigin(origins = "*")
public class HomeController {

    @GetMapping("/data")
    public Map<String, Object> getHomeData() {

        Map<String, Object> response = new HashMap<>();

        response.put("userName", "ZenG User");
        response.put("coinBalance", 2450);
        response.put("featuredVideo", "https://www.w3schools.com/html/mov_bbb.mp4");
        response.put("trendingTags",
                Arrays.asList("#ZenG", "#Live", "#Gaming", "#Music"));

        return response;
    }
}

