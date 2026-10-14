import hero from '../assets/shots/hero.jpg'
import about from '../assets/shots/about.jpg'
import projectsShot from '../assets/shots/projects.jpg'
import contact from '../assets/shots/contact.jpg'
export interface Project {
  id: string; theme: string; category: string; title: string; description: string
  tags: string[]; workflow: string[]; problem: string; liveUrl?: string; repoUrl?: string; browserMock?: boolean; art: 'traffic' | 'resume' | 'micro' | 'shot'; images?: { src: string; alt: string }[]
}
export const projects: Project[] = [
  {
    id: 'traffic', art: 'traffic', theme: 'g2', category: 'Computer Vision · Intelligent Transportation',
    title: 'AI-Powered Smart Traffic Management System',
    description: 'Developed an AI-based traffic management system using YOLOv7 and OpenCV for real-time vehicle detection and counting. Implemented adaptive traffic signal control based on live traffic density and built a Pygame dashboard to visualize vehicle counts and traffic signal status.',
    tags: ['Python', 'YOLOv7', 'OpenCV', 'Pygame', 'Computer Vision'],
    workflow: ['Detect vehicles in video frames with YOLOv7 and OpenCV.', 'Count vehicles to estimate live traffic density.', 'Adjust signal control based on that density.', 'Show counts and signal status in a Pygame dashboard.'],
    problem: 'Fixed-timer signals ignore real traffic; this project explores density-based control.',
  },
  {
    id: 'resume', art: 'resume', theme: 'g3', category: 'AI · NLP · Machine Learning',
    title: 'AI-Based Smart Resume Analyzer',
    description: 'Developed an AI-powered resume analyzer using Python, Natural Language Processing, and Machine Learning. Implemented Scikit-learn, Transformers, and LLMs for skill extraction and job matching, with REST APIs for generating resume insights and identifying candidate skill gaps.',
    tags: ['Python', 'NLP', 'Machine Learning', 'Scikit-learn', 'Transformers', 'LLMs', 'REST APIs'],
    workflow: ['Process resume text with NLP.', 'Extract skills and match them to job requirements.', 'Generate candidate insights and skill gaps through REST APIs.'],
    problem: 'Helping identify which skills a candidate has and which a role still needs.',
  },
  {
    id: 'microintern', art: 'micro', theme: 'g4', category: 'Full-Stack Web Development · Internship Platform',
    title: 'MicroIntern: Skip Resumes. Prove Your Skills.',
    description: 'MicroIntern is an internship and recruitment platform focused on connecting candidates with practical opportunities through skills-oriented tasks, applications, and project-based evaluation. The live site describes it as a skills-first hiring platform where companies post real coding challenges instead of standard resumes.',
    tags: ['Full-Stack Web Development', 'Internship Platform', 'Firebase Hosting'],
    workflow: ['Companies post real coding challenges.', 'Candidates apply and complete skills-oriented tasks.', 'Candidates are evaluated through project-based work instead of resumes.'],
    problem: 'Resumes say little about what a candidate can actually do; this platform puts practical tasks first.',
    liveUrl: 'https://microintern-4d081.firebaseapp.com/', browserMock: true,
    // repoUrl: 'https://github.com/...'   <- add when available
  },
  {
    id: 'portfolio', art: 'shot', theme: 'g1', category: 'Front-End · 3D Web Experience',
    title: '3D Developer Portfolio (this site)',
    description: 'This portfolio, built with React, TypeScript and Vite. One scroll-driven 3D scene (React Three Fiber and Three.js) runs behind the whole page, with GSAP ScrollTrigger choreography, Framer Motion interface animation and Tailwind CSS styling.',
    tags: ['React', 'TypeScript', 'Vite', 'Three.js', 'React Three Fiber', 'GSAP', 'Framer Motion', 'Tailwind CSS'],
    workflow: ['One fixed WebGL scene stays behind every section.', 'GSAP ScrollTrigger switches the scene preset as each section enters.', 'Pointer and scroll values are damped and read every frame, so React does not re-render for animation.', 'Falls back to a plain gradient without WebGL and respects reduced-motion settings.'],
    problem: 'Showing projects and skills in a memorable way without hurting readability or loading speed.',
    images: [
      { src: hero, alt: 'Portfolio hero with the 3D core, name and portrait' },
      { src: about, alt: 'About section with the story text and fact cards' },
      { src: projectsShot, alt: 'Projects row with illustrated project cards' },
      { src: contact, alt: 'Contact section with email and profile links' },
    ],
  },
]
