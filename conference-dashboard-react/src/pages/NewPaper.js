import React,{ useState,useRef } from 'react'

import { Link, Navigate } from 'react-router-dom';
import {Alert} from 'react-bootstrap'
import axios from 'axios'
import {fieldData, methodOfPresentationData, languageData, authorData} from '../data/FormData'
//import ReactTable from "react-table";
function NewPaper(props) {
  const user = JSON.parse(localStorage.getItem("user"))
  const Papers = props.isOpen ? "new-paper-content open" : "new-paper-content";
  const [inputTitle, setInputTitle] = useState();
  const [field, setField] = useState();
  const [methodOfPresentation, setMOP] = useState();
  const [language, setLanguage] = useState();
  const [uploadedFile, setUploadedFile] = useState();
  const [abstract, setAbstract] = useState();
  const [numberOfPages, setNumberOfPages] = useState();
  const [error, setError] = useState("");
  //console.log(uploadedFile)
  //=========Author input ===========
  const [authorList, setAuthorList] = useState([user.username]);
  //console.log(authorList)
  const handleAuthorChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...authorList];
    list[index] = value;
    setAuthorList(list);
  };

  const handleAuthorRemove = (index) => {
    const list = [...authorList];
    list.splice(index, 1);
    setAuthorList(list);
  };

  const handleAuthorAdd = () => {
    setAuthorList([...authorList, ""]);
  };
  
  //===========handle Submit=============

  const handleSubmit = (evt) => {
      evt.preventDefault();
      let authors = authorList[0]
      for (let i = 1; i < authorList.length; i++) {
        authors += "," + authorList[i]
      }


      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
            
        }
      }
      const result = axios.post(
        'http://127.0.0.1:8000/addPaper',
        {
          'authors': authors,
          'language': language,
          'NOM': numberOfPages,
          'field': field,
          'title':inputTitle,
          'summary':abstract,
          'paperFile':uploadedFile,
          'MOP':methodOfPresentation,

         }
        , config
      ).then((response) => response)
      .then((response) => {
        if(response.data === 'This title has already been registered.'){
            setError(response.data)
        }else{
          setError("Your paper has been submited.")
        }
      })
  }



  
  //redirect if the user is not authenticated
  return ((!user)? <Navigate to="/signup"/> :
    <div className={Papers}>
        <h3>Add new paper</h3>
        {error==='This title has already been registered.' && 
                 <Alert variant='danger'>{error}</Alert>
                }
        {error==="Your paper has been submited." && 
                 <Alert variant='success'>{error}</Alert>
                }
        <form onSubmit={handleSubmit}>
            <div class="row mb-3">
                <label for="inputTitle" class=" col-2 col-form-label">Title</label>
                <div class="col-8" >
                  <input type="textarea" class="form-control" value={inputTitle}
                  onChange={e => setInputTitle(e.target.value)}
                  />
                </div>
            </div>

            <div class="row mb-3">
              <label for="inputTitle" class="col-sm-2 col-form-label">Author</label>
              <div class="col-sm-10">
                
                {authorList.map((singleAuthor, index) => (
                  <div class="col-sm-10" key={index} >
                    <div class="input-group mb-3">
                      <select class="form-select"
                        value={singleAuthor}
                        onChange={(e) => handleAuthorChange(e, index)}
                        required
                      >
                        <option value="" selected disabled hidden>Choose author...</option>
                        {authorData.map(( item ) => (
                          <option value={item}> {item} </option>
                          )
                        )}
                      </select> 
                      {authorList.length !== 1 && (
                        <button class="btn btn-outline-secondary" type="button" id="button-remove" 
                          onClick={() => handleAuthorRemove(index)}
                          
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div>
                      {/*  maximum number of authers is 4 */}
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
            <label for="inputTitle" class="col-sm-2 col-form-label" >field</label>
              <div class="col-sm-10">
                <select class="form-select" aria-label="Default select example" 
                value={field} onChange={(e) => setField(e.target.value)}
                >
                	<option value="" selected disabled hidden>Choose field...</option>
                  {fieldData.map(( item ) => (
                    <option value={item.value}> {item.title} </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div class="row mb-3">
            <label for="inputTitle" class="col-sm-2 col-form-label" >method of presentation</label>
              <div class="col-sm-10">
                <select class="form-select" aria-label="Default select example" 
                value={methodOfPresentation} onChange={(e) => setMOP(e.target.value)}
                >
                  <option value="" selected disabled hidden>Choose method...</option>
                  {methodOfPresentationData.map(( item ) => (
                    <option value={item.value}> {item.title} </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div class="row mb-3">
            <label for="inputTitle" class="col-sm-2 col-form-label">language</label>
              <div class="col-sm-10">
              <select class="form-select" aria-label="Default select example" 
                value={language} onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="" selected disabled hidden>Choose language...</option>
                  {languageData.map(( item ) => (
                    <option value={item.value}> {item.title} </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div class="row mb-3">
              <label for="formFile" class="col-sm-2 col-form-label">paper file</label>
              <div class="col-sm-10"><input class="form-control" type="file" 
              onChange={e => setUploadedFile(e.target.files[0])}
              /></div>
            </div>

            <div class="row mb-3">
            <label for="inputTitle" class="col-sm-2 col-form-label">Abstract</label>
              <div class="col-sm-10">
                <textarea class="form-control"  rows="3" 
                onChange={e => setAbstract(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div class="row mb-3">
            <label for="inputTitle" class="col-sm-2 col-form-label">number of pages</label>
              <div class="col-sm-10 form-outline">
                <input type="number" id="typeNumber" class="form-control" 
                onChange={e => setNumberOfPages(e.target.value)}
                />
              </div>
            </div>

            <button class="btn btn-primary" type="submit">Add paper</button>
        </form>
    </div>
  )
}

export default NewPaper
