import React , {useContext, useState, useEffect}from 'react'
import { Navigate } from 'react-router-dom';
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
import {columnsData} from '../data/columns';
import Judge_Papers from '../pages/Judge_Papers';
import DabirConference_Papers from '../pages/DabirConference_Papers';
import DabirKhane_Papers from '../pages/DabirKhane_Papers';
import DabirBakhsh_Papers from '../pages/DabirBakhsh_Papers';
//get papers



const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
      
  }
}

function Papers(props) {
  const user = JSON.parse(localStorage.getItem("user"))
  const PapersCss = props.isOpen ? "content open" : "content";
  const {selectedPaper,setSelectedPaper} =useContext(PaperContext)
  const [papersData, setPapersData] = useState()
  const [judgeFeedbackData, setJudgeFeedbackData] = useState()

 
  useEffect(() => {
    if(user){
      //get all the papers for admin and assigned papers for judge 
      // var request = ''
      // if(user.status=='dabirconference'){
      //   request = "viewAllPapers"
      // }else{
      //   request = "viewPapers"
      // }
      const result = axios.post(
        'http://127.0.0.1:8000/viewAllPapers' ,
        {'username': user.username}
        , config
      ).then((response) => response)
      .then((response) => {
        setPapersData(response.data)
        localStorage.setItem("papers", JSON.stringify(papersData))
      })
      if (user.status=='judge'){
        const judgefeedback = axios.post(
          'http://127.0.0.1:8000/viewJudgeFeedback',
          {'username': user.username}
          , config
        ).then((response) => response)
        .then((response) => {
          setJudgeFeedbackData(response.data)
          // console.log('judgeview',response.data)
        })

      }

    } 
  }, [])
  
  const columns = React.useMemo(
    () => columnsData,[]
  )
  // tasks.forEach( task => task.start_date = task.start_date.format("YYYY-MM-DD") );
  // return tasks;

  //redirect if the user is not authenticated
  return ((!user)? <Navigate to="/signup"/> :
    <div  className={PapersCss}>
      
      <div id="papers-container" class="container mt-3">
        {
          user.status==='judge' && <Judge_Papers columns={columns} papersData={papersData} judgeFeedbackData={judgeFeedbackData} />
        }
        
        {
          user.status==='dabirconference' && <DabirConference_Papers columns={columns} papersData={papersData} />
        }
        {
          user.status==='dabirkhane' && <DabirKhane_Papers columns={columns} papersData={papersData} />
        }   
        {
          user.status==='dabirbakhsh' && <DabirBakhsh_Papers columns={columns} papersData={papersData} />
        }                       
      </div>
      <br />
    </div>
  )
}
export default Papers;