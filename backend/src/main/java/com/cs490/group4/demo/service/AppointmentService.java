package com.cs490.group4.demo.service;

import com.cs490.group4.demo.dao.Appointment;
import com.cs490.group4.demo.dao.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import com.cs490.group4.demo.dao.AppointmentStatusCode;
import com.cs490.group4.demo.dao.AppointmentStatusCodeRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AppointmentStatusCodeRepository appointmentStatusCodeRepository;

     public List<Appointment> getAllAppointments(){
         return appointmentRepository.findAll();
     }

     public void createAppointment(Appointment appointment){
        // appointment.setAppointmentStatusCode(AppointmentStatusCode.PENDING);
        appointment.setAppointmentStatusCode(appointmentStatusCodeRepository.findByStatus("PENDING"));
        appointmentRepository.save(appointment);
     }

}
