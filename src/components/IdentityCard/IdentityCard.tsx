import React from 'react'

import { ReactComponent as TickLogo } from '../../assets/Fontawesome-Solid-tick.svg'
import { ReactComponent as XLogo } from '../../assets/Fontawesome-Solid-x.svg'
import './IdentityCard.css'

interface IdentityProps {
  image?: string
  accepted: boolean
  onClickTakePicture: () => void
}

function IdentityCard(props: IdentityProps): React.ReactElement {
  const containerStyle: React.CSSProperties = {
    backgroundImage: `url(${props.image})`,
    border: `1px solid ${props.accepted ? '#69CC8B' : '#C00000'}`
  }

  if (props.image) {
    return (
      <div className="Identity-container" style={containerStyle}>
        <div
          className={`Result-button ${
            props.accepted ? 'Result-button-accepted' : 'Result-button-rejected'
          }`}>
          {props.accepted ? <TickLogo /> : <XLogo />}
          <span>{props.accepted ? 'ACEPTED' : 'REJECTED'}</span>
        </div>
      </div>
    )
  } else {
    return (
      <div className="Identity-empty">
        <div className="Take-picture" onClick={props.onClickTakePicture}>
          <span>TAKE PICTURE</span>
        </div>
      </div>
    )
  }
}

export default IdentityCard
