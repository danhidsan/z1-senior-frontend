import React, { useEffect, useState, useRef } from 'react'

import './CameraView.css'

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

function CameraView(): React.ReactElement {
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
        width="100%"
        height="100%"
      />
      <div className="camera-transparent">
        <div className="camera-title">Take picture</div>
        <div className="camera-text">
          Fit your ID card inside the frame. <br></br>
          The picture will be taken automatically.
        </div>
        <div className="camera-cancel">CANCEL</div>
      </div>
    </div>
  )
}

export default CameraView
