type MermaidModule = typeof import('mermaid').default

// Must match the font forced onto rendered SVGs in MermaidChart.vue —
// mermaid sizes node boxes by measuring text, and any difference between
// the measuring font and the displayed font clips the labels
export const MERMAID_FONT = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"

let mermaidPromise: Promise<MermaidModule> | null = null

// Load and initialize mermaid exactly once, no matter how many charts mount
export function loadMermaid(): Promise<MermaidModule> {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        // Never inject "Syntax error in text" SVGs into the page body;
        // MermaidChart shows its own fallback on failure
        suppressErrorRendering: true,
        fontFamily: MERMAID_FONT,
        themeVariables: { fontFamily: MERMAID_FONT },
        // Render at natural size and let the container scroll instead of
        // shrinking diagrams (and their text) to fit the blog column
        // htmlLabels: false renders labels as real SVG text, which mermaid
        // measures via getBBox on the element it actually draws — unlike
        // foreignObject HTML labels, which are measured in a detached
        // context and hard-clipped when the estimate is short
        flowchart: { useMaxWidth: false, htmlLabels: false },
        sequence: { useMaxWidth: false },
        gantt: {
          useMaxWidth: false,
          useWidth: 900,
          fontSize: 14,
          sectionFontSize: 14,
          barHeight: 24,
        },
      })
      return mermaid
    })
  }
  return mermaidPromise
}

// Render diagrams one at a time so progress advances visibly and the main
// thread isn't hammered by parallel renders
let queue: Promise<unknown> = Promise.resolve()

export function enqueueMermaidRender<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn)
  queue = run.catch(() => {})
  return run
}

export function useMermaidProgress() {
  return useState('mermaid-render-progress', () => ({ total: 0, done: 0 }))
}
