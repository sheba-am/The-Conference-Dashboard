import React, {useState}  from 'react'

function JudgesTable(props) {
    var paper = JSON.parse(localStorage.getItem("selectedPaper")); //retrieve the object
    const [feedbacks, setFeedbacks] = useState([]);
  return (
    <div class="table-responsive-md">
        
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
                props.assignedJudgeData && props.assignedJudgeData.map((item,index) => {
                    return (
                    
                        <tr key={index}  >
                            <th scope="row">{index + 1}</th>
                            <td>{item.judge}</td>
                            <td> {item.status}</td>
                            <td> {item.score}</td>
                            <td> {item.description}</td>
                        </tr>
                    
                    );
                })
            }                
        

        </tbody>
    </table>                     
    </div>
  )
}

export default JudgesTable