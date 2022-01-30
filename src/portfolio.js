const header = {
  // all the properties are optional - can be left empty or deleted
  title: 'SticksDev',
}

const about = {
  // all the properties are optional - can be left empty or deleted
  name: 'Sticks',
  role: 'Developer + Full Time Nerd',
  description:
    'Hi! I am sticks, 18 years old, and currently in collage for Computer Science. Feel free to check out my projects and contact me if you have any questions.',
  resume: '#contact-popen',
  social: {
    github: 'https://github.com/Thatcooldevguy',
  },
}

const projects = [
  // projects can be added an removed
  // if there are no projects, Projects section won't show up
  {
    name: 'AgeBot',
    description:
      'A bot that handles age verification for the Discord server(s) that require it.',
    stack: ['JS', 'Next', 'React'],
    livePreview: 'https://agebot.sticks.network',
  },
  {
    name: 'FRCEasyInstaller',
    description:
      '.NET Application that installs FRC software on a Windows machine.',
    stack: ['.NET', 'C#'],
    sourceCode: 'https://github.com/Thatcooldevguy/FRCEasyInstaller',
  },
]

const skills = [
  // skills can be added or removed
  // if there are no skills, Skills section won't show up
  'JavaScript (Node.js)',
  'TypeScript',
  'React',
  'Next.js',
  'Python',
  'C#',
  'Java',

]

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: '',
}

export { header, about, projects, skills, contact }
