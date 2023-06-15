import React, { useState, useEffect } from 'react';
import { app } from '../auth.js';
import { motion } from 'framer-motion';
import { FaUserTie } from 'react-icons/fa'

const EditMonthlyDues = ({ userId }) => {
  const [monthlyDues, setMonthlyDues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const db = app.firestore();

    db.collection('users')
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setMonthlyDues(doc.data().duesByDate || {});
          setUser(doc.data())
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching monthly dues:', error);
      });
  }, [userId]);

  const handleInputChange = (month, value) => {
    setMonthlyDues((prevMonthlyDues) => ({
      ...prevMonthlyDues,
      [month]: value,
    }));
  };

  const handleSave = () => {
    setIsSaving(true);

    const db = app.firestore();
    db.collection('users')
      .doc(userId)
      .update({ duesByDate: monthlyDues })
      .then(() => {
        setIsSaving(false);
        console.log('Monthly dues updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating monthly dues:', error);
        setIsSaving(false);
      });
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

  const renderMonths = (start, end) => {
    return Array.from({ length: end - start + 1 }).map((_, index) => {
      const monthNumber = (start + index).toString().padStart(2, '0');
      const month = new Date(2022, start + index - 1).toLocaleString('default', { month: 'long' });
      const value = monthlyDues[monthNumber] || '';

      return (
        <div key={month} className="mb-4">
          <label className="block mb-2 font-medium text-gray-600">{month}</label>
          <input
            type="number"
            value={value}
            inputMode="numeric"
            onChange={(e) => handleInputChange(monthNumber, e.target.value)}
            className="w-1/4 px-4 py-2 text-gray-600 border-2 border-gray-300 rounded-md hover:border-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      );
    });
  };

  return (
    <div className="container pb-8 pt-[50px]">
      <div className='bg-white m-5'>
        <div className='flex items-center'>
          <FaUserTie className='text-9xl mr-5' />
          <div className='flex flex-col'>
            <p className='pb-2'><strong className='text-xl'>Id: </strong>{userId} </p> 
            <p className='pb-2'><strong className='text-xl'>Email: </strong> {user.userFullname} </p> 
            <p className='pb-2'><strong className='text-xl'>Phone Number: </strong>{user.phoneNumber} </p> 
            <p className='pb-2'><strong className='text-xl'>Address: </strong> {user.address}</p> 
          </div>
        </div>
      </div>

      {/* <h2 className="mb-4 text-lg font-medium text-gray-600">Edit Monthly Dues</h2> */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div>{renderMonths(1, 6)}</div>
            <div>{renderMonths(7, 12)}</div>
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMonthlyDues;
