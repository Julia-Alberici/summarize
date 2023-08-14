import { supabase } from '@/api/supabase-client'
import { Button } from '@/components/common/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/common/dropdown-menu'
import { PersonIcon } from '@radix-ui/react-icons'
import React from 'react'

const UserMenu = () => {
    const logOut = () => {
        supabase.auth.signOut();
    }

    return (
        <div className='px-[5vw]'>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button size='icon' variant='outline'>
                        <PersonIcon className='w-8 h-8' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logOut} className="text-red-600">Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserMenu