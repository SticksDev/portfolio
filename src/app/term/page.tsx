'use client';

import About from '@/components/About';
import { Contact } from '@/components/Contact';
import Experience from '@/components/Experience';
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

        if (value.trim().length < 3) {
            setSuggestion('');
            return;
        }

        const matchedCommand = commands.find((command) =>
            command.startsWith(value.trim().toLowerCase()),
        );
        setSuggestion(matchedCommand || '');
    };

    const processCommand = (command: string) => {
        switch (command.trim().toLowerCase()) {
            case 'help':
                setOutput((prevOutput) => [
                    ...prevOutput,
                    'Available commands (click to autocomplete):',
                    createCommandButton(
                        'help',
                        'Help (this command) - List available commands',
                    ),
                    createCommandButton(
                        'about',
                        'About - Learn more about Sticks and his projects',
                    ),
                    createCommandButton(
                        'projects',
                        'Projects - List of projects created by Sticks',
                    ),
                    createCommandButton(
                        'experience',
                        "Experience - View Sticks's experience",
                    ),
                    createCommandButton(
                        'contact',
                        'Contact - Get in touch with Sticks',
                    ),
                    createCommandButton(
                        'back',
                        'Back - Return to the home page',
                    ),
                    createCommandButton('clear', 'Clear - Clear the screen'),
                ]);
                break;
            case 'about':
                setOutput((prevOutput) => [
                    ...prevOutput,
                    <About key='about' />,
                ]);
                break;
            case 'projects':
                setOutput((prevOutput) => [
                    ...prevOutput,
                    <Projects key='projects' />,
                ]);
                break;
            case 'experience':
                setOutput((prevOutput) => [
                    ...prevOutput,
                    <Experience key='experience' />,
                ]);
                break;
            case 'back':
                window.location.href = '/home';
                break;
            case 'contact':
                setOutput((prevOutput) => [
                    ...prevOutput,
                    <Contact key='contact' />,
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
                    <div key='error' className='text-red-500'>
                        Error:{' '}
                        <span className='text-red-400'>
                            {command} is not a valid command or batch file.
                        </span>
                    </div>,
                ]);
        }
    };

    const handleCommandInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            enterAudio.current?.play();
            setOutput((prevOutput) => [...prevOutput, `S:\\> ${input}.exe`]);
            processCommand(input);
            setInput('');
            setSuggestion('');
        } else if (e.key === 'Tab' && suggestion) {
            e.preventDefault();
            keyAudio.current?.play();
            setInput(suggestion);
            setSuggestion('');
        } else if (e.key === 'Escape') {
            keyAudio.current?.play();
            setInput('');
            setSuggestion('');
        } else {
            keyAudio.current?.play();
        }
    };

    const createCommandButton = (command: string, label: string) => (
        <div key={command}>
            <button
                className='text-white'
                onClick={() => {
                    setInput(command);
                    inputRef.current?.focus();
                }}
            >
                {label.split(' - ')[0]} -{' '}
                <span className='text-white hover:underline hover:text-blue-500 duration-300'>
                    {label.split(' - ')[1] || (
                        <span className='text-gray-500'>No description</span>
                    )}
                </span>
            </button>
        </div>
    );

    return (
        <div className='bg-black'>
            <div className='absolute z-[1] top-0 left-0 text-white font-mono p-10 overflow-auto min-h-screen min-w-screen'>
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
