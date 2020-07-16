import React, { useEffect, useState, useRef } from 'react'

import { ReactComponent as Bulb } from '../../assets/bulb.svg'
import { ReactComponent as Tick } from '../../assets/rounded-tick.svg'
import './CameraView.css'

interface ApiResponse {
  summary: { outcome: string }
}

interface CameraViewProps {
  onClickCancel: () => void
  onTakePicture: (picture: string | undefined) => void
  onObtainResult: (result: boolean) => void
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
        console.log(err)
      }
    }

    if (!mediaStream) {
      enable()
    }
  }, [mediaStream, media])

  return mediaStream
}

function CameraView(props: CameraViewProps): React.ReactElement {
  const [result, setResult] = useState<boolean | undefined>()
  const [aux, setAux] = useState<boolean>()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
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

  const handleCanPlay = () => {
    if (videoRef.current !== null) {
      videoRef.current.play()
    }
  }

  const capture = async () => {
    return new Promise((resolve) => {
      if (canvasRef && videoRef.current !== null) {
        const context = canvasRef.current?.getContext('2d')
        resolve(context?.drawImage(videoRef.current, 0, 0))
      }
    })
  }

  const stopCamera = async () => {
    return new Promise((resolve) => {
      return mediaStream
        ?.getTracks()
        .forEach(
          (
            item: MediaStreamTrack,
            index: number,
            array: MediaStreamTrack[]
          ) => {
            item.stop()

            // check if loop has been finished
            if (Object.is(array.length - 1, index)) {
              resolve('finished')
            }
          }
        )
    })
  }

  const cancel = async () => {
    await stopCamera() // stop camera before unmount component
    props.onClickCancel()
  }

  const sendData = async (image?: string) => {
    return new Promise<ApiResponse>((resolve, reject) => {
      fetch('https://front-exercise.z1.digital/evaluations', {
        method: 'POST',
        body: JSON.stringify({ image: image }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response: Response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              resolve(data)
            })
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      if (result) {
        await stopCamera() // stop camera before unmount component
        return props.onObtainResult(result)
      }

      capture().then(async () => {
        const imageData: string | undefined = canvasRef.current?.toDataURL(
          'image/png'
        )
        props.onTakePicture(imageData)
        const response = await sendData(imageData)
        const resultReturned = response.summary.outcome === 'Approved'

        setAux(!aux)
        // if result returned is diferent to current result
        setResult(resultReturned)
      })
    }, 2000)

    return () => {
      clearTimeout(timeOut)
    }
  }, [result, aux])

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
      <div className="camera-cancel" onClick={cancel}>
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
