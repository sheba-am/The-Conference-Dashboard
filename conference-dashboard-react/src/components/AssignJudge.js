import React, { useRef, useState, useEffect, useContext } from 'react'
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
import { authorData} from '../data/FormData'

export default function AssignJudge(props) {
    //const {selectedPaper,setSelectedPaper} =useContext(PaperContext)
    var selectedPaper = JSON.parse(localStorage.getItem("selectedPaper")); //retrieve the object
    const user = JSON.parse(localStorage.getItem("user"))
    const [judges,setJudges] = useState()
  //=========Judges input ===========
    //we extract judge names from the data
    var judgeNames=[]  ;
    for (let i = 0; i < props.JudgeData.length; i++) {
        judgeNames.push(props.JudgeData[i]["judge"])
    }
  const [judgeList, setjudgeList] = useState(judgeNames);
  const handleJudgeChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...judgeList];
    list[index] = value;
    setjudgeList(list);
  };

  const handleJudgeRemove = (index) => {
    const list = [...judgeList];
    list.splice(index, 1);
    setjudgeList(list);
  };

  const handleJudgeAdd = () => {
    setjudgeList([...judgeList, ""]);
  };
    useEffect(() => {
        const config = {
            headers: {
                'Content-type': 'application/json',
                
            }
          }
          const result = axios.post(
              'http://127.0.0.1:8000/viewJudges',
              {'field':selectedPaper.field}
              ,config
            ).then((response) => response)
            .then((response) => {
                setJudges(response.data)
          })

      },[]);
 // ========== Submit ===========
      const handleSubmit = (evt) => {
        let selectedJudges = ""
        evt.preventDefault();
        // for (let i = 0; i < judges.length; i++) {
        //     var checkbox = document.getElementById(judges[i].username);
        //     if(checkbox.checked){
        //         selectedJudges += checkbox.value + "," 
        //     }
        //   }
        for (let i = 0; i < judgeList.length; i++) {
            selectedJudges+=judgeList[i]+",";

        } 
        console.log("newjudge",selectedJudges)
          const config = {
            headers: {
                'Content-type': 'application/json',
                
            }
          }
          const result = axios.post(
              'http://127.0.0.1:8000/assignJudge',
              {'judges': selectedJudges, 'title':selectedPaper.title}
              ,config
            ).then((response) => response)
            .then((response) => {
                console.log("assign response",response)
          })
      } 

      return (
        <div>
           <h3>Judges</h3>
           <form onSubmit={handleSubmit}>
                <div class="row mb-3">
                    <label for="inputTitle" class="col-sm-2 col-form-label">Author</label>
                    <div clsass="col-sm-10">
                        
                        {judgeList.map((singleAuthor, index) => (
                        <div class="col-sm-10" key={index} >
                            <div class="input-group mb-3">
                            <select class="form-select"
                                value={singleAuthor}
                                onChange={(e) => handleJudgeChange(e, index)}
                                required
                            >
                                <option value="" selected disabled hidden>Choose judge...</option>
                                {authorData.map(( item ) => (
                                <option value={item}> {item} </option>
                                )
                                )}
                            </select> 
                            {judgeList.length !== 1 && (
                                <button class="btn btn-outline-secondary" type="button" id="button-remove" 
                                onClick={() => handleJudgeRemove(index)}
                                
                                >
                                Remove
                                </button>
                            )}
                            </div>
                            <div>
                            {/*  maximum number of authers is 4 */}
                            {judgeList.length - 1 === index && judgeList.length < 4 && (
                                <button
                                class="btn btn-outline-secondary" type="button" id="button-addon2" 
                                    onClick={handleJudgeAdd}                            
                                >
                                    Add
                                </button>
                            )}

                            </div>

                        </div>
                        ))}
                    </div>
                    </div> 
                <button class="btn btn-primary" type="submit">SaveChanges</button>
                {/* this is a test button to switch to judges table */}
                <button class="btn btn-primary" onClick={props.toggleEditJudges}>close edit</button>
            </form>
           
        </div>
     )
}