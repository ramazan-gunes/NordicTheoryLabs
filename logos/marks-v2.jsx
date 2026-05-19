/* ──────────────────────────────────────────────────────────────────────────
   Nordic Theory Labs — Logo marks · v2
   Eight ICON marks. Geometry-first, software-forward.
   No literal letters as crutch (except 05 where the graph IS the N).
   Each takes { size, ink, paper, accent }.
   ────────────────────────────────────────────────────────────────────────── */

const VB = 220;   // shared viewbox
const C  = 110;   // center

/* ────────── 01 · Aperture
   Reuleaux triangle (curve-of-constant-width) inside a thin lens ring.
   Reads as: lens / iris / perspective. Iconic at any size.                  */
function MarkV2_Aperture({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent }) {
  // Reuleaux triangle: equilateral triangle, each side replaced by an arc
  // centered on the opposite vertex with radius = side length.
  const r = 64;                          // distance from center to a vertex
  const a = [C,            C - r];
  const b = [C - r * 0.866, C + r * 0.5];
  const c = [C + r * 0.866, C + r * 0.5];
  const sd = r * Math.sqrt(3);           // arc radius = side length

  return (
    <svg width={size} viewBox={`0 0 ${VB} ${VB}`} aria-label="Aperture">
      {/* lens ring */}
      <circle cx={C} cy={C} r="92" fill="none" stroke={ink} strokeWidth="1.4" />
      {/* Reuleaux triangle */}
      <path
        d={`M ${b[0]} ${b[1]}
            A ${sd} ${sd} 0 0 1 ${c[0]} ${c[1]}
            A ${sd} ${sd} 0 0 1 ${a[0]} ${a[1]}
            A ${sd} ${sd} 0 0 1 ${b[0]} ${b[1]} Z`}
        fill={ink}
      />
      {/* tiny pupil dot in accent */}
      <circle cx={C} cy={C + 8} r="4" fill={accent} />
    </svg>
  );
}

/* ────────── 02 · Theorem ∎
   Solid square with a quarter-square corner notch — the QED tombstone
   reimagined as a brand mark. End-of-proof confidence.                      */
function MarkV2_Theorem({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent }) {
  // Outer square 144×144 centered at (110,110), top-right corner notched
  // by a 44×44 cutout. Accent dot sits inside the notch.
  const x0 = C - 72, y0 = C - 72, S = 144, n = 44;
  const path =
    `M ${x0} ${y0}
     L ${x0 + S - n} ${y0}
     L ${x0 + S - n} ${y0 + n}
     L ${x0 + S}     ${y0 + n}
     L ${x0 + S}     ${y0 + S}
     L ${x0}         ${y0 + S} Z`;

  return (
    <svg width={size} viewBox={`0 0 ${VB} ${VB}`} aria-label="Theorem">
      <path d={path} fill={ink} />
      {/* the absent corner — single accent dot, centered in the void */}
      <circle cx={x0 + S - n / 2} cy={y0 + n / 2} r="4.5" fill={accent} />
    </svg>
  );
}

/* ────────── 03 · Prism
   Equilateral triangle outline + spectrum of 4 graduated rules exiting
   the right face. Refraction = theory made visible.                         */
