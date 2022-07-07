import React, { useContext, useState } from 'react'

const MetaContext = React.createContext({
  refreshFn: () => {},
  refreshVar: ''
})

export function MetaContextProvider (props) {
  const [refreshVar, setRefreshVar] = useState(false)

  return (
    <MetaContext.Provider value={{
      refreshFn: setRefreshVar,
      refreshVar: refreshVar
    }}>
      {props.children}
    </MetaContext.Provider>
  )
}

export default MetaContext
