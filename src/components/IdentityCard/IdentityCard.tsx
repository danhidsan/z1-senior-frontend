import React from 'react'

import { ReactComponent as TickLogo } from '../../assets/Fontawesome-Solid-tick.svg'
import { ReactComponent as XLogo } from '../../assets/Fontawesome-Solid-x.svg'
import './IdentityCard.css'

interface IdentityProps {
  image?: string
  accepted?: boolean
}

interface IdentityCardProps {
  image: string
  accepted: boolean
}

function EmptyIdentityCard(): React.ReactElement {
  return (
    <div className="Identity-empty">
      <div className="Take-picture">
        <span>TAKE PICTURE</span>
      </div>
    </div>
  )
}

function IdentityCard(props: IdentityCardProps): React.ReactElement {
  const identityClass: string = props.accepted
    ? 'Identity-accepted'
    : 'Identity-rejected'

  const resultClass: string = props.accepted
    ? 'Result-accepted'
    : 'Result-rejected'

  return (
    <div className={identityClass}>
      <div className={resultClass}>
        {props.accepted ? <TickLogo /> : <XLogo />}
        <span>{props.accepted ? 'ACEPTED' : 'REJECTED'}</span>
      </div>
    </div>
  )
}

function Identity(props: IdentityProps): React.ReactElement {
  if (props.image && props.accepted !== undefined) {
    return <IdentityCard image={props.image} accepted={props.accepted} />
  } else {
    return <EmptyIdentityCard />
  }
}

export default Identity
