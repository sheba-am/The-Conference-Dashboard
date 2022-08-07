import React  from 'react'
import MyPapersTable from '../components/MyPapersTable'
function DabirBakhsh_Papers({columns, papersData}) {

    {// this will be used in other instances
  /* {userStatusData.filter(car => car.value === "standard").map((singelUser,index)=>{return(<div>{singelUser.label}</div> )} ) } */}
  var user = JSON.parse(localStorage.getItem("user")); //retrieve the object
  var allPapers =[] // all papers shown to 
  var newPapers= []
  var pendingJudgmentPapers = []
  var judgedPapers = []
  var approvedPapers = []
  var rejectedPapers = []

  // dabir bakhsh can only see papers in their own field
  if (papersData) {
    allPapers = papersData.filter(data => data.field.includes(user.field) && data.dabirKhane && data.dabirKhane.includes('approved')).map((singlePaper,index)=>{return(singlePaper)} )  
    console.log(allPapers)
    for(let i=0 ; i<allPapers.length ; i++) {
      if(allPapers[i].dabirBakhsh===null && allPapers[i].dabirKhane && allPapers[i].dabirKhane.includes('approved')) {
        newPapers.push(allPapers[i])
      } else if(allPapers[i].dabirBakhsh==='pending judgement') {
        pendingJudgmentPapers.push(allPapers[i])
      } else if(allPapers[i].dabirBakhsh==='judged') {
        judgedPapers.push(allPapers[i])
      } else if(allPapers[i].dabirBakhsh==='approved') {
        approvedPapers.push(allPapers[i])
      } else if(allPapers[i].dabirBakhsh==='rejected') {
        rejectedPapers.push(allPapers[i])
      }
    }
  }
  // if (papersData) {
  //   approvedPapers = papersData.filter(data => data.dabirKhane.includes('approve')).map((singlePaper,index)=>{return(singlePaper)} )  
  //   // pendingApprovalPapers = papersData.filter(data => data.dabirKhane===null).map((singlePaper,index)=>{return(singlePaper)} )  
  //   pendingRevisePapers = papersData.filter(data => data.dabirKhane.includes('revise')).map((singlePaper,index)=>{return(singlePaper)} ) 
  //   rejectedPapers = papersData.filter(data => data.dabirKhane.includes('reject')).map((singlePaper,index)=>{return(singlePaper)} )             
  // }

  return (
    <div>
        <div  class="tab" >         
          <ul class="nav nav-tabs" role="tablist">
          <div class="line-1"> </div>
            <li class="nav-item">
              <a class="nav-link up up-bakhsh active" data-bs-toggle="tab" href="#menu0">
                All papers <span  className='number-badge'>{allPapers.length} </span></a>
            </li>

            <li class="nav-item">
              <a class="nav-link down down-bakhsh"  data-bs-toggle="tab" href="#menu1 ">New Papers <span className='number-badge'>{newPapers.length}</span></a>
            </li>

            <li class="nav-item">
              <a  class="nav-link up up-bakhsh" data-bs-toggle="tab" href="#menu2">Pending Judgment <span className='number-badge'>{pendingJudgmentPapers.length}</span> </a>
            </li>

            <li class="nav-item">
              <a class="nav-link down down-bakhsh"   data-bs-toggle="tab" href="#menu3">Judged <span className='number-badge'>{judgedPapers.length}</span> </a>
            </li>

            <li class="nav-item">
              <a  class="nav-link up up-bakhsh" data-bs-toggle="tab" href="#menu4">Approved <span className='number-badge'>{approvedPapers.length}</span> </a>
            </li>

            <li class="nav-item">
              <a class="nav-link down down-bakhsh" data-bs-toggle="tab" href="#menu5">Rejected <span className='number-badge'>{rejectedPapers.length}</span> </a>
            </li>

          </ul>
          <br />
          {/* ========== Content of Tabs ============= */}
          <div class="tab-content">
            {/* ================== */}
            <div id="menu0" class="container tab-pane active"><br />
              <h3>All</h3>
              {allPapers ? <MyPapersTable columns={columns} data={allPapers} myPaper={false} />:<h4>No Results</h4>}        

            </div>
            {/* ================== */}
            <div id="menu1" class="container tab-pane fade"><br />
              <h3>New</h3>
              {newPapers.length >0 ? <MyPapersTable columns={columns} data={newPapers} />:<h4>No Results</h4>}

            </div>
            {/* ================== */}
            <div id="menu2" class="container tab-pane fade"><br />
              <h3>Pending Judgment</h3>
              {pendingJudgmentPapers.length >0 ? <MyPapersTable columns={columns} data={pendingJudgmentPapers} />:<h4>No Results</h4>}       

            </div>
            {/* ================== */}
            <div id="menu3" class="container tab-pane fade"><br />
              <h3>Judged</h3>
              {judgedPapers.length >0 ? <MyPapersTable columns={columns} data={judgedPapers} />:<h4>No Results</h4>}
            </div>
            {/* ================== */}
            <div id="menu4" class="container tab-pane fade"><br />
              <h3>Approved</h3>
              {approvedPapers.length >0 ? <MyPapersTable columns={columns} data={approvedPapers} />:<h4>No Results</h4>}
            </div>
            {/* ================== */}
            <div id="menu5" class="container tab-pane fade"><br />
              <h3>Rejected</h3>
              {rejectedPapers.length >0 ? <MyPapersTable columns={columns} data={rejectedPapers} />:<h4>No Results</h4>}
            </div>            
          </div>
        </div>        
    </div>
  )
}

export default DabirBakhsh_Papers