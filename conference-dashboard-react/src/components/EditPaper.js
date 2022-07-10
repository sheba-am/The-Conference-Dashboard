import React,{ useState,useRef,useContext} from 'react'
import { PapersData } from '../components/PapersData';
import { Link } from 'react-router-dom';
//import ReactTable from "react-table";
import { PaperContext } from '../contexts/PaperContext';
function NewPaper(props) {
  const {selectedPaper,setSelectedPaper} =useContext(PaperContext)

  const Papers = props.isOpen ? "new-paper-content open" : "new-paper-content";
  const [inputTitle, setInputTitle] = useState(selectedPaper.title);
  const [field, setField] = useState(selectedPaper.field);
  const [methodOfPresentation, setMOP] = useState(selectedPaper.method_of_presentation);
  const [language, setLanguage] = useState(selectedPaper.language);
  const [uploadedFile, setUploadedFile] = useState();
  const [abstract, setAbstract] = useState(selectedPaper.abstract);
  const [numberOfPages, setNumberOfPages] = useState(selectedPaper.number_of_pages);
  console.log(uploadedFile)
  //=========Author input ===========
  const [authorList, setAuthorList] = useState(selectedPaper.authors);

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
  
  //===========handle Submit=============

  const handleSubmit = (evt) => {
      evt.preventDefault();
      alert(`Submitting  ${inputTitle} ${authorList[0]["authorName"]} ${field} ${methodOfPresentation}
      ${language} ${abstract} ${numberOfPages} `)
  }
  

  
  return (
    <div className={Papers}>
        <h3>Add new paper</h3>
        <form onSubmit={handleSubmit}>
            <div class="row mb-3">
                <label for="inputTitle" class=" col-2 col-form-label">Title</label>
                <div class="col-8" >
                  <input type="textarea" class="form-control"  value={inputTitle}
                  onChange={e => setInputTitle(e.target.value)}
                  />
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
            <label for="inputTitle" class="col-sm-2 col-form-label" >field</label>
              <div class="col-sm-10">
                <select class="form-select" aria-label="Default select example" 
                value={field} onChange={(e) => setField(e.target.value)}
                >
                  <option selected>{field}</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
            <label for="inputTitle" class="col-sm-2 col-form-label" >method of presentation</label>
              <div class="col-sm-10">
                <select class="form-select" aria-label="Default select example" 
                value={methodOfPresentation} onChange={(e) => setMOP(e.target.value)}
                >
                  <option selected>{methodOfPresentation}</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
            <label for="inputTitle" class="col-sm-2 col-form-label">language</label>
              <div class="col-sm-10">
              <select class="form-select" aria-label="Default select example" 
                value={language} onChange={(e) => setLanguage(e.target.value)}
                >
                  <option selected>{language}</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
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
                <textarea class="form-control"  rows="3" value={abstract}
                onChange={e => setAbstract(e.target.value)}
                >{abstract}</textarea>
              </div>
            </div>

            <div class="row mb-3">
            <label for="inputTitle" class="col-sm-2 col-form-label">number of pages</label>
              <div class="col-sm-10 form-outline">
                <input type="number" id="typeNumber" class="form-control" value={numberOfPages}
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
