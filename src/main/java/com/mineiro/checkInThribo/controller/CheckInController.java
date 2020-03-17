package com.mineiro.checkInThribo.controller;

import com.mineiro.checkInThribo.domain.CheckIn;
import com.mineiro.checkInThribo.repository.CheckInRepository;
import com.mineiro.checkInThribo.service.CheckInService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/")
public class CheckInController {

    private final CheckInService checkInService;

    private final CheckInRepository repository;

    public CheckInController(CheckInService checkInService, CheckInRepository repository) {
        this.checkInService = checkInService;
        this.repository = repository;
    }

    @GetMapping("rainer")
    public void get(final String address) {
        checkInService.checkIn(address);
    }

    @PostMapping("checkIn")
    public void post(@RequestBody final CheckIn address) {
        var po = address;
        repository.save(address);
    }
}
