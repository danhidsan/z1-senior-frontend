import React from 'react'
import './App.css'

import IdentityCard from './components/IdentityCard/IdentityCard'

function App(): React.ReactElement {
  return (
    <div className="App">
      <header className="App-header">BankClient</header>
      <div className="Title">Scan your ID</div>
      <div className="Info-text">
        Take a picture. It may take time to validate your personal information.
      </div>
      <div className="Identity-card-container">
        <IdentityCard />
      </div>
    </div>
  )
}

export default App
