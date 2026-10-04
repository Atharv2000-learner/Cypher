import { useEffect, useRef } from 'react'
import './CypherLogoAnimation.css'

const logoImage = '/assets/cypher-3d-logo.jpg'
const discLayers = Array.from({ length: 9 }, (_, index) => (index - 4) * 2)
const rotationSequence = [
  [360, 0],
  [0, 360],
  [-360, 0],
  [0, -360],
  [360, 360]
]
const moveDuration = 3.4
const holdDuration = 1.2
const cycleDuration = moveDuration + holdDuration

function easeInOutCubic(progress) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2
}

export default function CypherLogoAnimation() {
  const logoRef = useRef(null)

  useEffect(() => {
    const logo = logoRef.current
    if (!logo || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let animationFrameId
    let startTime

    const animate = (time) => {
      if (startTime === undefined) startTime = time

      const elapsed = (time - startTime) / 1000
      const cycleTime = elapsed % cycleDuration
      const sequenceIndex = Math.floor(elapsed / cycleDuration) % rotationSequence.length
      const [rotationY, rotationX] = rotationSequence[sequenceIndex]
      const progress = easeInOutCubic(Math.min(cycleTime / moveDuration, 1))

      logo.style.transform = `rotateX(${rotationX * progress}deg) rotateY(${rotationY * progress}deg)`
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="cypher-logo-animation" role="img" aria-label="CYPHER cybersecurity club 3D logo">
      <div className="cypher-logo-intro">
        <div className="cypher-logo-glow" aria-hidden="true">
          <img src={logoImage} alt="" />
        </div>
        <div className="cypher-logo-object" ref={logoRef} aria-hidden="true">
          <div className="cypher-logo-ring cypher-logo-ring-binary">
            <svg viewBox="0 0 400 400" aria-hidden="true">
              <defs>
                <path id="cypher-logo-binary-path" d="M200,200 m-185,0 a185,185 0 1,1 370,0 a185,185 0 1,1 -370,0" />
              </defs>
              <text>
                <textPath href="#cypher-logo-binary-path" textLength="1150" lengthAdjust="spacing">
                  01000011 01011001 01010000 01001000 01000101 01010010 01000011 01011001 01010000 01001000 01000101 01010010
                </textPath>
              </text>
            </svg>
          </div>
          <div className="cypher-logo-ring cypher-logo-ring-orbit" />
          {discLayers.map((depth) => (
            <div
              key={depth}
              className={`cypher-logo-disc${depth === 0 ? ' cypher-logo-disc-rim' : ''}`}
              style={{ transform: `translateZ(${depth}px)` }}
            />
          ))}
          <div className="cypher-logo-face cypher-logo-face-front">
            <img src={logoImage} alt="" draggable="false" />
          </div>
          <div className="cypher-logo-face cypher-logo-face-back">
            <img src={logoImage} alt="" draggable="false" />
          </div>
        </div>
      </div>
    </div>
  )
}
