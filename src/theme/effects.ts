export const effects = {
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.2s'
  },
  animations: {
    flicker: {
      keyframes: `
        0% { opacity: 0.95; }
        5% { opacity: 1; }
        10% { opacity: 0.95; }
        15% { opacity: 0.98; }
        20% { opacity: 0.9; }
        25% { opacity: 1; }
        30% { opacity: 0.98; }
        35% { opacity: 0.95; }
        40% { opacity: 1; }
        45% { opacity: 0.98; }
        50% { opacity: 0.97; }
        55% { opacity: 0.95; }
        60% { opacity: 0.98; }
        65% { opacity: 1; }
        70% { opacity: 0.95; }
        75% { opacity: 0.9; }
        80% { opacity: 0.98; }
        85% { opacity: 1; }
        90% { opacity: 0.97; }
        95% { opacity: 0.95; }
        100% { opacity: 1; }
      `,
      duration: '8s infinite'
    },
    blink: {
      keyframes: `
        to { visibility: hidden; }
      `,
      duration: '1s steps(2, start) infinite'
    },
    type: {
      keyframes: `
        from { width: 0; }
      `,
      duration: '1.5s steps(30, end) forwards'
    }
  },
  crtEffects: {
    scanlines: `
      linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
      linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))
    `,
    vignette: `
      radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%)
    `
  }
}

export type Effects = typeof effects
