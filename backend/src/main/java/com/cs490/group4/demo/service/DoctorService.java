package com.cs490.group4.demo.service;

import com.cs490.group4.demo.dao.Doctor;
import com.cs490.group4.demo.dao.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorService {

    // inject DoctorRepo here
    @Autowired
    private DoctorRepository doctorRepository;

     public List<Doctor> getAllDoctors(){
         return doctorRepository.findAll();
     }

    public Doctor getDoctorByUserId(Integer userId) {
        return doctorRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Doctor not found for user ID: " + userId));
    }
}
