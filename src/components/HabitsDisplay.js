import React, { useContext, useEffect } from 'react'
import HabitsInfoContext from '../store/HabitsInfoContext'
import MetaContext from '../store/MetaContext'

import HabitCard from './HabitCard'

function HabitsDisplay (props) {

  const fetchAllHabits = useContext(HabitsInfoContext).fetchHabitFunction
  const habits = useContext(HabitsInfoContext).habitsInfo
  const refreshVar = useContext(MetaContext).refreshVar

  useEffect(() => {
    fetchAllHabits()
  }, [refreshVar])

  return (
    <React.Fragment>
      {renderHabits(habits)}
    </React.Fragment>
  )

  function renderHabits (habits) {
    let content
    if (habits.length > 0) {
      content = habits.map((habit) => {
        return (
          <div key={`${habit._id}-row`} className="row justify-content-center my-3">
            <div key={`${habit._id}-col1`} className="col-8">
              <HabitCard key={habit._id} info={habit} />
            </div>
          </div>
        )
      })
    }
    return content
  }
}

  export default HabitsDisplay
