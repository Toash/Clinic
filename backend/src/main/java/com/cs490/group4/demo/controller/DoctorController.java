package com.cs490.group4.demo.controller;

import com.cs490.group4.demo.dao.Doctor;
import com.cs490.group4.demo.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequiredArgsConstructor
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/doctors")
    private ResponseEntity<?> getAllDoctors(){
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }
    @GetMapping("/doctor/{userId}")
    public ResponseEntity<Doctor> getDoctorByUserId(@PathVariable Integer userId) {
        Doctor doctor = doctorService.getDoctorByUserId(userId);
        return ResponseEntity.ok(doctor);
    }
}