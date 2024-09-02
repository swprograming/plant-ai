import React from 'react';

const Cards = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-gray-100'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8'>
        <div className='w-full rounded-2xl bg-white shadow-lg flex flex-col p-6 my-4 hover:shadow-xl transition-shadow duration-300'>
          <h1 className='bg-black rounded-xl text-[#00df9a] text-2xl font-bold text-center py-4'>Basic</h1>
          <p className='text-center text-xl p-2'>
            Discover the best crops to plant based on your specific location and local climate conditions.
          </p>
          <div className='text-center font-medium'>
            <p className='py-2 border-b mx-4 mt-4'>Location-specific crop suggestions</p>
            <p className='py-2 border-b mx-4'>Easy-to-follow</p>
          </div>
          <div className='flex justify-center mt-auto'>
            <a href="/Basic">
              <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 py-3 text-black transition-transform transform hover:scale-105'>
                Go to Basic
              </button>
            </a>
          </div>
        </div>

        <div className='w-full rounded-2xl bg-white shadow-lg flex flex-col p-6 my-4 hover:shadow-xl transition-shadow duration-300'>
          <h1 className='bg-black rounded-xl text-[#00df9a] text-2xl font-bold text-center py-4'>Advanced</h1>
          <p className='text-center text-xl p-2'>
            Get tailored recommendations that empower farmers with actionable insights for better decision-making.
          </p>
          <div className='text-center font-medium'>
            <p className='py-2 border-b mx-4 mt-4'>Input-driven crop strategies</p>
            <p className='py-2 border-b mx-4'>Advanced analytics for yield optimization</p>
          </div>
          <div className='flex justify-center mt-auto'>
            <a href='/Advanced'>
              <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 py-3 text-black transition-transform transform hover:scale-105'>
                Go to Advanced
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;