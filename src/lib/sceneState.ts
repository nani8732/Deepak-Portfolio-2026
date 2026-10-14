import gsap from 'gsap'
export const isDesktop = typeof window !== 'undefined' && window.innerWidth > 760
export const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const D = isDesktop
export interface Preset { cx: number; cy: number; s: number; bright: number; speed: number; net: number; proj: number; hue: number }
export const PRESETS: Record<string, Preset> = {
  home: { cx: D ? -3.4 : 0, cy: D ? 1.1 : 1.8, s: D ? 0.8 : 0.5, bright: 1, speed: 0.55, net: 0, proj: 0, hue: 0.62 },
  about: { cx: D ? 3.8 : 0, cy: D ? 0.2 : 1.8, s: D ? 0.55 : 0.4, bright: 0.75, speed: 0.45, net: 0, proj: 0, hue: 0.7 },
  skills: { cx: 0, cy: 0.2, s: 0.45, bright: 0.7, speed: 0.25, net: 1, proj: 0, hue: 0.66 },
  projects: { cx: D ? -4.2 : 0, cy: D ? -0.2 : 2, s: 0.4, bright: 0.9, speed: 0.6, net: 0, proj: 1, hue: 0.58 },
  certs: { cx: D ? 4.2 : 0, cy: 0.3, s: 0.35, bright: 0.35, speed: 0.25, net: 0, proj: 0, hue: 0.72 },
  journey: { cx: D ? -4.2 : 0, cy: 0.3, s: 0.35, bright: 0.35, speed: 0.25, net: 0, proj: 0, hue: 0.7 },
  contact: { cx: 0, cy: 0.4, s: 1, bright: 0.95, speed: 0.35, net: 0, proj: 0, hue: 0.64 },
}
/** Live scene state: tweened by GSAP ScrollTrigger, read every frame (no React re-renders). */
export const scene: Preset = { ...PRESETS.home }
export const rt = { T: 0, TS: 0, sy: 0, vel: 0, mx: 0, my: 0, cy: 0, range: 40, n: 0 }
export const ui = { hv: false }
export function goPreset(k: string) {
  if (reducedMotion) Object.assign(scene, PRESETS[k])
  else gsap.to(scene, { ...PRESETS[k], duration: 2.6, ease: 'power2.inOut', overwrite: true })
}
