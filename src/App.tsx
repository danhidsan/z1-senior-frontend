import React, { useState } from 'react'
import './App.css'

import IdentityView from './views/IdentityView/IdentityView'
import CameraView from './views/CameraView/CameraView'

function App(): React.ReactElement {
  const [acepted, setAcepted] = useState<boolean>(false)
  const [image, setImage] = useState<string>('')
  const [showCamera, setShowCamera] = useState<boolean>(false)

  const handleClickTakePicture = (): void => {
    setShowCamera(true)
  }

  const handleClickCameraCancel = (): void => {
    setShowCamera(false)
  }

  const handleTakePicture = (result: boolean, returnImage: string): void => {
    setShowCamera(false)
    setAcepted(result)
    setImage(returnImage)
  }

  if (showCamera) {
    return (
      <CameraView
        onClickCancel={handleClickCameraCancel}
        onTakePicture={handleTakePicture}
      />
    )
  }

  return (
    <IdentityView
      accepted={acepted}
      image={image}
      onClickTakePicture={handleClickTakePicture}
    />
  )
}

export default App
