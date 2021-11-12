import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SideBarData = [
    {
        title: 'About',
        path: '/about',
        icon: <AiIcons.AiFillInfoCircle/>,
        cName: 'nav-text'
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <IoIcons.IoMdSettings/>,
        cName: 'nav-text'
    },
    {
        title: 'Sign Up',
        path: '/sign-up',
        icon: <IoIcons.IoMdPersonAdd />,
        cName: 'nav-text'
    },
    {
        title: 'Sign In',
        path: '/sign-in',
        cName: 'sign-in-btn'
    }
]
