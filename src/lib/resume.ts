import uri from '../assets/resume.pdf?inline'
/** Saves the resume PDF. Uses the Claude `downloads` capability when embedded there, otherwise a normal browser download. */
export async function downloadResume() {
  const bin = atob(uri.split(',')[1]), u = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i)
  const blob = new Blob([u], { type: 'application/pdf' }), name = 'Nagalli_Deepak_Resume.pdf'
  try {
    const c = (window as unknown as { claude?: { use: (n: string) => Promise<{ save: (o: { filename: string; data: Blob }) => Promise<unknown> } | null> } }).claude
    const d = c ? await c.use('downloads') : null
    if (d) { await d.save({ filename: name, data: blob }); return }
  } catch { /* viewer declined or unavailable: fall through */ }
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click()
}
