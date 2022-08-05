import React from 'react';
import {MdClear} from  "react-icons/md";

export const ColumnFilter = ({filter,setFilter}) => {
    var pendingAcceptButton =(filter && filter.includes('accept'))? "judge-pending-accept pushed-button" :"judge-pending-accept button"; 
    var pendingJudgmentButton =(filter && filter.includes('no feedback'))? "judge-pending-judgment pushed-button" :"judge-pending-judgment button"; 
    var judgedButton =(filter && filter.includes('sent feedback'))? "judge-judged pushed-button" :"judge-judged button"; 
  
    var daysLeftGreen =(filter && filter.includes('green'))? "days-left-green pushed-button" :"days-left-green button"; 
    var daysLeftRed =(filter && filter.includes('red'))? "days-left-red pushed-button" :"days-left-red button";    
    var daysLeftDone =(filter && filter.includes('done'))? "days-left-done pushed-button" :"days-left-done button";       
	return(
		<div>
            <div> 
                <span> Judge State: </span>
                <span >
                     <button className={pendingAcceptButton} value='accept' onClick={(e) => setFilter(e.target.value)}>
                        pending accept
                    </button>
                </span>&nbsp;
                <span> 
                    <button value='no feedback' className={pendingJudgmentButton} onClick={e => setFilter(e.target.value)}>
                        pending judgment
                    </button>
                </span>&nbsp;
                <span >
                    <button value='sent feedback' className={judgedButton} onClick={e => setFilter(e.target.value)}>
                        judged
                    </button>
                </span>&nbsp;
            
            
                <span> Days Left: </span>
                <span> 
                    <button value='green' className={daysLeftGreen} onClick={e => setFilter(e.target.value)}>
                        normal days left
                    </button>
                </span>&nbsp;
                <span>
                    <button value='red' className={daysLeftRed} onClick={e => setFilter(e.target.value)}>
                        extra days left
                    </button>
                </span>&nbsp;
                <span> 
                    <button value='done' className={daysLeftDone} onClick={e => setFilter(e.target.value)}>
                        done
                    </button>
                </span>&nbsp;
                <span>
                    <button  value='' className='clear-filter' onClick={e => setFilter(e.target.value)}>
                        <MdClear />
                    </button>
                </span>
            </div>
			{/* <div  class="form-group has-search">
				<span class="fa fa-search form-control-feedback"> <MdSearch /></span>
				<input id='searchInput' class='form-control' value={filter || ''}
				onChange = {e => setFilter(e.target.value)} placeholder='search name, author,...' />
				
			</div> */}
		</div>
	)
 }