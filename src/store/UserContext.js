import React, { useState, useContext } from 'react'

const UserContext = React.createContext({
  liftFunc: () => {},
  token: '',
  userId: ''
})

export function UserContextProvider (props) {
  const [userCreds, setUserCreds] = useState({
    token: '',
    userId: ''
  })
  return (
    <UserContext.Provider value={{
      setUserCreds: setUserCreds,
      token: userCreds.token,
      userId: userCreds.userId
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext
