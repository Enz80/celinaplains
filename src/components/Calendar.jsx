import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from './Loader';
import { Suspense } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import * as bootstrap from "bootstrap"

const Calendar = () => {
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
          const response = await axios.get('https://celinaplains-api.onrender.com/get-done-appointments');
          const transformedAppointments = response.data
          // .filter(appointment => appointment.appointmentStatus === 'accepted')
          .map(appointment => ({
            title: appointment.email,
            start: appointment.appointmentTime,
            id: appointment.id,
            content: appointment.message,
            phoneNumber: appointment.phoneNumber,
          }));  
        
          console.log(transformedAppointments);
          setAppointments(transformedAppointments);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };

      const eventDidMount = (info) => {
        const event = info.event;
        const time = event.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        
        const popover = new bootstrap.Popover(info.el, {
          title: event.title,
          placement: 'top',
          trigger: 'hover',
          customClass: 'popoverStyle',
          content: event.extendedProps.content + "<br>" + time  + "<br>" + event.extendedProps.phoneNumber,
          html: true
        });
    
        return popover;
      };


    return (
        <Suspense fallback={<Loader />}>
            <div className='p-8 bg-white rounded-lg drop-shadow-2xl mx-5 mb-5'>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView='dayGridMonth'
                    eventTimeFormat={{
                        hour: "numeric",
                        minute: "2-digit",
                        meridiem: "short"
                    }}
                    events={appointments}
                    eventDidMount={eventDidMount}
                />
            </div>
        </Suspense>
    )
}

export default Calendar