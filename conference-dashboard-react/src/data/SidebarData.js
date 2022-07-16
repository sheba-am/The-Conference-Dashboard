import React from 'react';
//import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { IoPeopleSharp } from "react-icons/io5";
export const SidebarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'standard-user-home'
  },
  {
    title: 'Edit Info',
    path: '/dashboard/editinfo',
    icon: <AiIcons.AiFillEdit />,
    cName: 'standard-user-editinfo'
  },
  {
    title: 'Papers',
    path: '/dashboard/papers',
    icon: <IoIcons.IoIosPaper />,
    cName: 'standard-user-papers'
  },
  {
    title: 'Home',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'admin-home'
  },
  {
    title: 'Edit Info',
    path: '/dashboard/editinfo',
    icon: <AiIcons.AiFillEdit />,
    cName: 'admin-editinfo'
  },
  {
    title: 'Papers',
    path: '/dashboard/papers',
    icon: <IoIcons.IoIosPaper />,
    cName: 'admin-papers'
  },
  {
    title: 'Manage Users',
    path: '/dashboard/allusers',
    icon: <IoPeopleSharp/>,
    cName: 'admin-manage-standard-user'
  },
  // {
  //   title: 'Manage Judges',
  //   path: '/dashboard/manage-judges',
  //   icon: <IoPeopleSharp />,
  //   cName: 'admin-manage-judges'
  // },  
  
];