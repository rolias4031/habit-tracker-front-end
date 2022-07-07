import React from 'react'

function EditHabitButton (props) {

  return (
    <React.Fragment>
      <button onClick={editHandler} className="btn btn-warning btn-sm" type="button" name="button">Edit</button>
    </React.Fragment>
  )

  function editHandler (e) {
    props.setCardMode((prevState) => {
      return {...prevState, editing: true}
    })
  }
}

export default EditHabitButton
