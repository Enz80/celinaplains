import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { auth } from '../auth'
import { useState, useEffect } from 'react';
import ProfileButton from './ProfileButton';


/**
 * This is a React component for a dashboard navigation bar with conditional rendering based on user
 * authentication status.
 */
const DashboardNav = () => {
  const logout = () => {
    auth.signOut(auth)
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while logging out');
      });
  };
  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });


    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <Navbar className="fixed top-0 z-50 w-full drop-shadow-2xl bg-white" expand="lg">
      <Container>
        <Navbar.Brand href="/" className='text-[#167f7f]'><strong>Celina Plains</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <Nav.Link href="/dashboard-admin">Dashboard</Nav.Link>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
            {user ? (
              <Nav.Link href="/newsfeedupload">Upload Newsfeed</Nav.Link>
            ) : (
              null
            )}
            {user ? (
              <Nav.Link href="/managedues">View Dues</Nav.Link>
            ) : (
              null
            )}
            {user ? (
              <Nav.Link href="/statistics">Statistics</Nav.Link>
            ) : (
              null
            )}
            {user ? (
              <Nav.Link href="/editdues">Edit Dues</Nav.Link>
            ) : (
              null
            )}
            {user ? (
              <Nav.Link href="/calendar">Calendar</Nav.Link>
            ) : (
              null
            )}
            <Nav.Link href="/appointment">Appointment</Nav.Link>
            <Nav.Link href="/register-user">Register</Nav.Link>
          </Nav>
          <Nav>
            <ProfileButton />
            {user ? (
              <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
            ) : (
              <Nav.Link href="/register">Register</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default DashboardNav
