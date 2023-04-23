import { MouseEventHandler, useState } from "react";

export default function Filters() {
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
    <>

        <button onClick={toggleFilters}
        >Filters</button>

            <select
            className={display + ' bg-transparent'}
            value={selectedOption}
            onChange={(event) => handleOptionChange(event)}>
              <option value="option1">Subreddit</option>
              <option value="option2">Post</option>
              <option value="option3">User</option>
            </select>
    </>
  
  );
}
