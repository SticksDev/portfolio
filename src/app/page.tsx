'use client';
import React, { useState, useEffect, useRef } from 'react';

function Home() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const bootMessages = [
        'Initializing ShrimpBIOS v0.1.0... (c) 2024 SticksDev. All rights reserved.',
        'Checking Memory...',
        '...100KB OK',
        '...512KB OK',
        '...1024KB OK',
        '...2048KB OK',
        '...4096KB OK',
        'Memory OK',
        'Checking CPU...',
        '...CPU OK. Found Intel Pentium II 400MHz',
        'Running POST Cycle for Integrated Graphics...',
        '...Graphics OK. Found Intel i740',
        'Running POST Cycle for Audio...',
        '...Audio OK. Found SoundBlaster 16',
        'Running POST Cycle for Storage...',
        '...Storage OK. Found 1x 40GB HDD',
        '...Storage OK. Found 1x 1.44MB FDD',
        '...Storage OK. Found 1x CD-ROM Drive',
        'Preparing to boot from HDD...',
        'Booting from HDD...',
        'ShrimpOS v1.0.0 (c) 2024 SticksDev. All rights reserved.',
        'Welcome to ShrimpOS!',
        'In shrimp, we trust.',
        'Sending you to the home in 3...',
        '2...',
        '1...',
        'S:\\> home.exe',
        'Inlining ShrimpOS Home...',
        'Done!',
        'Preparing assets...',
        'Done!',
        'Loading ShrimpOS Home...',
        'Done!',
        'Welcome to ShrimpOS Home!',
    ];

    const [currentMessage, setCurrentMessage] = useState('');
    const [messageIndex, setMessageIndex] = useState(0);
    const [hasBootSequenceStarted, setHasBootSequenceStarted] = useState(false);
    const [isBootSequenceDone, setIsBootSequenceDone] = useState(false);
    const [skippedBootSequence, setSkippedBootSequence] = useState(false);

    // Audio refs
    const bootAudio = useRef<HTMLAudioElement | null>(null);
    const welcomeAudio = useRef<HTMLAudioElement | null>(null);

    function startBootSequence() {
        const bootAudio = new Audio('/bootup.mp3');
        bootAudio.play();
        setMessageIndex(1);
        setHasBootSequenceStarted(true);

        // When bootAudio finsihes, play the welcome audio and goto /home
        bootAudio.onended = () => {
            const welcomeAudio = new Audio('/welcome.mp3');

            // Fade out the main div
            const mainDiv = document.getElementById('main');
            if (!mainDiv) return;
            mainDiv.style.opacity = '0';

            welcomeAudio.play();
            setIsBootSequenceDone(true);
            welcomeAudio.onended = () => {
                window.location.href = '/home';
            };
        };
    }

    function handleSkipBootSequence() {
        setSkippedBootSequence(true);
        setMessageIndex(bootMessages.length);

        // Kill all audios 
        bootAudio.current?.pause();
        welcomeAudio.current?.pause();   

        window.location.href = '/home';
    }

    useEffect(() => {
        if (!hasBootSequenceStarted) return;
        if (messageIndex < bootMessages.length) {
            const timer = setTimeout(() => {
                setCurrentMessage(bootMessages[messageIndex]);
                setMessageIndex(messageIndex + 1);
            }, 588); // Change the delay here to speed up or slow down the sequence

            return () => clearTimeout(timer);
        }
    }, [messageIndex, bootMessages, hasBootSequenceStarted]);

    useEffect(() => {
        // Load the bootup sound
        bootAudio.current = new Audio('/bootup.mp3');
        welcomeAudio.current = new Audio('/welcome.mp3');
    }, []);

    return (
        <div className='min-h-screen min-w-screen bg-black flex items-center justify-center'>
            {!hasBootSequenceStarted && (
                <div
                    className={`flex flex-col items-center justify-center text-center text-white font-mono ${
                        hasBootSequenceStarted ? 'hidden' : ''
                    }`}
                >
                    <p>You notice a mysterious computer in front of you.</p>
                    <p>It seems to be off.</p>
                    <button
                        onClick={() => startBootSequence()}
                        className='bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2'
                    >
                        Turn it on
                    </button>
                </div>
            )}
            <div
                className='absolute top-0 left-0 text-white font-mono p-4 text-left transition-opacity duration-300'
                id='main'
            >
                {hasBootSequenceStarted &&
                    bootMessages
                        .slice(0, messageIndex)
                        .map((message, index) => <p key={index}>{message}</p>)}
            </div>
            {/* Add skip boot sequence button in the right corner */}
            <button
                onClick={handleSkipBootSequence}
                className={`absolute top-0 right-0 text-white font-mono p-4 text-right transition-opacity duration-300 ${
                    hasBootSequenceStarted ? '' : 'hidden' // Hide the button if the boot sequence hasn't started
                } ${
                    skippedBootSequence ? 'hidden' : '' // Hide the button if the user has already skipped the boot sequence
                }`}
            >
                Skip Boot Sequence
            </button>
            {/* Center text to fade in once boot seq is done */}
            <div
                className={`flex flex-col items-center justify-center text-white text-center font-mono p-4 transition-opacity duration-500 ${
                    isBootSequenceDone ? 'opacity-100' : 'opacity-0 hidden'
                }`}
                id='center'
            >
                <h1 className='text-2xl font-bold'>ShrimpOS</h1>
                <p className='text-gray-500'>Welcome.</p>
            </div>
        </div>
    );
}

export default Home;
