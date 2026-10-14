import { useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, PerformanceMonitor, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { scene as S, ui, rt, isDesktop as D, reducedMotion as RM } from '../lib/sceneState'

const rand = (a: number, b: number) => a + Math.random() * (b - a)
const fade = (mats: THREE.Material[], k: number) => mats.forEach((m) => { m.opacity = (m.userData.o ?? 1) * k })

/** Master clock: damped pointer, smoothed scroll, camera parallax. Runs first each frame. */
function Clock() {
  useFrame(({ camera, pointer }, d) => {
    const dt = Math.min(d, 0.05)
    rt.T += RM ? 0 : dt; rt.TS += RM ? 0 : dt * S.speed
    const s0 = window.scrollY
    rt.vel += (s0 - rt.sy - rt.vel) * 0.1; rt.sy += (s0 - rt.sy) * 0.08
    rt.mx = THREE.MathUtils.damp(rt.mx, pointer.x, 3, dt); rt.my = THREE.MathUtils.damp(rt.my, pointer.y, 3, dt)
    rt.cy = -rt.sy * 0.008
    if (++rt.n % 60 === 0) rt.range = Math.max(10, (document.documentElement.scrollHeight - innerHeight) * 0.008)
    camera.position.set(rt.mx * 0.35, rt.cy + rt.my * 0.2, 8); camera.lookAt(0, rt.cy, 0)
  })
  return null
}
function Follow({ children }: { children: ReactNode }) {
  const g = useRef<THREE.Group>(null!)
  useFrame(() => { g.current.position.y = rt.cy })
  return <group ref={g}>{children}</group>
}

const RINGS: [number, number, string, number][] = [[2.3, 0.9, '#3d7bff', 0.5], [2.9, 1.4, '#8b5cf6', -0.35], [3.5, 0.4, '#22d3ee', 0.25]]

/** Chrome core inside a glass shell, three rings with satellites, halos and orbital particles. */
function Sculpture() {
  const rig = useRef<THREE.Group>(null!), core = useRef<THREE.Mesh>(null!), glass = useRef<THREE.Mesh>(null!)
  const rings = useRef<THREE.Group>(null!), halos = useRef<THREE.Group>(null!)
  const tex = useMemo(() => {
    const c = document.createElement('canvas'); c.width = c.height = 128
    const x = c.getContext('2d')!, g = x.createRadialGradient(64, 64, 0, 64, 64, 64)
    g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(0.35, 'rgba(255,255,255,.25)'); g.addColorStop(1, 'rgba(255,255,255,0)')
    x.fillStyle = g; x.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c)
  }, [])
  const { orbit, omat } = useMemo(() => {
    const n = D ? 50 : 24, o = new Float32Array(n * 4)
    for (let i = 0; i < n; i++) o.set([rand(1.9, 3.8), rand(0.25, 0.85) * (Math.random() < 0.5 ? -1 : 1), rand(0, 6.28), rand(0, 3.14)], i * 4)
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3)); g.setAttribute('o', new THREE.BufferAttribute(o, 4))
    const omat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { t: { value: 0 }, pr: { value: 1 } },
      vertexShader: `attribute vec4 o;uniform float t,pr;varying float v;void main(){float a=o.z+t*o.y;vec3 p=vec3(cos(a)*o.x,0.,sin(a)*o.x);float c=cos(o.w),s=sin(o.w);p=vec3(p.x,p.y*c-p.z*s,p.y*s+p.z*c);v=o.w;vec4 mv=modelViewMatrix*vec4(p,1.);gl_PointSize=3.2*pr*(60./-mv.z);gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `varying float v;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;vec3 c=mix(vec3(.35,.85,1.),vec3(.6,.4,1.),fract(v));gl_FragColor=vec4(c,smoothstep(.5,0.,d));}`,
    })
    const orbit = new THREE.Points(g, omat); orbit.frustumCulled = false
    return { orbit, omat }
  }, [])
  useFrame(({ gl }) => {
    rig.current.position.set(S.cx, S.cy + Math.sin(rt.T) * 0.06, 0); rig.current.scale.setScalar(S.s)
    core.current.rotation.set(rt.TS * 0.12 + rt.my * 0.2, rt.TS * 0.18 + rt.mx * 0.4 + rt.sy * 0.0015, 0)
    glass.current.rotation.set(-rt.TS * 0.1, -rt.TS * 0.14 - rt.mx * 0.3, 0)
    rings.current.children.forEach((g, i) => {
      const [r0, , , sp] = RINGS[i]
      g.rotation.z += (0.002 + Math.abs(rt.vel) * 0.0002) * (sp > 0 ? 1 : -1) * (i + 1) * 0.6 * (RM ? 0 : 1)
      g.rotation.x += rt.my * 0.002
      const a = rt.TS * sp * 2; g.children[1].position.set(Math.cos(a) * r0, Math.sin(a) * r0, 0)
    })
    halos.current.children.forEach((h, i) => { ((h as THREE.Sprite).material as THREE.SpriteMaterial).opacity = (i ? 0.3 : 0.35) * S.bright })
    omat.uniforms.t.value = rt.TS; omat.uniforms.pr.value = gl.getPixelRatio()
  })
  return (
    <group ref={rig}>
      <group>
        <mesh ref={core}><icosahedronGeometry args={[1.05, 2]} /><meshStandardMaterial color="#cfd6ff" metalness={1} roughness={0.1} envMapIntensity={1.3} flatShading /></mesh>
        <mesh ref={glass}><icosahedronGeometry args={[1.6, 1]} />
          {D ? <meshPhysicalMaterial color="#aabbff" roughness={0.04} transmission={1} thickness={0.8} clearcoat={1} envMapIntensity={1.4} flatShading transparent />
             : <meshStandardMaterial color="#7a9cff" transparent opacity={0.18} roughness={0.1} flatShading />}
        </mesh>
        <group ref={rings}>
          {RINGS.map(([r0, tx, c], i) => (
            <group key={i} rotation={[tx, i * 0.7, 0]}>
              <mesh><torusGeometry args={[r0, 0.012, 8, 160]} /><meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.8} metalness={1} roughness={0.3} /></mesh>
              <mesh><sphereGeometry args={[0.07, 16, 12]} /><meshStandardMaterial color="#ffffff" emissive={c} emissiveIntensity={2} /></mesh>
            </group>
          ))}
        </group>
        <group ref={halos}>
          <sprite scale={[9, 9, 1]} position={[0, 0, -1.2]}><spriteMaterial map={tex} color="#3d7bff" blending={THREE.AdditiveBlending} transparent depthWrite={false} /></sprite>
          <sprite scale={[6, 6, 1]} position={[1.2, -0.6, -1.2]}><spriteMaterial map={tex} color="#8b5cf6" blending={THREE.AdditiveBlending} transparent depthWrite={false} /></sprite>
        </group>
        <primitive object={orbit} />
      </group>
    </group>
  )
}

/** Dust: GPU-driven drift that is displaced by the pointer and shifted by scroll depth. */
function Dust() {
  const { pts, mat } = useMemo(() => {
    const n = D ? 220 : 90, p = new Float32Array(n * 3), a = new Float32Array(n), z = new Float32Array(n)
    for (let i = 0; i < n; i++) { p.set([rand(-13, 13), rand(-10, 10), rand(-6, 2)], i * 3); a[i] = rand(0.3, 1.2); z[i] = rand(0.6, 2.2) }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(p, 3)); g.setAttribute('a', new THREE.BufferAttribute(a, 1)); g.setAttribute('sz', new THREE.BufferAttribute(z, 1))
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { t: { value: 0 }, m: { value: new THREE.Vector2(99, 99) }, sc: { value: 0 }, pr: { value: 1 }, d: { value: 1 } },
      vertexShader: `attribute float a,sz;uniform float t,sc,pr;uniform vec2 m;varying float v;void main(){vec3 p=position;p.x+=sin(t*.15*a+position.y)*.6;p.y+=cos(t*.12*a+position.x)*.5+sc*a*.0012;p.y=mod(p.y+10.,20.)-10.;vec2 d=p.xy-m;float l=length(d);p.xy+=normalize(d+vec2(1e-4))*smoothstep(2.6,0.,l)*.5;vec4 mv=modelViewMatrix*vec4(p,1.);gl_PointSize=sz*pr*(70./-mv.z);v=a;gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `uniform float d;varying float v;void main(){float r=length(gl_PointCoord-.5);if(r>.5)discard;gl_FragColor=vec4(vec3(.6,.72,1.),smoothstep(.5,0.,r)*(.3+.45*v)*d);}`,
    })
    const pts = new THREE.Points(g, mat); pts.frustumCulled = false
    return { pts, mat }
  }, [])
  useFrame(({ gl, pointer }) => {
    const u = mat.uniforms
    u.t.value = rt.T; u.sc.value = window.scrollY; u.pr.value = gl.getPixelRatio()
    u.m.value.set(pointer.x * 6.6, pointer.y * 3.7); u.d.value = 0.55 + 0.45 * S.bright
  })
  return <primitive object={pts} />
}

