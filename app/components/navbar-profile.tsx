import React, { useState } from 'react'
import Pill from './Pill'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Hr from './Hr'
import List from './ListItem'
import ListItem from './ListItem'

export default function NavbarProfile() {
  const { data: session } = useSession()
  const [displaySettings, setDisplaySettings] = useState('hidden')
//   id
// : 
// "112gne"
// image
// : 
// null
// name
// : 
// "Leprekus"
const handleDisplaySettings = () => {
    if(displaySettings === 'hidden') {
        return setDisplaySettings('block')
    }
    return setDisplaySettings('hidden')
}
  return (
    <div className='flex items-center justify-end pr-16 pt-4 gap-x-4 hover:cursor-pointer'>
        {
            session && 
            <div 
            onClick={handleDisplaySettings}
            className='flex gap-x-4 items-center relative'>
                <div className='h-12 w-12 bg-red-500 rounded-full'/>
               {session.user?.image && <Image src={session.user.image} alt='profile-icon' width={48} height={48}/>}
               <span>u/{session.user.name}</span>

                <ul className ={`
                left-4
                h-fit w-48 bg-[#282828] absolute top-16 flex flex-col justify-between items-center rounded-md ${displaySettings} transition-all ovefflow-hidden`}>
                    <ListItem>Settings</ListItem>
                    
                    <ListItem>Friends</ListItem>
                    
                    <ListItem>Inbox</ListItem>
                    <Hr/>
                    <li className='p-4'>
                    <Pill
                    onClick={() => signOut}>Sign Out</Pill>
                    </li>
                </ul>
            
              
            </div>
        }
        {!session && 
        <Pill
        variant='primary'
        onClick={() =>signIn()}
        >
            {'Sign In'}
        </Pill>}
    </div>
  )
}
