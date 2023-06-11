import React, { useState, useEffect } from 'react';
import { app } from '../auth.js';
import { motion } from 'framer-motion';
import UserContainer from './UserContainer.jsx';

const UsersList = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Firebase app (assuming you've already done this)
    const db = app.firestore();

    // Fetch all users from Firestore
    db.collection('users')
      .where('isAdmin', '==', false)
      .get()
      .then(querySnapshot => {
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          userFullname: doc.data().userFullname,
          address: doc.data().address,
          phoneNumber: doc.data().phoneNumber
        }));
        setUsers(usersData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

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

  return (
    <div className="container px-4 pb-8 pt-[100px] mx-auto">
      <h2 className="mb-4 text-lg text-center !text-[40px] font-medium text-black pb-3"><strong>Users List</strong></h2>
      <div className='!flex !flex-wrap !justify-center'>
        {users.map(user => (
          <UserContainer
            key={user.id}
            uid={user.id}
            name={user.userFullname}
            address={user.address}
            phoneNumber={user.phoneNumber}
            handleClick={onUserSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