/** Skills: glowing nodes that connect into a constellation. */
function Constellation() {
  const { grp, lm, pm } = useMemo(() => {
    const n = D ? 34 : 18, np: THREE.Vector3[] = []
    for (let i = 0; i < n; i++) {
      const u = rand(0, 6.28), v = Math.acos(rand(-1, 1)), r = rand(3.4, 6)
      np.push(new THREE.Vector3(Math.sin(v) * Math.cos(u) * r * 1.5, Math.cos(v) * r * 0.9, Math.sin(v) * Math.sin(u) * r * 0.6))
    }
    const lp: number[] = []
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (np[i].distanceTo(np[j]) < 3.2) lp.push(...np[i].toArray(), ...np[j].toArray())
    const lm = new THREE.LineBasicMaterial({ color: 0x6d8cff, transparent: true, opacity: 0 }); lm.userData.o = 0.45
    const pm = new THREE.PointsMaterial({ color: 0x9ff0ff, size: 0.16, transparent: true, opacity: 0, depthWrite: false }); pm.userData.o = 0.9
    const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.Float32BufferAttribute(lp, 3))
    const grp = new THREE.Group(); grp.add(new THREE.LineSegments(lg, lm), new THREE.Points(new THREE.BufferGeometry().setFromPoints(np), pm))
    return { grp, lm, pm }
  }, [])
  useFrame(() => { grp.rotation.y = rt.T * 0.05; fade([lm, pm], S.net); grp.visible = S.net > 0.01 })
  return <primitive object={grp} />
}

