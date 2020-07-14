import React, { useState } from 'react'
import './App.css'

import IdentityView from './views/IdentityView/IdentityView'
import CameraView from './views/CameraView/CameraView'

function App(): React.ReactElement {
  const [accepted, setAccepted] = useState<boolean>(false)
  const [image, setImage] = useState<string>('image')
  const [showCamera, setShowCamera] = useState<boolean>(false)

  const handleClickTakePicture = (): void => {
    setShowCamera(true)
  }

  if (showCamera) {
    return <CameraView />
  }

  return (
    <IdentityView
      accepted={accepted}
      image={image}
      onClickTakePicture={handleClickTakePicture}
    />
  )
}

export default App
