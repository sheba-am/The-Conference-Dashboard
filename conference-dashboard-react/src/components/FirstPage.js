import React from 'react'
import { Link, Navigate } from 'react-router-dom';
function FirstPage() {
  return (
    <div> 
        <div>
            FirstPage
        </div>
        <div>
        <Link to='/signup'  class="btn btn-primary">
        signup
        </Link>
        <Link to='/dashboard/'  class="btn btn-primary">
        dashboard
        </Link>        
        </div>
    </div>
  )
}

export default FirstPage