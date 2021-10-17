import React from 'lib-app/react'
import { NameContextProvider } from 'lib-app/contexts'
import Welcome from '../components/Welcome'

const style = {
  height: 400,
  backgroundColor: '#3f51b5',
  color: 'white',
  padding: 12
}

const AboutPage = () => {
  const [name, setName] = React.useState('Jack777')

  return (
    <div style={style}>
      <h1>About Page</h1>

      <NameContextProvider.Provider value='Rectmoon' value={{ name, setName }}>
        <Welcome />
      </NameContextProvider.Provider>

      <p>
        <em>a page being provided by App 2</em>
      </p>
    </div>
  )
}

export default AboutPage
