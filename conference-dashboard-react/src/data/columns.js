import React from "react"
export const columnsData = [
    
    {
        Header: 'Id',
        accessor:'id',
    },
    {
        Header: 'Title',
        accessor:'title',
    },
    {
        Header: 'Authors',
        accessor:'authors',
    },    
    {
        Header: 'Judges',
        accessor:'judges',
        Cell: ({row, value }) => { //because I need access to another column I add 'row'
            //we make an array out of judges to give it custom styling
            let statusArr = row.original.status.split(',')
            let valueArr =value.split(',')
            return <span>
                    {valueArr.map((singleVal,index) => {
                        let singleJudgeStyle =""
                        if(statusArr[index]==='not accepted') {
                            singleJudgeStyle="judge-pending-accept"
                        } else if(statusArr[index]==='no feedback') {
                            singleJudgeStyle="judge-pending-judgment"
                        }else if(statusArr[index]==='sent feedback') {
                            singleJudgeStyle="judge-judged"
                        } else {
                            singleJudgeStyle=""
                        }
                        return <span className={singleJudgeStyle} key={index}>{singleVal}  </span>
                    })}
            </span>
        },
        // Cell: ({ value }) => <span>yess</span>,
        // return <div><span>ok</span><span>ok2</span></div>

    },
    { //this is hidden in table and only used for coloring the judges
        Header: 'Status',
        accessor:'status',
    },  
    {
        Header: 'Time left',
        accessor:'timeLeft',
        Cell: ({row, value }) => { //because I need access to another column I add 'row'
            //we make an array out of judges to give it custom styling
            let singleJudgeStyle =""
            return <span>
                    {value.map((singleVal,index) => {
                        if(singleVal==='done') {
                            singleJudgeStyle="days-left-done"
                        } else if(singleVal.split(',')[1]==='green') {
                            singleJudgeStyle="days-left-green"
                        } else if(singleVal.split(',')[1]==='red') {
                            singleJudgeStyle="days-left-red"
                        }
                        
                        return <span className={singleJudgeStyle} key={index}>{singleVal==='done'? singleVal:singleVal.split(',')[0]+' days left'}  </span>
                    })}
            </span>
        }, 
 

    }, 
    { 
        Header: 'Score',
        accessor:'scores',
        Cell:({value}) => {
            if(!value.includes('N/A')) {
                var ScoresArr = value.split(',').map(Number)
                function getAvg(grades) {
                    const total = grades.reduce((acc, c) => acc + c, 0);
                    return total / grades.length;
                  }
                var finalScore=getAvg(ScoresArr).toFixed(2)
                return <span>{finalScore}</span>
            } else {
                return <span>N/A</span>
            }
        },
    },            
    ]
    
export const myPaperColumnsData = [

{
    Header: 'Id',
    accessor:'id',
},
{
    Header: 'Title',
    accessor:'title',
},
{
    Header: 'Authors',
    accessor:'authors',
},    
    
]
            