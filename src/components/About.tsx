import { Award, Calendar, GraduationCap, HeartHandshake, Languages } from 'lucide-react'
import { profile } from '../data/profile'
import { Heading, Reveal, Row, Tile } from './ui'
const fi = [GraduationCap, Calendar, Award, Languages, HeartHandshake]
export default function About() {
  return (
    <section id="about" className="s"><Heading>The full story</Heading>
      <Reveal><div className="story">{profile.about.map((p, i) => <p key={i}>{i === 0 && <b>Curious mind. Engineering mindset. </b>}{p}</p>)}</div>
      </Reveal>
      <Row>
        <Tile theme="g1" art={<img src={profile.photo} alt="Portrait of Nagalli Deepak" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 25%' }} />}><h3>Nagalli Deepak</h3><small>B.Tech CSE (AI) · Class of 2027</small></Tile>
        {profile.facts.map((f, i) => { const [k, v] = f.split(': '); return <Tile key={f} theme="g6" icon={fi[i]}><small>{k}</small><h3 style={{ fontSize: 20 }}>{v}</h3></Tile> })}
      </Row>
    </section>
  )
}
