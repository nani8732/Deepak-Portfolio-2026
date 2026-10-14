import { profile } from '../data/profile'
import { Compass, FlaskConical, Target } from 'lucide-react'
import { Heading, Row, Tile } from './ui'
const icons = [Target, FlaskConical, Compass]
export default function Philosophy() {
  return (
    <section className="s"><Heading>Always learning. Always building.</Heading>
      <Row>{profile.principles.map((p, i) => <Tile key={p.title} theme={p.theme} icon={icons[i]}><h3>{p.title}</h3><small>{p.text}</small></Tile>)}</Row></section>
  )
}
