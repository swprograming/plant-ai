import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    FaInstagram,
    FaFacebookSquare,
} from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className='bg-[#1a1a1a] text-white py-10 px-4'>
      <div className='max-w-[1200px] mx-auto grid lg:grid-cols-1 gap-8 text-center'>
        <h1 className="text-4xl font-bold text-[#00df9a] mb-4">Plant AI</h1>
        <p className='py-4'>
          {t('fp1')}
        </p>
        <p className='py-2'>
          {t('fp2')}
        </p>
        <div className='flex justify-center my-6 space-x-4'>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className='transition-transform transform hover:scale-110'>
            <FaFacebookSquare size={30} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className='transition-transform transform hover:scale-110'>
            <FaInstagram size={30} />
          </a>
        </div>
        <p className='text-sm mt-4'>
          &copy; {new Date().getFullYear()} Plant AI. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;