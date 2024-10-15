export const projects = [
    {
        title: 'BambuConnect',
        description: 'A simple 3rd party client for managing your 3D printer.',
        link: 'https://github.com/SticksDev/BambuConnect',
    },
    {
        title: 'VRDCN_NetworkTest',
        description:
            'A simple network test for a VR Streaming service. Written in Go.',
        link: 'https://github.com/SticksDev/VRCDN_NetworkTest',
    },
    {
        title: 'Runic Spells',
        description:
            'A simple spell system for Minecraft using Java and PaperMC APIs.',
        link: 'https://github.com/SticksDev/runic_spells',
    },
];

export default function Projects() {
    // Step 1: Calculate maximum lengths
    const maxTitleLength = Math.max(
        ...projects.map((project) => project.title.length),
    );
    const maxDescriptionLength = Math.max(
        ...projects.map((project) => project.description.length),
    );

    // Step 2: Prepare projects with padded strings for rendering
    const preparedProjects = projects.map((project) => ({
        ...project,
        title: project.title.padEnd(maxTitleLength, ' '),
        description: project.description.padEnd(maxDescriptionLength, ' '),
    }));

    return (
        <div className='bg-black font-mono text-white'>
            <h1 className='text-white font-mono text-md mb-4'>
                --- Reading database projects.db ---<br></br>
                Found {projects.length} projects in database. Displaying all
                projects:
            </h1>
            {preparedProjects.map((project, index) => (
                <div key={index} className='flex flex-row'>
                    <p>{project.title}</p> &nbsp;|
                    <p>&nbsp;{project.description}</p>|
                    <a
                        href={project.link}
                        className='hover:text-blue-500 duration-200'
                        target='blank'
                    >
                        &nbsp;{project.link}
                    </a>
                </div>
            ))}

            <h1 className='text-white font-mono text-md mt-4'>
                --- End of database ---
            </h1>
        </div>
    );
}
