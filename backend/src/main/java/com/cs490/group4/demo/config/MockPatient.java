package com.cs490.group4.demo.config;
import com.cs490.group4.demo.dao.Patient;
import com.cs490.group4.demo.dao.PatientRepository;
import com.cs490.group4.demo.security.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MockPatient {

    @Autowired
    private MockUser mockUser;

    @Autowired
    private PatientRepository patientRepository;

    public void createMockPatient(
            String email,
            String firstName,
            String lastName,
            String phone,
            String address) {
        Patient patient = new Patient();
        User user = mockUser.createMockUser(email, "password", firstName, lastName);
        patient.setEmail(email);
        patient.setFirstName(firstName);
        patient.setLastName(lastName);
        patient.setPhone(phone);
        patient.setAddress(address);
        patient.setUser(user);
        patientRepository.save(patient);

    }
}
