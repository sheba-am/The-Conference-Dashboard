import React from 'react'
import PapersTable from '../components/PapersTable'
import { Link } from 'react-router-dom';
function Standard_Papers({papersData, columns}) {
  return (
    <div>
        <Link to='/dashboard/new-paper'  class="btn add-paper-btn" >
          +New Paper
        </Link>
          <div>
            {papersData ? <PapersTable columns={columns} data={papersData} />:<h2>Loading...</h2>}
          </div>
                
    </div>
  )
}

export default Standard_Papers