import React, { useContext } from 'react'
import MetaContext from '../store/MetaContext'

function CompleteHabitButton (props) {

  const refreshFn = useContext(MetaContext).refreshFn

  return (
    <React.Fragment>
      <form onSubmit={completeHandler} className="">
        <input className="btn btn-success btn-sm" type="submit" name="" value="Complete" />
      </form>
    </React.Fragment>
  )

  async function completeHandler (e) {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const url = `http://localhost:8080/habits/edit-habit/${props.info._id}`
    const fetchOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: props.info.title,
        description: props.info.description,
        creator: {
          name: 'Sailor'
        },
        completions: props.info.completions + 1
      })
    }
    // start PUT request
    try {
      const response = await fetch(url, fetchOptions)
      const data = await response.json()
      console.log(data);
      if (response.status !== 201 && response.status !== 200) {
        throw new Error (data.message)
      }
      refreshFn((prevState) => {
        return !prevState
      })
    } catch (err) {
      console.log(err);
    }

  }
}

export default CompleteHabitButton
