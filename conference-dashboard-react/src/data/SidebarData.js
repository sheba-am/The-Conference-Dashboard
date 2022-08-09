import React from 'react';
//import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { IoPeopleSharp } from "react-icons/io5";
import { FaNewspaper } from "react-icons/fa";
import * as RiIcons from 'react-icons/ri';
import { MdArticle } from "react-icons/md";
export const StandardSidebarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Edit Info',
    path: '/dashboard/editinfo',
    icon: <AiIcons.AiFillEdit />,
  },
  {
    title: 'My Papers',
    path: '/dashboard/my-papers',
    icon: <MdArticle />,
  }, 
];

export const DabirConferenceSidebarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Edit Info',
    path: '/dashboard/editinfo',
    icon: <AiIcons.AiFillEdit />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
   
  },
  {
    title: 'My Papers',
    path: '/dashboard/my-papers',
    icon: <MdArticle />,
  },  
  {
    title: 'Manage Papers',
    path: '/dashboard/papers',
    icon: <IoIcons.IoIosPaper />,
  },
  {
    title: 'Manage Users',
    path: '/dashboard/allusers',
    icon: <IoPeopleSharp/>,
  },
];

export const DabirKhaneSidebarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Edit Info',
    path: '/dashboard/editinfo',
    icon: <AiIcons.AiFillEdit />,
    cName: 'judge-editinfo'
  },
  {
    title: 'My Papers',
    path: '/dashboard/my-papers',
    icon: <MdArticle/>,
  }, 
  {
    title: 'Manage Papers',
    path: '/dashboard/papers',
    icon: <IoIcons.IoIosPaper />,
  },
];

export const DabirBakhshSidebarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Edit Info',
    path: '/dashboard/editinfo',
    icon: <AiIcons.AiFillEdit />,
    cName: 'judge-editinfo'
  },
  {
    title: 'My Papers',
    path: '/dashboard/my-papers',
    icon: <MdArticle />,
  }, 
  {
    title: 'Manage Papers',
    path: '/dashboard/papers',
    icon: <IoIcons.IoIosPaper />,
  },
];

export const JudgeSidebarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Edit Info',
    path: '/dashboard/editinfo',
    icon: <AiIcons.AiFillEdit />,
    cName: 'judge-editinfo'
  },
  {
    title: 'My Papers',
    path: '/dashboard/my-papers',
    icon: <MdArticle />,
  }, 
  {
    title: 'Manage Papers',
    path: '/dashboard/papers',
    icon: <IoIcons.IoIosPaper />,
  },
];

export const DashboadMainPageData = [
  {
    title: 'Published Papers',
    path: '/',
    description:'You can view published papers',
    icon: <FaNewspaper />,
    iconColor: 'yellow-icon',
    color:'card yellow-card',
  },
  {
    title: 'Edit Info',
    path: '/dashboard/editinfo',
    description:'You can edit your information',
    icon: <AiIcons.AiFillEdit />,
    iconColor: 'blue-icon',
    color:'card blue-card',
  },
  {
    title: 'My Papers',
    path: '/dashboard/my-papers',
    description:'You can view your papers',
    icon: <MdArticle />, 
    iconColor: 'green-icon',
    color:'card green-card',
  },
  {
    title: 'Manage Papers',
    path: '/dashboard/papers',
    description:'You can manage papers',
    icon: <IoIcons.IoIosPaper />,
    iconColor: 'rose-icon',
    color:'card rose-card',
  }, 
  {
    title: 'Manage Users',
    path: '/dashboard/allusers',
    description:'You can view all users',
    icon: <IoPeopleSharp/>,
    iconColor: 'purple-icon',
    color:'card purple-card',
  },  
];

export const submenuSidebarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Edit Info',
    path: '/dashboard/editinfo',
    icon: <AiIcons.AiFillEdit />,
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
    title: 'My Papers',
    path: '/dashboard/my-papers',
    icon: <MdArticle/>,
  },  
  {
    title: 'Manage Papers',
    path: '/dashboard/papers',
    icon: <IoIcons.IoIosPaper />,
  },
  {
    title: 'Manage Users',
    path: '/dashboard/allusers',
    icon: <IoPeopleSharp/>,
  },
];

export const userStatus =[
  {
    value:'dabirconference',
    label:'Dabir Conference',
  },
  {
    value:'dabirbakhsh',
    label:'Dabir Bakhsh',
  },  
  {
    value:'dabirkhane',
    label:'Dabir Khane',
  },  
  {
    value:'standard',
    label:'Standard',
  }, 
  {
    value:'judge',
    label:'Judge',
  },   
];