# Nagalli Deepak - 3D Portfolio (React + Vite + TypeScript + React Three Fiber)

Stack: React 18, Vite 5, TypeScript, Tailwind CSS 4, three.js, @react-three/fiber, @react-three/drei, GSAP + ScrollTrigger, Framer Motion, lucide-react.

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```
Deploy the `dist/` folder to Netlify, Vercel, GitHub Pages or Cloudflare Pages (base is relative, so any path works).

## Where to edit
- `src/data/profile.ts`   name, links, about text, education, internship, resume path
- `src/data/projects.ts`  projects; add `repoUrl` or `liveUrl` when you have them
- `src/data/skills.ts`, `src/data/certifications.ts` (add `verifyUrl` per certificate)
- `src/assets/profile.jpg` your photo; `public/Nagalli_Deepak_Resume.pdf` your resume

## 3D architecture
- `src/components/Scene3D.tsx`: one fixed R3F canvas (lazy-loaded). Chrome core + glass shell, rings with satellites,
  GPU shader dust (pointer + scroll reactive), orbital particles, stars, constellation, road/vehicles/glass panels, floating geometry, grid, lights.
- `src/lib/sceneState.ts`: shared scene state tweened by GSAP ScrollTrigger per section (App.tsx); read each frame, so there are no React re-renders.
- Adaptive pixel ratio (PerformanceMonitor), fewer particles on mobile, WebGL fallback, reduced-motion support, GPU cleanup on unmount.

## Notes
- Certificates, project screenshots and the MicroIntern GitHub link are not included yet. Nothing is invented.
- Light intensities were tuned without a live preview; if the 3D scene looks too bright or dark, adjust `Lights()` in Scene3D.tsx.
