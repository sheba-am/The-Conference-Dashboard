import React ,{useRef}from 'react'
import MyPapersTable from '../components/MyPapersTable'
function DabirConference_Papers({columns, papersData}) {
  var menu0Width=useRef() ;
  var menu1Width=useRef() ;
  var menu2Width=useRef() ;
  var menu3Width=useRef() ;
  var menu4Width=useRef() ;
  var menu5Width=useRef() ;
  var menu6Width=useRef() ;
  var menu7Width=useRef() ;
  var menu8Width=useRef() ;

  // var menu1MarginLeft = menu0Width.current && -(menu0Width.current.offsetWidth/2)
  // var menu2MarginLeft = menu1Width.current && -(menu1Width.current.offsetWidth/2)
  // var menu3MarginLeft = menu2Width.current && -(menu2Width.current.offsetWidth/2)
  // var menu4MarginLeft = menu3Width.current && -(menu3Width.current.offsetWidth/2)
  // var menu5MarginLeft = menu4Width.current && -(menu4Width.current.offsetWidth/2)
  // var menu6MarginLeft = menu5Width.current && -(menu5Width.current.offsetWidth/2)
  // var menu7MarginLeft = menu6Width.current && -(menu6Width.current.offsetWidth/2)
  // var menu8MarginLeft = menu7Width.current && -(menu7Width.current.offsetWidth/2)
  // var menu9MarginLeft = menu8Width.current && -(menu8Width.current.offsetWidth/2)
  var menu1MarginLeft = 0
  var menu2MarginLeft = 0
  var menu3MarginLeft = 0
  var menu4MarginLeft = 0
  var menu5MarginLeft = 0
  var menu6MarginLeft = 0
  var menu7MarginLeft = 0
  var menu8MarginLeft = 0
  var menu9MarginLeft = 0
    {// this will be used in other instances
  /* {userStatusData.filter(car => car.value === "standard").map((singelUser,index)=>{return(<div>{singelUser.label}</div> )} ) } */}
      console.log(papersData)
      var pendingDabirKhanePapers = []
      var rejectedByDabirKhanePapers = []
      var pendingJudgeAssignmentPapers = []
      var pendingJudgmentPapers = []
      var pendingDabirBakhshPapers = []
      var approvedByDabirBakhshPapers = []
      var  rejectedByDabirBakhshPapers = []
      var approvedPapers = []
      var rejectedPapers = []
      if(papersData) {
        for(let i=0 ; i<papersData.length ; i++) {
          if(papersData[i].dabirConference === 'approved') { //dabir conference overrides everything
            approvedPapers.push(papersData[i])
          } else if(papersData[i].dabirConference === 'rejected') {
            rejectedPapers.push(papersData[i])
          }else if (papersData[i].dabirKhane===null||papersData[i].dabirKhane==='pending' || papersData[i].dabirKhane.includes('revised') ) {
            pendingDabirKhanePapers.push(papersData[i])
          } else if (papersData[i].dabirKhane.includes('rejected')) {
            rejectedByDabirKhanePapers.push(papersData[i])
          } else if(papersData[i].dabirKhane.includes('approved')) { //papers was approved by dabir khane & now is in dabir bakhsh
            if(papersData[i].dabirBakhsh ===null) {
              pendingJudgeAssignmentPapers.push(papersData[i])
            } else if(papersData[i].dabirBakhsh ==='pending judgement') {
              pendingJudgmentPapers.push(papersData[i])
            } else if(papersData[i].dabirBakhsh ==='judged') {
              pendingDabirBakhshPapers.push(papersData[i])
            } else if(papersData[i].dabirBakhsh ==='approved') {
              approvedByDabirBakhshPapers.push(papersData[i])
            } else if(papersData[i].dabirBakhsh ==='rejected') {
              rejectedByDabirBakhshPapers.push(papersData[i])
            } 

          }
        }
      }


  return (
    <div>
        <div  class="tab" >         
          <ul class="nav nav-tabs" role="tablist">
            <div class="line-1"> </div>
            <li class="nav-item">
              <a ref={menu0Width} class="nav-link up active" style={{'margin-left':'-25px'}} data-bs-toggle="tab" href="#menu0">
                All Papers <span className='number-badge'>{papersData && papersData.length}</span>
               </a>
            </li>

            <li class="nav-item">
              <a ref={menu2Width} class="nav-link up" style={{'margin-left':menu2MarginLeft}} data-bs-toggle="tab" href="#menu2">Rejected Dabir Khane <span className='number-badge'>{rejectedByDabirKhanePapers.length}</span> </a>
            </li>

            <li class="nav-item">
              <a ref={menu4Width} class="nav-link up"  style={{'margin-left':menu4MarginLeft}} data-bs-toggle="tab" href="#menu4">Pending Judge Judgment <span className='number-badge'>{pendingJudgmentPapers.length}</span> </a>
            </li>


            <li class="nav-item">
              <a ref={menu6Width} class="nav-link up"  style={{'margin-left':menu6MarginLeft}} data-bs-toggle="tab" href="#menu6">Approved Dabir Bakhsh <span className='number-badge'>{approvedByDabirBakhshPapers.length} </span></a>
            </li>   

            <li class="nav-item">
              <a ref={menu8Width}class="nav-link up"  style={{'margin-left':menu8MarginLeft}} data-bs-toggle="tab" href="#menu8">Approved Papers <span className='number-badge'>{approvedPapers.length} </span></a>
            </li> 

            <li class="nav-item">
              <a ref={menu1Width} class="nav-link down" style={{'margin-left':'1vw'}} data-bs-toggle="tab" href="#menu1">Pending Dabir Khane <span className='number-badge'>{pendingDabirKhanePapers.length}</span> </a>
            </li>

            <li class="nav-item">
              <a ref={menu3Width} class="nav-link down" style={{'margin-left':menu3MarginLeft}}  data-bs-toggle="tab" href="#menu3">Pending Judge Assign <span className='number-badge'>{pendingJudgeAssignmentPapers.length}</span> </a>
            </li>

            <li class="nav-item">
              <a ref={menu5Width} class="nav-link down"  style={{'margin-left':menu5MarginLeft}} data-bs-toggle="tab" href="#menu5">Pending Dabir Bakhsh <span className='number-badge'>{pendingDabirBakhshPapers.length}</span> </a>
            </li>

            <li class="nav-item">
              <a ref={menu7Width} class="nav-link down"  style={{'margin-left':'2vw'}} data-bs-toggle="tab" href="#menu7">Rejected Dabir Bakhsh <span className='number-badge'>{rejectedByDabirBakhshPapers.length}</span> </a>
            </li>   

            <li class="nav-item">
              <a class="nav-link down" style={{'margin-left':menu9MarginLeft}} data-bs-toggle="tab" href="#menu9">Rejected Papers <span className='number-badge'>{rejectedPapers.length}</span> </a>
            </li>               

          </ul>
          <br />
          {/* ========== Content of Tabs ============= */}
          <div class="tab-content">
            {/* ================== */}
            <div id="menu0" class="container tab-pane active"><br />
              <h3>All</h3>
              {papersData ? <MyPapersTable columns={columns} data={papersData} myPaper={false} />:<h4>No Results</h4>}        
            </div>
            {/* ================== */}
            <div id="menu1" class="container tab-pane "><br />
              <h3>Pending Dabir Khane</h3>
              {pendingDabirKhanePapers.length>0 ? <MyPapersTable columns={columns} data={pendingDabirKhanePapers} myPaper={false} />:<h4>No Results</h4>}        
            </div>
            {/* ================== */}
            <div id="menu2" class="container tab-pane "><br />
              <h3>Rejected By Dabir Khane</h3>
              {rejectedByDabirKhanePapers.length>0  ? <MyPapersTable columns={columns} data={rejectedByDabirKhanePapers} myPaper={false} />:<h4>No Results</h4>}        
            </div>
            {/* ================== */}
            <div id="menu3" class="container tab-pane "><br />
              <h3>Pending Judge Assignment</h3>
              {pendingJudgeAssignmentPapers.length>0  ? <MyPapersTable columns={columns} data={pendingJudgeAssignmentPapers} myPaper={false} />:<h4>No Results</h4>}        
            </div>
            {/* ================== */}
            <div id="menu4" class="container tab-pane "><br />
              <h3>Pending Judgment</h3>
              {pendingJudgmentPapers.length>0 ? <MyPapersTable columns={columns} data={pendingJudgmentPapers} myPaper={false} />:<h4>No Results</h4>}        
            </div>
            {/* ================== */}
            <div id="menu5" class="container tab-pane "><br />
              <h3>Pending Dabir Bakhsh</h3>
              {pendingDabirBakhshPapers.length>0  ? <MyPapersTable columns={columns} data={pendingDabirBakhshPapers} myPaper={false} />:<h4>No Results</h4>}        
            </div>  
            {/* ================== */}
            <div id="menu6" class="container tab-pane "><br />
              <h3>Approved by Dabir Bakhsh</h3>
              {approvedByDabirBakhshPapers.length>0  ? <MyPapersTable columns={columns} data={approvedByDabirBakhshPapers} myPaper={false} />:<h4>No Results</h4>}        
            </div> 
            {/* ================== */}
            <div id="menu7" class="container tab-pane "><br />
              <h3>Rejected by Dabir Bakhsh</h3>
              {rejectedByDabirBakhshPapers.length>0  ? <MyPapersTable columns={columns} data={rejectedByDabirBakhshPapers} myPaper={false} />:<h4>No Results</h4>}        
            </div> 
            {/* ================== */}
            <div id="menu8" class="container tab-pane "><br />
              <h3>Approved</h3>
              {approvedPapers.length>0  ? <MyPapersTable columns={columns} data={approvedPapers} myPaper={false} />:<h4>No Results</h4>}        
            </div> 
            {/* ================== */}
            <div id="menu9" class="container tab-pane "><br />
              <h3>Rejected</h3>
              {rejectedPapers.length>0  ? <MyPapersTable columns={columns} data={rejectedPapers} myPaper={false} />:<h4>No Results</h4>}        
            </div>
            <br />                                                        
          </div>
        </div>        
    </div>
  )
}

export default DabirConference_Papers