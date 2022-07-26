import React from 'react'
import MyPapersTable from '../components/MyPapersTable'
function Judge_Papers({papersData, columns, judgeFeedbackData}) {
    var noFeedbackTitle=[];
    var sentFeedbackTitle=[];
    var noFeedbackPaper=[];
    var sentFeedbackPaper=[];
    if (judgeFeedbackData) {
      //split all feedbacks between sent feedbacks and not sent feedbacks
      for (let i=0 ; i<judgeFeedbackData.length ; i++){
        if (judgeFeedbackData[i].score ==="N/A") {
          noFeedbackTitle.push(judgeFeedbackData[i].paper)
        } else {
          sentFeedbackTitle.push(judgeFeedbackData[i].paper)
        }
      }
  
  
      if(papersData){
        for (let i=0 ; i<papersData.length ; i++){
            if (noFeedbackTitle.includes(papersData[i].title)){
              noFeedbackPaper.push(papersData[i])
            } else  if (sentFeedbackTitle.includes(papersData[i].title)){
              sentFeedbackPaper.push(papersData[i])
            }
        }
      }
  
    }    
  return (
    <div>
          
          <br />
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" data-bs-toggle="tab" href="#home">All</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#menu1">Not Sent</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#menu2">Sent</a>
            </li>
          </ul>
          <div class="tab-content">
            <div id="home" class="container tab-pane active"><br />
              <h3>All</h3>
              {papersData ? <MyPapersTable columns={columns} data={papersData} /> : <h2>Loading...</h2>}
            </div>
            <div id="menu1" class="container tab-pane fade"><br />
              <h3>Not Sent</h3>
              {
                noFeedbackPaper.length>0 ? <MyPapersTable columns={columns} data={noFeedbackPaper} /> : <h2>Loading...</h2>
              }
            </div>
            <div id="menu2" class="container tab-pane fade"><br />
              <h3>Sent</h3>
              {
                sentFeedbackPaper.length>0 ? <MyPapersTable columns={columns} data={sentFeedbackPaper} /> : <h2>Loading...</h2>
              }
            </div>
          </div>
    </div>
  )
}

export default Judge_Papers