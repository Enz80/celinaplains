import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

/* This is a functional component in JavaScript React that fetches and displays a news feed from a
local server. It uses the `useState` and `useEffect` hooks to manage state and perform side effects
respectively. The `fetchNewsFeed` function is an asynchronous function that uses the `axios` library
to make a GET request to the local server and sets the response data to the `newsFeed` state using
the `setNewsFeed` function. The component then returns a JSX element that displays the news feed
data using the `map` function to iterate over the `newsFeed` array and display each item's
`postTitle`, `postCaption`, and `data` (if it exists) in a styled HTML element. */
const NewsFeed = () => {
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
    <div className="z-40 self-center w-full h-screen p-8 mx-10 overflow-y-auto bg-glass rounded-2xl">
      <span className='text-2xl font-semibold font-poppins'>
        Celina Plains Imus<br/>
      </span>
      <h1 className="mb-4 text-2xl font-bold">News Feed</h1>
      {newsFeed.map((item) => (
        <div key={item.id} className="mb-4">
          {item.data && (
            <img src={item.data} alt="News Feed" className="rounded-xl mt-2 w-[512px]" />
          )}
          <div>
            <h2 className="text-lg font-bold">{item.postTitle}</h2>
            <p className="text-gray-700">{item.postCaption}</p>
          </div>
        </div>
      ))}

    </div>
  )
}

export default NewsFeed