import React from 'react';
export const GlobalFilter = ({filter,setFilter}) => {
	return(
		<div  class="row mb-3">
			<label for="inputTitle" class=" col-sm-2 col-lg-1 col-form-label"><h5>Search:</h5></label>

			<div  class="col-sm-5">
				<input id='searchInput' class='form-control' value={filter || ''}
				onChange = {e => setFilter(e.target.value)} />
			</div>
		</div>
	)
 }