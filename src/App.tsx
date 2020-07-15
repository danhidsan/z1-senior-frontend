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

  const handleTakePicture = (returnImage: string | undefined): void => {
    setImage(returnImage || '')
  }
  const handleObtainResult = (result: boolean) => {
    setAcepted(result)
    setShowCamera(false)
  }

  if (showCamera) {
    return (
      <CameraView
        onClickCancel={handleClickCameraCancel}
        onTakePicture={handleTakePicture}
        onObtainResult={handleObtainResult}
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
