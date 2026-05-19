/* ──────────────────────────────────────────────────────────────────────────
   Nordic Theory Labs — Logo marks
   Eight directions. Every mark is a pure SVG component taking { size, ink, paper }.
   Geometry only: rules, circles, arcs, type. No illustration.
   ────────────────────────────────────────────────────────────────────────── */

/* helper — fade a hex by % toward another hex */
function mix(a, b, t) {
  const pa = a.replace('#', '').match(/.{2}/g).map(h => parseInt(h, 16));
  const pb = b.replace('#', '').match(/.{2}/g).map(h => parseInt(h, 16));
  const r = pa.map((c, i) => Math.round(c + (pb[i] - c) * t));
  return '#' + r.map(c => c.toString(16).padStart(2, '0')).join('');
}

/* ────────── 01 · Wordmark (refined) ────────── */
function Mark01_Wordmark({ size = 360, ink = '#0E1620', paper = '#F1EEE6', accent = 'oklch(0.55 0.13 220)' }) {
  // proportions stay constant; scale via viewBox
  const W = 720, H = 140;
  return (
    <svg width={size} viewBox={`0 0 ${W} ${H}`} aria-label="Nordic Theory Labs wordmark" style={{ overflow: 'visible' }}>
      <text x="0" y="108" fontFamily='"Manrope", sans-serif' fontWeight="600" fontSize="132" letterSpacing="-0.045em" fill={ink}>
        Nordic <tspan fontFamily='"Instrument Serif", serif' fontStyle="italic" fontWeight="400" letterSpacing="-0.02em">Theory</tspan> Labs<tspan fontFamily='"Instrument Serif", serif' fontStyle="italic" fontWeight="400" fill={accent}>°</tspan>
      </text>
    </svg>
  );
}

/* ────────── 02 · N° Chip (refined monogram) ────────── */
function Mark02_NChip({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent = 'oklch(0.55 0.13 220)' }) {
  const S = 220; // viewbox
  return (
    <svg width={size} viewBox={`0 0 ${S} ${S}`} aria-label="N° monogram">
      {/* chip */}
      <rect x="34" y="34" width="152" height="152" rx="22" fill={ink} />
      {/* serif N */}
      <text
        x="110" y="143"
        textAnchor="middle"
        fontFamily='"Instrument Serif", serif'
        fontStyle="italic"
        fontWeight="400"
        fontSize="138"
        fill={paper}
      >N</text>
      {/* floating degree */}
      <text
        x="194" y="58"
        textAnchor="middle"
        fontFamily='"Instrument Serif", serif'
        fontStyle="italic"
        fontWeight="400"
        fontSize="52"
        fill={accent}
      >°</text>
    </svg>
  );
}

/* ────────── 03 · Aurora arcs over NTL ────────── */
function Mark03_AuroraArc({ size = 240, ink = '#0E1620', paper = '#F1EEE6' }) {
  const S = 240;
  // three concentric arcs (horizon / aurora). Stroke widths vary subtly.
  return (
    <svg width={size} viewBox={`0 0 ${S} ${S}`} aria-label="Aurora arc mark">
      <g fill="none" stroke={ink} strokeLinecap="round">
        {/* outer */}
        <path d="M 40 130 A 80 80 0 0 1 200 130" strokeWidth="2.2" />
        {/* middle */}
        <path d="M 60 130 A 60 60 0 0 1 180 130" strokeWidth="2.2" />
        {/* inner */}
        <path d="M 80 130 A 40 40 0 0 1 160 130" strokeWidth="2.2" />
        {/* baseline / horizon */}
        <path d="M 30 130 L 210 130" strokeWidth="1" opacity="0.5" />
      </g>
      <text
        x="120" y="180"
        textAnchor="middle"
        fontFamily='"JetBrains Mono", monospace'
        fontWeight="500"
        fontSize="20"
        letterSpacing="0.32em"
        fill={ink}
      >N · T · L</text>
    </svg>
  );
}

