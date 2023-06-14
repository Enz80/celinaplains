import React, { useEffect, useState } from 'react';
import BarChartContainer from './BarChartContainer';
import { app } from '../auth.js';
import moment from 'moment';

const db = app.firestore();

const ChartContainer = () => {
    const [data, setData] = useState([]);

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

                const formattedData = Object.keys(result).map((date) => ({
                    date,
                    count: result[date],
                }));

                formattedData.sort((b, a) => {
                    const dateA = moment(a.date, "MMM YYYY");
                    const dateB = moment(b.date, "MMM YYYY");
                    return dateB.diff(dateA);
                });
                console.log(formattedData);
                setData(formattedData);
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
                </div>
                <div className="flex flex-wrap justify-center">
                    <BarChartContainer data={data} />
                </div>
            </div>
        </div>
    );
};

export default ChartContainer;
