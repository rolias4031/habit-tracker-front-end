import React from 'react'

function ProgressButton (props) {
  return (
    <React.Fragment>
      <button onClick={progressHandler} className="btn btn-success" type="button" name="button">Progress</button>
    </React.Fragment>
  )

  function progressHandler () {
    props.setCardMode((prevState) => {
      return {...prevState, progress: true}
    })
  }
}

export default ProgressButton
