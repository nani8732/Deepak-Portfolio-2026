import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/profile'
export default function ProfilePicker() {
  const [show, setShow] = useState(true)
  const pick = (t: string) => { setShow(false); if (t !== 'home') setTimeout(() => document.getElementById(t)?.scrollIntoView(), 200) }
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && setShow(false); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [])
  const items = [
    { t: 'home', label: 'Deepak', node: <img src={profile.photo} alt="Deepak profile" /> },
    { t: 'projects', label: 'Recruiter', node: 'R', bg: 'linear-gradient(135deg,#1b6a8a,#7ad)' },
    { t: 'skills', label: 'Developer', node: '</>', bg: 'linear-gradient(135deg,#17a05a,#8d6)' },
  ]
  return (
    <AnimatePresence>{show && (
      <motion.div id="pick" role="dialog" aria-label="Choose how to explore" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
        <h2>Who's watching?</h2>
        <div className="pf">{items.map((it, i) => (
          <motion.button key={it.t} onClick={() => pick(it.t)} initial={{ opacity: 0, scale: 0.7, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: i * 0.12, type: 'spring', stiffness: 220, damping: 16 }}>
            <div className="av" style={it.bg ? { background: it.bg } : undefined}>{it.node}</div>{it.label}
          </motion.button>))}</div>
        <p style={{ color: '#a4a4b8', marginTop: 26 }}>Pick a profile to jump to what matters most to you.</p>
        <div><button className="skip" onClick={() => pick('home')}>SKIP</button></div>
      </motion.div>)}</AnimatePresence>
  )
}
