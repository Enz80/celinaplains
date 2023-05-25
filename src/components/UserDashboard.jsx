import React from 'react'
import UserDues from './UserDues'
import bg from '../assets/bg-1.jpg'
import { useState, useEffect } from 'react'
import axios from 'axios'

const UserDashboard = () => {
  const [newsFeed, setNewsFeed] = useState([]);

  useEffect(() => {
    fetchNewsFeed();
  }, []);

  const fetchNewsFeed = async () => {
    try {
      const response = await axios.get('https://celinaplains-api.onrender.com/news-feed');
      setNewsFeed(response.data);
    } catch (error) {
      console.error('Error fetching news feed:', error);
    }
  };

  return (
    <div className="justify-center pt-20">
      <img src={bg} alt="Background Image" className="absolute w-screen h-full bg-cover -z-20"/>
      <div className="flex flex-col h-screen pt-[100px] px-10">
        <span className="text-2xl font-semibold text-white font-poppins">Celina Plains Imus</span>
        <div className="w-full p-4 overflow-x-auto bg-glass rounded-xl">
          <h1 className="mb-4 text-2xl font-bold">News Feed</h1>
          <div className="flex flex-col gap-4 sm:flex-row">
            {newsFeed.map((item) => (
              <div key={item.id} className="flex flex-col w-full bg-transparent rounded-lg shadow-lg sm:w-80">
                {item.data && (
                  <img
                    src={item.data}
                    alt="News Feed"
                    className="object-cover w-full h-auto rounded-t-lg"
                  />
                )}
                <div className="p-4">
                  <h2 className="mb-2 text-lg font-bold">{item.postTitle}</h2>
                  <p className="mb-2 font-medium text-slate-800">{item.postCaption}</p>
                  {item.createdAt && (
                    <p className="text-gray-500 text-md">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
        <UserDues />
    </div>
  )
}

export default UserDashboard