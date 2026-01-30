import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    modules: [
        '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxt/icon',
        '@nuxt/image',
        '@tresjs/nuxt',
    ],

    css: ['./app/assets/css/main.css'],
    vite: {
        plugins: [tailwindcss()],
    },

    app: {
        head: {
            title: "Stick's Portfolio",
            meta: [
                { name: 'title', content: "Stick's Portfolio" },
                {
                    name: 'description',
                    content: 'Sometimes I make the computers do the things.',
                },
                { name: 'theme-color', content: '#0047AB' },
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: 'https://sticksdev.tech' },
                { property: 'og:title', content: "Stick's Portfolio" },
                {
                    property: 'og:description',
                    content: 'Sometimes I make the computers do the things.',
                },
                {
                    property: 'og:image',
                    content: 'https://img.sticks.ovh/stickspfpnew.png',
                },
                { property: 'twitter:card', content: 'summary_large_image' },
                { property: 'twitter:url', content: 'https://sticksdev.tech' },
                { property: 'twitter:title', content: "Stick's Portfolio" },
                {
                    property: 'twitter:description',
                    content: 'Sometimes I make the computers do the things.',
                },
                {
                    property: 'twitter:image',
                    content: 'https://sticksdev.tech/images/meta-tags.png',
                },
            ],
            link: [
                {
                    rel: 'icon',
                    type: 'image/png',
                    href: 'https://img.sticks.ovh/stickspfpnew.png',
                },
            ],
        },
    },
});
