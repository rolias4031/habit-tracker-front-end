
import React, { useState, useEffect } from 'react'
import HabitsDisplay from './components/HabitsDisplay'
import CreateHabitForm from './components/CreateHabitForm'
import LoginForm from './components/LoginForm'
import LoginButton from './components/LoginButton'
import { HabitsInfoContextProvider } from './store/HabitsInfoContext'
import { MetaContextProvider } from './store/MetaContext'
import { UserContextProvider } from './store/UserContext'

function App() {
  // fix modes, fix form props, fix mode changes.

  useEffect(() => {
    async function getUsers () {
      const url = 'http://localhost:8080/auth/all-users'
      const fetchOptions = {
        method: 'GET',
        mode: 'cors'
      }
      try {
        const response = await fetch(url, fetchOptions)
        const users = await response.json()
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('check users object')
        }
        console.log(users);
      } catch (err) {
        console.log(err);
      }
    }
    getUsers()
  }, [])

  const [isAuth, setIsAuth] = useState(false)
  const [appMode, setAppMode] = useState({
    create: false,
    login: false
  })
  const [btnState, setBtnState] = useState('Login')
  const createConfig = {
    btnName: 'Create Habit',
    httpMethod: 'POST'
  }

  return (
    <React.Fragment>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <UserContextProvider>
            <MetaContextProvider>
            <HabitsInfoContextProvider>

              {renderAppContent()}

            </HabitsInfoContextProvider>
            </MetaContextProvider>
            </UserContextProvider>
          </div>
        </div>
      </div>

    </React.Fragment>
  )

  function renderAppContent () {
    let content
    if (isAuth && appMode.create) {
      content = (
        <React.Fragment>
          <div className="row">
            <div className="col-12" align="center">
              <h1>Create New Habit</h1>
            </div>
          </div>
          <CreateHabitForm formConfig={createConfig} setAppMode={setAppMode} />
        </React.Fragment>
      )
    } else if (!isAuth) {
      content = (
        <React.Fragment>
          <LoginForm setAppMode={setAppMode} appMode={appMode} setIsAuth={setIsAuth} />
        </React.Fragment>
      )
    } else {
      content = (
        <React.Fragment>
          <div className="row my-4">
            <div className="col-12" align="right">
            <LoginButton setAppMode={setAppMode} btnState={btnState}/>
            </div>
          </div>
          <div className="row">
            <div className="col-12" align="center">
              <h1>All Habits</h1>
              <button onClick={createHandler} className="btn btn-primary my-2" type="button">Create A New Habit</button>
            </div>
          </div>
          <HabitsDisplay />
        </React.Fragment>
      )
    }
    return content
  }

  function createHandler () {
    setAppMode((prevState) => {
      return {...prevState, create: true}
    })
  }


}

export default App;
