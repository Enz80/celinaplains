import React, { useState } from 'react';
import axios from 'axios';

const ContactUsForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      //change to contact-Us
      const apiUrl = 'https://celinaplains-api.onrender.com/make-appointment';
  
      try {
        const response = await axios.post(apiUrl, {
          email,
          phoneNumber,
          appointmentTime,
          message,
          appointmentStatus
        });
  
        // Handle the response (e.g., display a success message, navigate to another page, etc.)
        console.log('Appointment created successfully:', response.data);
        alert("Appointment created successfully");
        window.location.href = "/";
      } catch (error) {
        // Handle the error (e.g., display an error message)
        console.error('Error creating appointment:', error);
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-md py-4 mx-auto mt-10 bg-white rounded-3xl drop-shadow-2xl">
        <h1 className="mb-3 text-3xl font-bold"><strong>Contact Us</strong></h1>
        <form onSubmit={handleSubmit} className="justify-center space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full px-3 bg-slate-200 py-2 border-2 border-blue-300 rounded-md hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2">
              Message:
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows="4"
              className="w-full px-3 bg-slate-200 py-2 border-2 border-blue-300 rounded-md hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-[#167f7f] rounded-md hover:border-blue-500 hover:bg-[#0f5e5e] focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </form>
      </div>
    );
}

export default ContactUsForm