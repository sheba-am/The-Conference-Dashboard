import React from 'react'
import MyPapersTable from '../components/MyPapersTable'
function DabirKhane_Papers({columns, papersData}) {
    {// this will be used in other instances
  /* {userStatusData.filter(car => car.value === "standard").map((singelUser,index)=>{return(<div>{singelUser.label}</div> )} ) } */}
  var pendingApprovalPapers = []
  var pendingRevisePapers = []
  var approvedPapers = []
  var rejectedPapers = []
  if(papersData) {
    for(let i=0 ; i<papersData.length ; i++) {
      if(papersData[i].dabirKhane=== null) {
        pendingApprovalPapers.push(papersData[i])
      } else if(papersData[i].dabirKhane.includes('revised')) {
        pendingRevisePapers.push(papersData[i])
      } else if(papersData[i].dabirKhane.includes('approved')) {
        approvedPapers.push(papersData[i])
      }  else if(papersData[i].dabirKhane.includes('rejected')) {
        rejectedPapers.push(papersData[i])
      } else {
        pendingApprovalPapers.push(papersData[i])
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
        <div className='tab'>         
          <ul class="nav nav-tabs" role="tablist">
            <div class="line-1"> </div>
            <li class="nav-item">
              <a class="nav-link up up-bakhsh active" data-bs-toggle="tab" href="#menu0">All Papers <span className='number-badge'>{papersData && papersData.length}</span> </a>
            </li>
            <li class="nav-item">
              <a class="nav-link down down-bakhsh" data-bs-toggle="tab" href="#menu1">Pending Approval <span className='number-badge'>{pendingApprovalPapers.length }</span> </a>
            </li>
            <li class="nav-item">
              <a class="nav-link up up-bakhsh" data-bs-toggle="tab" href="#menu2">Pending Revise <span className='number-badge'>{pendingRevisePapers.length}</span> </a>
            </li>
            <li class="nav-item">
              <a class="nav-link down down-bakhsh" data-bs-toggle="tab" href="#menu3">Approved <span className='number-badge'>{approvedPapers.length}</span> </a>
            </li>
            <li class="nav-item">
              <a class="nav-link up up-bakhsh" data-bs-toggle="tab" href="#menu4">Rejected <span className='number-badge'>{rejectedPapers.length}</span></a>
            </li>
          </ul>
          <br />
          {/* ========== Content of Tabs ============= */}
          <div class="tab-content">
            {/* ================== */}
            <div id="menu0" class="container tab-pane active"><br />
              <h3>All</h3>
              {papersData ? <MyPapersTable columns={columns} data={papersData} />:<h4>No Results</h4>}        

            </div>
            {/* ================== */}
            <div id="menu1" class="container tab-pane fade"><br />
              <h3>Pending Approval</h3>
              {pendingApprovalPapers.length >0 ? <MyPapersTable columns={columns} data={pendingApprovalPapers} />:<h4>No Results</h4>}

            </div>
            {/* ================== */}
            <div id="menu2" class="container tab-pane fade"><br />
              <h3>Pending Revise</h3>
              {pendingRevisePapers.length >0 ? <MyPapersTable columns={columns} data={pendingRevisePapers} />:<h4>No Results</h4>}       

            </div>
            {/* ================== */}
            <div id="menu3" class="container tab-pane fade"><br />
              <h3>Approved</h3>
              {approvedPapers.length >0 ? <MyPapersTable columns={columns} data={approvedPapers} />:<h4>No Results</h4>}
            </div>
            {/* ================== */}
            <div id="menu4" class="container tab-pane fade"><br />
              <h3>Rejected</h3>
              {rejectedPapers.length >0 ? <MyPapersTable columns={columns} data={rejectedPapers} />:<h4>No Results</h4>}
            </div>
          </div>
        </div>        
    </div>
  )
}

export default DabirKhane_Papers