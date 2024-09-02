import React from 'react';
import Laptop from '../assets/laptop.jpg';
import { useTranslation } from 'react-i18next';

const Analytics = () => {
  const { t } = useTranslation();
  return (
    <div className='w-full bg-gray-100 py-10 px-4 border-b-[5px] border-black'>
      <div className='max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8'>
        <img className='w-[500px] mx-auto my-4 rounded-lg shadow-lg' src={Laptop} alt="Laptop showing analytics" />
        <div className='flex flex-col justify-center'>
          <p className='text-black text-xl uppercase'>{t('About Us')}</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>{t('What Sets Us Apart')}</h1>
          <p className='text-gray-700'>
            At Plant AI, we utilize advanced analytics to provide personalized recommendations for crop planting and management. Our innovative platform combines local climate data with AI-driven insights to help you make informed decisions for optimal growth.
          </p>
          <p className='py-2 text-gray-700'>
            We are committed to supporting sustainable agriculture practices and empowering farmers with the knowledge they need to succeed.
          </p>
          <a href="/About">
            <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 transition-transform transform hover:scale-105'>
              More About Us
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Analytics;