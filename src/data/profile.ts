import photo from '../assets/profile.jpg'
export const profile = {
  name: 'Nagalli Deepak',
  email: 'deepakdindi1@gmail.com',
  photo,
  resume: `${import.meta.env.BASE_URL}Nagalli_Deepak_Resume.pdf`,
  roles: [
    'Computer Science and Engineering (Artificial Intelligence) Student',
    'Software Developer · AI/ML Enthusiast',
    'Aspiring Engineer · Class of 2027',
    'AWS & SAP Certified',
  ],
  cgpa: 8.76,
  intro:
    "Building intelligent solutions. Engineering what's next. I'm passionate about building practical software, exploring intelligent systems, and solving meaningful problems through technology.",
  about: [
    "I'm Nagalli Deepak, a Computer Science and Engineering student specializing in Artificial Intelligence, graduating in 2027. I enjoy solving programming problems, building practical software projects, and exploring how AI can improve real-world systems.",
    "My interests span Java and Python programming, machine learning, computer vision, and enterprise technology. Through projects, certifications, and internship experience, I'm continuously strengthening my technical skills and preparing to contribute to real engineering teams.",
  ],
  facts: ['Degree: B.Tech CSE (AI)', 'Graduation: 2027', 'CGPA: 8.76', 'Languages: English, Telugu, Kannada', 'Strengths: Problem solving · Quick learning · Teamwork'],
  links: {
    linkedin: 'https://linkedin.com/in/n-deepak-74677a280',
    github: 'https://github.com/nani8732',
    leetcode: 'https://leetcode.com/u/deepaknagalli_01/',
    codechef: 'https://www.codechef.com/users/deepaknagalli',
    hackerrank: 'https://www.hackerrank.com/profile/23ata31117',
  },
  education: [
    { n: 1, title: 'SSC · 10th class', place: 'Zilla Parishad High School, Yemmiganur', meta: '2020–2021 · CGPA 8.7', theme: 'g6' },
    { n: 2, title: 'Intermediate · MPC', place: 'Nalanda Junior College, Yemmiganur', meta: '2021–2023 · 95.1%', theme: 'g2' },
    { n: 3, title: 'B.Tech CSE (AI)', place: 'G. Pullaiah College of Engineering and Technology, Kurnool', meta: '2023–2027 · CGPA 8.76 · ongoing', theme: 'g1' },
  ],
  internship: {
    n: 4, title: 'Learning by building', theme: 'g4',
    place: 'Infosys Springboard Virtual Internship: Agent-Orchestration Framework with LangChain.',
    meta: 'Gained hands-on experience with LangChain by building AI agents and workflow automation solutions.',
  },
  principles: [
    { title: 'Solve real problems', text: 'Understand problems before writing code and build practical solutions.', theme: 'g3' },
    { title: 'Learn through implementation', text: 'Experiment, build projects, and improve through feedback.', theme: 'g2' },
    { title: 'Build with purpose', text: 'Combine programming, AI and modern tools to create useful, maintainable software.', theme: 'g1' },
  ],
}
