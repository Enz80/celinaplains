import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../auth';

const NewsFeedUploader = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postCaption, setPostCaption] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageBase64(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setUploading(true);

    try {
      const idToken = await auth.currentUser.getIdToken();
      const response = await axios.post('https://celinaplains-api.onrender.com/upload-news-feed', {
        postTitle,
        postCaption,
        imageBase64,
      }, 
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
    });

      console.log('News feed uploaded successfully:', response.data);
      window.location.href = '/';
      // Reset form fields
      setPostTitle('');
      setPostCaption('');
      setImageBase64('');
    } catch (error) {
      console.error('Error uploading news feed:', error);
    }

    setUploading(false);
  };

  return (
    <div className="max-w-sm p-8 mx-auto mt-8 bg-glass rounded-lg drop-shadow-2xl">
      <h1 className="mb-4 text-2xl font-bold">Upload News Feed</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="postTitle" className="block mb-1 font-bold">
            Post Title:
          </label>
          <input
            type="text"
            id="postTitle"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="postCaption" className="block mb-1 font-bold">
            Post Caption:
          </label>
          <textarea
            id="postCaption"
            value={postCaption}
            onChange={(e) => setPostCaption(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block mb-1 font-bold">
            Image:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="w-full px-4 py-2 font-semibold text-white bg-glass rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {imageBase64 && (
        <div className="mt-4">
          <h2 className="mb-2 text-lg font-bold">Preview:</h2>
          <img src={imageBase64} alt="Preview" className="h-auto max-w-full" />
        </div>
      )}
    </div>
  );
};

export default NewsFeedUploader;