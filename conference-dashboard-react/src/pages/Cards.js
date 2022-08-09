import React from 'react'
import { Link } from "react-router-dom";
import { FaNewspaper } from "react-icons/fa";
function Cards({cardsData}) {
  return (
    <div class='row'>
    {
        cardsData && cardsData.map((item, index) => {
            return (
            <div key={index} class="col">
                <a href={item.path} class={item.color} >
                    <div class="overlay"></div>
                <div class="circle">
                    
                <div className={item.iconColor} >
                   {item.icon}
                </div>


                </div>
                <p>{item.title}</p>
                </a>
            </div>
            );
        })
    }


    </div>
  )
}

export default Cards