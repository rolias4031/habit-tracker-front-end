import React, { useRef, useContext } from 'react'
import MetaContext from '../store/MetaContext'

function CreateHabitForm (props) {
  const titleInputRef = useRef()
  const descriptionInputRef = useRef()

  const refreshFn = useContext(MetaContext).refreshFn

  return (
    <React.Fragment>
      <form onSubmit={createHabitHandler} className="form-control my-3">
        <label htmlFor="title">Title</label>
        <input ref={titleInputRef} className="form-control" type="text" name="title" />
        <label htmlFor="description">Description</label>
        <textarea ref={descriptionInputRef} className="form-control" name="description" rows="8" cols="50"></textarea>
        <input className="btn btn-primary my-2" type="submit" name="" value="Create Habit" />
        <button onClick={cancelHandler} className="btn btn-outline-dark m-2" type="button" name="button">Cancel</button>
      </form>
    </React.Fragment>
  )

  async function createHabitHandler (e) {
    e.preventDefault()
    // get all POST data
    const title = titleInputRef.current.value
    const description = descriptionInputRef.current.value
    const token = localStorage.getItem('token')
    const url = 'http://localhost:8080/habits/create-habit'
    const fetchOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title,
        description: description,
        creator: {
          name: 'Sailor'
        },
        completions: 0
      })
    }
    // start POST request
    try {
      const response = await fetch(url, fetchOptions)
      console.log(response);
      const data = await response.json()
      console.log(data);
      if (response.status !== 201 && response.status !== 200) {
        throw new Error(data.message)
      }
      cancelHandler()
      refreshFn((prevState) => {
        return !prevState
      })
    } catch (err) {
      console.log(err);
    }
  }

  function cancelHandler () {
    props.setAppMode((prevState) => {
      return {...prevState, create: false}
    })
  }
}

export default CreateHabitForm
