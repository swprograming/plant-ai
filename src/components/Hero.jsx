import React from 'react';
import { ReactTyped } from 'react-typed';
import bg from '../assets/bg.jpg';
import { useTranslation } from 'react-i18next';

const Hero = ({ onGetStarted }) => {
  const { t } = useTranslation();

  const cropKeys = [
    'apple',
    'banana',
    'blackgram',
    'chickpea',
    'coconut',
    'coffee',
    'cotton',
    'grapes',
    'jute',
    'kidneybeans',
    'lentil',
    'maize',
    'mango',
    'mothbeans',
    'mungbean',
    'muskmelon',
    'orange',
    'papaya',
    'pigeonpeas',
    'pomegranate',
    'rice',
    'watermelon',
  ];

  return (
    <div
      className="text-black h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})`, paddingTop: '80px' }}
    >
      <div className="max-w-[800px] mt-[-96px] w-full h-full mx-auto text-center flex flex-col justify-center items-center">
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">{t('welcome')}</h1>
        <div className="flex justify-center items-center">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold">{t('plant')} </p>
          <ReactTyped
            className="md:text-5xl sm:text-4xl text-xl font-bold pl-2"
            strings={cropKeys.map((key) => t(key))} // Use cropKeys and translate them
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <button
          className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black"
          onClick={onGetStarted}
        >
          {t('getStarted')}
        </button>
      </div>
    </div>
  );
};

export default Hero;