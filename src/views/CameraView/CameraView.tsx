import React, { useEffect, useState, useRef } from 'react'

import { ReactComponent as Bulb } from '../../assets/bulb.svg'
import { ReactComponent as Tick } from '../../assets/rounded-tick.svg'
import './CameraView.css'

interface CameraViewProps {
  onClickCancel: () => void
  onTakePicture: (result: boolean, picture: string | undefined) => void
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

function useUserMedia(
  media: MediaStreamConstraints,
  stopCamera: boolean | undefined
) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    async function enable() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(media)
        setMediaStream(stream)
      } catch (err) {
        console.log(err)
      }
    }

    if (!mediaStream) {
      enable()
    }

    if (mediaStream && stopCamera) {
      return function cleanup() {
        mediaStream.getTracks().forEach((track: MediaStreamTrack) => {
          track.stop()
        })
      }
    }
  }, [mediaStream, media])

  return mediaStream
}

function useTakePicture(
  onTakePicture: (result: boolean, image: string | undefined) => void,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
): (boolean | undefined)[] {
  const [result, setResult] = useState<boolean | undefined>()
  const [stopCamera, setStopCamera] = useState<boolean>(false)

  const capture = () => {
    if (canvasRef && videoRef.current !== null) {
      const context = canvasRef.current?.getContext('2d')
      return context?.drawImage(videoRef.current, 0, 0)
    }
  }

  const sendImage = (image: string) => {
    fetch('https://front-exercise.z1.digital/evaluations', {
      method: 'POST',
      body: JSON.stringify({ image: image }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            let responseResult = false
            if (data.summary.outcome === 'Approved') {
              responseResult = true
            }

            setResult(responseResult)
            setTimeout(() => {
              // take picture
              capture()
              // Stop camera
              setStopCamera(true)

              // Hide camera component
              onTakePicture(
                responseResult,
                canvasRef.current?.toDataURL('image/png')
              )
            }, 2000)
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    setTimeout(() => {
      sendImage('image')
    }, 2000)
  }, [])

  return [result, stopCamera]
}

function CameraView(props: CameraViewProps): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const { height, width } = useWindowDimensions()
  const [result, stopCamera] = useTakePicture(
    props.onTakePicture,
    canvasRef,
    videoRef
  )
  const mediaStream = useUserMedia(
    {
      audio: false,
      video: {
        facingMode: 'environment',
        width: width,
        height: height
      }
    },
    stopCamera
  )

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream
  }

  const handleCanPlay = () => {
    if (videoRef.current !== null) {
      videoRef.current.play()
    }
  }

  return (
    <div className="camera-container">
      <video
        ref={videoRef}
        onCanPlay={handleCanPlay}
        autoPlay
        playsInline
        muted
        className="camera-video"
      />
      <div className="camera-title">Take picture</div>
      <div className="camera-text">
        Fit your ID card inside the frame. <br></br>
        The picture will be taken automatically.
      </div>
      <div
        className={`camera-window ${
          result !== undefined
            ? result
              ? 'camera-window-accepted'
              : 'camera-window-rejected'
            : ''
        }`}></div>
      <div className="camera-message">
        {result !== undefined ? result === true ? <Tick /> : null : <Bulb />}
        {result !== undefined
          ? result === true
            ? 'Picture taken!'
            : null
          : 'Room lighting is too low'}
      </div>
      <div className="camera-cancel" onClick={props.onClickCancel}>
        CANCEL
      </div>
      <canvas
        id="canvas"
        width={width}
        height={height}
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default CameraView
