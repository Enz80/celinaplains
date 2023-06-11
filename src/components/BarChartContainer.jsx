import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'




const BarChartContainer = ({ data }) => {
  return (
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data} margin={{ top: 50, left: -20, right: 20 }}>
          <CartesianGrid strokeDasharray='5 3 ' />
          <XAxis dataKey='date' />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar fill='#167f7f' dataKey='count' barSize={75}/>
        </BarChart>
      </ResponsiveContainer>
)
}

export default BarChartContainer