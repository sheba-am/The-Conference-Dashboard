import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Modal, Button} from 'react-bootstrap'
import axios from 'axios'
function DeleteModal(props) {
  const navigate = useNavigate();
  const [paper, setPaper] = useState(JSON.parse(localStorage.getItem("selectedPaper"))); //retrieve the object
  function handleDelete(e) {
    e.preventDefault()
    props.toggleDelete()
    const config = {
      headers: {
          'Content-type': 'application/json',
          
      }
    }
  const result = axios.post(
      'http://127.0.0.1:8000/deletePaper',
      {
        'title':paper.title
      },
      config
    ).then((response) => response)
    .then((response) => {
      navigate('../../dashboard/papers');
  })
  }
    return (
        <div>
          {/*  passing in the isOpen prop from the container */}
          <Modal show={props.isOpen}>
            <Modal.Header>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>this is permenant</Modal.Body>
            <Modal.Footer>
               {/* passing in the toggle function so that clicking the OK button closes the modal */}
              <Button variant="primary" id='button-cancel' onClick={props.toggleDelete}>Cancel</Button>
              <Button variant="danger" id='button-delete' onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )
}

export default DeleteModal