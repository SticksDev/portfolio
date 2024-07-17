import Shrimp from '@/components/ShrimpRender';
import Image from 'next/image';

export default function Home() {
    return (
        <div className='min-h-screen min-w-screen'>
            <Shrimp />
            <div className='absolute z-[1] bottom-0 left-1/2 transform -translate-x-1/2 text-white font-mono pb-10 text-center'>
                <p>SticksDev</p>
                <p>In shrimp, we trust.</p>

                {/* Contact link */}
                <div className='text-blue-400 flex flex-row space-x-2'>
                    <a href='/term' className='hover:text-blue-500 duration-200'>
                        Open Terminal to Learn More
                    </a>
                    <p className='text-white'>or</p>
                    <a
                        href='mailto:sticks@teamhydra.dev'
                        className='hover:text-blue-500 duration-200'
                    >
                        Get in touch
                    </a>
                </div>
            </div>
        </div>
    );
}
