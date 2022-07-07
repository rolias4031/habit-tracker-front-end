import React, { useState, useRef, useContext } from 'react'

import UserContext from '../store/UserContext'

function LoginForm (props) {

  const setUserCreds = useContext(UserContext).setUserCreds

  const [signupMode, setSignupMode] = useState(false)
  const [formInputs, setFormInputs] = useState({
    email: '',
    password: '',
    confirmedPw: '',
    name: ''
  })

  const formConfig = {
    submitBtnName: signupMode ? 'Signup' : 'Login',
    altBtnName: signupMode ? 'Login' : 'Signup',
    formTitle: signupMode ? 'Signup' : 'Login',
    formFunc: signupMode ? signupHandler : loginHandler
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col">

        <h1>{formConfig.formTitle}</h1>

        <form onSubmit={formConfig.formFunc} className="form-control" action="index.html" method="post">
          {
            signupMode ? (
              <React.Fragment>
                <label htmlFor="email">Name</label>
                <input onChange={inputHandler} className="form-control" type="text" name="name"/>
              </React.Fragment>
            ) : null
          }
          <label htmlFor="email">Email</label>
          <input onChange={inputHandler} className="form-control" type="text" name="email"/>
          <label htmlFor="password">Password</label>
          <input onChange={inputHandler} className="form-control" type="text" name="password"/>
          {
            signupMode ? (
              <React.Fragment>
                <label htmlFor="confirm-pw">Confirm Password</label>
                <input onChange={inputHandler} className="form-control" type="text" name="confirmedPw"/>
              </React.Fragment>
            ) : null
          }
          <input className="btn btn-primary btn-sm my-2" type="submit" name="" value={formConfig.submitBtnName}/>
          <button onClick={changeModeHandler} className="btn btn-outline-primary btn-sm mx-2" type="button" name="button">{formConfig.altBtnName}</button>

        </form>

        </div>
      </div>
    </div>
  )

  function changeModeHandler () {
    setSignupMode((prevState) => {
      return !prevState
    })
  }

  function inputHandler (e) {
    setFormInputs((prevState) => {
      return {...prevState, [e.target.name]: e.target.value }
    })
  }

  async function signupHandler (e) {
    e.preventDefault()
    // get form inputs, validate passwords match
    const inputs = {...formInputs}
    console.log('signupHandler', inputs);
    if (inputs.password !== inputs.confirmedPw) {
      throw new Error('Passwords don\'t match.')
    }
    const url = 'http://localhost:8080/auth/signup'
    const fetchOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: inputs.email,
        name: inputs.name,
        password: inputs.password
      })
    }
    try {
      const response = await fetch(url, fetchOptions)
      console.log(response);
      const result = await response.json()
      console.log(result);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(result.data[0].msg)
      }
      changeModeHandler()
    } catch (err) {
      console.log(err);
    }
  }

  async function loginHandler (e) {
    e.preventDefault()
    const inputs = {...formInputs}
    //get form inputs, validate.
    console.log('loginHandler', inputs)
    const url = 'http://localhost:8080/auth/login'
    const fetchOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: inputs.email,
        password: inputs.password
      })
    }
    try {
      const response = await fetch(url, fetchOptions)
      console.log(response);
      const auth = await response.json()
      console.log(auth);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(auth.message)
      }
      localStorage.setItem('token', auth.token)
      props.setAppMode(() => {
        return { create: false, login: false }
      })
      props.setIsAuth(true)
    } catch (err) {
      console.log(err);
    }

  }
}

export default LoginForm