/* ────────── 04 · 60°N parallel mark ────────── */
function Mark04_Parallel({ size = 240, ink = '#0E1620', paper = '#F1EEE6', accent = 'oklch(0.55 0.13 220)' }) {
  const S = 240;
  // stacked horizontal rules, decreasing in length above & below center,
  // representing latitude / theoretical abstraction
  const lines = [];
  const cy = 120;
  const widths = [180, 160, 140, 100, 60];
  widths.forEach((w, i) => {
    lines.push({ y: cy - (i + 1) * 14, w });
    lines.push({ y: cy + (i + 1) * 14, w });
  });
  return (
    <svg width={size} viewBox={`0 0 ${S} ${S}`} aria-label="60°N parallel">
      {lines.map((l, i) => (
        <rect key={i} x={(S - l.w) / 2} y={l.y} width={l.w} height="1.5" fill={ink} opacity={0.55 + (5 - Math.floor(i / 2)) * 0.08} />
      ))}
      {/* equator-style middle rule with caption */}
      <rect x={(S - 200) / 2} y={cy - 1} width="200" height="2" fill={ink} />
      <text
        x="120" y="cy"
        dy="6"
        textAnchor="middle"
        fontFamily='"JetBrains Mono", monospace'
        fontWeight="500"
        fontSize="14"
        letterSpacing="0.18em"
        fill={paper}
      ><tspan dy="-1" x="120">{''}</tspan></text>
      {/* caption */}
      <text
        x="120" y="225"
        textAnchor="middle"
        fontFamily='"JetBrains Mono", monospace'
        fontWeight="500"
        fontSize="13"
        letterSpacing="0.28em"
        fill={ink}
      >59.33°N</text>
    </svg>
  );
}

/* ────────── 05 · Compass needle N ────────── */
function Mark05_Compass({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent = 'oklch(0.55 0.13 220)' }) {
  const S = 220;
  return (
    <svg width={size} viewBox={`0 0 ${S} ${S}`} aria-label="Compass N">
      {/* outer ring */}
      <circle cx="110" cy="110" r="80" fill="none" stroke={ink} strokeWidth="1.4" />
      {/* tick marks at cardinals */}
      {[0, 90, 180, 270].map(deg => {
        const rad = (deg - 90) * Math.PI / 180;
        const x1 = 110 + Math.cos(rad) * 80;
        const y1 = 110 + Math.sin(rad) * 80;
        const x2 = 110 + Math.cos(rad) * 72;
        const y2 = 110 + Math.sin(rad) * 72;
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ink} strokeWidth="1.4" />;
      })}
      {/* north needle — accent-filled triangle pointing up */}
      <polygon points="110,42 116,110 104,110" fill={accent} />
      {/* south stub */}
      <polygon points="110,178 116,110 104,110" fill={ink} opacity="0.25" />
      {/* center pivot */}
      <circle cx="110" cy="110" r="3" fill={ink} />
      {/* "N" label at top */}
      <text
        x="110" y="36"
        textAnchor="middle"
        fontFamily='"Instrument Serif", serif'
        fontStyle="italic"
        fontSize="22"
        fill={ink}
      >N</text>
    </svg>
  );
}

/* ────────── 06 · NTL stacked seal ────────── */
function Mark06_Seal({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent = 'oklch(0.55 0.13 220)' }) {
  const S = 220;
  return (
    <svg width={size} viewBox={`0 0 ${S} ${S}`} aria-label="NTL seal">
      {/* outer ring */}
      <circle cx="110" cy="110" r="86" fill="none" stroke={ink} strokeWidth="1.4" />
      {/* inner divider */}
      <line x1="34" y1="110" x2="186" y2="110" stroke={ink} strokeWidth="1" opacity="0.4" />
      {/* big italic N */}
      <text
        x="110" y="96"
        textAnchor="middle"
        fontFamily='"Instrument Serif", serif'
        fontStyle="italic"
        fontWeight="400"
        fontSize="84"
        fill={ink}
      >N</text>
      {/* TL mono bottom */}
      <text
        x="110" y="148"
        textAnchor="middle"
        fontFamily='"JetBrains Mono", monospace'
        fontWeight="500"
        fontSize="18"
        letterSpacing="0.34em"
        fill={ink}
      >T · L</text>
      {/* est. caption arcing along bottom would be too ornate — keep clean */}
      <text
        x="110" y="178"
        textAnchor="middle"
        fontFamily='"JetBrains Mono", monospace'
        fontSize="9"
        letterSpacing="0.34em"
        fill={ink}
        opacity="0.55"
      >EST · 2024 · STHLM</text>
    </svg>
  );
}

