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
                        let singleJudgeStyle ="judge-pending-accept"
                        if(statusArr[index]==='not accepted') {
                            singleJudgeStyle="judge-pending-accept"
                        } else if(statusArr[index]==='accepted') {
                            singleJudgeStyle="judge-pending-judgment"
                        }
                        return <span className={singleJudgeStyle} key={index}>{singleVal}  </span>
                    })}
            </span>
        },
        // Cell: ({ value }) => <span>yess</span>,
        // return <div><span>ok</span><span>ok2</span></div>

    },
    {
        Header: 'Status',
        accessor:'status',
    },          
    ]
    