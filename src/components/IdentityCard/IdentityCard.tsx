import React from 'react'

import { ReactComponent as TickLogo } from '../../assets/Fontawesome-Solid-tick.svg'
import { ReactComponent as XLogo } from '../../assets/Fontawesome-Solid-x.svg'
import './IdentityCard.css'

interface IdentityProps {
  image?: string
  accepted?: boolean
  onClickTakePicture: () => void
}

interface CardProps {
  image: string
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
  return (
    <div className="Identity-accepted">
      <div className="Result-accepted">
        <TickLogo />
        <span>ACEPTED</span>
      </div>
    </div>
  )
}

function RejectedIdentityCard(props: CardProps): React.ReactElement {
  return (
    <div className="Identity-rejected">
      <div className="Take-picture" onClick={props.onClickTakePicture}>
        <span>RETAKE PICTURE</span>
      </div>
      <div className="Result-rejected">
        <XLogo />
        <span>REJECTED</span>
      </div>
    </div>
  )
}

function IdentityCard(props: IdentityProps): React.ReactElement {
  if (props.image) {
    if (props.accepted) {
      return <AceptedIdentityCard image={props.image} />
    }
    return (
      <RejectedIdentityCard
        image={props.image}
        onClickTakePicture={props.onClickTakePicture}
      />
    )
  } else {
    return <EmptyIdentityCard onClickTakePicture={props.onClickTakePicture} />
  }
}

export default IdentityCard
