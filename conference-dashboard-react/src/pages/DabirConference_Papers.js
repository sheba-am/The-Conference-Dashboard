import React from 'react'
import PapersTable from '../components/PapersTable'
function DabirConference_Papers({columns, papersData}) {
  return (
    <div>
        {papersData ? <PapersTable columns={columns} data={papersData} />:<h2>Loading...</h2>}        
    </div>
  )
}

export default DabirConference_Papers