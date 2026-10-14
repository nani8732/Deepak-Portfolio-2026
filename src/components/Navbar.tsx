import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
const links: [string, string][] = [['home', 'Home'], ['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['certs', 'Certifications'], ['journey', 'Journey'], ['contact', 'Contact']]
export default function Navbar() {
  const [sc, setSc] = useState(false), [on, setOn] = useState('home'), [open, setOpen] = useState(false), [light, setLight] = useState(false)
  useEffect(() => {
    const f = () => setSc(scrollY > 40); f(); addEventListener('scroll', f, { passive: true })
    const io = new IntersectionObserver((es) => es.forEach((x) => x.isIntersecting && setOn(x.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    links.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => { removeEventListener('scroll', f); io.disconnect() }
  }, [])
  useEffect(() => { document.documentElement.dataset.theme = light ? 'light' : 'dark' }, [light])
  return (<>
    <nav className={`top ${sc ? 'sc' : ''}`} aria-label="Primary">
      <b>ND</b>
      {links.map(([id, l]) => <a key={id} href={`#${id}`} className={`l ${on === id ? 'on' : ''}`}>{l}</a>)}
      <span style={{ flex: 1 }} />
      <button className="ib" aria-label="Toggle light or dark theme" onClick={() => setLight(!light)}>{light ? <Moon size={16} /> : <Sun size={16} />}</button>
      <button className="ib mb" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={16} /> : <Menu size={16} />}</button>
    </nav>
    {open && <div className="mm">{links.map(([id, l]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{l}</a>)}</div>}
  </>)
}
