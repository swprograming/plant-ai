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
      <div className='flex justify-center items-center min-h-screen pt-16 pb-8'> {/* Added pb-8 for bottom spacing */}
        <div className='w-full max-w-4xl bg-white bg-opacity-70 shadow-lg rounded-lg p-4 sm:p-6 border border-transparent hover:border-[#00df9a] transition duration-300'>
          <h1 className='text-3xl font-bold text-center text-[#00df9a] mb-4'>{t('abt')}</h1>
          <p className='text-gray-700 mb-4'>
            {t('ap1')}
          </p>
          <p className='text-gray-700 mb-4'>
            {t('ap2')}
          </p>
          <p className='text-gray-700 mb-4'>
            {t('ap3')}
          </p>

          {/* Team Members Section */}
          <h2 className='text-2xl font-bold text-center text-[#00df9a] mt-6'>{t('Our Team')}</h2>
          <ul className='text-gray-700 mt-4 flex flex-col items-center'>
            <li className='mb-2 text-lg font-semibold transition duration-300 hover:text-[#00df9a]'>Solomon Wondwosen</li>
            <li className='mb-2 text-lg font-semibold transition duration-300 hover:text-[#00df9a]'>Selhadin Kedir Hussen</li>
            <li className='mb-2 text-lg font-semibold transition duration-300 hover:text-[#00df9a]'>Wongel Zerihun</li>
            <li className='mb-2 text-lg font-semibold transition duration-300 hover:text-[#00df9a]'>Lidya Zerihun Taye</li>
            <li className='mb-2 text-lg font-semibold transition duration-300 hover:text-[#00df9a]'>Liya Aschalew Fikre</li>
            <li className='mb-2 text-lg font-semibold transition duration-300 hover:text-[#00df9a]'>Bornabek Tesfa</li>
            <li className='mb-2 text-lg font-semibold transition duration-300 hover:text-[#00df9a]'>Beka Fekadu</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;