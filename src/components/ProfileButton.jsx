import React, { useEffect, useState } from 'react'
import { FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { auth } from '../auth.js'
import Nav from 'react-bootstrap/Nav';

const ProfileButton = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);

        });
        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <Nav.Link className="relative">
            <div
                className='flex items-center relative lg:justify-center'
            >
                <FaUserCircle />
                <div className='pl-2'>
                    {user?.email}
                </div>
            </div>
        </Nav.Link>
    )
}

export default ProfileButton