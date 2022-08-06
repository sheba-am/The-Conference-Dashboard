import React, {useState}  from 'react'
import {FeedbackQuestions} from '../data/FormData'
function JudgesTable({assignedJudgeData}) {
    var paper = JSON.parse(localStorage.getItem("selectedPaper")); //retrieve the object
    const isTableEmpty = assignedJudgeData && assignedJudgeData.length>0  ? "table papers-table justify-content-center table table-hover align-middle" : "table papers-table-empty justify-content-center table table-hover align-middle";
    function getAvg(grades) {
        const total = grades.reduce((acc, c) => acc + c, 0);
        return total / grades.length;
      }
    const [feedbacks, setFeedbacks] = useState([]);
    var averageScore =[]  // we store average of all scores in this array
    var scoresCount = FeedbackQuestions
    assignedJudgeData.map((singleJudge) => (
        singleJudge.scores!=='N/A' ?averageScore.push(getAvg(singleJudge.scores.split(',').map(Number)).toFixed(2)): averageScore.push('N/A')
    ))
    console.log('ave',averageScore)
  return (
    <div id='papers-table' class="table-responsive-md">
        
        <table class={isTableEmpty}>
        <thead class='papers-table-header'>
        <tr class="float-right">
            <th scope="col" class='papers-table-header-item'>#</th>
            <th scope="col" class='papers-table-header-item'>Judge name</th>
            {scoresCount.map((single_Q,index) => (<th key={index}  scope="col" class='papers-table-header-item'>Q{index+1}</th>))}
            <th scope="col" class='papers-table-header-item'>Avg score</th>
            <th scope="col" class='papers-table-header-item'>state</th>
            <th scope="col" class='papers-table-header-item'>feedback</th>             
        </tr>
        </thead>
        <tbody class="papers-table-body">
        
            {
                (assignedJudgeData && averageScore) && assignedJudgeData.map((item,index) => {
                    return (
                    
                        <tr key={index}  >
                            <th scope="row" class='table-index'>{index + 1}</th>
                            <td>{item.judge}</td>
                            {
                                item.scores !== 'N/A' &&item.scores.split(',').map((singleScore)=>(<td>{singleScore}</td>))
                            }
                            {item.scores === 'N/A' && scoresCount.map((singleNa,index) =>(<td>N/A</td>))}
                            <td> {averageScore[index]}</td>
                            {averageScore[index]>= 10 && <td><span className='days-left-done'>passed</span></td>}
                            {averageScore[index]< 10 && <td><span className='days-left-red'>failed</span></td>}
                            {item.accepted ===null && <td> <span className='judge-pending-accept'>pending accept</span></td>}
                            {(item.accepted ==='true' && averageScore[index] === 'N/A') && <td>N/A </td>}
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