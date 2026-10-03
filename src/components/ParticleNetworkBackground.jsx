import { useEffect, useRef } from 'react'
import { ConstellationField } from '@designcodeio/threeui'
import '@designcodeio/threeui/style.css'

export default function ParticleNetworkBackground() {
  const frameRef = useRef(null)

  useEffect(() => {
    const frame = frameRef.current?.querySelector('iframe')
    if (!frame) return
    if (frame.dataset.cypherBridgeReady === 'true') return

    const installBridge = () => {
      const source = frame.srcdoc.replace(/<script data-cypher-cursor-bridge>[\s\S]*?<\/script>/, '')
      const interactiveSource = source
        .replace('if (dist < 180) {', 'if (dist < 240) {\n                        ctx.lineWidth = 1.2;')
        .replace('0.5 * (1 - dist/180)', '0.9 * (1 - dist/240)')
        .replace('ctx.strokeStyle = `rgba(96, 165, 250, ${0.5 * (1 - dist/180)})`;', 'ctx.strokeStyle = `rgba(96, 165, 250, ${0.9 * (1 - dist/240)})`;')
      const bridge = `<script data-cypher-cursor-bridge>
        window.addEventListener('message', (event) => {
          if (event.data?.type !== 'cypher-cursor-move') return;
          window.dispatchEvent(new MouseEvent('mousemove', {
            clientX: event.data.x,
            clientY: event.data.y,
            bubbles: true,
            cancelable: true
          }));
        });
      </script>`
      frame.srcdoc = interactiveSource.replace('</body>', `${bridge}</body>`)
      frame.dataset.cypherBridgeReady = 'true'
    }

    const syncPointer = () => {
      if (!frame.contentWindow) return
      frame.contentWindow.postMessage({ type: 'cypher-cursor-move', x: pointerX, y: pointerY }, '*')
    }

    let pointerX = -10000
    let pointerY = -10000
    let animationFrameId = null

    const sendPointerPosition = () => {
      syncPointer()
      animationFrameId = null
    }

    const handleMouseMove = (event) => {
      pointerX = event.clientX
      pointerY = event.clientY
      if (animationFrameId !== null) return
      animationFrameId = requestAnimationFrame(sendPointerPosition)
    }

    installBridge()
    frame.addEventListener('load', () => {
      syncPointer()
    }, { once: true })

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
      frame.removeAttribute('data-cypher-bridge-ready')
    }
  }, [])

  return (
    <div ref={frameRef} className="shader-frame" aria-hidden="true">
      <ConstellationField
        variant="particle-drift"
        mode="dark"
        speed={1.00}
        size={1.00}
        length={1.00}
        density={2.00}
        opacity={1.00}
        hue={0}
        saturation={1.00}
        brightness={1.00}
      />
    </div>
  )
}