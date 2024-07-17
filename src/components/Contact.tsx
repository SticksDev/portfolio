export function Contact() {
    return (
        <div>
            <h1 className='text-2xl font-bold font-mono'>Contact</h1>
            <p className='text-gray-500'>
                You can reach me at the following email address:
            </p>
            <a
                href='mailto:tanner@teamhydra.dev'
                className='text-blue-500 hover:underline'
            >
                tanner@teamhydra.dev
            </a>
            <br />
            -- or --
            <br />
            <a
                href='https://discord.gg/zira'
                className='text-blue-500 hover:underline'
            >
                Via Discord
            </a>
            <p className='text-gray-500'>
                Please use the #other-support channel to get in touch with me. My 
                username is sticksdev.
            </p>
            <p className='text-gray-500'>
                I look forward to hearing from you soon :)
            </p>
        </div>
    );
}
