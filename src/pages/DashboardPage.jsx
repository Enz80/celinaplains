/**
 * The function returns a React component for a dashboard page with a navigation bar, appointments
 * display, news feed, and background image.
 */
import React from 'react';
import DashboardNav from '../components/DashboardNav';
import DisplayAppointments from '../components/DIsplayAppointments';
import NewsFeed from '../components/NewsFeed';
import bg from "../assets/bg-1.jpg"
import { motion } from "framer-motion"

function DashboardPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "fade",
        delay: "0.5",
        duration: "1.4"
      }}
      className="flex h-full bg-repeat font-poppins bg-background1"
      style={{ overflow: "hidden" }}>
      <img src={bg} alt="Background Image" className="absolute w-screen h-full bg-repeat"/>
      <DashboardNav />
      <div className="pt-[80px]">
        <div className="flex flex-col justify-center gap-4 px-8 overflow-hidden md:flex-row">
          <DisplayAppointments />
          <NewsFeed />
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardPage;
