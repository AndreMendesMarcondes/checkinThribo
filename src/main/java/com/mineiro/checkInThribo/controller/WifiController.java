package com.mineiro.checkInThribo.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("api/wifi")
public class WifiController {

    @CrossOrigin
    @RequestMapping(value = "/{address}", method = RequestMethod.GET)
    public ResponseEntity<?> get(@PathVariable("address") String address){
        final String uri = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + address + "&destinations=Av. Dr. Adail Nunes da Silva, 1 - Centro, Araraquara - SP, 14802-340&mode=walking&language=PT&sensor=false&key=AIzaSyAZu4pQPzGEEe8ijqiP4cKnMrz7-Orercg";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Access-Control-Allow-Origin", "*");

        String result = restTemplate.getForObject(uri, String.class);

        System.out.println(result);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}