/** Projects: roadway with tracked vehicle boxes and floating glass interface layers. */
function ProjectsField() {
  const { grp, mats, veh, pan } = useMemo(() => {
    const grp = new THREE.Group(), mats: THREE.Material[] = [], road = new THREE.Group()
    road.position.set(D ? 3 : 0, -2.4, 0); grp.add(road)
    const lm = new THREE.LineBasicMaterial({ color: 0x3d7bff, transparent: true, opacity: 0 }); lm.userData.o = 0.7; mats.push(lm)
    ;[-1.8, -0.9, 0, 0.9, 1.8].forEach((x) => road.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, 0, -16), new THREE.Vector3(x, 0, 3)]), lm)))
    const veh: THREE.LineSegments[] = []
    for (let i = 0; i < 9; i++) {
      const bm = new THREE.LineBasicMaterial({ color: i % 3 ? 0x22d3ee : 0x4ade80, transparent: true, opacity: 0 }); bm.userData.o = 0.95; mats.push(bm)
      const b = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.5, 0.3, 0.9)), bm)
      b.userData = { v: rand(0.5, 1.3), z: rand(-16, 3) }; b.position.set([-1.35, -0.45, 0.45, 1.35][i % 4], 0.2, b.userData.z); road.add(b); veh.push(b)
    }
    const pan: THREE.Mesh[] = []
    ;([[3.6, 0.9, -1, -0.45], [4.8, -0.5, -2.5, -0.55], [2.7, -1.2, 0.2, -0.35]] as number[][]).forEach(([x, y, z, ry], i) => {
      const pm = new THREE.MeshStandardMaterial({ color: 0x6a8cff, transparent: true, opacity: 0, metalness: 0.3, roughness: 0.15, side: THREE.DoubleSide }); pm.userData.o = 0.12
      const em = new THREE.LineBasicMaterial({ color: 0x9fb4ff, transparent: true, opacity: 0 }); em.userData.o = 0.6; mats.push(pm, em)
      const m = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.5), pm); m.add(new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry), em))
      m.position.set(D ? x : x - 2.4, y, z); m.rotation.y = ry; m.userData = { y, i }; grp.add(m); pan.push(m)
    })
    return { grp, mats, veh, pan }
  }, [])
  useFrame((_, d) => {
    const dt = Math.min(d, 0.05); fade(mats, S.proj); grp.visible = S.proj > 0.01
    veh.forEach((b) => { const u = b.userData; u.z += u.v * dt * (RM ? 0 : 1) * 4; if (u.z > 3) u.z = -16; b.position.z = u.z })
    pan.forEach((m) => { m.position.y = m.userData.y + Math.sin(rt.T * 0.8 + m.userData.i) * 0.12 })
  })
  return <primitive object={grp} />
}

