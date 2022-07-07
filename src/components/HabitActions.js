import React from 'react'
import DeleteHabitButton from './DeleteHabitButton'
import EditHabitButton from './EditHabitButton'
import CompleteHabitButton from './CompleteHabitButton'

function HabitActions (props) {
  return (
    <React.Fragment>
      <div className="row my-1">
        <div className="col-auto">
          <DeleteHabitButton habitId={props.info._id} />
        </div>
      </div>
      <div className="row my-1">
        <div className="col-auto">
          <EditHabitButton setCardMode={props.setCardMode} />
        </div>
      </div>
      <div className="row">
        <div className="col-auto">
          <CompleteHabitButton info={props.info} />
        </div>
      </div>
    </React.Fragment>
  )

}

export default HabitActions
