---
title: Hello, World!
description: Is this thing on?
date: 2025-01-30
tags: ['nuxt', 'content', 'blog']
---

Well Hello, World! Welcome to my new portfolio site built with Nuxt 3 and Nuxt Content. This is my first blog post, and I'm excited to share my thoughts and experiences with you.

I plan to write a variety of posts here, ranging from technical tutorials to personal reflections. Stay tuned for more content!

I want to quickly get into how I made this site.

## Building with Nuxt 3 and Nuxt Content

This all started with me wanting to add some new stuff to my portfolio site. I had previously built it with React and NextJS, but I was very unhappy with JSX for writing content, as well as development speed. A friend of mine had suggested Vue to me a while back, and I had dabbled with it a bit, so I decided to give Vue a try.

While going through the Vue docs and tutorials, I came across Nuxt 3, which is a framework built on top of Vue that provides a lot of great features out of the box, including server-side rendering, static site generation, and more. I was sold on the idea of using Nuxt 3 for my portfolio site.

After learning vue and the basics of Nuxt 3, I wanted to add a blog to my site. I found Nuxt Content, which is a module for Nuxt that allows you to write content in Markdown and other formats and easily integrate it into your Nuxt app. It was exactly what I was looking for.

### Nuxt Content

Nuxt Content made it incredibly easy to add a blog to my site. I could write my posts in Markdown, and Nuxt Content would handle the rest. It provided a simple API for querying and displaying my content, as well as features like syntax highlighting and image optimization.

Here's a code example of how I used Nuxt Content to fetch and display my blog posts:

```vue
<template>
    <div>
        <h1>Blog Posts</h1>
        <ul>
            <li v-for="post in posts" :key="post.slug">
                <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup>
const { data: posts } = await useAsyncData('blog-posts', () => {
    return await queryCollection('blog').all()
});
</script>
```

That's it! With just a few lines of code, I was able to fetch and display my blog posts on my site.

## The Window System

One of the unique features of my portfolio site is the window system. I wanted to create a desktop-like experience for users, where they could open and close different windows to view my projects and blog posts. In classic windows 95 style!

Currently, windows can be opened and closed, and moved around. Hopefully in the future I can add resizing and minimizing as well.

Here's a code snippet of how I implemented the window system using Vue's component system:

```vue
<template>
    <div
        v-if="isOpen"
        class="window"
        :style="{
            left: `${x}px`,
            top: `${y}px`,
            zIndex: isActive ? 100 : 50,
        }"
        @mousedown="activate"
    >
        <!-- Window Title Bar -->
        <div class="title-bar" @mousedown="startDrag">
            <span>{{ title }}</span>
            <button @click="close">×</button>
        </div>

        <!-- Window Content -->
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    title: string;
    initialX: number;
    initialY: number;
    isActive: boolean;
}>();

const emit = defineEmits<{
    close: [];
    activate: [];
}>();

const x = ref(props.initialX);
const y = ref(props.initialY);
const isDragging = ref(false);

const startDrag = (e: MouseEvent) => {
    isDragging.value = true;
    const startX = e.clientX - x.value;
    const startY = e.clientY - y.value;

    const onMove = (e: MouseEvent) => {
        if (isDragging.value) {
            x.value = e.clientX - startX;
            y.value = e.clientY - startY;
        }
    };

    const onUp = () => {
        isDragging.value = false;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
};

const close = () => emit('close');
const activate = () => emit('activate');
</script>
```

Really simple boilerplate for draggable windows! Each window component manages its own position and dragging state. The parent component can handle opening, closing, and activating windows.

## Conclusion

Overall, I'm really happy with how my portfolio site turned out using Nuxt 3 and Nuxt Content. The development experience was smooth and enjoyable, and I was able to add a blog and a unique window system with ease. I'm excited to continue adding more content and features to my site in the future!

Until next time!

-Tanner (or sticks)
