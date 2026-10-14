// Original vector illustrations (not screenshots). Used as card artwork and clearly labelled as illustrations.
const font = { fontFamily: "'Instrument Sans',system-ui,sans-serif" }
const wrap = (label: string, children: React.ReactNode) => (
  <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label} style={font}>{children}</svg>
)

export function TrafficArt() {
  const car = (y: number, w: number, c: string, t: string, begin: string, dur: string) => (
    <g key={t + begin}>
      <rect x="0" y={y} width={w} height="15" rx="4" fill={c} fillOpacity=".3" />
      <rect x="-3" y={y - 4} width={w + 6} height="23" rx="2" fill="none" stroke={c} strokeWidth="1.2" />
      <text x="-3" y={y - 7} fontSize="8" fill={c}>{t}</text>
      <animateTransform attributeName="transform" type="translate" from="-90 0" to="440 0" dur={dur} begin={begin} repeatCount="indefinite" />
    </g>)
  return wrap('Illustration of a road intersection with detected vehicles, a traffic signal and an analytics panel', <>
    <defs><linearGradient id="tsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b2250" /><stop offset="1" stopColor="#050810" /></linearGradient></defs>
    <rect width="400" height="225" fill="url(#tsky)" />
    {[10, 48, 88, 128, 252, 292, 332, 368].map((x, i) => <g key={x}><rect x={x} y={52 - (i % 3) * 16} width="30" height="100" fill="#0e1d44" />
      {[0, 1, 2, 3].map((r) => <rect key={r} x={x + 6} y={62 - (i % 3) * 16 + r * 18} width="4" height="5" fill="#5b8cff" opacity={0.3 + ((i + r) % 3) * 0.2} />)}</g>)}
    <polygon points="165,70 235,70 275,225 125,225" fill="#0c1122" />
    <rect y="132" width="400" height="62" fill="#0c1122" />
    <line x1="0" y1="163" x2="400" y2="163" stroke="#fff" strokeOpacity=".35" strokeDasharray="10 8" />
    <line x1="200" y1="75" x2="200" y2="130" stroke="#fff" strokeOpacity=".3" strokeDasharray="6 6" />
    {car(140, 38, '#22d3ee', 'car', '0s', '8s')}{car(142, 54, '#4ade80', 'bus', '-3s', '10s')}{car(172, 30, '#fbbf24', 'bike', '-5s', '7s')}{car(174, 40, '#22d3ee', 'car', '-1s', '9s')}
    <rect x="300" y="60" width="6" height="70" fill="#1a2547" /><rect x="292" y="52" width="22" height="46" rx="5" fill="#0a0f24" stroke="#2a3a70" />
    <circle cx="303" cy="62" r="5" fill="#5a1a1a" /><circle cx="303" cy="75" r="5" fill="#5a4a1a" /><circle cx="303" cy="88" r="5" fill="#4ade80"><animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite" /></circle>
    <rect x="12" y="12" width="118" height="52" rx="8" fill="#050a1c" fillOpacity=".85" stroke="#2a3a70" />
    <text x="22" y="30" fontSize="9" fill="#9aa3c7">VEHICLE COUNT</text><text x="22" y="44" fontSize="9" fill="#9aa3c7">SIGNAL: ADAPTIVE</text><text x="22" y="57" fontSize="9" fill="#22d3ee">PYGAME DASHBOARD</text>
  </>)
}

