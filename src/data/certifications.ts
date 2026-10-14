export interface Cert { title: string; issuer: string; theme: string; verifyUrl?: string }
// Add verifyUrl when a real credential link is available. No IDs or dates are invented.
export const certifications: Cert[] = [
  { title: 'Java Programming', issuer: 'Codetantra', theme: 'g1' },
  { title: 'Python', issuer: 'PrepInsta', theme: 'g2' },
  { title: 'Deep Learning', issuer: 'NPTEL', theme: 'g3' },
  { title: 'AWS Certified AI Practitioner', issuer: 'Amazon Web Services', theme: 'aws' },
  { title: 'SAP Certified – Back-End Developer', issuer: 'ABAP Cloud', theme: 'sap' },
]
