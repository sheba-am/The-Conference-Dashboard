import React from 'react'

function EditPaper(props) {
  const EditPaper = props.isOpen ? "edit-info-content open" : "edit-info-content";

  return (
    <div className={EditPaper}>
      EditPaper
    </div>
  )
}

export default EditPaper