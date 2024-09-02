import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';

const NavBar = () => {
  const { i18n } = useTranslation();
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="flex justify-between items-center h-22 max-w-[1240px] mx-auto px-2 ">
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">{i18n.t('logo')}</h1>
      <ul className="hidden md:flex">
        <li className="p-4 hover:text-[#00df9a] transition duration-300"><a href="/">{i18n.t('home')}</a></li>
        <li className="p-4 hover:text-[#00df9a] transition duration-300"><a href="/basic">{i18n.t('basic')}</a></li>
        <li className="p-4 hover:text-[#00df9a] transition duration-300"><a href="/advanced">{i18n.t('advanced')}</a></li>
        <li className="p-4 hover:text-[#00df9a] transition duration-300"><a href="/about">{i18n.t('about')}</a></li>
        <li className="p-4 hover:text-[#00df9a] transition duration-300"><button onClick={() => changeLanguage('en')}>ENG</button></li>
        <li className="p-4 hover:text-[#00df9a] transition duration-300"><button onClick={() => changeLanguage('am')}>AMH</button></li>
      </ul>
      <div onClick={handleNav} className="block md:hidden"> 
        {!nav ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} />}
      </div>
      <div className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500' : 'fixed left-[-100%] hidden md:hidden'}>
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">Plant Ai</h1>
        <ul className="uppercase p-4">
          <li className="p-4 border-b border-gray-600"><a href="/">{i18n.t('home')}</a></li>
          <li className="p-4 border-b border-gray-600"><a href="/basic">{i18n.t('basic')}</a></li>
          <li className="p-4 border-b border-gray-600"><a href="/advanced">{i18n.t('advanced')}</a></li>
          <li className="p-4 border-b border-gray-600"><a href="/about">{i18n.t('about')}</a></li>
          <li className="p-4 border-b border-gray-600"><button onClick={() => changeLanguage('en')}>ENG</button></li>
          <li className="p-4"><button onClick={() => changeLanguage('am')}>AMH</button></li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;