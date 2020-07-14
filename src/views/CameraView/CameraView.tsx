import React, { useEffect, useState, useRef } from 'react'

import { ReactComponent as Bulb } from '../../assets/bulb.svg'
import './CameraView.css'

interface CameraViewProps {
  onClickCancel: () => void
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

function useUserMedia(media: MediaStreamConstraints) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    async function enable() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(media)
        setMediaStream(stream)
      } catch (err) {
        // Removed for brevity
      }
    }

    if (!mediaStream) {
      enable()
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach((track: MediaStreamTrack) => {
          track.stop()
        })
      }
    }
  }, [mediaStream, media])

  return mediaStream
}

function CameraView(props: CameraViewProps): React.ReactElement {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const { height, width } = useWindowDimensions()
  const mediaStream = useUserMedia({
    audio: false,
    video: {
      facingMode: 'environment',
      width: width,
      height: height
    }
  })

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream
  }

  function handleCanPlay() {
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
      <div className="camera-window"></div>
      <div className="camera-message">
        <Bulb />
        {'Room lighting is too low'}
      </div>
      <div className="camera-cancel" onClick={props.onClickCancel}>
        CANCEL
      </div>
    </div>
  )
}

export default CameraView