function MarkV2_Prism({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent }) {
  // Triangle (pointing up), thicker outline
  const top = [C,     C - 66];
  const bl  = [C - 66, C + 56];
  const br  = [C + 66, C + 56];

  // 4 spectrum lines emerging from the right edge (between top and br)
  // at fractions 0.30, 0.50, 0.70, 0.88 along the edge
  const t = [0.30, 0.50, 0.70, 0.88];
  const lerp = (p, q, k) => [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k];
  const ends = [
    [188, C - 22],
    [200, C - 6],
    [200, C + 14],
    [188, C + 32],
  ];

  return (
    <svg width={size} viewBox={`0 0 ${VB} ${VB}`} aria-label="Prism">
      {/* incoming beam on the left */}
      <line x1="20" y1={C - 5} x2={C - 33} y2={C - 5} stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
      {/* triangle */}
      <path
        d={`M ${top[0]} ${top[1]} L ${br[0]} ${br[1]} L ${bl[0]} ${bl[1]} Z`}
        fill="none"
        stroke={ink}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* spectrum exit lines */}
      {t.map((k, i) => {
        const start = lerp(top, br, k);
        const end   = ends[i];
        const isAccent = i === 1;
        return (
          <line
            key={i}
            x1={start[0]} y1={start[1]}
            x2={end[0]}   y2={end[1]}
            stroke={isAccent ? accent : ink}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

/* ────────── 04 · Polestar
   Asymmetric four-point star — long N pole, three short cardinal arms.
   Iconic silhouette. Reads instantly at favicon scale.                       */
function MarkV2_Polestar({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent }) {
  // 8-vertex polygon (4 points + 4 valleys).
  // North point is long; E/S/W points are short.
  const N  = [C,      C - 84];
  const NE = [C + 16, C - 16];
  const E  = [C + 38, C     ];
  const SE = [C + 16, C + 16];
  const S  = [C,      C + 38];
  const SW = [C - 16, C + 16];
  const W  = [C - 38, C     ];
  const NW = [C - 16, C - 16];
  const poly = [N, NE, E, SE, S, SW, W, NW]
    .map(p => p.join(',')).join(' ');

  return (
    <svg width={size} viewBox={`0 0 ${VB} ${VB}`} aria-label="Polestar">
      <polygon points={poly} fill={ink} />
      {/* tiny declination dot above the north tip */}
      <circle cx={C} cy={C - 96} r="3.5" fill={accent} />
    </svg>
  );
}

/* ────────── 05 · Lattice
   Graph-theory N. Four nodes wired into the N letterform: stroke-as-edge.
   The letter is implied by topology, not drawn.                              */
function MarkV2_Lattice({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent }) {
  // Nodes at four corners of a 110px box (centered).
  const TL = [C - 55, C - 55];
  const BL = [C - 55, C + 55];
  const TR = [C + 55, C - 55];
  const BR = [C + 55, C + 55];
  const R  = 9; // node radius

  return (
    <svg width={size} viewBox={`0 0 ${VB} ${VB}`} aria-label="Lattice N">
      {/* edges, drawn first so nodes cap them */}
      <g stroke={ink} strokeWidth="3" strokeLinecap="round">
        <line x1={TL[0]} y1={TL[1]} x2={BL[0]} y2={BL[1]} />
        <line x1={BL[0]} y1={BL[1]} x2={TR[0]} y2={TR[1]} />
        <line x1={TR[0]} y1={TR[1]} x2={BR[0]} y2={BR[1]} />
      </g>
      {/* nodes — TL is accent (the "entry" node) */}
      <circle cx={TL[0]} cy={TL[1]} r={R} fill={accent} />
      <circle cx={BL[0]} cy={BL[1]} r={R} fill={ink} />
      <circle cx={TR[0]} cy={TR[1]} r={R} fill={ink} />
      <circle cx={BR[0]} cy={BR[1]} r={R} fill={ink} />
    </svg>
  );
}

/* ────────── 06 · Brackets ⟨ · ⟩
   Angle brackets enclosing a single ink dot. Math + code at once.
   The smallest, most patient mark in the set.                                */
function MarkV2_Brackets({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent }) {
  return (
    <svg width={size} viewBox={`0 0 ${VB} ${VB}`} aria-label="Brackets">
      <g fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {/* left bracket  ⟨  */}
        <polyline points="86,40  46,110  86,180" />
        {/* right bracket ⟩  */}
        <polyline points="134,40 174,110 134,180" />
      </g>
      {/* center mark — accent dot */}
      <circle cx={C} cy={C} r="6" fill={accent} />
    </svg>
  );
}

/* ────────── 07 · Continuum
   Lemniscate (∞), one continuous stroke crossing through center.
   Theory has no end; the studio iterates.                                    */
function MarkV2_Continuum({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent }) {
  // Horizontal figure-8: two cubic loops meeting at center
  const d = `
    M 30 ${C}
    C 30 ${C - 50}  ${C - 30} ${C - 50}  ${C} ${C}
    C ${C + 30} ${C + 50}  190 ${C + 50}  190 ${C}
    C 190 ${C - 50}  ${C + 30} ${C - 50}  ${C} ${C}
    C ${C - 30} ${C + 50}  30 ${C + 50}  30 ${C}
    Z
  `;
  return (
    <svg width={size} viewBox={`0 0 ${VB} ${VB}`} aria-label="Continuum">
      <path d={d} fill="none" stroke={ink} strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
      {/* crossing dot — small accent at the strand intersection */}
      <circle cx={C} cy={C} r="4.5" fill={accent} />
    </svg>
  );
}

/* ────────── 08 · Signal
   Rounded cell housing a clean 1.5-cycle sine wave.
   Pure signal. The most "screen-like" of the set.                            */
function MarkV2_Signal({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent }) {
  return (
    <svg width={size} viewBox={`0 0 ${VB} ${VB}`} aria-label="Signal">
      {/* cell */}
      <rect x="30" y="30" width="160" height="160" rx="22" ry="22"
            fill="none" stroke={ink} strokeWidth="1.6" />
      {/* baseline (faint) */}
      <line x1="50" y1={C} x2="170" y2={C} stroke={ink} strokeWidth="1" opacity="0.18" />
      {/* sine: 1.5 cycles, peaks at y=80 and y=140 (amplitude 30) */}
      <path
        d={`M 50 ${C}
            Q 70 50   ${C - 20} ${C}
            Q ${C}    170 ${C + 20} ${C}
            Q 150 50  170 ${C}`}
        fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* the "now" sample — single accent dot riding the wave */}
      <circle cx={C + 20} cy={C} r="4.5" fill={accent} />
    </svg>
  );
}

/* ────────── Lockup helper (mark + wordmark beside) ────────── */
function LockupV2({ Mark, ink = '#0E1620', paper = '#F1EEE6', accent, size = 60 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
      <Mark size={size} ink={ink} paper={paper} accent={accent} />
      <svg width="240" viewBox="0 0 720 140" style={{ overflow: 'visible' }}>
        <text x="0" y="108" fontFamily='"Manrope", sans-serif' fontWeight="600" fontSize="120" letterSpacing="-0.04em" fill={ink}>
          Nordic <tspan fontFamily='"Instrument Serif", serif' fontStyle="italic" fontWeight="400">Theory</tspan> Labs
        </text>
      </svg>
    </div>
  );
}

/* registry */
const MARKS = [
  { id: '01', key: 'aperture',  name: 'Aperture',   sub: 'Reuleaux triangle inside a lens ring',                C: MarkV2_Aperture,  square: true, idea: 'A lens. Perspective. The studio looks at problems sideways — Reuleaux is a curve of constant width, the same answer from every angle.' },
  { id: '02', key: 'theorem',   name: 'Theorem',    sub: 'Notched square — the QED tombstone, rebuilt',         C: MarkV2_Theorem,   square: true, idea: '∎ — end of proof. Solid conviction with one absent corner; the missing piece is what keeps shipping.' },
  { id: '03', key: 'prism',     name: 'Prism',      sub: 'Equilateral triangle splitting an incoming beam',     C: MarkV2_Prism,     square: true, idea: 'Refraction. One input, ordered outputs. Reads as "Labs" without resorting to a flask.' },
  { id: '04', key: 'polestar',  name: 'Polestar',   sub: 'Asymmetric four-point star, long north pole',         C: MarkV2_Polestar,  square: true, idea: 'A single bearing. The strongest silhouette in the set — best favicon, best sticker, best app icon.' },
  { id: '05', key: 'lattice',   name: 'Lattice',    sub: 'Four-node graph wired into the N path',               C: MarkV2_Lattice,   square: true, idea: 'Graph theory N. The letter is implied by topology, not drawn. Computer-science cadence with a Nordic restraint.' },
  { id: '06', key: 'brackets',  name: 'Brackets',   sub: 'Angle brackets enclosing an ink dot',                 C: MarkV2_Brackets,  square: true, idea: '⟨·⟩ — math and code at the same gesture. Smallest, most patient mark; carries any wordmark beside it.' },
  { id: '07', key: 'continuum', name: 'Continuum',  sub: 'Lemniscate ∞ as a single continuous stroke',          C: MarkV2_Continuum, square: true, idea: 'No end-state. The studio iterates. Loop crosses center — strand carries the accent dot at the junction.' },
  { id: '08', key: 'signal',    name: 'Signal',     sub: 'Sine wave inside a rounded cell',                     C: MarkV2_Signal,    square: true, idea: 'Pure signal. The most "screen-native" of the eight — already wants to be an app icon.' },
];

window.MARKS = MARKS;
window.Lockup = LockupV2;
