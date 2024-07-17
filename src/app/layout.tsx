import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <head>
                <title>Stick&apos;s Portfolio</title>
                <meta name='title' content="Stick's Portfolio" />
                <meta
                    name='description'
                    content='Sometimes I make the computers do the things.'
                />
                <meta name='theme-color' content='#0047AB'></meta>

                <meta property='og:type' content='website' />
                <meta property='og:url' content='https://sticksdev.tech' />
                <meta property='og:title' content="Stick's Portfolio" />
                <meta
                    property='og:description'
                    content='Sometimes I make the computers do the things.'
                />
                <meta
                    property='og:image'
                    content='https://img.sticks.ovh/stickspfpnew.png'
                />

                <meta property='twitter:card' content='summary_large_image' />
                <meta property='twitter:url' content='https://sticksdev.tech' />
                <meta property='twitter:title' content="Stick's Portfolio" />
                <meta
                    property='twitter:description'
                    content='Sometimes I make the computers do the things.'
                />
                <meta
                    property='twitter:image'
                    content='https://sticksdev.techimages/meta-tags.png'
                />
            </head>
            <link
                rel='icon'
                type='image/png'
                href='https://img.sticks.ovh/stickspfpnew.png'
            />
            <body className={inter.className}>{children}</body>
        </html>
    );
}
