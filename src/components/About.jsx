import React from 'react';
import bg from '../assets/bg.jpg';
import { useTranslation } from 'react-i18next';
const About = () => {

  const { t } = useTranslation();
  return (
    <div  
      className='flex flex-col items-center justify-center min-h-screen'  
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className='flex justify-center items-center min-h-screen'>
        <div className='max-w-[800px] w-full bg-white bg-opacity-70 shadow-lg rounded-lg p-6 border border-transparent hover:border-[#00df9a] transition duration-300'>
          <h1 className='text-3xl font-bold text-center text-[#00df9a] mb-4'>{t('abt')}</h1>
          <p className='text-gray-700 mb-4'>
            {t('ap1')}
          </p>
          <p className='text-gray-700 mb-4'>
            {t('ap2')}
          </p>
          <p className='text-gray-700'>
            {t('ap3')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;