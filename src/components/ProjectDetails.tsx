import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, X } from 'lucide-react'
import type { Project } from '../data/projects'
import { arts } from './Art'
import { Btn } from './ui'
export default function ProjectDetails({ p, onClose }: { p: Project; onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    close.current?.focus(); const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    addEventListener('keydown', k); const o = document.body.style.overflow; document.body.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', k); document.body.style.overflow = o }
  }, [onClose])
  return (
    <motion.div className="dlg-bg" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="dlg" role="dialog" aria-modal="true" aria-label={p.title} onClick={(e) => e.stopPropagation()} initial={{ y: 40, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 26 }}>
        <button ref={close} className="x" aria-label="Close" onClick={onClose}><X size={16} /></button>
        <div className={`dh ${p.theme}`}><div className="art">{p.images ? <img src={p.images[0].src} alt={p.images[0].alt} /> : (() => { const A = arts[p.art]; return <A /> })()}</div><h3>{p.title}</h3></div>
        <div className="db">
          <small>{p.category}</small><p>{p.description}</p>
          <div className="tg">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
          {p.images && <div className="gal">{p.images.slice(1).map((im) => <img key={im.src} src={im.src} alt={im.alt} loading="lazy" />)}</div>}
          <b>Problem addressed</b><p>{p.problem}</p>
          <b>Workflow</b><ul>{p.workflow.map((w) => <li key={w}>{w}</li>)}</ul>
          <div className="btns">
            {p.liveUrl && <Btn variant="r" href={p.liveUrl} external><ExternalLink size={16} /> Live demo</Btn>}
            {p.repoUrl && <Btn href={p.repoUrl} external><Github size={16} /> GitHub</Btn>}
          </div>
          <p><small>{p.images ? 'The images are screenshots of this site, taken in a test browser. ' : 'The artwork above is an original illustration, not a screenshot. '}{p.images ? '' : <>Screenshots{p.repoUrl ? '' : ' and the GitHub link'} will be added when supplied. </>}No results are claimed.</small></p>
        </div>
      </motion.div>
    </motion.div>
  )
}
