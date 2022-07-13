import React from 'react'
import {Modal, Button} from 'react-bootstrap'
function DeleteModal(props) {

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
              <Button variant="primary" onClick={props.toggleDelete}>Cancel</Button>
              <Button variant="danger" onClick={props.toggleDelete}>Delete</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )
}

export default DeleteModal