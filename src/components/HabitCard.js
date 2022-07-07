import React, { useState } from 'react'

import styles from './HabitCard.module.css'

import HabitInfo from './HabitInfo'
import HabitActions from './HabitActions'
import EditHabitForm from './EditHabitForm'

function HabitCard (props) {

  const [cardMode, setCardMode] = useState({
    editing: false
  })

  const editConfig = {
    btnName: 'Save Habit',
    httpMethod: 'PUT'
  }

  return (
    <React.Fragment>
      <div className={`${styles.habit_card} container py-2`}>
        {renderCardContent()}
      </div>
    </React.Fragment>
  )

  function renderCardContent () {
    let content
    if (cardMode.editing) {
      content = (
        <EditHabitForm formConfig={editConfig} info={props.info} setCardMode={setCardMode} />
      )
    } else {
      content = (
        <div className="row justify-content-center">
          <HabitInfo info={props.info} />

          <div className="col-2">
            <HabitActions info={props.info} setCardMode={setCardMode} />
          </div>
        </div>
      )
    }
    return content
  }

}

export default HabitCard
