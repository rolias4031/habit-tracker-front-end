import React from 'react'
import styles from './HabitProgress.module.css'

function HabitProgress () {

  return (
    <div className={styles.container}>
      {renderHabitProgress()}
    </div>
  )

  function renderHabitProgress () {
    let content = []
    return content
  }
}

export default HabitProgress
