import React from 'react'
import Hero from '../components/home/Hero'
import RecentlyAdded from '../components/home/RecentlyAdded'

function Home() {
  return (
    <div className='bg-zinc-900 text-white px-10 py-8'>
      <Hero />
      <RecentlyAdded />
    </div>
  )
}

export default Home