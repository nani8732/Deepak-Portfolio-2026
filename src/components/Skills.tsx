import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Brain, Code2, Cpu, Database, GitBranch, Globe } from 'lucide-react'
import { skillGroups } from '../data/skills'
import { Heading, Row, Tile } from './ui'
const gi = [Code2, Globe, Database, GitBranch, Brain, Cpu]
export default function Skills() {
  const [sel, setSel] = useState<[string, string] | null>(null)
  return (
    <section id="skills" className="s">
      <Heading sub="Select a skill to see where I use it. No ratings, just context.">My skills</Heading>
      <div className="skinfo" aria-live="polite"><AnimatePresence mode="wait"><motion.div key={sel?.[0] ?? 'none'} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
        <b>{sel ? sel[0] : 'Pick a skill'}</b><p>{sel ? sel[1] : 'Hover, tap or focus any card.'}</p></motion.div></AnimatePresence></div>
      {Object.entries(skillGroups).map(([g, a], gx) => { const GI = gi[gx]; return (
        <div key={g}><div className="sh" style={{ margin: '14px 0 0', display: 'flex', alignItems: 'center', gap: 10 }}><GI size={20} color="var(--red)" /><h3 style={{ fontSize: 18, color: 'var(--mut)' }}>{g}</h3></div>
          <Row>{a.map((s) => <Tile key={s[0]} className={`sk ${sel?.[0] === s[0] ? 'on' : ''}`} onClick={() => setSel(s)} onMouseEnter={() => setSel(s)} onFocus={() => setSel(s)}>{s[0]}</Tile>)}</Row></div>) })}
    </section>
  )
}
