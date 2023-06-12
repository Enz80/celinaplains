import React, { useEffect } from 'react'
import BarChartContainer from './BarChartContainer'
import moment from 'moment'
import { app } from '../auth.js';

const db = app.firestore()

const getMontlyPaidDues = async (req,res) => {
    try {
        const paidDuesSnapshot =  await db.collection("users").get()
        const paidDues =  paidDuesSnapshot.docs.map((doc)=>{doc.data()});

        //add condition here what is to return
        



        //perform aggregation
        const montlyPaidDues = paidDues.reduce((acc, dues)=> {
            const createdAt = moment(dues.createAt.toDate());
            const year = createdAt.year();
            const month = createdAt.month();

            const existingEntry = acc.find((entry)=> {entry.year === year && entry.month === month});
            if (existingEntry) {
                existingEntry.count++;
            } else {
                acc.push({year, month,count:1});
            }

            return acc;
        }, [])

        montlyPaidDues.sort((a,b)=>{
            if (a.year !== b.year) {
                return b.year - a.year;
            } else {
                return b.month - a.moment;
            }
        });

        const limitedMontlyPaidDues = montlyPaidDues.slice(0,6)

        const formattedMontlyPaidDues = limitedMontlyPaidDues.map(({year, month, count})=>{
            const date = moment().month(month-1).year(year).format('MMM Y');
            return {date, count};

        })

        return {montlyPaidDues: formattedMontlyPaidDues}
    } catch (error) {
        console.log(error);
    }
}


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