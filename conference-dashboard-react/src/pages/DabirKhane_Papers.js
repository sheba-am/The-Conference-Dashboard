import React from 'react'

function DabirKhane_Papers() {
  return (
    <div>
        <div>         
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" data-bs-toggle="tab" href="#menu0">All</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#menu1">Pending Approval</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#menu2">Pending Revise</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#menu3">Aprroved</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#menu4">Rejected</a>
            </li>
          </ul>

          <div class="tab-content">
            <div id="menu0" class="container tab-pane active"><br />
              <h3>All</h3>
            </div>
            <div id="menu1" class="container tab-pane fade"><br />
              <h3>Pending Aprroval</h3>

            </div>
            <div id="menu2" class="container tab-pane fade"><br />
              <h3>Pending Revise</h3>

            </div>
            <div id="menu3" class="container tab-pane fade"><br />
              <h3>Aprroved</h3>

            </div>
            <div id="menu4" class="container tab-pane fade"><br />
              <h3>Rejected</h3>

            </div>
          </div>
        </div>        
    </div>
  )
}

export default DabirKhane_Papers