import { useState } from 'react';
import { logo } from '../assets';
import { Separator } from './common/separator';

const Navigation = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false)

    return (
        <nav className="flex justify-between items-center flex-wrap sm:flex-nowrap w-full pt-3 fixed">
            <a href="/">
                <img src={logo} alt="sumz logo" className="w-28 object-contain" />
            </a>
            <button className={`block sm:hidden z-20 ${isMenuOpened ? 'opened' : ''}`.trim()} onClick={() => setIsMenuOpened(!isMenuOpened)}>
                <span className="sr-only">Open main menu</span>
                <svg width="32" viewBox="0 0 100 100">
                    <path className="line line1" fill='none' d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                    <path className="line line2" fill='none' d="M 20,50 H 80" />
                    <path className="line line3" fill='none' d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                </svg>
            </button>
            {/* TODO - Fix link to repo */}
            <div className={`${isMenuOpened ? "translate-y-0" : "-translate-y-full"} z-10 px-4 border-b rounded-b-[50%] top-0 transition-transform fixed w-full block flex-grow bg-white py-[48px] sm:translate-y-0 sm:border-0 sm:rounded-none sm:bg-transparent sm:py-0 sm:static sm:flex-grow-0 sm:w-auto sm:flex sm:justify-center sm:space-x-4`}>
                <a href='/pricing' className='menu_link'>Pricing</a>
                <Separator className='my-4 sm:hidden' orientation="horizontal" />
                <a href='/login' className='menu_link'>Login</a>
                <Separator className='my-4 sm:hidden' orientation="horizontal" />
                <a href='/register' className='menu_link sm:black_btn'>Sign Up</a>
            </div>
        </nav>
    )
}

export default Navigation