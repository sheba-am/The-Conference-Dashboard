import React, { useRef, useState, useEffect, useContext } from 'react'
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
import { authorData} from '../data/FormData'

export default function AssignJudge(props) {
    //const {selectedPaper,setSelectedPaper} =useContext(PaperContext)
    var selectedPaper = JSON.parse(localStorage.getItem("selectedPaper")); //retrieve the object
    const user = JSON.parse(localStorage.getItem("user"))
    // we get list of all relevant judges from server to show in select box
    const [judges,setJudges] = useState()
    var judgeNameData =[]
    if (judges && judges.length>0  ){
        for (let i = 0; i <judges.length; i++) {
            judgeNameData.push(judges[i]["username"])
        }
    }    

  //=========Judges input ===========
    //we extract judge names from the data
    var assignedJudgeNames=[]  ;
    // if the judges already exist we need to load them
    if (props.assignedJudgeData && props.assignedJudgeData.length>0  ){
        for (let i = 0; i < props.assignedJudgeData.length; i++) {
            assignedJudgeNames.push(props.assignedJudgeData[i]["judge"])
        }
    } else {
        assignedJudgeNames=[""]
    }
console.log(assignedJudgeNames)
  const [newJudgeList, setnewJudgeList] = useState(assignedJudgeNames);
  const handleJudgeChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...newJudgeList];
    list[index] = value;
    setnewJudgeList(list);
  };

  const handleJudgeRemove = (index) => {
    console.log('deleted',newJudgeList[index])
    const list = [...newJudgeList];
    list.splice(index, 1);
    setnewJudgeList(list);
  };

  const handleJudgeAdd = () => {
    setnewJudgeList([...newJudgeList, ""]);
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
                console.log("viewJudges response")
                console.log(response.data)
                setJudges(response.data)
          })

      },[]);
 // ========== Submit ===========
      const handleSubmit = (evt) => {
        //evt.preventDefault();
        //we need to compare new judges and the prev one to see which judge was removed/added
        var removedJudges = assignedJudgeNames.filter(x => !newJudgeList.includes(x))
        var addedJudges = newJudgeList.filter(x => !assignedJudgeNames.includes(x))
        let strAddedJudges = ""        
        for (let i = 0; i < addedJudges.length; i++) {
            strAddedJudges+=addedJudges[i]+",";

        } 
        
        let strRemovedJudges = ""        
        for (let i = 0; i < removedJudges.length; i++) {
            strRemovedJudges+=removedJudges[i]+",";

        } 
          const config = {
            headers: {
                'Content-type': 'application/json',
                
            }
          }
          const addresult = axios.post(
              'http://127.0.0.1:8000/assignJudge',
              {'judges': strAddedJudges, 'title':selectedPaper.title}
              ,config
            ).then((response) => response)
            .then((response) => {
                console.log("assign response",response)
          })
          const removeresult = axios.post(
            'http://127.0.0.1:8000/deleteJudge',
            {'title':selectedPaper.title, 'judge':strRemovedJudges}
            ,config
          ).then((response) => response)
          .then((response) => {
              console.log("remove response",response)
        } )

          
      } 

      return (
        <div>
           <h3>Judges</h3>
           <form onSubmit={handleSubmit}>
                <div class="row mb-3">
                    <label for="inputTitle" class="col-sm-2 col-form-label">Author</label>
                    <div clsass="col-sm-10">
                        
                        {newJudgeList.map((singleAuthor, index) => (
                        <div class="col-sm-10" key={index} >
                            <div class="input-group mb-3">
                            <select class="form-select"
                                value={singleAuthor}
                                onChange={(e) => handleJudgeChange(e, index)}
                                required
                            >
                                <option value="" selected disabled hidden>Choose judge...</option>
                                {judgeNameData.map(( item ) => (
                                <option value={item}> {item} </option>
                                )
                                )}
                            </select> 
                            {newJudgeList.length !== 1 && (
                                <button class="btn btn-outline-secondary" type="button" id="button-remove" 
                                onClick={() => handleJudgeRemove(index)}
                                
                                >
                                Remove
                                </button>
                            )}
                            </div>
                            <div>
                            {/*  maximum number of authers is 4 */}
                            {newJudgeList.length - 1 === index && newJudgeList.length < 4 && (
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
            </form>
           
        </div>
     )
}