import React from 'react'
import { BiCategory } from 'react-icons/bi';
import {FaFacebookF} from 'react-icons/fa';
import {FaTwitter} from 'react-icons/fa';
import {FaLinkedin} from 'react-icons/fa';
import LaternaLogo from '../assets/laterna.png';


const footerLinks = {
'SHOPPING GUIDE': [
    { name: 'FAQs', href: '#' },
    { name: 'How To Buy', href: '#' },
    { name: 'Terms and Conditions', href: '#' },
    { name: 'Shipping method', href: '#' },
    { name: 'My Account', href: '#' },
    { name: 'Shop', href: '#' },
    { name: 'Cart', href: '#' },
    { name: 'Checkout', href: '#' },
],
'RECENT POSTS': [
    { name: 'lorem30', href: '#' },
    { name: 'Small businesses', href: '#' },
    { name: 'Micro businesses', href: '#' },
    { name: 'Fintechs', href: '#' },
],
'CATEGORIES': [
    { name: 'Business', href: '#' },
    { name: 'Computer', href: '#' },
    { name: 'Cooking & Food', href: '#' },
    { name: 'Crime Books', href: '#' },
    { name: 'Love & Romance', href: '#' },
    { name: 'Uncategorized', href: '#' },
],
'RECENT COMMENTS': [
    { name: 'FAQs', href: '#' },
    { name: 'Support Center', href: '#' },
    { name: 'How To Videos', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Whistleblower', href: '#' },
    { name: 'Squad Assets', href: '#' },
],

}
const Footer = () => {
  return (
    <footer style={{backgroundColor: '#4F4F4F'}}>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12'>
                {/* brand column */}
                <div className='lg:col-span-4 '>
                    <div>
                        <img src={LaternaLogo} alt="logo"className='rounded-lg relative z-10 hover:scale-[1.02]
                        transition-transfom duration-300' />
                    </div>
                    {/* <p className='md:w-3/4'></p> */}
                    {/* <p className='mb-6 md:w-3/4'>HabariPay is licensed by the Central Bank of Nigeria.</p> */}
                    <div className='flex gap-4 mt-6'>
                        <a href="#" className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-600
                        hover:text-white transition-all duration-200'><FaFacebookF className='size-5'/></a>

                        <a href="#" className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-600
                        hover:text-white transition-all duration-200'><FaTwitter className='size-5'/></a>

                        <a href="#" className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-600
                        hover:text-white transition-all duration-200'><FaLinkedin className='size-5'/></a>
                    </div>
                </div>

                {/* footer nav items */}
                <div className='lg:col-span-8'>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-8'style={{ color: '#F05A22' }}>
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                            <h3 className='text-lg font-medium mb-4'>{category}</h3>
                            <ul className='space-y-3'>
                                {links.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className='text-white hover:text-gray-900'>{link.name}</a>
                                </li>
                                ))}
                            </ul>
                            </div>
                        ))}
                    </div>
                </div>

            </div>


            {/* footer bottom */}
            <div className='border-t border-gray-200 mt-12 pt-8'>
                <div className='grid grid-col md:flex-row justify-center items-center gap-4'>
                    {/* <p className='text-gray-600 text-lg md:w-3/4'>Squad is a complete payment solution made for businesses in Africa. It is a reliable, secure, and affordable payment platform that makes receiving in-person and online payments simpler.</p> */}
                    <p className='text-center text-white text-sm'>Copyright &copy; {new Date().getFullYear()} Laternabooks. All Rights Reserved</p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer