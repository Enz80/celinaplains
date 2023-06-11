import React from 'react'
import DashboardNav from '../components/DashboardNav'
import ChartContainer from '../components/ChartContainer'
import bg from "../assets/bg-1.jpg"

const StatsPage = () => {
  return (
    <div>
      <DashboardNav />
      <img src={bg} alt="Background Image" className="absolute w-screen h-full bg-cover -z-20"/>
      <ChartContainer />
    </div>
  )
}

export default StatsPage