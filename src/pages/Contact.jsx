import React from 'react'
import { lazy } from 'react'
import { Suspense } from 'react'
import Loader from '../components/Loader';
import NavBar from '../components/Navbar';

const ContactUsForm = lazy(() => import('../components/ContactUsForm'));

const Contact = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className='bg-cover h-screen bg-background1'>
        <NavBar />
        <div className="pt-[100px] flex justify-center pb-20">
          <ContactUsForm />
        </div>
      </div>
    </Suspense>
  )
}

export default Contact