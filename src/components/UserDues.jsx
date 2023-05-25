import React, { useEffect, useState } from 'react';
import { auth, app } from '../auth.js';
import { motion } from 'framer-motion';

const UserDues = () => {
  const [monthlyDues, setMonthlyDues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [reloadFlag, setReloadFlag] = useState(false);

  useEffect(() => {
    const fetchMonthlyDues = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid;

          // Initialize Firestore
          const db = app.firestore();

          // Retrieve the monthly dues data from Firestore
          const doc = await db.collection('users').doc(userId).get();
          const data = doc.data();

          // Set the monthly dues data in the state
          setMonthlyDues(data.duesByDate || {});
        }
      } catch (error) {
        console.error('Error retrieving monthly dues:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMonthlyDues();
  }, [reloadFlag]);

  const handleReload = () => {
    setReloadFlag(prevFlag => !prevFlag);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"
          style={{ borderTopColor: '#4F46E5' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  const getMonthName = (monthNumber, amount) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    const monthName = date.toLocaleString('default', { month: 'long' });
    return amount ? monthName : 'Unpaid';
  };

  const sortedMonths = Object.entries(monthlyDues).sort(
    ([monthA], [monthB]) => parseInt(monthA) - parseInt(monthB)
  );

  return (
    <div className="flex flex-col justify-center p-2 m-8 font-medium border-2 border-blue-600 bg-glass text-slate-800 rounded-2xl">
      <h2 className="mb-4 text-2xl font-bold">Monthly Dues</h2>
      <button onClick={handleReload} className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-md shadow-md">
        Load Monthly Dues
      </button>
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 font-medium text-gray-600 border border-gray-500">Month</th>
            <th className="px-4 py-2 font-medium text-gray-600 border border-gray-500">Amount</th>
          </tr>
        </thead>
        <tbody>
          {sortedMonths.map(([month, amount]) => (
            <tr key={month}>
              <td className="px-4 py-2 text-gray-600 border border-gray-500">
                {getMonthName(parseInt(month), amount)}
              </td>
              <td className="px-4 py-2 text-gray-600 border border-gray-500">{amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>
);
};

export default UserDues;
