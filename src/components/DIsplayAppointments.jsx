import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Loader from './Loader';
import { Suspense } from 'react';

const DisplayAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, [appointments]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('https://celinaplains-api.onrender.com/get-appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleMakeAsDone = async (appointmentId, email, phoneNumber, appointmentTime, message) => {
    try {
      // Delete the appointment from the "appointments" collection
      await axios.delete(`https://celinaplains-api.onrender.com/delete-appointment/${appointmentId}`);

      // Move the appointment to a different collection (e.g., "done-appointments")
      await axios.post('https://celinaplains-api.onrender.com/move-appointment', {
        appointmentId,
        email,
        phoneNumber,
        appointmentTime,
        message,
        // Add any additional fields from the appointment object that you want to store in the new collection
      });

      // Fetch the updated appointments list
      fetchAppointments();
    } catch (error) {
      console.error('Error making appointment as done:', error);
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className='h-screen p-8 bg-glass drop-shadow-2xl'>
        <h1 className="text-5xl font-semibold font-poppins">Appointments</h1>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <div className="pt-4 z-10 overflow-y-auto rounded-lg max-h-[calc(100vh-200px)]">
            <ul>
              {appointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="pb-6"
                >
                  <strong>Email:</strong> {appointment.email}
                  <br />
                  <strong>Phone Number:</strong> {appointment.phoneNumber}
                  <br />
                  <strong>Date/Time:</strong> {appointment.appointmentTime}
                  <br />
                  <strong>Message:</strong> {appointment.message}
                  <hr />
                  <button
                    type="submit"
                    className="p-1 my-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
                    onClick={() =>
                      handleMakeAsDone(
                        appointment.id,
                        appointment.email,
                        appointment.phoneNumber,
                        appointment.appointmentTime,
                        appointment.message
                      )
                    }
                  >
                    Make as Done
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default DisplayAppointments;
