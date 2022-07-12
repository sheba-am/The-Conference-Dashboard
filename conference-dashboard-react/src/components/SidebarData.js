import React from 'react';
//import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Edit Info',
    path: '/dashboard/editinfo',
    icon: <AiIcons.AiFillEdit />,
    cName: 'nav-text'
  },
  {
    title: 'Papers',
    path: '/dashboard/papers',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },

];