'use client'
import React, { useRef, useState } from 'react'
import LinkWrapper from './LinkWrapper'
import Filters from './Filters';
import { FilterIcon, SearchIcon } from './Icons';

export default function SearchBar() {
  const [inputText, setInputText] = useState('');
  const [selectedOption, setSelectedOption] = useState("p/");
  const [display, setDisplay] = useState('invisible')

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target?.value);
    if(display === 'visible') setDisplay('invisible')
    
  };

  const toggleFilters = () => {
    if(display === 'invisible') {

      return setDisplay('visible')
    }
    return setDisplay('invisible')
  }

  return (
    <div className='flex gap-x-4'>
    <input
        aria-label='search-bar'
        className='text-gray-600 rounded-md w-44 h-8'
        value={inputText}
        placeholder='Search Reddit'
        onChange={(e) => setInputText(e.target.value)}
      />
      <LinkWrapper
      label='search-button'
      disabled={inputText === '' ? true : false}
      href={'/search/' + selectedOption + inputText}>
        <SearchIcon/>
      </LinkWrapper>
      <button onClick={toggleFilters} aria-label='filter'
        ><FilterIcon/></button>

            <select
            className={display + ' bg-transparent'}
            value={selectedOption}
            onChange={(event) => handleOptionChange(event)}>
              <option className='hover:bg-blue-200 active:bg-blue-100' value="r/">Subreddit</option>
              <option className='hover:bg-blue-200 active:bg-blue-100' value="p/">Post</option>
              <option className='hover:bg-blue-200 active:bg-blue-100' value="u/">User</option>
            </select>
  </div>
  )
}
