import React from 'react';
import { useTranslation } from 'react-i18next';

const Cards = () => {
  const { t } = useTranslation();
  return (
    <div className='w-full py-[10rem] px-4 bg-gray-100'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8'>
        <div className='w-full rounded-2xl bg-white shadow-lg flex flex-col p-6 my-4 hover:shadow-xl transition-shadow duration-300'>
          <h1 className='bg-black rounded-xl text-[#00df9a] text-2xl font-bold text-center py-4'>{t('basic')}</h1>
          <p className='text-center text-xl p-2'>
            {t('c1p1')}
          </p>
          <div className='text-center font-medium'>
            <p className='py-2 border-b mx-4 mt-4'>{t('c1p2')}</p>
            <p className='py-2 border-b mx-4'>{t('c1p3')}</p>
          </div>
          <div className='flex justify-center mt-auto'>
            <a href="/Basic">
              <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 py-3 text-black transition-transform transform hover:scale-105'>
                {t('basic')}
              </button>
            </a>
          </div>
        </div>

        <div className='w-full rounded-2xl bg-white shadow-lg flex flex-col p-6 my-4 hover:shadow-xl transition-shadow duration-300'>
          <h1 className='bg-black rounded-xl text-[#00df9a] text-2xl font-bold text-center py-4'>{t('advanced')}</h1>
          <p className='text-center text-xl p-2'>
           {t('c2p1')}
          </p>
          <div className='text-center font-medium'>
            <p className='py-2 border-b mx-4 mt-4'>{t('c2p2')}</p>
            <p className='py-2 border-b mx-4'>{t('c2p3')}</p>
          </div>
          <div className='flex justify-center mt-auto'>
            <a href='/Advanced'>
              <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 py-3 text-black transition-transform transform hover:scale-105'>
                {t('advanced')}
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;