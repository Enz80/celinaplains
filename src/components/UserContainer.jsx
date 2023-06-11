import React from 'react'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { FaMapMarkerAlt } from 'react-icons/fa'
const UserContainer = ({uid, handleClick, name, address, phoneNumber }) => {
    return (

        <div className='bg-white m-2 p-2 w-2/5 drop-shadow-md w-full' onClick={()=>{
            handleClick(uid)
            }}>
            <button >
                <header className="space-y-2 pb-2">
                    <div className='text-[20px] text-left'>
                        <strong>{name}</strong>
                    </div>
                </header>
                {address ?
                    <div className='flex items-center relative mb-2'>
                        <FaMapMarkerAlt className='mr-3 ' /> {address}
                    </div> : null}
                {phoneNumber ?
                    <div className='flex items-center relative'>
                        <BsFillTelephoneFill className='mr-3' /> {phoneNumber}
                    </div> : null
                }
            </button>
        </div>
    )
}
export default UserContainer