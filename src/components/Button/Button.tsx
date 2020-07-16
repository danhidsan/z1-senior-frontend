import React from 'react'

import './Button.css'

interface ButtonProps {
  text: string
  onClick: () => void
}

function Button(props: ButtonProps): React.ReactElement {
  return (
    <div className="Take-picture" onClick={props.onClick}>
      <span>{props.text}</span>
    </div>
  )
}

export default Button
