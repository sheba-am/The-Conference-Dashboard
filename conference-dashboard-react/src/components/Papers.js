import React , {useContext, useState, useEffect}from 'react'

import { Link, Navigate } from 'react-router-dom';
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
import { Container } from 'react-bootstrap';
import {useTable, useGlobalFilter,Row, Tabs,Tab} from 'react-table';
import {columnsData} from '../data/columns';
import { GlobalFilter } from './GlobalFilter';
//get papers


  //csss changes when sidebar is open
function Table({ columns, data }) {
  const user = JSON.parse(localStorage.getItem("user"))

  const showDetails = (selected) => {
    localStorage.setItem("selectedPaper", JSON.stringify(selected))
    // alert(a.id);
    console.log("context",selected)
    // setSelectedPaper(selected)
  }
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state, 
    setGlobalFilter
  } = useTable({
    columns,
    data,
  },useGlobalFilter)

  const {globalFilter} = state
  const isTableEmpty = data && data.length >0 ? "table papers-table justify-content-center  table-hover align-middle" : "table papers-table-empty justify-content-center  table-hover align-middle";
  // Render the UI for your table
  return (
    <>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

    <div id='papers-table' class="table-responsive-md">
      <table class={isTableEmpty} {...getTableProps()}>
        <thead class='papers-table-header'>
          {headerGroups.map(headerGroup => (
            <tr class="float-right " {...headerGroup.getHeaderGroupProps()}>
              <th scope="col-1" class='papers-table-header-item'>#</th>
              {headerGroup.headers.map(column => (
                <th scope="col" class='papers-table-header-item' {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
                {/* <th scope="col">Score</th> */}
                { user.status==="admin" &&<th scope="col-1"  class='papers-table-header-item'>More</th>}
                { user.status==="standard" &&<th scope="col-1"  class='papers-table-header-item'>More</th>}
                {user.status==="judge" && <th scope="col-1"  class='papers-table-header-item'>Feedback</th>}
            </tr>
          ))}
        </thead>
        <tbody class="papers-table-body" {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row)
            return (
              <tr key={index} {...row.getRowProps()}>
                <th scope="row" class='col-1 table-index'>{index+1}</th>
                {row.cells.map(cell => {
                  return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  )
                })}
                {  user.status==="admin" &&
                  <td class='col-1'>
                  <Link to='/dashboard/paper-details' class="btn btn-primary details-btn" onClick={() => showDetails(row.original)}>
                        ...
                    </Link>
                  </td>
                  // console.log(row.original)//this is replacement of item
                }
                { user.status==="standard" &&
                  <td class='col-1'>
                  <Link to='/dashboard/paper-details' class="btn btn-primary details-btn" onClick={() => showDetails(row.original)}>
                        ...
                    </Link>
                  </td>
                }
      
                {
                  user.status==="judge"&&
                  <td class='col-1'>
                  <Link to='/dashboard/send-feedback' class="btn btn-primary  send-feedback-btn" onClick={() => showDetails(row.original)}>
                      Send Feedback
                  </Link>
                  </td>
                }
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    </>
  )
}
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

    //========= Edit Judges =============
    const [editJudgesOpen, setEditJudgesOpen] = useState(false);
    const handleViewEditJudges = () => {
      setEditJudgesOpen(!editJudgesOpen);
    };  
  useEffect(() => {
    if(user){
      //get all the papers for admin and assigned papers for judge and standard user
      var request = ''
      if(user.status=='admin'){
        request = "viewAllPapers"
      }else{
        request = "viewPapers"
      }
      const result = axios.post(
        'http://127.0.0.1:8000/' + request,
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
  var noFeedbackTitle=[];
  //var sentFeedbackTitle=[];
  var noFeedbackPaper=[];
  var sentFeedbackPaper=[];
  if (user.status==='judge'&& judgeFeedbackData) {
    //split all feedbacks between sent feedbacks and not sent feedbacks
    for (let i=0 ; i<judgeFeedbackData.length ; i++){
      if (judgeFeedbackData[i].score ==="N/A") {
        noFeedbackTitle.push(judgeFeedbackData[i].paper)
      } 
    }


    if(papersData){
      for (let i=0 ; i<papersData.length ; i++){
          if (noFeedbackTitle.includes(papersData[i].title)){
            noFeedbackPaper.push(papersData[i])
          } else {
            sentFeedbackPaper.push(papersData[i])
          }
      }
    }
  // console.log("no paper",noFeedbackPaper)
  // console.log("sent paper",sentFeedbackPaper)
  // console.log("no feedback",noFeedbackTitle)
  // console.log("sent feedback", sentFeedbackTitle)
  } 
  // if ( noFeedbackPaper.length>0) {
  //   setTableData(noFeedbackPaper)
  // } else {
  //   setTableData(papersData)
  // }
  // console.log("table",tableData)
  //redirect if the user is not authenticated
  return ((!user)? <Navigate to="/signup"/> :
    <div  className={PapersCss}>
      <Container>
        <h3> Papers </h3>
        
          {user.status==='standard'?<Link to='/dashboard/new-paper'  class="btn add-paper-btn" >
          +New Paper
          </Link>:<div></div>}
        {/* ========The Table======= */}
        {user.status==='judge' &&
              <div>
                <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off" onClick={handleViewEditJudges}/>
                <label class="btn edit-judges-checked" for="btn-check-outlined">Sent Feedbacks</label><br></br>
              </div>              

        }
        { user.status==='judge' &&
          <div>
            {
              !editJudgesOpen && <div>{noFeedbackPaper.length>0 && <Table columns={columns} data={noFeedbackPaper} />} </div>
        
            }
            {
              editJudgesOpen && <div>{sentFeedbackPaper.length>0 && <Table columns={columns} data={sentFeedbackPaper} />} </div> 
            }            
          </div>

        }
      {user.status==='admin' &&
        <div>
          {papersData ? <Table columns={columns} data={papersData} />:<h2>Loading...</h2>}
        </div>
      }
      {user.status==='standard' &&
        <div>
          {papersData ? <Table columns={columns} data={papersData} />:<h2>Loading...</h2>}
        </div>
      }      

      </Container>

    </div>
  )
}
export default Papers;