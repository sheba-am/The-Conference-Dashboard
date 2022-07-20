//===== Test array for select menus =====
import React from 'react';
//===== Test array for author menu =====
const user = JSON.parse(localStorage.getItem("user"))
export const authorData =['admin1','admin2','admin3']

export const fieldData =[
{
    title: 'Computer Science',
    value: 'computer science',
},
{
    title: 'Math',
    value: 'math',
},   
{
    title: 'Biology',
    value: 'biology',
}, 
{
    title: 'DP',
    value: 'dp',
},         
];

export const methodOfPresentationData =[
{
    title: 'Online',
    value: 'online',
},
{
    title: 'Offline',
    value: 'offline',
},           
];

export const languageData =[
{
    title: 'Farsi',
    value: 'farsi',
},
{
    title: 'English',
    value: 'english',
},    
];