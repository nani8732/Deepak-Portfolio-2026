import { useEffect, useRef } from 'react'
import { reducedMotion as RM, ui } from '../lib/sceneState'
/** Desktop-only cursor: soft light, dot and ring. Native cursor is never hidden. */
export default function Cursor() {
  const g = useRef<HTMLDivElement>(null), r = useRef<HTMLDivElement>(null), d = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (RM || !matchMedia('(hover:hover)').matches) return
    let tx = innerWidth / 2, ty = innerHeight / 2, gx = tx, gy = ty, rx = tx, ry = ty, raf = 0
    const mv = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; d.current!.style.transform = `translate(${tx}px,${ty}px)` }
    const ov = (e: MouseEvent) => { const h = !!(e.target as Element).closest('a,button'); ui.hv = h; r.current!.classList.toggle('hv', h) }
    const loop = () => { gx += (tx - gx) * 0.08; gy += (ty - gy) * 0.08; rx += (tx - rx) * 0.2; ry += (ty - ry) * 0.2
      g.current!.style.transform = `translate(${gx}px,${gy}px)`; r.current!.style.transform = `translate(${rx}px,${ry}px)`; raf = requestAnimationFrame(loop) }
    addEventListener('pointermove', mv); addEventListener('mouseover', ov); loop()
    return () => { removeEventListener('pointermove', mv); removeEventListener('mouseover', ov); cancelAnimationFrame(raf) }
  }, [])
  return (<><div id="glow" ref={g} aria-hidden="true" /><div id="ring" ref={r} aria-hidden="true" /><div id="dot" ref={d} aria-hidden="true" /></>)
}
