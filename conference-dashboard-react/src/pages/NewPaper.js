import React,{ useState } from 'react'
import { PapersData } from '../components/PapersData';
import { Link } from 'react-router-dom';
//import ReactTable from "react-table";
function NewPaper(props) {
  const Papers = props.isOpen ? "new-paper-content open" : "new-paper-content";
  
  const [authorList, setAuthorList] = useState([{ authorName: "" }]);

  const handleAuthorChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...authorList];
    list[index][name] = value;
    setAuthorList(list);
  };

  const handleAuthorRemove = (index) => {
    const list = [...authorList];
    list.splice(index, 1);
    setAuthorList(list);
  };

  const handleAuthorAdd = () => {
    setAuthorList([...authorList, { authorName: "" }]);
  };

  //console.log(authorList)
  return (
    <div className={Papers}>
        <h3>Add new paper</h3>
        <form>
            <div class="row mb-3">
                <label for="inputTitle" class=" col-2 col-form-label">Title</label>
                <div class="col-8" >
                  <input type="textarea" class="form-control" id="inputTitle"/>
                </div>
            </div>

            <div class="row mb-3">
              <label for="inputTitle" class="col-sm-2 col-form-label">Author</label>
              <div class="col-sm-10">
                
                {authorList.map((singleService, index) => (
                  <div class="col-sm-10" key={index} >
                    <div class="input-group mb-3">
                      <input class="form-control"
                        name="authorName"
                        type="text"
                        id="authorName"
                        value={singleService.authorName}
                        onChange={(e) => handleAuthorChange(e, index)}
                        required
                      />
                      {authorList.length !== 1 && (
                        <button class="btn btn-outline-secondary" type="button" id="button-remove" 
                          onClick={() => handleAuthorRemove(index)}
                          
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div>
                      {authorList.length - 1 === index && authorList.length < 4 && (
                          <button
                          class="btn btn-outline-secondary" type="button" id="button-addon2" 
                            onClick={handleAuthorAdd}                            
                          >
                            Add
                          </button>
                      )}

                    </div>

                  </div>
                ))}
              </div>
            </div>          

            <div class="row mb-3">
            <label for="inputTitle" class="col-sm-2 col-form-label">field</label>
              <div class="col-sm-10">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
            <label for="inputTitle" class="col-sm-2 col-form-label">method of presentation</label>
              <div class="col-sm-10">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
            <label for="inputTitle" class="col-sm-2 col-form-label">language</label>
              <div class="col-sm-10">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
              <label for="formFile" class="col-sm-2 col-form-label">paper file</label>
              <div class="col-sm-10"><input class="form-control" type="file" id="formFile" /></div>
            </div>

            <div class="row mb-3">
            <label for="inputTitle" class="col-sm-2 col-form-label">Abstract</label>
              <div class="col-sm-10">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
            </div>

            <div class="row mb-3">
            <label for="inputTitle" class="col-sm-2 col-form-label">number of pages</label>
              <div class="col-sm-10 form-outline">
                <input type="number" id="typeNumber" class="form-control" />
              </div>
            </div>

            <button type="submit" class="btn btn-primary">Sign in</button>
        </form>
    </div>
  )
}

export default NewPaper
