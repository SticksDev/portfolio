'use client';

const AboutTxt = `
@@@@@@@@@@@@@@@@@@@@@@@@@@@@    ---- Reading file about_me.inf ----
@@@@@@@@@@@@@@@@@@@@@@@@@@@@    ---- File read successful ----
@@@@@@@@@@@@@@@@@@@@@@@@@@@@    Name: SticksDev (Tanner Sommers)
@@@@@@@@@@@@@@@@@@@@@@@@@@@@    Age: 21
@@@@@@@@@@@****+++=@@@@@@@@@    Location: United States (UTC-5)
@@@@@@@@@=-@@@@@@@@@@@@@@@@@    Occupation: Software Engineer/Freelancer
@@@@@@@@@.:@@@@@@@@@@@@@@@@@    Skills: JavaScript, TypeScript, React, Svelte, Node.js, Python, C#, Java
@@@@@@@@@@@------@@@@@@@@@@@    Interests: Web Development, Game Development, Cybersecurity
@@@@@@@@@@@@@@@@@--@@@@@@@@@    Hobbies: Coding, Gaming, Chess, Music
@@@@@@@@@==+++***@@@@@@@@@@@    Bio:
@@@@@@@@@%%%%@@%@@@@@@@@@@@@    Hi! I'm Tanner, a software engineer and freelancer from the United States.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@    I love coding, gaming, and learning new things. I'm always looking for new
@@@@@@@@@@@@@@@@@@@@@@@@@@@@    opportunities to grow and expand my skillset. Feel free to reach out to me
@@@@@@@@@@@@@@@@@@@@@@@@@@@@    if you have any questions or just want to chat!
@@@@@@@@@@@@@@@@@@@@@@@@@@@@    ---- End of file ----
`;

export default function About() {
    return <pre className='text-white font-mono'>{AboutTxt}</pre>;
}
