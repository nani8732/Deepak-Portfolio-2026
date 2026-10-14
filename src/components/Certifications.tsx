import { certifications } from '../data/certifications'
import { Award, BrainCircuit, Cloud, Coffee, Code2, Server } from 'lucide-react'
import { Heading, Row, Tile } from './ui'
const icons = [Coffee, Code2, BrainCircuit, Cloud, Server]
export default function Certifications() {
  return (
    <section id="certs" className="s">
      <Heading sub="5 credentials. Verification links will be added when supplied.">Certified</Heading>
      <Row>{certifications.map((c, i) => (
        <Tile key={c.title} theme={c.theme} icon={icons[i] ?? Award}><span className="n">{i + 1}</span><h3>{c.title}</h3><small>{c.issuer}</small>
          {c.verifyUrl && <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: 6, fontSize: 13 }}>Verify credential</a>}</Tile>))}</Row>
    </section>
  )
}
