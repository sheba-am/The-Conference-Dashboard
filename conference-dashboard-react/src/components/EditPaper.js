import React,{ useState,useRef,useContext, useEffect} from 'react'
import {fieldsData, methodOfPresentationData, languageData} from '../data/FormData'
import { Link, Navigate ,useNavigate} from 'react-router-dom';
//import ReactTable from "react-table";
import { PaperContext } from '../contexts/PaperContext';
import { MdArrowBackIosNew } from "react-icons/md";
import axios from 'axios'
function NewPaper(props) {
  const {selectedPaper,setSelectedPaper} =useContext(PaperContext)
  var paper = JSON.parse(localStorage.getItem("selectedPaper")); //retrieve the object
  const user = JSON.parse(localStorage.getItem("user"))
  const Papers = props.isOpen ? "content open" : "content";
  const [inputTitle, setInputTitle] = useState(paper.title);
  const [authorData, setAuthorData] = useState([])
  const [field, setField] = useState(paper.field);
  const [methodOfPresentation, setMOP] = useState(paper.MOP);
  const [language, setLanguage] = useState(paper.language);
  const [uploadedFile, setUploadedFile] = useState(paper.paperFile);
  const [abstract, setAbstract] = useState(paper.summary);
  const [numberOfPages, setNumberOfPages] = useState(paper.NOM);
  const [error, setError] = useState("");
// ========== Get all users from server===============
  const users = []
  // const [names, setNames] = useState([])
  // const [usernames, setUsernames] = useState([])
  useEffect(() => {
  const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
            
        }
      }
    axios.post(
        'http://127.0.0.1:8000/getUsers'
        , config
      ).then((response) => response)
      .then((response) => {
        console.log(response.data)
        for (let i = 0; i < response.data.length; i++) {
            users.push(response.data[i].username + "(" + response.data[i].first_name + " " + response.data[i].last_name + ")")
            
        }
        if(authorData.length === 0){
          setAuthorData(users)
        }
      })
  },[])

 // ======Change Field=====
 function ChangeField(e) {
  //when we change field we need to clear subfield
  setField(e)
  setSubFieldList([''])
}  
  //=========subfield input ===========
  const [subFieldList, setSubFieldList] = useState(paper.subfields.split(','));
  const dynamicSubField = subFieldList.length == 1 ? "one-author-select": "author-select";
  const handleSubFieldChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...subFieldList];
    list[index] = value;
    setSubFieldList(list);
  };

  const handleSubFieldRemove = (index) => {
    const list = [...subFieldList];
    list.splice(index, 1);
    setSubFieldList(list);
  };

  const handleSubFieldAdd = () => {
    setSubFieldList([...subFieldList, ""]);
  };
      
  //=========Author input ===========

  const [authorList, setAuthorList] = useState(paper.authors.split(","));
  const dynamicAuthor = authorList.length == 1 ? "one-author-select": "author-select";
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
  let navigate = useNavigate(); 
  const handleSubmit = (evt) => {
      evt.preventDefault();
      let authors = authorList[0].split("(")[0]
      for (let i = 1; i < authorList.length; i++) {
        authors += "," + authorList[i].split("(")[0]
      }
      



      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
            
        }
      }
      const result = axios.post(
        'http://127.0.0.1:8000/editPaper',
        {
          'id':paper.id,
          'username':authors,
          'authors': authors,
          'language': language,
          'NOM': numberOfPages,
          'field': field,
          'subfields':subFieldList.toString(),
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
          const newPapers = JSON.stringify(response.data)
          const prevSelected = JSON.parse(localStorage.getItem("selectedPaper"))
          for (let i = 0; i < response.data.length; i++) {
            console.log(response.data[i].id)
            console.log(prevSelected.id)
            if(response.data[i].id === prevSelected.id){
              localStorage.setItem("selectedPaper", JSON.stringify(response.data[i]))
            }
          }
          localStorage.setItem("papers", newPapers)
          navigate('/dashboard/my-papers')
        }
      })
      const approval_result =(paper && paper.dabirKhane && paper.dabirKhane.includes('revised') )&& axios.post(
        'http://127.0.0.1:8000/dabirkhaneApproval',
        {'title':paper.title,'approval':'pending'}
        ,config
        ).then((response) => response)
        .then((response) => {
            //put the new data into local storage 
            localStorage.setItem("selectedPaper", JSON.stringify(response.data))
            
    })
  }

  //redirect if the user is not authenticated
  return ((!user)? <Navigate to="/signup"/> :
    <div className={Papers}>
      <div id='edit-paper' class='container "w-100 shadow p-3 mb-5 bg-white rounded"'>
          <div class='row'>
            <div class='col-lg-1 col-md-1 col-sm-2 '>
              <Link to='/dashboard/my-paper-details' class="btn edit-paper-button">
                  <MdArrowBackIosNew />
              </Link>
            </div>
            <div class='col'>
              <h3>Edit paper</h3>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
              <div class="row mb-3">
                  <label class=" col-2 col-form-label">Title</label>
                  <div class="col-sm-10" >
                    <input type="textarea" class="form-control"   value={inputTitle}
                    onChange={e => setInputTitle(e.target.value)}
                    />
                  </div>
              </div>
              <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Author</label>
                <div class="col-sm-10">
                    {/* we map a list of selectboxes in which we can choose authors from */}      
                  {authorList.map((singleAuthor, index) => (
                    <div  key={index} >
                      <div class="input-group mb-3">
                        <select class="form-select "
                            id={dynamicAuthor}
                            onChange={(e) => handleAuthorChange(e, index)}
                            required
                          >
                            <option value={singleAuthor} selected disabled hidden>
                          {   authorData[authorData.findIndex(element => element.includes(singleAuthor))]}
                              </option>
                            {authorData.map(( item ) => (
                              <option value={item}> {item} </option>
                              )
                            )}
                          </select>
                        {authorList.length !== 1 && (
                          <button id="button-remove" class="btn btn-outline-secondary" type="button" 
                            onClick={() => handleAuthorRemove(index)}
      
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div>
                        {authorList.length - 1 === index && authorList.length < 4 && (
                            <button
                            class="btn " type="button" id="button-addon2"
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
                <label class="col-sm-2 col-form-label" >field</label>
                <div class="col-sm-10">
                  <select class="form-select edit-paper-select" aria-label="Default select example"
                  value={field} onChange={(e) => ChangeField(e.target.value)}
                  >
                    <option defaultValue={field} disabled hidden></option>
                    {fieldsData.map(( item ) => (
                      <option value={item.value}> {item.label} </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-2 col-form-label" >subfield</label>
                <div class="col-sm-10">
                  {subFieldList.map((singlesubfield, index) => (
                      <div key={index} >
                        <div class="input-group mb-3">
                          <select class="form-select" 
                            id={dynamicSubField}
                            value={singlesubfield}
                            onChange={(e) => handleSubFieldChange(e, index)}
                            required
                          >
                            <option value="" selected disabled hidden>Choose subfield...</option>
                            {field && fieldsData.find((single) => single.value ===field).subfields.map(( item ) => (
                              <option value={item.value}> {item.label} </option>
                              )
                            )}
                          </select>
                          {subFieldList.length !== 1 && (
                            <button class="btn btn-outline-secondary" type="button" id="button-remove"
                              onClick={() => handleSubFieldRemove(index)}
        
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div>
                          {/*  maximum number of authers is 4 */}
                          {subFieldList.length - 1 === index && subFieldList.length < 4 && (
                              <button
                              class="btn btn-outline-secondary" type="button" id="button-addon2"
                                onClick={handleSubFieldAdd}
                              >
                                Add
                              </button>
                          )}
                        </div>
                      </div>
                    ))}                  
                  {/* <select class="form-select edit-paper-select" aria-label="Default select example"
                  value={subField} onChange={(e) => setSubField(e.target.value)}
                  >
                    <option value="" selected disabled hidden>Choose subfield...</option>
                    {field && fieldsData.find((single) => single.value ===field).subfields.map(( item ) => (
                      <option value={item.value}> {item.label} </option>
                      )
                    )}
                  </select> */}
                </div>
              </div>              
              <div class="row mb-3">
              <label class="col-sm-2 col-form-label" >method of presentation</label>
                <div class="col-sm-10">
                  <select class="form-select edit-paper-select" aria-label="Default select example"
                  value={methodOfPresentation} onChange={(e) => setMOP(e.target.value)}
                  >
                    <option defaultValue={methodOfPresentation} disabled hidden></option>
                    {methodOfPresentationData.map(( item ) => (
                      <option value={item.value}> {item.label} </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div class="row mb-3">
              <label class="col-sm-2 col-form-label">language</label>
                <div class="col-sm-10">
                <select class="form-select edit-paper-select" aria-label="Default select example"
                  value={language} onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option defaultValue={language} disabled hidden ></option>
                    {languageData.map(( item ) => (
                      <option value={item.value}> {item.label} </option>
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
              <label  class="col-sm-2 col-form-label">Abstract</label>
                <div class="col-sm-10">
                  <textarea class="form-control edit-paper-select"  rows="3" value={abstract}
                  onChange={e => setAbstract(e.target.value)}
                  >{abstract}</textarea>
                </div>
              </div>
              <div class="row mb-3">
              <label class="col-sm-2 col-form-label">number of pages</label>
                <div class="col-sm-10 form-outline">
                  <input type="number" id="typeNumber" class="form-control" value={numberOfPages}
                  onChange={e => setNumberOfPages(e.target.value)}
                  />
                </div>
              </div>
              <button class="btn btn-primary edit-paper-submit" type="submit">Edit paper</button>
          </form>
      </div>
    </div>
  )
}

export default NewPaper
