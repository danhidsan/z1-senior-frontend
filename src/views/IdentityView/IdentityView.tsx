import React from 'react'

import IdentityCard from '../../components/IdentityCard/IdentityCard'

import './IdentityView.css'

interface IdentityViewProps {
  accepted: boolean
  image: string
  onClickTakePicture: () => void
}

function IdentityView(props: IdentityViewProps): React.ReactElement {
  return (
    <div className="container">
      <header className="header">BankClient</header>
      <div className="title">Scan your ID</div>
      <div className="info-text">
        Take a picture. It may take time to validate your personal information.
      </div>
      <div className="identity-card-container">
        <IdentityCard
          accepted={props.accepted}
          image={props.image}
          onClickTakePicture={props.onClickTakePicture}
        />
      </div>
    </div>
  )
}

export default IdentityView
