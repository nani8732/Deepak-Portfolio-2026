import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'
import { Btn, Heading, Row, Tile } from './ui'
import { arts } from './Art'
import ProjectDetails from './ProjectDetails'
export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  const live = projects.filter((p) => p.liveUrl)
  return (
    <section id="projects" className="s">
      <Heading sub="Select a project for the full breakdown.">My projects</Heading>
      <Row>{projects.map((p, i) => (
        <Tile key={p.id} big theme={p.theme} art={p.images ? <img src={p.images[0].src} alt={p.images[0].alt} /> : (() => { const A = arts[p.art]; return <A /> })()} onClick={() => setOpen(p)}>
          <span className="n">{i + 1}</span><small>{p.category}</small><h3>{p.title}</h3>
        </Tile>))}</Row>
      <div className="sh" style={{ margin: 0 }}>{live.map((p) => <Btn key={p.id} variant="r" href={p.liveUrl} external>▶ MicroIntern live demo</Btn>)}</div>
      <AnimatePresence>{open && <ProjectDetails p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}
