import React, {useState, useEffect} from "react"
import { DashboadMainPageData} from '../data/SidebarData';
import { Link, Navigate } from "react-router-dom";
import StackedChart from "./StackedChart";
import axios from 'axios'
import { fieldsData } from "../data/FormData";
import PieChartDashboard from "./PieChartDashboard";
import Cards from "./Cards";
import SimplePieChart from "./SimplePieChart";

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
      
  }
}
const DashboradMainPage = props => {
    //dashboard will be a little smaller when sidebar is open
    const DashboardMainPage = props.isOpen ? "content open" : "content";
    let DashboadMainPageData_subset = DashboadMainPageData.slice(0, 3)
    const user = JSON.parse(localStorage.getItem("user"))
    const [userState, setUserState] = useState()

    if(user){
        if (user.status==="dabirconference"){
          DashboadMainPageData_subset = DashboadMainPageData.slice(0, 5)
        } else  if (user.status==="dabirkhane" || user.status==="dabirbakhsh" || user.status==="judge") {
          DashboadMainPageData_subset = DashboadMainPageData.slice(0, 4)
        }
      }

      function handleLogout(e) {
        e.preventDefault()
        localStorage.removeItem('user')
        setUserState(undefined)
        // navigate('/')
        window.location.reload()
      }
      useEffect(() => {

      },[userState]);
    //redirect if the user is not authenticated

    const [papersData, setPapersData] = useState()
    const [myPapersData, setMyPapersData] = useState()
    const[ allUsers,setAllUsers] =useState()
    useEffect(() =>{  
      const result = axios.post(
        'http://127.0.0.1:8000/viewAllPapers' ,
        {'username': user.username}
        , config
      ).then((response) => response)
      .then((response) => {
        setPapersData(response.data)
      })
      const allUsersresult = axios.post(
        'http://127.0.0.1:8000/getUsers'
        , config
      ).then((response) => response)
      .then((response) => {
        setAllUsers(response.data)
      })
      const myPapers = axios.post(
        'http://127.0.0.1:8000/viewPapers',
        {'username': user.username}
        , config
      ).then((response) => response)
      .then((response) => {
        setMyPapersData(response.data)
        localStorage.setItem("papers", JSON.stringify(papersData))
      })
    },[])

    //====== number of fields and subfields of paper =======
    var fieldsCount = papersData && fieldsData.map((singleField) => {
      let properties = {
        'value': singleField.value,
        'label': singleField.label,
        'subfields': singleField.subfields,
        'count': 0,
      };
      properties['count'] =papersData.filter(item => item.field.includes(singleField.value)).length;      
      properties['subfields'] = singleField.subfields.map((singleSubField) => {
        let subFieldProperties = {
          'value': singleSubField.value,
          'label': singleSubField.label,
          'count': 0,
        };  
        subFieldProperties['count'] = papersData.filter(item => item.subfields.includes(singleSubField.value)).length;   
        return subFieldProperties;   
      })
      return properties;
    })

    //======== number of fields and subfields of user =======
    var userFieldsCount = allUsers && fieldsData.map((singleField) => {
      let properties = {
        'value': singleField.value,
        'label': singleField.label,
        'subfields': singleField.subfields,
        'color': singleField.color,
        'count': 0,
      };
      properties['count'] =allUsers.filter(item => item.field.includes(singleField.value)).length;      
      return properties;
    })

    //======= number of my papers ==========
    var pendingPapers = []
    var revisedPapers = []
    var approvedPapers = []  
    var rejectedPapers = []
    if(myPapersData) {
      for(let i=0 ; i<myPapersData.length ; i++) {
        if(myPapersData[i].dabirConference && myPapersData[i].dabirConference.includes('approve')) {
          approvedPapers.push(myPapersData[i])
        } else if(myPapersData[i].dabirConference && myPapersData[i].dabirConference.includes('reject')) {
          rejectedPapers.push(myPapersData[i])
        } else if(myPapersData[i].dabirKhane && myPapersData[i].dabirKhane.includes('reject')) {
          rejectedPapers.push(myPapersData[i])
        } else if(myPapersData[i].dabirKhane && myPapersData[i].dabirKhane.includes('revise')) {
          revisedPapers.push(myPapersData[i])
        } else {
          pendingPapers.push(myPapersData[i])
        } 
      }
    }
    var simplePieData = [
      { name: "Pending Papers", value: pendingPapers.length },
      { name: "Revised Papers", value: revisedPapers.length },
      { name: "Approved Papers", value: approvedPapers.length },
      { name: "Rejected Papers", value: rejectedPapers.length },
    ];
  return ((!user)? <Navigate to="/signup"/> :
    <div className={DashboardMainPage}>
      <div id='main-page' class="container">
            <div class="row">
              <div class='col-lg-1 col-md-2'>
                <button class='btn logout-btn' onClick={handleLogout}>
                  Logout
                </button>
              </div>              
              <div class="col">
                <h3 class='main-page-header'>
                  Welcome {user.first_name} {user.last_name}
                </h3>
              </div>

            </div>
              <br />
              <Cards cardsData={DashboadMainPageData_subset} />
              
              <br />          
              <div className='charts'>
                <div class='row'>
                  <div class='col-sm-12 col-lg-6'>
                    <PieChartDashboard chartData={userFieldsCount}/>
                  </div>
                  <div  class='col-sm-12 col-lg-6'>
                    <SimplePieChart  chartData={simplePieData} />
                  </div>
                </div>
                <div class='row'>
                  <StackedChart chartData={fieldsCount} />
                </div>
              </div>
                                    
            
            
      </div>
    </div>
  );
};
export default DashboradMainPage;
