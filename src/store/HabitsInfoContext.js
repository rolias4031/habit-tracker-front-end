import React, { useState, useEffect, useReducer, useContext } from 'react'
import UserContext from './UserContext'

const HabitsInfoContext = React.createContext({
  fetchHabitFunction: () => {},
  habitInfo: []
})

function habitsInfoReducer (prevState, action) {
  switch (action.type) {
    case 'append':
      return [...action.payload]
  }
}

export function HabitsInfoContextProvider (props) {
  const token = localStorage.getItem('token')
  const [habitsInfo, dispatchHabitInfo] = useReducer(habitsInfoReducer, [])

  return (
    <HabitsInfoContext.Provider value={{
      fetchHabitFunction: fetchAllHabits,
      habitsInfo: habitsInfo
    }}>
      {props.children}
    </HabitsInfoContext.Provider>
  )

  async function fetchAllHabits () {
    if (!token) {
      return
    }
    try {
      const url = 'http://localhost:8080/habits/all-habits'
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}` // 'Bearer' is a common convention
        }
      })
      const habits = await response.json()
      console.log(habits);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(habits.message)
      }
      dispatchHabitInfo({ type: 'append', payload: habits.habits })
    } catch (err) {
      console.log(err);
    }

  }
}

export default HabitsInfoContext
