import React from 'lib-app/react'
import { NameContextProvider } from 'lib-app/contexts'

const Welcome = () => {
  const { name, setName } = React.useContext(NameContextProvider)

  return (
    <div>
      Welcome, {name}
      <p>
        <button onClick={() => setName('Rectmoon')}>Click me</button>
      </p>
    </div>
  )
}

export default Welcome
