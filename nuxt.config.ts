import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    modules: [
        '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxt/icon',
        '@nuxt/image',
        '@tresjs/nuxt',
    ],

    content: {
        build: {
            markdown: {
                highlight: {
                    // default langs plus mermaid so Shiki doesn't warn on ```mermaid blocks
                    langs: [
                        'js',
                        'jsx',
                        'json',
                        'ts',
                        'tsx',
                        'vue',
                        'css',
                        'html',
                        'vue-html',
                        'bash',
                        'shell',
                        'mdc',
                        'md',
                        'yaml',
                        'mermaid',
                    ],
                },
            },
        },
    },

    css: ['~/assets/css/main.css', '~/assets/css/blog-prose.css'],
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
                    content: 'https://img.sticks.ovh/sticksnewpfp',
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
                    content: 'https://img.sticks.ovh/sticksnewpfp',
                },
            ],
            link: [
                {
                    rel: 'icon',
                    type: 'image/png',
                    href: 'https://img.sticks.ovh/sticksnewpfp',
                },
            ],
        },
    },
});
