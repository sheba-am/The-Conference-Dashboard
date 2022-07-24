import React from 'react';
//import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { IoPeopleSharp } from "react-icons/io5";
import { FaNewspaper } from "react-icons/fa";
import * as RiIcons from 'react-icons/ri';
export const StandardSidebarData = [
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
];

export const AdminSidebarData = [
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
    cName: 'admin-editinfo',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Users',
        path: '/overview/users',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Revenue',
        path: '/overview/revenue',
        icon: <IoIcons.IoIosPaper />
      }
    ]    
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
];

export const JudgeSidebarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'judge-home'
  },
  {
    title: 'Edit Info',
    path: '/dashboard/editinfo',
    icon: <AiIcons.AiFillEdit />,
    cName: 'judge-editinfo'
  },
  {
    title: 'Papers',
    path: '/dashboard/papers',
    icon: <IoIcons.IoIosPaper />,
    cName: 'judge-papers'
  },  
];
export const DashboadMainPageData = [
  {
    title: 'Published Papers',
    path: '/',
    description:'You can view published papers',
    icon: <FaNewspaper />,
    
    cName: 'standard-user-home-page'
  },
  {
    title: 'Edit Info',
    path: '/dashboard/editinfo',
    description:'You can edit your information',
    icon: <AiIcons.AiFillEdit />,
    cName: 'standard-user-editinfo'
  },
  {
    title: 'Papers',
    path: '/dashboard/papers',
    description:'You can view papers',
    icon: <IoIcons.IoIosPaper />,
    cName: 'standard-user-papers'
  },
  {
    title: 'Published Papers',
    path: '/',
    description:'You can view published papers',
    icon: <FaNewspaper />,
    cName: 'admin-home-page'
  },
  {
    title: 'Edit Info',
    path: '/dashboard/editinfo',
    description:'You can edit your information',
    icon: <AiIcons.AiFillEdit />,
    cName: 'admin-editinfo'
  },
  {
    title: 'Papers',
    path: '/dashboard/papers',
    description:'You can view papers',
    icon: <IoIcons.IoIosPaper />,
    cName: 'admin-papers'
  },
  {
    title: 'Manage Users',
    path: '/dashboard/allusers',
    description:'You can manage users and promote standard users to judges',
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