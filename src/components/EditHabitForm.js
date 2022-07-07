import React, { useContext, useState } from 'react'
import MetaContext from '../store/MetaContext'

function EditHabitForm (props) {

  const [formInputs, setFormInputs] = useState({
    title: props.info.title,
    description: props.info.description
  })

  const refreshFn = useContext(MetaContext).refreshFn

  return (
    <React.Fragment>
      <form onSubmit={editHabitHandler} className="form-control">
        <label htmlFor="title" className="mt-2" >Title</label>
        <br/>
        <input onChange={changeHandler} className="form-control" type="text" name="title" value={formInputs.title} />
        <label htmlFor="description" className="mt-2">Description</label>
        <br/>
        <textarea
          onChange={changeHandler}
          className="form-control"
          name="description"
          value={formInputs.description}
          rows="4" cols="40">
        </textarea>
        <div className="my-2">
          <input className="btn btn-success btn-sm" type="submit" name="" value="Save" />
          <button onClick={cancelHandler} className="btn btn-dark mx-2 btn-sm" type="button" name="button">Cancel</button>
        </div>
      </form>
    </React.Fragment>
  )

  async function editHabitHandler (e) {
    e.preventDefault()
    // get all POST data
    const title = formInputs.title
    const description = formInputs.description
    const habitId = props.info._id
    const completions = props.info.completions
    const token = localStorage.getItem('token')
    const url = `http://localhost:8080/habits/edit-habit/${habitId}`
    const fetchOptions = {
      method: 'PUT',
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
        completions: completions
      })
    }
    // start POST request
    try {
      const response = await fetch(url, fetchOptions)
      const result = await response.json()
      console.log(result);
      if (response.status !== 201 && response.status !== 200) {
        throw new Error(result.message)
      }
      props.setCardMode((prevState) => {
        return {...prevState, editing: false}
      })
      refreshFn((prevState) => {
        return !prevState
      })
    } catch (err) {
      console.log(err);
    }
  }

  function cancelHandler () {
    props.setCardMode((prevState) => {
      return {...prevState, editing: false}
    })
  }

  function changeHandler (e) {
    console.log(e.target.name, e.target.value);
    setFormInputs((prevState) => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }
}

export default EditHabitForm
