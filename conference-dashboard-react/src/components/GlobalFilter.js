import React from 'react';
import {MdSearch} from  "react-icons/md";

export const GlobalFilter = ({filter,setFilter}) => {
	return(
		<div  class="row mb-3">

			<div  class="form-group has-search">
				<span class="fa fa-search form-control-feedback"> <MdSearch /></span>
				<input id='searchInput' class='form-control'
				onChange = {e => setFilter(e.target.value)} placeholder='search name, author,...' />
				
			</div>
		</div>
	)
 }