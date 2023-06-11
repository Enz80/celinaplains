import React from 'react'
import BarChartContainer from './BarChartContainer'

const data = [
    {
        date: 'Jan 2023',
        count: 50
    },
    {
        date: 'Feb 2023',
        count: 70
    },
    {
        date: 'Mar 2023',
        count: 25
    },
    {
        date: 'Apr 2023',
        count: 14
    },
    {
        date: 'May 2023',
        count: 10
    },
    {
        date: 'Jun 2023',
        count: 2
    },
]

const ChartContainer = () => {
    return (
        <div className='pt-[100px]'>
            <div className='bg-white m-5 rounded-xl p-5'>
                <div className='text-[40px] text-center '><strong>Monthly Pay of Dues</strong></div>
                <div className='flex !flex-wrap justify-center'>
                    <BarChartContainer data={data} />
                </div>
            </div>
        </div>
    )
}

export default ChartContainer