export function ResumeArt() {
  const chip = (x: number, y: number, t: string, gap = false) => (
    <g key={t}><rect x={x} y={y} width={t.length * 6 + 16} height="18" rx="9" fill={gap ? 'none' : '#8b5cf6'} fillOpacity={gap ? 0 : 0.28} stroke={gap ? '#f59e0b' : '#a78bfa'} strokeDasharray={gap ? '3 3' : undefined} />
      <text x={x + 8} y={y + 12.5} fontSize="9" fill={gap ? '#f59e0b' : '#e8ecff'}>{t}</text></g>)
  return wrap('Illustration of a resume document with extracted skills, a job match bar and skill gaps', <>
    <defs><linearGradient id="rbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a1060" /><stop offset="1" stopColor="#0a0618" /></linearGradient></defs>
    <rect width="400" height="225" fill="url(#rbg)" />
    {[[60, 36, '0.12'], [50, 30, '0.2']].map(([x, y, o], i) => <rect key={i} x={x as number} y={y as number} width="120" height="160" rx="8" fill="#fff" fillOpacity={o as string} />)}
    <rect x="40" y="24" width="120" height="160" rx="8" fill="#f4f6ff" /><circle cx="62" cy="48" r="11" fill="#8b5cf6" /><rect x="80" y="40" width="60" height="6" rx="3" fill="#2a2a5a" /><rect x="80" y="52" width="40" height="5" rx="2.5" fill="#9aa3c7" />
    {[76, 90, 104, 118, 132, 146, 160].map((y, i) => <rect key={y} x="54" y={y} width={92 - (i % 3) * 14} height="5" rx="2.5" fill="#c4c9e6" />)}
    <rect x="52" y="112" width="72" height="9" rx="3" fill="#8b5cf6" fillOpacity=".35"><animate attributeName="width" values="0;72;72" dur="3s" repeatCount="indefinite" /></rect>
    <path d="M165 100 C200 100 190 70 225 70" stroke="#a78bfa" strokeWidth="1.5" fill="none" strokeDasharray="4 3"><animate attributeName="stroke-dashoffset" values="14;0" dur="1.5s" repeatCount="indefinite" /></path>
    <path d="M165 110 C200 110 190 130 225 130" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
    <text x="225" y="40" fontSize="10" fill="#9aa3c7">EXTRACTED SKILLS</text>{chip(225, 48, 'Python')}{chip(285, 48, 'NLP')}{chip(225, 72, 'REST')}{chip(270, 72, 'ML')}
    <text x="225" y="112" fontSize="10" fill="#9aa3c7">JOB MATCH</text><rect x="225" y="118" width="150" height="7" rx="3.5" fill="#ffffff" fillOpacity=".12" /><rect x="225" y="118" width="100" height="7" rx="3.5" fill="#22d3ee"><animate attributeName="width" values="40;100;40" dur="5s" repeatCount="indefinite" /></rect>
    <text x="225" y="150" fontSize="10" fill="#9aa3c7">SKILL GAPS</text>{chip(225, 158, 'to learn', true)}{chip(285, 158, 'to learn', true)}
    <text x="225" y="196" fontSize="8" fill="#6b6f99">Illustration, sample content</text>
  </>)
}

export function MicroArt() {
  const card = (y: number, t: string, c: string) => (
    <g key={t}><rect x="108" y={y} width="268" height="34" rx="7" fill="#fff" fillOpacity=".08" stroke="#fff" strokeOpacity=".15" /><rect x="118" y={y + 9} width="16" height="16" rx="4" fill={c} />
      <text x="142" y={y + 20} fontSize="10" fill="#e8ecff">{t}</text><rect x="326" y={y + 10} width="40" height="14" rx="7" fill={c} fillOpacity=".5" /></g>)
  return wrap('Illustration of a browser window showing the MicroIntern platform with tasks and applications', <>
    <defs><linearGradient id="mbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0d6b6e" /><stop offset="1" stopColor="#041a1c" /></linearGradient></defs>
    <rect width="400" height="225" fill="url(#mbg)" />
    <g transform="rotate(-3 200 112)"><rect x="40" y="26" width="330" height="178" rx="12" fill="#07141a" stroke="#fff" strokeOpacity=".3" />
      <rect x="40" y="26" width="330" height="22" rx="12" fill="#fff" fillOpacity=".08" />{[56, 68, 80].map((x) => <circle key={x} cx={x} cy="37" r="3.5" fill="#fff" fillOpacity=".5" />)}
      <rect x="100" y="31" width="180" height="12" rx="6" fill="#fff" fillOpacity=".1" /><text x="108" y="40" fontSize="7.5" fill="#9fd" >microintern-4d081.firebaseapp.com</text>
      <rect x="40" y="48" width="58" height="156" fill="#fff" fillOpacity=".04" />{[62, 80, 98].map((y) => <rect key={y} x="50" y={y} width="38" height="8" rx="4" fill="#fff" fillOpacity=".18" />)}
      <text x="108" y="70" fontSize="13" fill="#fff" fontWeight="600">Skip Resumes. Prove Your Skills.</text>
      {card(80, 'Coding challenge', '#22d3ee')}{card(120, 'Apply with your solution', '#4ade80')}{card(160, 'Project-based evaluation', '#a78bfa')}</g>
    <text x="14" y="216" fontSize="8" fill="#9fd" fillOpacity=".7">Illustration, not a screenshot</text>
  </>)
}
export const arts: Record<string, () => JSX.Element> = { traffic: TrafficArt, resume: ResumeArt, micro: MicroArt }