/* ────────── 07 · Flask / vessel (Labs nod) ────────── */
function Mark07_Flask({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent = 'oklch(0.55 0.13 220)' }) {
  const S = 220;
  // a minimal Erlenmeyer outline; degree sign sits at neck like a bubble
  return (
    <svg width={size} viewBox={`0 0 ${S} ${S}`} aria-label="Flask N">
      <g fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* neck */}
        <path d="M 92 48 L 92 92 L 56 168 Q 50 180 64 180 L 156 180 Q 170 180 164 168 L 128 92 L 128 48" />
        {/* rim top */}
        <line x1="86" y1="48" x2="134" y2="48" strokeWidth="2.6" />
        {/* meniscus / fluid level rule */}
        <line x1="72" y1="148" x2="148" y2="148" opacity="0.55" />
      </g>
      {/* a single italic "N" inside the body */}
      <text
        x="110" y="172"
        textAnchor="middle"
        fontFamily='"Instrument Serif", serif'
        fontStyle="italic"
        fontWeight="400"
        fontSize="44"
        fill={ink}
      >N</text>
      {/* bubble */}
      <text
        x="146" y="42"
        textAnchor="middle"
        fontFamily='"Instrument Serif", serif'
        fontStyle="italic"
        fontSize="34"
        fill={accent}
      >°</text>
    </svg>
  );
}

/* ────────── 08 · Reversed N in disc ────────── */
function Mark08_Disc({ size = 220, ink = '#0E1620', paper = '#F1EEE6', accent = 'oklch(0.55 0.13 220)' }) {
  const S = 220;
  return (
    <svg width={size} viewBox={`0 0 ${S} ${S}`} aria-label="Disc N">
      <circle cx="110" cy="110" r="86" fill={ink} />
      <text
        x="110" y="144"
        textAnchor="middle"
        fontFamily='"Instrument Serif", serif'
        fontStyle="italic"
        fontWeight="400"
        fontSize="116"
        fill={paper}
      >N</text>
      {/* a tiny degree at NE quadrant, in accent */}
      <circle cx="172" cy="58" r="11" fill={paper} />
      <text
        x="172" y="68"
        textAnchor="middle"
        fontFamily='"Instrument Serif", serif'
        fontStyle="italic"
        fontWeight="400"
        fontSize="22"
        fill={accent}
      >°</text>
    </svg>
  );
}

/* ────────── Lockup helper — mark + wordmark beside it ────────── */
function Lockup({ Mark, ink = '#0E1620', paper = '#F1EEE6', accent = 'oklch(0.55 0.13 220)', size = 60 }) {
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
  { id: '01', key: 'wordmark',  name: 'Wordmark',           sub: 'Set in Manrope + Instrument Serif italic',          C: Mark01_Wordmark,  square: false, idea: 'The studio name typeset cleanly. Italic “Theory” + accent degree dot — current direction, sharpened.' },
  { id: '02', key: 'nchip',     name: 'N° Chip',            sub: 'Serif italic N in an ink chip, floating degree',     C: Mark02_NChip,     square: true,  idea: 'A primary mark. Works as favicon, app icon, profile avatar. Echoes the nav badge already in use.' },
  { id: '03', key: 'aurora',    name: 'Aurora Arc',         sub: 'Three concentric arcs above N·T·L',                  C: Mark03_AuroraArc, square: true,  idea: 'Nordic light over a horizon. Reads as “signal/range” at small sizes; calm at large.' },
  { id: '04', key: 'parallel',  name: '59.33°N Parallel',   sub: 'Stacked latitudes — theory as abstraction',          C: Mark04_Parallel,  square: true,  idea: 'Stockholm’s latitude. The mark is a diagram, not an emblem — fits a studio that writes papers as much as ships apps.' },
  { id: '05', key: 'compass',   name: 'Compass N',          sub: 'Cardinal rose with italic N label',                  C: Mark05_Compass,   square: true,  idea: 'Direction + reasoning. The accent needle gives it instant identity at favicon scale.' },
  { id: '06', key: 'seal',      name: 'NTL Seal',           sub: 'Italic N over mono T · L in a ring',                 C: Mark06_Seal,      square: true,  idea: 'Academic seal posture. Reads serious / institutional — fits “Theory” more than “Labs.”' },
  { id: '07', key: 'flask',     name: 'Vessel',             sub: 'Erlenmeyer outline with N inside',                   C: Mark07_Flask,     square: true,  idea: 'Most literal “Labs.” Use sparingly — leans on a familiar trope but lands the studio metaphor instantly.' },
  { id: '08', key: 'disc',      name: 'Ink Disc',           sub: 'Solid disc, reversed serif N, accent bubble',        C: Mark08_Disc,      square: true,  idea: 'Boldest of the set. Strongest contrast and presence — best for an app-store icon or sticker.' },
];

window.MARKS = MARKS;
window.Lockup = Lockup;
