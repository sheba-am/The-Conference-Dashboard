import React from 'react'
import { PapersData } from '../components/PapersData';
const PaperDetails = props => {
  const PaperDetails = props.isOpen ? "paper-details-content open" : "paper-details-content";
  var focusedPaper = PapersData[0];
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
                <button class="btn btn-primary">
                  edit
                </button>
              </div>
              <div class='col-9'>
                id:{focusedPaper.id}
              </div>              
            </div>
          </div>

          <div>
            Paper Title: {focusedPaper.title}
          </div>
          <div>
            Paper Title: {focusedPaper.authors}
          </div>
          <div>
            Sent Date: {focusedPaper.send_date}
          </div>   
          <div>
            Paper File:
          </div>   
          <div>
            Abstract: {focusedPaper.abstract}
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
                  focusedPaper.judges.map((item, index) => {
                      return (
                        
                            <tr key={index}  >
                              <th scope="row">{index+1}</th>
                              <td>{item}</td>
                              <td> {focusedPaper.state[index]}</td>
                              <td> {focusedPaper.scores[index]}</td>
                              <td> {focusedPaper.judge_feedback[index]}</td>
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