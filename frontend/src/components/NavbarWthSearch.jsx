import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavbarWthSearch() {
  const [company, setCompany] = useState('');
  const navigate = useNavigate();

  function handleKeyPress(e) {
    if (e.key === 'Enter' && company.trim() !== '') {
      navigate(`/${company}`);
    }
  }


  return (
    <div className=" bg-blue-600 flex items-center justify-between p-4 w-full ">
      <div className='bg-white w-fit p-3 border-4 rounded-4xl'>
        <div className= "text-black text-4xl font-extrabold rounded-b-4xl p-3" >
            Stock Sentiment
        </div>
      </div>
        <div >
          <input className='bg-blue-200 rounded-4xl p-3 border-3'
                  placeholder='Type here'
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  onKeyDown={handleKeyPress}
          >
          </input>
        </div>
    </div>
  )
}
