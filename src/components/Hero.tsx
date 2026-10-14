import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { profile } from '../data/profile'
import { useCountUp, useTypewriter } from '../lib/hooks'
import { downloadResume } from '../lib/resume'
import { Btn } from './ui'
import { reducedMotion as RM, isDesktop, rt } from '../lib/sceneState'
const item = { hidden: { opacity: 0, y: 34 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.2, 0.7, 0.2, 1] as number[] } } }
export default function Hero() {
  const role = useTypewriter(profile.roles), cgpa = useCountUp(profile.cgpa), ph = useRef<HTMLDivElement>(null)
  useEffect(() => { // photo parallax follows the same damped pointer/scroll values as the 3D scene
    if (RM || !isDesktop) return
    let raf = 0; const f = () => { if (ph.current) ph.current.style.transform = `translate(${rt.mx * -8}px,${rt.my * 5 + rt.sy * 0.06}px)`; raf = requestAnimationFrame(f) }
    f(); return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <header id="home" className="hero">
      <div ref={ph} className="ph"><img src={profile.photo} alt="Portrait of Nagalli Deepak" width={640} height={640} /></div>
      <div className="ht hero-copy">
        <motion.div initial={RM ? false : 'hidden'} animate="show" transition={{ staggerChildren: 0.12 }}>
          <motion.small variants={item}>THE DEVELOPER SERIES · CLASS OF 2027</motion.small>
          <motion.h1 variants={item}>NAGALLI DEEPAK</motion.h1>
          <motion.div variants={item} className="meta"><span>CGPA {cgpa.toFixed(2)}</span><span>2027</span><span>B.Tech CSE (AI)</span><span>Andhra Pradesh</span></motion.div>
          <motion.p variants={item} className="role" aria-label={profile.roles[0]}>{role}</motion.p>
          <motion.p variants={item}>{profile.intro}</motion.p>
          <motion.div variants={item} className="btns">
            <Btn variant="p" href="#projects">▶ Explore my work</Btn><Btn href="#about">ⓘ More info</Btn><Btn href="#contact">Let's connect</Btn>
            <Btn onClick={downloadResume}><Download size={16} /> Download resume</Btn>
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}
