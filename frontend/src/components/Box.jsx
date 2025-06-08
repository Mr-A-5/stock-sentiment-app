import React, { useState } from 'react'

export default function NoteBox() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`flex flex-col w-72 cursor-pointer transition-all duration-300 
                 overflow-hidden bg-white border-2 rounded-4xl shadow-2xl 
                 ${isOpen ? 'h-96 p-5' : 'h-16 p-3'}`}
    >
      <h1 className='text-xl font-bold'>Title</h1>
      {isOpen && <div className='mt-4'>Note content here.</div>}
    </div>
  )
}
