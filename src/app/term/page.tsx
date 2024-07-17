'use client';

import About from '@/components/About';
import { Contact } from '@/components/Contact';
import Experience from '@/components/Experince';
import Projects from '@/components/Projects';
import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<React.ReactNode[]>([
        'ShrimpTerm v1.0.0',
        "Type 'help' for a list of commands.",
        'Press Tab for autocomplete, Escape to clear the current input.',
    ]);
    const [suggestion, setSuggestion] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const keyAudio = useRef<HTMLAudioElement | null>(null);
    const enterAudio = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Load the key press sound
        keyAudio.current = new Audio('/key.mp3');
        keyAudio.current.volume = 0.1;
        enterAudio.current = new Audio('/enter.mp3');
        enterAudio.current.volume = 0.1;
        inputRef.current?.focus();
    }, []);

    const commands = [
        'help',
        'about',
        'clear',
        'projects',
        'experience',
        'contact',
        'back',
    ];

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInput(value);

        // Generate suggestion only if 3 or more characters are entered
        if (value.trim().length < 3) {
            setSuggestion('');
            return;
        }

        const matchedCommand = commands.find((command) =>
            command.startsWith(value.trim().toLowerCase()),
        );
        setSuggestion(matchedCommand ? matchedCommand : '');
    };

    function processCommand(command: string) {
        switch (command.trim().toLowerCase()) {
            case 'help':
                setOutput((prevOutput) => [
                    ...prevOutput,
                    'Available commands (click to autocomplete):',
                    <div key='help'>
                        <button
                            key='clear'
                            onClick={() => {
                                setInput('help');
                                inputRef.current?.focus();
                            }}
                            className='text-blue-500 hover:underline'
                        >
                            Help (this command)
                        </button>
                        {' - Display this help message'}
                    </div>,
                    <div key='about'>
                        <button
                            key='clear'
                            onClick={() => {
                                setInput('about');
                                inputRef.current?.focus();
                            }}
                            className='text-blue-500 hover:underline'
                        >
                            About
                        </button>
                        {' - Learn more about Sticks and his projects'}
                    </div>,
                    <div key='projects'>
                        <button
                            key='clear'
                            onClick={() => {
                                setInput('projects');
                                inputRef.current?.focus();
                            }}
                            className='text-blue-500 hover:underline'
                        >
                            Projects
                        </button>
                        {' - List of projects created by Sticks'}
                    </div>,
                    <div key='experience'>
                        <button
                            key='clear'
                            onClick={() => {
                                setInput('experience');
                                inputRef.current?.focus();
                            }}
                            className='text-blue-500 hover:underline'
                        >
                            Experience
                        </button>
                        {" - View Sticks's experience and past positions"}
                    </div>,
                    <div key='contact'>
                        <button
                            key='clear'
                            onClick={() => {
                                setInput('contact');
                                inputRef.current?.focus();
                            }}
                            className='text-blue-500 hover:underline'
                        >
                            Contact
                        </button>
                        {' - Get in touch with Sticks'}
                    </div>,
                    <div key='back'>
                        <button
                            key='clear'
                            onClick={() => {
                                setInput('back');
                                inputRef.current?.focus();
                            }}
                            className='text-blue-500 hover:underline'
                        >
                            Back
                        </button>
                        {' - Return to the home page'}
                    </div>,
                    <div key='clear'>
                        <button
                            key='clear'
                            onClick={() => {
                                setInput('clear');
                                inputRef.current?.focus();
                            }}
                            className='text-blue-500 hover:underline'
                        >
                            Clear
                        </button>
                        {' - Clear the screen'}
                    </div>,
                ]);
                break;
            case 'about':
                setOutput((prevOutput) => [
                    ...prevOutput,
                    <div key='about' className='flex flex-row'>
                        <About />
                    </div>,
                ]);
                break;

            case 'projects':
                setOutput((prevOutput) => [
                    ...prevOutput,
                    <div key='projects' className='flex flex-row'>
                        <Projects />
                    </div>,
                ]);
                break;
            case 'experience':
                setOutput((prevOutput) => [
                    ...prevOutput,
                    <div key='experience' className='flex flex-row'>
                        <Experience />
                    </div>,
                ]);
                break;
            case 'back':
                window.location.href = '/home';
                break;
            case 'contact':
                setOutput((prevOutput) => [
                    ...prevOutput,
                    <div key='contact'>
                        <Contact />
                    </div>,
                ]);
                break;
            case 'clear':
                setOutput([
                    'ShrimpTerm v1.0.0',
                    "Type 'help' for a list of commands.",
                    'Press Tab for autocomplete, Escape to clear the current input.',
                ]);
                break;
            default:
                setOutput((prevOutput) => [
                    ...prevOutput,
                    <div key='error'>
                        <span className='text-red-500'>Error:</span> Bad command
                        or file name: {command}
                    </div>,
                ]);
                break;
        }
    }

    const handleCommandInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            enterAudio.current?.play();
            setOutput((prevOutput) => [...prevOutput, `S:\\> ${input}.exe`]);
            processCommand(input);
            setInput(''); // Clear the input
            setSuggestion(''); // Clear the suggestion
        } else if (e.key === 'Tab' && suggestion) {
            keyAudio.current?.play();
            e.preventDefault(); // Prevent the default tab behavior
            setInput(suggestion); // Set input to the full suggestion
            setSuggestion(''); // Clear the suggestion
        } else if (e.key === 'Escape') {
            keyAudio.current?.play();
            setInput(''); // Clear the input
            setSuggestion(''); // Clear the suggestion
        } else {
            keyAudio.current?.play();
        }
    };

    // Adjustments to the component
    return (
        <div className='bg-black'>
            <div className='absolute z-[1] top-0 left-0 text-white font-mono p-10 overflow-auto min-h-screen min-w-screen'>
                {/* Back Link */}
                <a href='/home' className='hover:text-blue-500 duration-200'>
                    &lt; Back
                </a>
                {output.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
                <p className='text-gray-500'>
                    {input && suggestion ? suggestion : ''}
                </p>
                <input
                    ref={inputRef}
                    className='bg-transparent text-white outline-none'
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleCommandInput}
                    placeholder='Type a command...'
                />
            </div>
        </div>
    );
}
