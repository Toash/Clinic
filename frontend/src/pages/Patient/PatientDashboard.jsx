import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { API_URL } from '../../utils/constants';
import StyledButton from '../../components/StyledButton';
import axios from 'axios';
const PatientDashboard = () => {

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openBooking, setOpenBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(dayjs());

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_URL}/doctors`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleBookAppointment = () => {
    const appointment = {
      doctor:{
        id: selectedDoctor.id
      },
      // TODO: get patient id from user context
      patient: {
        id: 1
      },
      appointmentTimestamp: selectedDateTime.toISOString()
    };

    axios.post(`${API_URL}/appointments`, appointment)
      .then(response => {
        console.log('Appointment created:', response.data);
      })
      .catch(error => {
        console.error('Error creating appointment:', error);
      });
      
    handleCloseBooking();
  };

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenBooking(true);
  };

  const handleCloseBooking = () => {
    setOpenBooking(false);
    setSelectedDoctor(null);
    setSelectedDateTime(dayjs());
  };


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Patient Dashboard
      </Typography>

      <Typography variant="h5" gutterBottom mt={4}>
        Doctors
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Specialty</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Phone</strong></TableCell>
                <TableCell><strong>Book Appointment</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>Dr. {doctor.firstName} {doctor.lastName}</TableCell>
                  <TableCell>{doctor.specialty}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>
                    <StyledButton 
                      variant="contained" 
                      color="primary"
                      onClick={() => handleBookClick(doctor)}
                    >
                      Book Appointment
                    </StyledButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openBooking} onClose={handleCloseBooking}>
        <DialogTitle>Book Appointment</DialogTitle>
        <DialogContent>
          <Typography mb={4}>
            Dr. {selectedDoctor?.firstName} {selectedDoctor?.lastName}
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Appointment Date & Time"
              value={selectedDateTime}
              onChange={(newValue) => setSelectedDateTime(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
              minDateTime={dayjs()}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBooking}>Cancel</Button>
          <Button onClick={handleBookAppointment} variant="contained" color="primary">
            Book
          </Button>
        </DialogActions>
      </Dialog>


    </Container>
  );
};

export default PatientDashboard; 