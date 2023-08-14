'use client'
import { useAuth } from '@/contexts/auth-provider';
import { logo } from '../../assets';
import Image from 'next/image'
import UserMenu from './components/user-menu';
import PublicMenu from './components/public-menu';

const Navigation = () => {
    const { user } = useAuth();

    return (
        <nav className="bg-white flex justify-between items-center flex-wrap sm:flex-nowrap w-full p-3 fixed">
            <a href="/">
                <Image src={logo} alt="sumz logo" className="w-28 object-contain" />
            </a>
            {user ? <UserMenu /> : <PublicMenu />}
        </nav>
    )
}

export default Navigation