import React, {useContext} from 'react'
import { PapersData } from './PapersData';
import { Link } from "react-router-dom";
import { PaperContext } from '../contexts/PaperContext';

function PaperDetails(props) {
  const PaperDetails = props.isOpen ? "paper-details-content open" : "paper-details-content";
  //var selectedPaper = PapersData[0];
  const {selectedPaper,setSelectedPaper} =useContext(PaperContext)
  return (
    <div className={PaperDetails}>
        {/* ==== The Paper Details ==== */}
        <div className='details-of-paper'>
          <div class='container'>
            <div class='row'>
              <div class='col-1'>
                <button class="btn btn-primary">
                  history
                </button>
              </div>
              <div class='col-1'>
                <Link to='/edit-paper' class="btn btn-primary">
                    edit
                </Link> 
              </div>
              <div class='col-1'>
                <button class="btn btn-primary">
                  delete
                </button>
              </div>
              <div class='col-9'>
                id:{selectedPaper.id}
              </div>              
            </div>
          </div>

          <div>
            Paper Title: {selectedPaper.title}
          </div>
          <div>
            Paper Title: {selectedPaper.authors[0]["authorName"]}
          </div>
          <div>
            Sent Date: {selectedPaper.send_date}
          </div>   
          <div>
            Paper File:
          </div>
          <div>
            number of pages: {selectedPaper.number_of_pages}
          </div>             
          <div>
            Abstract: {selectedPaper.abstract}
          </div> 
                    
        </div>
        {/*==== Judges Table ==== */}
        <div>
          <div>Judges</div>
          <table class="table papers-table justify-content-center table table-hover align-middle">
          <thead>
            <tr class="float-right">
              <th scope="col">#</th>
              <th scope="col">Judge name</th>
              <th scope="col">state</th>
              <th scope="col">score</th>
              <th scope="col">feedback</th>             
            </tr>
          </thead>
          <tbody>
            
              {
                  selectedPaper.judges.map((item, index) => {
                      return (
                        
                            <tr key={index}  >
                              <th scope="row">{index+1}</th>
                              <td>{item}</td>
                              <td> {selectedPaper.state[index]}</td>
                              <td> {selectedPaper.scores[index]}</td>
                              <td> {selectedPaper.judge_feedback[index]}</td>
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


export default PaperDetails;