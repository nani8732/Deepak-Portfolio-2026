import { profile } from '../data/profile'
import { Bot } from 'lucide-react'
import { Heading, Row, Tile } from './ui'
import EducationTiles from './Education'
export default function Experience() {
  const i = profile.internship
  return (
    <section id="journey" className="s"><Heading>My journey</Heading>
      <Row><EducationTiles />
        <Tile theme={i.theme} icon={Bot}><span className="n">{i.n}</span><h3>{i.title}</h3><small>{i.place} {i.meta}</small></Tile></Row>
    </section>
  )
}
