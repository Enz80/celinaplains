import React from 'react'
import UserNav from '../components/UserNav'
import AppointmentForm from '../components/AppointmentForm'
import bg from "../assets/bg-1.jpg"
const AppointmentFormUser = () => {
  return (
    <div>
        <img src={bg} alt="Background Image" className="absolute w-screen bg-cover"/>
        <UserNav />
        <div className="pt-[100px] pb-5 flex justify-center">
            <AppointmentForm />
        </div>        
    </div>
  )
}

export default AppointmentFormUser