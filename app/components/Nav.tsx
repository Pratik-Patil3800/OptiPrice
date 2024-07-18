'use client'
import { useState } from 'react';
const Nav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((pre)=>!pre);
  };
  return (
    <div className="bg-customYellow w-screen p-2">
      <div className="max-w-screen-lg-lg mx-auto flex-wrap flex items-center justify-between px-4">
          <a className="flex title-font font-medium items-center text-black mb-4 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-black p-2 bg-customPink rounded-full" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span className="ml-3 text-xl">PriceHunt</span>
            </a>
          <div className="flex">
              <select 
              id="dropdown-button" 
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:outline-none focus:ring-gray-100 focus:border-customPinkdark dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" 
              onChange={toggleDropdown}>All categories <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
              <option value="Allcategories"className='hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' >
                All categories  
              </option>
              <option value="Mockups" className=' hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Mockups</option>
              <option value="Templates" className=' hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Templates</option>
              <option value="Design" className=' hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Design</option>
              <option value="Logos" className=' hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Logos</option>
              </select>
              <div className="relative w-full">
                  <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                  <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-customPink rounded-e-lg border border-customPinkdark hover:bg-customPinkdark focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-custom dark:border-customPink  dark:focus:ring-customPinkdark">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                      <span className="sr-only">Search</span>
                  </button>
              </div>
          </div>
          <button className='inline-flex text-white bg-customPink border-0 py-2 px-6 focus:outline-none hover:bg-customPinkdark rounded text-lg'>Login</button>
      </div>
    </div>
  )}
export default Nav;