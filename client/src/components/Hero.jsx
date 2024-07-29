import React from 'react'
import desert from '../assets/desert.mp4'
import { AiOutlineSearch } from 'react-icons/ai'

const Hero = () => {
  return (
    <div className='w-full h-screen relative' >
      <video className='w-full h-full object-cover' src={desert} autoPlay loop muted />
      <div className='absolute w-full h-full top-0 left-0 bg-gray-900/30'>
      <div className='absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4 '>
        <h1>Content to be added</h1>
        <form className='flex justify-between items-center max-w-[500px] max-h-[40px] mx-auto w-full border p-1 rounded-md text-black bg-gray-100/85'>
          <div>
            <input className='bg-transparent w-[200px] sm:w-[300px] font-[Poppins] focus:outline-none' type="text" placeholder='Search destinations'/>
          </div>
          <div>
            <button><AiOutlineSearch size={12} className='icon' style={{color:'#ffffff'}}/></button>
          </div>
        </form>
      </div>
      </div>
    </div>

  )
}

export default Hero
