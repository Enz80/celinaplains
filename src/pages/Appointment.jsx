import React from 'react'
import AppointmentForm from '../components/AppointmentForm'
import DashboardNav from '../components/DashboardNav'
import bg from "../assets/bg-1.jpg"
import { motion } from "framer-motion"

/**
 * The Appointment function returns a JSX element that displays a background image, a navigation bar,
 * and an appointment form centered on the page.
 * @returns The `Appointment` component is being returned, which contains a `div` element with a
 * background image and two child components: `DashboardNav` and `AppointmentForm`. The `DashboardNav`
 * component is a navigation bar and the `AppointmentForm` component is a form for scheduling
 * appointments.
 */
const Appointment = () => {
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "fade",
          delay: "0.5",
          duration: "1.4"
        }}
    >
        <img src={bg} alt="Background Image" className="absolute w-screen bg-cover"/>
        <DashboardNav />
        <div className="pt-[100px] pb-5 flex justify-center">
            <AppointmentForm />
        </div>
    </motion.div>
  )
}

export default Appointment