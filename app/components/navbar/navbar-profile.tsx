'use client'
import React, { useState } from 'react'
import Pill from '../Pill'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Hr from '../Hr'
import ListItem from '../ListItem'
import Button from '../Button'
import Link from 'next/link'
import SearchBar from './SearchBar'

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
    <div className='flex flex-col justify-center gap-y-4 md:flex-row items-center md:justify-between px-8 pt-4 gap-x-4'>
        <Link href='/'>
            <Image src='/tldr-logo.png' height={100} width={200} alt='logo'/>
        </Link>
  
        <SearchBar/>
            {
                session &&
                <>
                <div
                onClick={handleDisplaySettings}
                className='flex gap-x-4 items-center relative hover:cursor-pointer'>
                    <div className='h-12 w-12 bg-red-500 rounded-full'/>
                   {session.user?.image && <Image src={session.user.image} alt='profile-icon' width={48} height={48}/>}
                   <Button variant='ghost'><span>u/{session.user.name}</span></Button>
                </div>
                    <ul className ={`
                    right-0
                    h-fit w-48 bg-[#282828] absolute top-16 flex flex-col justify-between items-center rounded-md ${displaySettings} transition-all ovefflow-hidden`}>
                        <ListItem>Settings</ListItem>
            
                        <ListItem>Friends</ListItem>
            
                        <ListItem>Inbox</ListItem>
                        <Hr/>
                        <li className='p-4'>
                        <Pill
                        onClick={() => signOut()}>Sign Out</Pill>
                        </li>
                    </ul>
                    </>
            }
            {!session &&
            <Button
            variant='primary'
            className='text-white px-4 py-2 bg-indigo-400 hover:bg-white border border-transparent hover:text-indigo-400 hover:border-indigo-400'
            onClick={() =>signIn()}
            >
                {'Sign In'}
            </Button>}

    </div>
  )
}
