import React from 'react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className=' h-screen bg-gray-500 flex justify-center items-center'>
        <SearchBar/>
      </div>
    </div>
  )
}
