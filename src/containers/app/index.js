import React from 'react'
import { Route } from 'react-router-dom'
import Dashboard from '../dashboard'

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Dashboard} />
    </main>
  </div>
)

export default App
