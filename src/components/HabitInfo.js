import React from 'react'

import styles from './HabitInfo.module.css'

function HabitInfo (props) {
  return (
    <React.Fragment>
      <div className="col-8">
        <h4 className="">{props.info.title}</h4>
        <p className={styles.info}>{props.info.description}</p>

      </div>
      <div className="col-2 p-2">
        <p className={`${styles.habit_info} ${styles.completions}`}>{props.info.completions}</p>
      </div>
    </React.Fragment>
  )
}

export default HabitInfo
