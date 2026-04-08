'use client'
import React, { useEffect, useRef } from 'react'

export default function SlowVideo({ src, className, playbackRate = 0.6 }) {
  const videoRef = useRef(null)
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate
    }
  }, [playbackRate])
  
  return (
    <video 
      ref={videoRef}
      src={src} 
      autoPlay 
      loop 
      muted 
      playsInline 
      className={className} 
    />
  )
}
