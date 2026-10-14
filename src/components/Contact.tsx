import { Download, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { downloadResume } from '../lib/resume'
import { Btn, Heading, Reveal } from './ui'
const L = profile.links
export default function Contact() {
  return (
    <section id="contact" className="end">
      <Heading>To be continued…</Heading>
      <Reveal>
        <p>Let's build something meaningful. I'm looking forward to entry-level opportunities, software development roles, and projects where I can learn, contribute, and grow as an engineer.</p>
        <div className="btns"><Btn variant="r" href={`mailto:${profile.email}`}><Mail size={16} /> Email me</Btn><Btn href={L.linkedin} external><Linkedin size={16} /> LinkedIn</Btn><Btn href={L.github} external><Github size={16} /> GitHub</Btn>
          <Btn onClick={downloadResume}><Download size={16} /> Download resume</Btn></div>
        <div className="soc">{(['leetcode', 'codechef', 'hackerrank'] as const).map((k) => <a key={k} href={L[k]} target="_blank" rel="noopener noreferrer">{k === 'leetcode' ? 'LeetCode' : k === 'codechef' ? 'CodeChef' : 'HackerRank'}</a>)}</div>
        <p><a href={`mailto:${profile.email}`}>{profile.email}</a> · Yemmiganur, Andhra Pradesh, India</p>
      </Reveal>
    </section>
  )
}
