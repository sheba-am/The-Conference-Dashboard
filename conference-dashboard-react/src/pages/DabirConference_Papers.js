import React from 'react'
import MyPapersTable from '../components/MyPapersTable'
function DabirConference_Papers({columns, papersData}) {
  return (
    <div>
        {papersData ? <MyPapersTable columns={columns} data={papersData} />:<h2>Loading...</h2>}        
    </div>
  )
}

export default DabirConference_Papers