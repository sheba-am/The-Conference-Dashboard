import React from 'react'
import MyPapersTable from '../components/MyPapersTable'
function DabirBakhsh_Papers({columns, papersData}) {
    {// this will be used in other instances
  /* {userStatusData.filter(car => car.value === "standard").map((singelUser,index)=>{return(<div>{singelUser.label}</div> )} ) } */}
  var user = JSON.parse(localStorage.getItem("user")); //retrieve the object
  var allPapers =[]
  var pendingApprovalPapers = []
  var pendingRevisePapers = []
  var approvedPapers = []
  var rejectedPapers = []
  // dabir bakhsh can only see papers in their own field
  if (papersData) {
    allPapers = papersData.filter(data => data.field.includes(user.field)).map((singlePaper,index)=>{return(singlePaper)} )  
             
  }
  // if(papersData) {
  //   for(let i=0 ; i<papersData.length ; i++) {
  //     if(papersData[i].dabirKhane=== null) {
  //       pendingApprovalPapers.push(papersData[i])
  //     } else if(papersData[i].dabirKhane.includes('revise')) {
  //       pendingRevisePapers.push(papersData[i])
  //     } else if(papersData[i].dabirKhane.includes('approve')) {
  //       approvedPapers.push(papersData[i])
  //     }  else if(papersData[i].dabirKhane.includes('reject')) {
  //       rejectedPapers.push(papersData[i])
  //     }
  //   }
  // }
  // if (papersData) {
  //   approvedPapers = papersData.filter(data => data.dabirKhane.includes('approve')).map((singlePaper,index)=>{return(singlePaper)} )  
  //   // pendingApprovalPapers = papersData.filter(data => data.dabirKhane===null).map((singlePaper,index)=>{return(singlePaper)} )  
  //   pendingRevisePapers = papersData.filter(data => data.dabirKhane.includes('revise')).map((singlePaper,index)=>{return(singlePaper)} ) 
  //   rejectedPapers = papersData.filter(data => data.dabirKhane.includes('reject')).map((singlePaper,index)=>{return(singlePaper)} )             
  // }

  return (
    <div>
        <div>         
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" data-bs-toggle="tab" href="#menu0">All</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#menu1">New</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#menu2">Pending Judgment</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#menu3">Judged</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#menu4">Approved</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#menu4">Rejected</a>
            </li>
          </ul>
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
              {pendingApprovalPapers.length >0 ? <MyPapersTable columns={columns} data={pendingApprovalPapers} />:<h4>No Results</h4>}

            </div>
            {/* ================== */}
            <div id="menu2" class="container tab-pane fade"><br />
              <h3>Pending Judgement</h3>
              {pendingRevisePapers.length >0 ? <MyPapersTable columns={columns} data={pendingRevisePapers} />:<h4>No Results</h4>}       

            </div>
            {/* ================== */}
            <div id="menu3" class="container tab-pane fade"><br />
              <h3>Judged</h3>
              {approvedPapers.length >0 ? <MyPapersTable columns={columns} data={approvedPapers} />:<h4>No Results</h4>}
            </div>
            {/* ================== */}
            <div id="menu4" class="container tab-pane fade"><br />
              <h3>Approved</h3>
              {rejectedPapers.length >0 ? <MyPapersTable columns={columns} data={rejectedPapers} />:<h4>No Results</h4>}
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