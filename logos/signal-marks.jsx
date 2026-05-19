/* ──────────────────────────────────────────────────────────────────────────
   Signal · variation studies
   Six explorations of the same DNA: rounded cell + clean sine + accent dot.
   ────────────────────────────────────────────────────────────────────────── */

const VB = 220;
const C  = 110;

/* shared sine path (1.5 cycles, amplitude 30) — used by most variants */
function sinePath({ y = C, amp = 30, w = 120 } = {}) {
  // anchored from x=50 to x=170 — 1.5 cycles, three quadratic humps
  const tUp = amp + 20;    // quadratic control overshoot
  return `M 50 ${y}
          Q 70 ${y - tUp}   ${C - 20} ${y}
          Q ${C} ${y + tUp} ${C + 20} ${y}
          Q 150 ${y - tUp}  170 ${y}`;
}

/* ────────── A · Cell (canonical)
   Rounded square cell + 1.5-cycle sine + accent sample dot.            */
function Signal_A({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent }) {
  return (
    <svg width={size} viewBox={`0 0 ${VB} ${VB}`} aria-label="Signal · Cell">
      <rect x="30" y="30" width="160" height="160" rx="22" ry="22"
            fill="none" stroke={ink} strokeWidth="1.6" />
      <line x1="50" y1={C} x2="170" y2={C} stroke={ink} strokeWidth="1" opacity="0.18" />
      <path d={sinePath()} fill="none" stroke={ink} strokeWidth="4"
            strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={C + 20} cy={C} r="4.5" fill={accent} />
    </svg>
  );
}

/* ────────── B · Pill
   Full pill border (radius = 80) — softer, more "app icon" feel.       */
function Signal_B({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent }) {
  return (
    <svg width={size} viewBox={`0 0 ${VB} ${VB}`} aria-label="Signal · Pill">
      <rect x="30" y="30" width="160" height="160" rx="80" ry="80"
            fill="none" stroke={ink} strokeWidth="1.6" />
      <path d={sinePath()} fill="none" stroke={ink} strokeWidth="4"
            strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={C + 20} cy={C} r="4.5" fill={accent} />
    </svg>
  );
}

/* ────────── C · Solid (reversed)
   Ink-filled rounded cell, paper sine inside.                          */
function Signal_C({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent }) {
  return (
    <svg width={size} viewBox={`0 0 ${VB} ${VB}`} aria-label="Signal · Solid">
      <rect x="30" y="30" width="160" height="160" rx="22" ry="22" fill={ink} />
      <path d={sinePath()} fill="none" stroke={paper} strokeWidth="4"
            strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={C + 20} cy={C} r="5.5" fill={accent} />
    </svg>
  );
}

/* ────────── D · Open
   No frame. Just the wave and the dot.                                 */
function Signal_D({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent }) {
  return (
    <svg width={size} viewBox={`0 0 ${VB} ${VB}`} aria-label="Signal · Open">
      <path d={sinePath()} fill="none" stroke={ink} strokeWidth="5"
            strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={C + 20} cy={C} r="6" fill={accent} />
    </svg>
  );
}

/* ────────── E · Grid
   Cell + faint dotted baseline + tick marks at zero crossings.         */
function Signal_E({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent }) {
  const crossings = [50, C - 20, C + 20, 170];
  return (
    <svg width={size} viewBox={`0 0 ${VB} ${VB}`} aria-label="Signal · Grid">
      <rect x="30" y="30" width="160" height="160" rx="22" ry="22"
            fill="none" stroke={ink} strokeWidth="1.6" />
      {/* dotted baseline */}
      <line x1="50" y1={C} x2="170" y2={C} stroke={ink} strokeWidth="1"
            strokeDasharray="2 4" opacity="0.35" />
      {/* tick marks at zero crossings */}
      {crossings.map((x, i) => (
        <line key={i} x1={x} y1={C - 4} x2={x} y2={C + 4} stroke={ink} strokeWidth="1.2" opacity="0.55" />
      ))}
      <path d={sinePath()} fill="none" stroke={ink} strokeWidth="4"
            strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={C + 20} cy={C} r="4.5" fill={accent} />
    </svg>
  );
}

/* ────────── F · Echo
   Two sines — primary in ink, phase-shifted ghost in accent.           */
function Signal_F({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent }) {
  // phase-shifted: offset by 10 px on x (≈ π/4 shift)
  const ghost = `M 50 ${C + 4}
                 Q 80 ${C - 26}  ${C - 10} ${C + 4}
                 Q ${C + 10} ${C + 34} ${C + 30} ${C + 4}
                 Q 160 ${C - 26} 170 ${C + 4}`;
  return (
    <svg width={size} viewBox={`0 0 ${VB} ${VB}`} aria-label="Signal · Echo">
      <rect x="30" y="30" width="160" height="160" rx="22" ry="22"
            fill="none" stroke={ink} strokeWidth="1.6" />
      <path d={ghost} fill="none" stroke={accent} strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      <path d={sinePath()} fill="none" stroke={ink} strokeWidth="4"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SIGNAL_VARIANTS = [
  { id: 'A', key: 'cell',  name: 'Cell',   sub: 'Rounded frame · 1.5 cycles · accent sample',     C: Signal_A, picked: true,
    idea: 'Canonical. The frame anchors the wave; the accent dot is the studio handshake.' },
  { id: 'B', key: 'pill',  name: 'Pill',   sub: 'Full pill border, softer silhouette',            C: Signal_B,
    idea: 'Friendlier. Reads closest to an iOS app tile already — fewer corners to defend.' },
  { id: 'C', key: 'solid', name: 'Solid',  sub: 'Ink-filled cell, paper sine reversed',           C: Signal_C,
    idea: 'Maximum contrast. Best as a sticker, App-Store tile, or single-color print where the cell becomes the canvas.' },
  { id: 'D', key: 'open',  name: 'Open',   sub: 'Frameless — just the wave and the dot',          C: Signal_D,
    idea: 'The cell vanishes. Most natural beside the wordmark; weakest as a standalone favicon.' },
  { id: 'E', key: 'grid',  name: 'Grid',   sub: 'Dotted baseline + zero-crossing ticks',          C: Signal_E,
    idea: 'Graph-paper cadence. Says "measurement" — the most overtly research-flavored variant.' },
  { id: 'F', key: 'echo',  name: 'Echo',   sub: 'Primary sine + accent ghost (phase-shifted)',    C: Signal_F,
    idea: 'Theory and signal in superposition. The accent stops being a dot and becomes a second waveform.' },
];

window.SIGNAL_VARIANTS = SIGNAL_VARIANTS;
window.signalSinePath = sinePath;
