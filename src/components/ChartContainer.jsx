import React, { useEffect, useState } from 'react';
import BarChartContainer from './BarChartContainer';
import { app } from '../auth.js';
import moment from 'moment';

const db = app.firestore();

const ChartContainer = () => {
    const [data1stHalf, setData1] = useState([]);
    const [data2stHalf, setData2] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const usersSnapshot = await db.collection("users").get();
                const result = {};

                usersSnapshot.forEach((doc) => {
                    const user = doc.data();
                    const duesByDate = user.duesByDate;
                    console.log(duesByDate);
                    for (const date in duesByDate) {
                        if (duesByDate[date] === "100" || parseInt(duesByDate[date]) >= "100") {
                            const month = moment(date, "MM").format("MMM");
                            const year = moment().year();
                            const formattedDate = `${month} ${year}`;
                            if (result[formattedDate]) {
                                result[formattedDate]++;
                            } else {
                                result[formattedDate] = 1;
                            }
                        }
                    }

                });
                const today = new Date()
                const currentMonth = today.getMonth() + 1;
                
                //get data consist of month and count
                const formattedData = Object.keys(result)
                .map((date) => ({
                    date,
                    count: result[date],
                }))

                //arrange date
                .sort((b, a) => {
                    const dateA = moment(a.date, "MMM YYYY");
                    const dateB = moment(b.date, "MMM YYYY");
                    return dateB.diff(dateA);
                })
                //limit array to past 6 months
                const sixMonths = formattedData.slice(0, 6);
                const secndSixMonths = formattedData.slice(6, 12);
        
                setData1(sixMonths);
                setData2(secndSixMonths)
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="pt-[100px]">
            <div className="bg-white m-5 rounded-xl p-5">
                <div className="text-[40px] text-center">
                    <strong>Monthly Pay of Dues</strong>
                    <h2>January to June</h2>
                </div>
                <div className="flex flex-wrap justify-center">
                    <BarChartContainer data={data1stHalf} />
                </div>
                <div className="text-[40px] text-center">
                    <h2 className='mt-5 pt-5'>July to December</h2>
                </div>
                <div className="flex flex-wrap justify-center">
                    <BarChartContainer data={data2stHalf} />
                </div>
            </div>
        </div>
    );
};

export default ChartContainer;
