import { useEffect, useState } from 'react'
import { reducedMotion as RM } from './sceneState'
export function useTypewriter(texts: string[]) {
  const [t, setT] = useState(RM ? texts[0] : '')
  useEffect(() => {
    if (RM) return
    let i = 0, j = 0, del = false, id = 0
    const tick = () => {
      const w = texts[i]; j += del ? -1 : 1; setT(w.slice(0, j))
      let d = del ? 22 : 50
      if (!del && j === w.length) { d = 2000; del = true } else if (del && j === 0) { del = false; i = (i + 1) % texts.length; d = 350 }
      id = window.setTimeout(tick, d)
    }
    tick(); return () => clearTimeout(id)
  }, [texts])
  return t
}
export function useCountUp(to: number, ms = 1800) {
  const [v, setV] = useState(RM ? to : 0)
  useEffect(() => {
    if (RM) return
    let raf = 0; const t0 = performance.now()
    const f = (t: number) => { const p = Math.min((t - t0) / ms, 1); setV(to * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(f) }
    raf = requestAnimationFrame(f); return () => cancelAnimationFrame(raf)
  }, [to, ms])
  return v
}