/** Midground metallic geometry that drifts past as you scroll. */
function Floaters() {
  const { grp, items } = useMemo(() => {
    const geos = [new THREE.OctahedronGeometry(0.6), new THREE.TorusKnotGeometry(0.4, 0.13, 64, 8), new THREE.IcosahedronGeometry(0.5, 0), new THREE.TetrahedronGeometry(0.6), new THREE.BoxGeometry(0.65, 0.65, 0.65)]
    const cols = [0x3d7bff, 0x8b5cf6, 0x22d3ee, 0xcfd6ff], n = D ? 6 : 3, grp = new THREE.Group(), items: THREE.Mesh[] = []
    for (let i = 0; i < n; i++) {
      const m = new THREE.Mesh(geos[i % 5], new THREE.MeshStandardMaterial({ color: cols[i % 4], metalness: 1, roughness: 0.18, flatShading: true, envMapIntensity: 1.1 }))
      m.userData = { u: (i + 0.5) / n, x: (i % 2 ? 1 : -1) * (D ? rand(4.4, 5.8) : 2.7), z: rand(-2, 1), s: rand(0.3, 0.8), i }; grp.add(m); items.push(m)
    }
    return { grp, items }
  }, [])
  useFrame(() => items.forEach((m) => {
    const u = m.userData
    m.position.set(u.x + rt.mx * u.z * 0.4, -u.u * rt.range + Math.sin(rt.T + u.i) * 0.3, u.z)
    m.rotation.set(rt.T * u.s * 0.5 + rt.sy * 0.0015, rt.T * u.s * 0.35, 0)
  }))
  return <primitive object={grp} />
}

/** Blue key light, violet rim light, low ambient fill, plus a cyan light that follows the pointer over interactive elements. */
function Lights() {
  const a = useRef<THREE.PointLight>(null!), b = useRef<THREE.PointLight>(null!), c = useRef<THREE.PointLight>(null!), hv = useRef(0)
  useFrame(({ pointer }) => {
    hv.current += ((ui.hv ? 1 : 0) - hv.current) * 0.1
    a.current.color.setHSL(S.hue, 0.85, 0.55); b.current.color.setHSL((S.hue + 0.14) % 1, 0.8, 0.6)
    a.current.intensity = 1000 * S.bright; b.current.intensity = 350 * S.bright; c.current.intensity = 250 * hv.current * S.bright
    a.current.position.set(4, rt.cy + 3, 5); b.current.position.set(-4, rt.cy + 2, -3); c.current.position.set(pointer.x * 6.6, rt.cy + pointer.y * 3.7, 3)
  })
  return (<>
    <ambientLight intensity={1.2} color="#5560aa" />
    <pointLight ref={a} color="#3d7bff" distance={60} />
    <pointLight ref={b} color="#8b5cf6" distance={60} />
    <pointLight ref={c} color="#22d3ee" distance={30} />
  </>)
}
function Grid() {
  const g = useRef<THREE.GridHelper>(null!)
  useFrame(() => { g.current.position.set(0, rt.cy - 4.5, (rt.sy * 0.004) % 1) })
  return <gridHelper ref={g} args={[70, 70, '#3d7bff', '#16225a']} material-transparent material-opacity={0.22} />
}
function StarField() {
  const g = useRef<THREE.Group>(null!)
  useFrame(() => { g.current.position.y = rt.cy + rt.sy * 0.0012; g.current.rotation.z = rt.T * 0.004 })
  return <group ref={g}><Stars radius={60} depth={30} count={D ? 900 : 350} factor={3} saturation={0} fade speed={0.4} /></group>
}

export default function Scene3D() {
  const [dpr, setDpr] = useState<number | [number, number]>([1, D ? 1.75 : 1.25])
  const webgl = useMemo(() => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')) } catch { return false } }, [])
  if (!webgl) return <div className="scene-fallback" aria-hidden="true" />
  return (
    <Canvas className="scene" aria-hidden="true" dpr={dpr} camera={{ fov: 50, position: [0, 0, 8], near: 0.1, far: 150 }}
      gl={{ antialias: D, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      eventSource={document.body} eventPrefix="client" style={{ opacity: D ? 1 : 0.55 }}>
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={4} color="#3d7bff" position={[5, 3, 4]} scale={[8, 8, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={3} color="#8b5cf6" position={[-6, -1, 3]} scale={[8, 8, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={3} color="#22d3ee" position={[0, 7, -4]} scale={[8, 8, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2} color="#ffffff" position={[0, -5, 6]} scale={[8, 8, 1]} target={[0, 0, 0]} />
      </Environment>
      <Clock /><Lights />
      <StarField />
      <Follow><Dust /><Sculpture /><Constellation /><ProjectsField /></Follow>
      <Floaters /><Grid />
    </Canvas>
  )
}
