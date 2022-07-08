import React from 'react'
import { PapersData } from '../components/PapersData';
import { Link } from 'react-router-dom';
//import ReactTable from "react-table";
const Papers = props => {
  const Papers = props.isOpen ? "papers-content open" : "papers-content";
  return (
    <div className={Papers}>
      {/* ==== Add new paper ==== */}
      {/* <div class='container'>
        <div class='row'>
          <div class="col-3"> Add new paper:</div>
          <div class="col"><button class="btn btn-primary">+new</button></div>
        </div>
      </div> */}
      <div> Add new paper</div>
      <div>
        <Link to='/new-paper'  class="btn btn-primary">
        +new
        </Link>         
      </div>
      {/* ========The Table======= */}
      <div class="table-responsive-md">
        <table class="table papers-table justify-content-center table table-hover align-middle">
          <thead>
            <tr class="float-right">
              <th scope="col">#</th>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Authors</th>
              <th scope="col">Score</th>
              <th scope="col">More</th>
            </tr>
          </thead>
          <tbody>
            
              {
                  PapersData.map((item, index) => {
                      return (
                        
                            <tr key={index}  >
                               <th scope="row">{index+1}</th>
                              <td>
                                {item.id}
                              </td> 
                              <td>
                                {item.title}
                              </td>
                              <td>
                                {item.authors}
                              </td>
                              <td>
                                {item.avg_score}
                              </td>
                              <td>
                                <Link to='/paper-details' class="btn btn-primary">
                                    details
                                </Link> 
                              </td>
                            </tr>
                        
                      );
                  })
              }                
            

          </tbody>
        </table>
      </div>
    </div>
  )
}


export default Papers;