import React, { useState } from 'react'
import LinkWrapper from './LinkWrapper'
import Filters from './Filters';

export default function SearchBar() {
  const [inputText, setInputText] = useState('');
  const [selectedOption, setSelectedOption] = useState("option1");
  const [display, setDisplay] = useState('hidden')

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target?.value);
  };

  const toggleFilters = () => {
    if(display === 'hidden') {
        return setDisplay('block')
    }
    return setDisplay('hidden')
  }

  return (
    <div className='flex gap-x-4'>
    <input
        className=' text-gray-600 rounded-md w-44 h-8'
        value={inputText}
        placeholder='Search Reddit'
        onChange={(e) => setInputText(e.target.value)}
      />
      <LinkWrapper
      disabled={inputText === '' ? true : false}
      href={'/search/' + selectedOption + inputText}>Go!
      </LinkWrapper>
      <button onClick={toggleFilters}
        >Filters</button>

            <select
            className={display + ' bg-transparent'}
            value={selectedOption}
            onChange={(event) => handleOptionChange(event)}>
              <option value="r/">Subreddit</option>
              <option value="p/">Post</option>
              <option value="u/">User</option>
            </select>
  </div>
  )
}
