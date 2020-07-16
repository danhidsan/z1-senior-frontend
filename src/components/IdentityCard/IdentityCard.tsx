import React from 'react'

import { ReactComponent as TickLogo } from '../../assets/Fontawesome-Solid-tick.svg'
import { ReactComponent as XLogo } from '../../assets/Fontawesome-Solid-x.svg'
import './IdentityCard.css'

interface IdentityProps {
  image?: string
  accepted: boolean
  onClickTakePicture: () => void
}

interface CardProps {
  image: string
  accepted: boolean
  onClickTakePicture?: () => void
}

interface EmptyCardProps {
  onClickTakePicture: () => void
}

function EmptyIdentityCard(props: EmptyCardProps): React.ReactElement {
  return (
    <div className="Identity-empty">
      <div className="Take-picture" onClick={props.onClickTakePicture}>
        <span>TAKE PICTURE</span>
      </div>
    </div>
  )
}

function AceptedIdentityCard(props: CardProps): React.ReactElement {
  const containerStyle: React.CSSProperties = {
    backgroundImage: `url(${props.image})`,
    border: `1px solid ${props.accepted ? '#69CC8B' : '#C00000'}`
  }
  return (
    <div className="Identity-container" style={containerStyle}>
      <div
        className={`Result-button ${
          props.accepted ? 'Result-buttom-accepted' : 'Result-button-rejected'
        }`}>
        {props.accepted ? <TickLogo /> : <XLogo />}
        <span>{props.accepted ? 'ACEPTED' : 'REJECTED'}</span>
      </div>
    </div>
  )
}

function IdentityCard(props: IdentityProps): React.ReactElement {
  if (props.image) {
    return <AceptedIdentityCard image={props.image} accepted={props.accepted} />
  } else {
    return <EmptyIdentityCard onClickTakePicture={props.onClickTakePicture} />
  }
}

export default IdentityCard
