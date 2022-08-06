import React from 'react'
import MyPapersTable from '../components/MyPapersTable'
function Judge_Papers({papersData, columns, judgeFeedbackData}) {
    //we get a list of sent feedback and not sent feedback from all the feedbacks of this judge and from all the papers choose this 
    var pendingApprovalTitle= []; 
    var pendingJudgmentTitle=[];
    var judgedTitle=[];
    var rejectedTitle = [];
    var allJudgesPapers =[];  
    var pendingApprovalPapers = [];
    var pendingJudgmentPapers= []; //all the papers which judge has had no scores
    var judgedPapers= []; //all the papers which judge has saved a score
    var rejectedPapers = []
    if (judgeFeedbackData) {
      //split all feedbacks of current judge
      for (let i=0 ; i<judgeFeedbackData.length ; i++){
        if(judgeFeedbackData[i].accepted ===false) {
          rejectedTitle.push(judgeFeedbackData[i].paper)
        } else if(judgeFeedbackData[i].accepted === true) {
          if (judgeFeedbackData[i].scores ==="N/A") {
            pendingJudgmentTitle.push(judgeFeedbackData[i].paper)
          } else {
            judgedTitle.push(judgeFeedbackData[i].paper)
          }          
        } else if(judgeFeedbackData[i].accepted === null) {
          pendingApprovalTitle.push(judgeFeedbackData[i].paper)
      }

      }      
      // for (let i=0 ; i<judgeFeedbackData.length ; i++){
      //   if (judgeFeedbackData[i].scores ==="N/A") {
      //     noFeedbackTitle.push(judgeFeedbackData[i].paper)
      //   } else {
      //     sentFeedbackTitle.push(judgeFeedbackData[i].paper)
      //   }
      // }

  
      if(papersData){
        for (let i=0 ; i<papersData.length ; i++){
          if (pendingApprovalTitle.includes(papersData[i].title)){
            pendingApprovalPapers.push(papersData[i])
          } else if (pendingJudgmentTitle.includes(papersData[i].title)){
            pendingJudgmentPapers.push(papersData[i])
          } else  if (judgedTitle.includes(papersData[i].title)){
            judgedPapers.push(papersData[i])
          } else  if (rejectedTitle.includes(papersData[i].title)){
            rejectedPapers.push(papersData[i])
          }
        }
      }

      /*all of the papers assigned to current judge */
      allJudgesPapers = [].concat(pendingApprovalPapers,pendingJudgmentPapers,judgedPapers,rejectedPapers); 
    }    
  return (
    <div>
          
          <br />
        <div className='tab'>
            <ul class="nav nav-tabs" role="tablist">
              <div class="line-1"> </div>
              <li class="nav-item">
                <a class="nav-link up up-bakhsh active" data-bs-toggle="tab" href="#menu0">All Papers <span className='number-badge'>{allJudgesPapers.length}</span> </a>
              </li>
              <li class="nav-item">
                <a class="nav-link down down-bakhsh" data-bs-toggle="tab" href="#menu1">Pending Approval <span className='number-badge'>{pendingApprovalPapers.length}</span></a>
              </li>
              <li class="nav-item"> 
                <a class="nav-link up up-bakhsh" data-bs-toggle="tab" href="#menu2">Pending Judgement <span className='number-badge'>{pendingJudgmentPapers.length}</span> </a>
              </li>
              <li class="nav-item">
                <a class="nav-link down down-bakhsh" data-bs-toggle="tab" href="#menu3">Judged <span className='number-badge'>{judgedPapers.length}</span> </a>
              </li>
              <li class="nav-item">
                <a class="nav-link up up-bakhsh" data-bs-toggle="tab" href="#menu4">Rejected <span className='number-badge'>{rejectedPapers.length}</span> </a>
              </li>
            </ul>
          
          <br />
          {/* ======== Tab Content ========== */}
          <div class="tab-content">
            <div id="menu0" class="container tab-pane active"><br />
              <h3>All</h3>
              {
                allJudgesPapers.length>0 ? <MyPapersTable columns={columns} data={allJudgesPapers} /> : <h4>No Results</h4>
              }
            </div>
            <div id="menu1" class="container tab-pane "><br />
              <h3>Pending Approval</h3>
              {
                pendingApprovalPapers.length>0 ? <MyPapersTable columns={columns} data={pendingApprovalPapers} /> : <h4>No Results</h4>
              }
            </div>
            <div id="menu2" class="container tab-pane fade"><br />
              <h3>Pending Judgement</h3>
              {
                pendingJudgmentPapers.length>0 ? <MyPapersTable columns={columns} data={pendingJudgmentPapers} /> : <h4>No Results</h4>
              }
            </div>
            <div id="menu3" class="container tab-pane fade"><br />
              <h3>Judged</h3>
              {
                judgedPapers.length>0 ? <MyPapersTable columns={columns} data={judgedPapers} /> : <h4>No Results</h4>
              }
            </div>
            <div id="menu4" class="container tab-pane fade"><br />
              <h3>Rejected</h3>
              {
                rejectedPapers.length>0 ? <MyPapersTable columns={columns} data={rejectedPapers} /> : <h4>No Results</h4>
              }
            </div>
          </div>
      </div>
    </div>
  )
}

export default Judge_Papers