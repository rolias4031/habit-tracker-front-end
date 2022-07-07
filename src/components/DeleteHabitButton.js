import React, { useContext } from 'react'
import MetaContext from '../store/MetaContext'

function DeleteHabitButton (props) {

  const refreshFn = useContext(MetaContext).refreshFn

  return (
    <React.Fragment>
      <form onSubmit={deleteHabitHandler} className="">
        <input className="btn btn-danger btn-sm" type="submit" name="" value="Delete" />
      </form>
    </React.Fragment>
  )

  async function deleteHabitHandler (e) {
    e.preventDefault()
    const habitId = props.habitId
    const token = localStorage.getItem('token')
    const url = `http://localhost:8080/habits/delete-habit/${habitId}`
    const fetchOptions = {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(url, fetchOptions)
      console.log(response)
      const result = await response.json()
      console.log(result);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(result.message)
      }
      refreshFn((prevState) => {
        return !prevState
      })
    } catch (err) {
      console.log(err);
    }

  }
}

export default DeleteHabitButton
