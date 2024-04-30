import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { styles } from '../styles'
import { navLinks } from '../constants'
import {logo, logoport, menu, close, flag_en, flag_es} from '../assets'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

const Navbar = () => {
  const [active, setActive] = useState('')
  const [toggle, setToggle] = useState(false)

  const [t, i18n] = useTranslation("global");

  const [searchParams, setSearchParams] = useSearchParams();

  if(searchParams.has("lang")) {
    if(searchParams.get("lang") === "es") {
      i18n.changeLanguage("es");
    }
    if(searchParams.get("lang") === "en") {
      i18n.changeLanguage("en");
    }
    
  }


  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
      <div className='w-full flex justify-between items-center max-w-7xl-mx-auto'>
        <Link to='/'
        className='flex items-center gap-2'
        onClick={() => {
          setActive("");
          window.scrollTo(0,0);
        }}>
          <img src={logoport} alt='logo' className='w-9 h-9 object-contain'/>
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            Sergio Medina&nbsp;
             <span className='md:block hidden'>| Portfolio</span></p>
        </Link>
        <ul className='list-none hidden sm:flex flex-row gap-6 xl:gap-10'>
          
          
          
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title
                ? "text-white": "text-secondary"
              }  hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
              >
              <a href={`#${link.id}`}>{i18n.language === 'en' ? link.title : link.title_es}</a>
            </li>
          ))}
          {i18n.language === 'en' ?
          <button  onClick={() => handleChangeLanguage("es")}>
            <img className=' hover:scale-105' width={20}  src={flag_es}/>
          </button>
          :
          <button onClick={() => handleChangeLanguage("en")}>
            <img width={20} className=' hover:scale-105'   src={flag_en}/>
          </button>
          }
        </ul>
        <div className='sm:hidden flex flex-1 justify-end items-center'>
            <img
              src={toggle ? close : menu}
              alt='menu'
              className='w-[28px] h-[28px] object-contain cursor-pointer'
              onClick={() => setToggle(!toggle)}
            />
            <div className={`${!toggle ? 'hidden': 'flex' } p-6 bg-black-100 shadow-md bg-opacity-90 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>

            <ul className='list-none flex  justify-end items-start flex-col gap-4'>
          
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title
                ? "text-white": "text-secondary"
              }  font-poppings font-medium cursor-pointer text-[16px]`}
              onClick={() => {
                setToggle(!toggle);
                setActive(link.title);
              }}
              >
              <a href={`#${link.id}`}>{i18n.language === 'en' ? link.title : link.title_es}</a>
            </li>
          ))}
          {i18n.language === 'en' ?
          <button  onClick={() => handleChangeLanguage("es")}>
            <img className=' hover:scale-105' width={20}  src={flag_es}/>
          </button>
          :
          <button onClick={() => handleChangeLanguage("en")}>
            <img width={20} className=' hover:scale-105'   src={flag_en}/>
          </button>
          }
        </ul>
            </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar