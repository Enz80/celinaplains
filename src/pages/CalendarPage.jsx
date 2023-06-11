import React, { Suspense,lazy } from 'react'
import bg from "../assets/bg-1.jpg"
import { motion } from 'framer-motion'
import Loader from '../components/Loader'

const DashboardNav = lazy(() => import('../components/DashboardNav'));
const Calendar = lazy(() => import('../components/Calendar'));

const CalendarPage = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <img src={bg} alt="Background Image" className=" fixed object-cover w-full h-full "/>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "fade",
          delay: "0.5",
          duration: "1.4"
        }}
      >
        <DashboardNav />
        <div className="pt-[100px]">
          <Calendar />
        </div>
      </motion.div>
    </Suspense>
  )
}

export default CalendarPage