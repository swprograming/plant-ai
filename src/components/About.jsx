import React from 'react';
import bg from '../assets/bg.jpg';

const About = () => {
  return (
    <div  
      className='flex flex-col items-center justify-center min-h-screen'  
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className='flex justify-center items-center min-h-screen'>
        <div className='max-w-[800px] w-full bg-white bg-opacity-70 shadow-lg rounded-lg p-6 border border-transparent hover:border-[#00df9a] transition duration-300'>
          <h1 className='text-3xl font-bold text-center text-[#00df9a] mb-4'>About Us</h1>
          <p className='text-gray-700 mb-4'>
            At Plant AI, we are dedicated to revolutionizing the way we approach agriculture. By leveraging the power of artificial intelligence, we provide farmers and gardening enthusiasts with tailored insights and recommendations for optimal crop growth. Our platform combines local climate data, soil conditions, and advanced analytics to empower users to make informed decisions.
          </p>
          <p className='text-gray-700 mb-4'>
            Our mission is to promote sustainable farming practices that benefit both the environment and the agricultural community. We believe that with the right knowledge and tools, anyone can cultivate a thriving garden or farm.
          </p>
          <p className='text-gray-700'>
            Join us on our journey to enhance agriculture through technology and innovation. Together, we can grow a greener future!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;