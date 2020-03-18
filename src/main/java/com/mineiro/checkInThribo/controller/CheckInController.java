package com.mineiro.checkInThribo.controller;

import com.mineiro.checkInThribo.domain.CheckIn;
import com.mineiro.checkInThribo.repository.CheckInRepository;
import com.mineiro.checkInThribo.service.CheckInService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("api/checkin")
public class CheckInController {

    private final CheckInService checkInService;

    private final CheckInRepository repository;

    public CheckInController(CheckInService checkInService, CheckInRepository repository) {
        this.checkInService = checkInService;
        this.repository = repository;
    }
    @CrossOrigin
    @PostMapping
    public void post(@RequestBody List<String> address){
        checkInService.checkIn(address);
    }
}
