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
    <Navbar className="fixed top-0 z-50 w-full bg-white drop-shadow-2xl" expand="lg">
      <Container>
        <Navbar.Brand href="/">Celina Plains</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
          {user? null :
            <Nav.Link href="/contact-us">Contact us</Nav.Link>
          }
            <Nav.Link href="/appointment-user">Appointment</Nav.Link>
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
