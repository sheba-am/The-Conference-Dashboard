import React, {useState}  from 'react'

function JudgesTable(props) {
    var paper = JSON.parse(localStorage.getItem("selectedPaper")); //retrieve the object
    const isTableEmpty = props.assignedJudgeData && props.assignedJudgeData.length>0  ? "table papers-table justify-content-center table table-hover align-middle" : "table papers-table-empty justify-content-center table table-hover align-middle";
    const [feedbacks, setFeedbacks] = useState([]);
  return (
    <div id='papers-table' class="table-responsive-md">
        
        <table class={isTableEmpty}>
        <thead class='papers-table-header'>
        <tr class="float-right">
            <th scope="col" class='papers-table-header-item'>#</th>
            <th scope="col" class='papers-table-header-item'>Judge name</th>
            <th scope="col" class='papers-table-header-item'>state</th>
            <th scope="col" class='papers-table-header-item'>score</th>
            <th scope="col" class='papers-table-header-item'>feedback</th>             
        </tr>
        </thead>
        <tbody class="papers-table-body">
        
            {
                props.assignedJudgeData && props.assignedJudgeData.map((item,index) => {
                    return (
                    
                        <tr key={index}  >
                            <th scope="row" class='table-index'>{index + 1}</th>
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