import { useRef } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { reducedMotion as RM, isDesktop } from '../lib/sceneState'

/** Button/link with magnetic pull toward the pointer (desktop only). */
export function Btn({ href, onClick, variant = 'g', external, download, children }: { href?: string; onClick?: () => void; variant?: 'p' | 'r' | 'g'; external?: boolean; download?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const mv = (e: React.PointerEvent) => { if (RM || !isDesktop || !ref.current) return; const q = ref.current.getBoundingClientRect(); ref.current.style.transform = `translate(${(e.clientX - q.left - q.width / 2) * 0.1}px,${(e.clientY - q.top - q.height / 2) * 0.15}px)` }
  const lv = () => { if (ref.current) ref.current.style.transform = '' }
  const cls = `btn ${variant}`
  return href
    ? <a ref={ref as React.RefObject<HTMLAnchorElement>} className={cls} href={href} onPointerMove={mv} onPointerLeave={lv} download={download ? '' : undefined} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>
    : <button ref={ref as React.RefObject<HTMLButtonElement>} className={cls} onClick={onClick} onPointerMove={mv} onPointerLeave={lv}>{children}</button>
}

/** Card with 3D tilt and a pointer-following spotlight. */
export function Tile({ theme = '', big, art, icon: Icon, children, onClick, className = '', style, ...rest }: { theme?: string; big?: boolean; art?: ReactNode; icon?: LucideIcon; children: ReactNode; onClick?: () => void; className?: string; style?: CSSProperties; [k: string]: unknown }) {
  const ref = useRef<HTMLElement>(null)
  const mv = (e: React.PointerEvent) => {
    const t = ref.current; if (!t) return; const q = t.getBoundingClientRect()
    t.style.setProperty('--mx', e.clientX - q.left + 'px'); t.style.setProperty('--my', e.clientY - q.top + 'px')
    if (!RM && isDesktop && !className.includes('sk')) t.style.transform = `scale(1.03) rotateY(${((e.clientX - q.left) / q.width - 0.5) * 6}deg) rotateX(${-((e.clientY - q.top) / q.height - 0.5) * 6}deg)`
  }
  const lv = () => { if (ref.current) ref.current.style.transform = '' }
  const cls = `tile ${theme} ${big ? 'big' : ''} ${art ? 'hasart' : ''} ${className}`
  const inner = <>{art && <div className="art">{art}</div>}{Icon && <><div className="pat" /><div className="ico"><Icon size={26} strokeWidth={1.6} /></div></>}{children}</>
  return onClick
    ? <button ref={ref as React.RefObject<HTMLButtonElement>} className={cls} style={style} onClick={onClick} onPointerMove={mv} onPointerLeave={lv} {...rest}>{inner}</button>
    : <div ref={ref as React.RefObject<HTMLDivElement>} className={`${cls} static`} style={style} onPointerMove={mv} onPointerLeave={lv} {...rest}>{inner}</div>
}

/** Heading that reveals word by word as it scrolls into view. */
export function Heading({ children, sub }: { children: string; sub?: string }) {
  return (
    <div className="sh">
      <h2 aria-label={children}>{children.split(' ').map((w, i) => (
        <motion.span key={i} className="w" aria-hidden initial={RM ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.6, delay: i * 0.05, ease: [0.2, 0.7, 0.2, 1] }}>{w}&nbsp;</motion.span>))}</h2>
      {sub && <p>{sub}</p>}
    </div>
  )
}
/** Horizontal row that slides in as it enters the viewport. */
export function Row({ children }: { children: ReactNode }) {
  return <motion.div className="row" initial={RM ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}>{children}</motion.div>
}
export function Reveal({ children }: { children: ReactNode }) {
  return <motion.div initial={RM ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}>{children}</motion.div>
}
