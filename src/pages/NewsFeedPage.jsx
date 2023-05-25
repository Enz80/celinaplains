import React from 'react';
import { lazy, Suspense } from 'react';
import Loader from '../components/Loader';
const Navbar = lazy(() => import('../components/Navbar'));
import { useState, useEffect } from 'react';
import axios from 'axios';
import bg from "../assets/bg-1.jpg"

const NewsFeedPage = () => {
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
    <Suspense fallback={<Loader />}>
      <img src={bg} alt="Background Image" className="absolute w-screen h-full bg-cover -z-20"/>
      <Navbar />
      <div className="flex flex-col h-screen pt-[100px] px-10">
        <span className="text-2xl font-semibold text-white font-poppins">Celina Plains Imus</span>
        <div className="overflow-x-auto w-full p-4 bg-white rounded-xl">
          <h1 className="mb-4 text-2xl font-bold">News Feed</h1>
          <div className="flex gap-4">
            {newsFeed.map((item) => (
              <div key={item.id} className="flex flex-col bg-white rounded-lg shadow-lg w-80">
                {item.data && (
                  <img
                    src={item.data}
                    alt="News Feed"
                    className="w-full h-[450px] object-cover rounded-t-lg"
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
    </Suspense>
  );
};

export default NewsFeedPage;
