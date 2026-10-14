import { profile } from '../data/profile'
import { BookOpen, GraduationCap, School } from 'lucide-react'
import { Tile } from './ui'
const icons = [BookOpen, School, GraduationCap]
export default function EducationTiles() {
  return <>{profile.education.map((e, i) => <Tile key={e.n} theme={e.theme} icon={icons[i]}><span className="n">{e.n}</span><h3>{e.title}</h3><small>{e.place} · {e.meta}</small></Tile>)}</>
}
