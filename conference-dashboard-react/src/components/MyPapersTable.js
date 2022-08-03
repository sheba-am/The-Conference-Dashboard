import React , {useContext, useState, useEffect}from 'react'

import { Link, Navigate } from 'react-router-dom';
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
import { Container } from 'react-bootstrap';
import {useTable, useGlobalFilter, usePagination,Row, Tabs,Tab} from 'react-table';
import {columnsData} from '../data/columns';
import { GlobalFilter } from './GlobalFilter';
import {MdFirstPage, MdLastPage, MdNavigateBefore, MdNavigateNext} from  "react-icons/md";
function MyPapersTable({ columns, data , myPaper}) {
    const user = JSON.parse(localStorage.getItem("user"))
  
    const showDetails = (selected) => {
      localStorage.setItem("selectedPaper", JSON.stringify(selected))
      // alert(a.id);
      console.log("context",selected)
      // setSelectedPaper(selected)
    }
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      state, 
      setGlobalFilter,
      page, // Instead of using 'rows', we'll use page,
      // which has only the rows for the active page
  
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable({
      columns,
      data,
      initialState: { pageIndex: 0 },
    },useGlobalFilter, usePagination)
  
    const {globalFilter} = state
    const isTableEmpty = data && data.length >0 ? "table papers-table justify-content-center  table-hover align-middle" : "table papers-table-empty justify-content-center  table-hover align-middle";
    // Render the UI for your table
    return (
      <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
  
      <div id='papers-table' class="table-responsive-md">
        <pre>
          <code>
            { /*JSON.stringify(
              {
                pageIndex,
                pageSize,
                pageCount,
                canNextPage,
                canPreviousPage,
              },
              null,
              2
            ) */}
          </code>
        </pre>        
        <table class={isTableEmpty} {...getTableProps()}>
          <thead class='papers-table-header'>
            {headerGroups.map(headerGroup => (
              <tr class="float-right " {...headerGroup.getHeaderGroupProps()}>
                <th scope="col-1" class='papers-table-header-item'>#</th>
                {headerGroup.headers.map(column => (
                  <th scope="col" class='papers-table-header-item' {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
                  { (!myPaper && ( user.status==="judge" || user.status==="dabirconference" ) )
                    && <th scope="col-1"  class='papers-table-header-item'>Feedback</th>
                  }                  
                  {/* <th scope="col">Score</th> */}
                  { myPaper &&<th scope="col-1"  class='papers-table-header-item'>More</th>}
                  { (!myPaper && user.status!=="judge" )  &&<th scope="col-1"  class='papers-table-header-item'>More</th>}

              </tr>
            ))}
          </thead>
          <tbody class="papers-table-body" {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row)
              return (
                <tr key={index} {...row.getRowProps()}>
                  <th scope="row" class='col-1 table-index'>{index+1}</th>
                  {row.cells.map(cell => {
                    return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                  
                  
                    {//when viewing their own paper 
                      myPaper &&
                      <td  class='col-1'>
                         <Link to='/dashboard/my-paper-details' class="btn btn-primary details-btn" onClick={() => showDetails(row.original)}>
                            ...
                        </Link>
                      </td>
                    }
                    { //when user is a judge and is veiwing assigned papers to them
                      (!myPaper && ( user.status==="judge" || user.status==="dabirconference" ) ) &&
                      <td  class='col-1'>
                        <Link to='/dashboard/send-feedback' class="btn btn-primary  send-feedback-btn" onClick={() => showDetails(row.original)}>
                            Send Feedback
                        </Link>
                      </td>
                    }                    
                    { /* when other users are viewing the papers */
                      (!myPaper && user.status!=="judge" ) && <td>
                        <Link to='/dashboard/paper-details' class="btn btn-primary details-btn" onClick={() => showDetails(row.original)}>
                            ...
                        </Link>
                      </td>
                    }

                  
                  
        

                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="pagination justify-content-center ">
          <button class='btn page-button' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <MdFirstPage />
          </button>{' '}
          <button class='btn page-button' onClick={() => previousPage()} disabled={!canPreviousPage}>
            <MdNavigateBefore />
          </button>{' '}

          <span>
            Page{' '}
              {pageIndex + 1} of {pageOptions.length}
            
          </span>
          <button class='btn page-button' onClick={() => nextPage()} disabled={!canNextPage}>
            <MdNavigateNext />
          </button>{' '}
          <button class='btn page-button' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            <MdLastPage />
          </button>{' '}          
          {/* <span>
            Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select 
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select> */}
        </div>        
      </div>
      </>
    )
  }
export default MyPapersTable;