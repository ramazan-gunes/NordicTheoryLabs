/* ──────────────────────────────────────────────────────────────────────────
   Signal · system plates
   Specialty artboards for the chosen mark: construction, clear space,
   scale ladder, color treatments, in-context, don'ts.
   The canonical variant for system rules is "A · Cell".
   ────────────────────────────────────────────────────────────────────────── */

const SG_INK = '#0E1620';
const SG_PAPER = '#F1EEE6';
const SG_ACCENT = 'oklch(0.55 0.13 220)';
const Signal = window.SIGNAL_VARIANTS[0].C;  // A · Cell — canonical

/* ────────── Variation comparison grid ────────── */
function VariationsPlate() {
  return (
    <div className="plate">
      <div className="head">
        <span className="num">variations</span>
        <span>six explorations of one DNA</span>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 1, padding: 22, background: 'rgba(14,22,32,0.08)',
      }}>
        {window.SIGNAL_VARIANTS.map(v => (
          <div key={v.id} style={{
            display: 'flex', flexDirection: 'column', gap: 10,
            background: SG_PAPER, padding: '22px 18px 16px',
            outline: v.picked ? `1.5px solid ${SG_INK}` : 'none',
            outlineOffset: -1,
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.18em',
              color: '#6B7280', textTransform: 'uppercase', display: 'flex',
              justifyContent: 'space-between',
            }}>
              <span>{v.id} · {v.name}</span>
              {v.picked && <span style={{ color: SG_INK, letterSpacing: '0.14em' }}>chosen</span>}
            </div>
            <div style={{ display: 'grid', placeItems: 'center', padding: '8px 0 4px' }}>
              <v.C size={140} ink={SG_INK} paper={SG_PAPER} accent={SG_ACCENT} />
            </div>
            <div style={{
              fontFamily: 'Manrope', fontSize: 12.5, color: '#2A323E', lineHeight: 1.45,
            }}>{v.sub}</div>
          </div>
        ))}
      </div>
      <div className="foot">
        <span className="name">Signal — six variations</span>
        <span className="tag">A · Cell is canonical for system plates</span>
      </div>
    </div>
  );
}

/* ────────── Hero / lockup ────────── */
function HeroPlate() {
  return (
    <div className="plate" style={{ gridTemplateRows: 'auto 1fr auto' }}>
      <div className="head">
        <span className="num">08 · Signal · A</span>
        <span>primary lockup</span>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 36, padding: '40px 48px',
      }}>
        <Signal size={220} ink={SG_INK} paper={SG_PAPER} accent={SG_ACCENT} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{
            fontFamily: 'Manrope', fontWeight: 600, fontSize: 56, letterSpacing: '-0.04em',
            color: SG_INK, lineHeight: 1.08,
          }}>
            Nordic <em style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontWeight: 400 }}>Theory</em>
          </span>
          <span style={{
            fontFamily: 'Manrope', fontWeight: 600, fontSize: 56, letterSpacing: '-0.04em',
            color: SG_INK, lineHeight: 1.08,
          }}>
            Labs<em style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontWeight: 400, color: SG_ACCENT }}>°</em>
          </span>
        </div>
      </div>
      <div className="foot">
        <span className="name">Signal · Cell</span>
        <span className="tag">horizontal lockup — primary</span>
      </div>
    </div>
  );
}

/* ────────── Construction grid ────────── */
function ConstructionPlate() {
  const stroke = SG_INK;
  return (
    <div className="plate">
      <div className="head">
        <span className="num">construction</span>
        <span>grid · radii · stroke</span>
      </div>
      <div style={{ display: 'grid', placeItems: 'center', padding: 28 }}>
        <svg width="320" viewBox="0 0 220 220" style={{ overflow: 'visible' }}>
          {/* 8-unit grid (220/8 = 27.5) */}
          <g stroke={stroke} strokeWidth="0.5" opacity="0.16">
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 27.5} y1="0" x2={i * 27.5} y2="220" />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 27.5} x2="220" y2={i * 27.5} />
            ))}
          </g>
          {/* center axes */}
          <g stroke={stroke} strokeWidth="0.8" opacity="0.4">
            <line x1="0" y1="110" x2="220" y2="110" />
            <line x1="110" y1="0" x2="110" y2="220" />
          </g>
          {/* the mark */}
          <Signal size={220} ink={SG_INK} paper={SG_PAPER} accent={SG_ACCENT} />
          {/* construction annotations */}
          <g stroke={SG_ACCENT} strokeWidth="0.8" fill="none">
            <line x1="30" y1="14" x2="190" y2="14" />
            <line x1="30" y1="12" x2="30" y2="16" />
            <line x1="190" y1="12" x2="190" y2="16" />
          </g>
          <text x="110" y="10" textAnchor="middle"
                fontFamily="JetBrains Mono" fontSize="7"
                letterSpacing="0.14em" fill={SG_ACCENT}>160u</text>
          <g stroke={SG_ACCENT} strokeWidth="0.8" fill="none">
            <line x1="206" y1="30" x2="206" y2="190" />
            <line x1="204" y1="30" x2="208" y2="30" />
            <line x1="204" y1="190" x2="208" y2="190" />
          </g>
          <text x="212" y="113"
                fontFamily="JetBrains Mono" fontSize="7"
                letterSpacing="0.14em" fill={SG_ACCENT}>160u</text>
          {/* radius callout */}
          <circle cx="46" cy="46" r="22" fill="none" stroke={SG_ACCENT} strokeWidth="0.6" strokeDasharray="2 2" />
          <text x="44" y="80" fontFamily="JetBrains Mono" fontSize="7"
                letterSpacing="0.12em" fill={SG_ACCENT}>r 22u</text>
          {/* sample dot callout */}
          <line x1="130" y1="110" x2="150" y2="76" stroke={SG_ACCENT} strokeWidth="0.6" />
          <text x="152" y="74" fontFamily="JetBrains Mono" fontSize="7"
                letterSpacing="0.12em" fill={SG_ACCENT}>sample · accent</text>
        </svg>
      </div>
      <div className="foot">
        <span className="name">Construction</span>
        <span className="tag">220u canvas · 1.5 sine cycles · stroke 4u</span>
      </div>
    </div>
  );
}

/* ────────── Clear space ────────── */
function ClearSpacePlate() {
  const cellPad = 32; // = x (one "x-height" of the dot)
  return (
    <div className="plate">
      <div className="head">
        <span className="num">clear space</span>
        <span>x = sample-dot diameter</span>
      </div>
      <div style={{ display: 'grid', placeItems: 'center', padding: 32 }}>
        <svg width="320" viewBox="0 0 320 220" style={{ overflow: 'visible' }}>
          {/* clear-space rectangle */}
          <rect x="20" y="30" width="280" height="160"
                fill="none" stroke={SG_ACCENT} strokeWidth="0.8" strokeDasharray="4 4" />
          {/* mark, centered */}
          <g transform="translate(50, 0)">
            <Signal size={220} ink={SG_INK} paper={SG_PAPER} accent={SG_ACCENT} />
          </g>
          {/* "x" callouts */}
          <g fill={SG_ACCENT} fontFamily="Instrument Serif" fontStyle="italic" fontSize="16">
            <text x="32" y="115">x</text>
            <text x="284" y="115">x</text>
            <text x="160" y="22">x</text>
            <text x="160" y="208">x</text>
          </g>
          {/* tiny brackets */}
          <g stroke={SG_ACCENT} strokeWidth="0.6" fill="none" opacity="0.7">
            <path d="M 42 100 L 42 120" />
            <path d="M 278 100 L 278 120" />
            <path d="M 150 18 L 170 18" />
            <path d="M 150 202 L 170 202" />
          </g>
        </svg>
      </div>
      <div className="foot">
        <span className="name">Clear space</span>
        <span className="tag">≥ x on every side · x = dot diameter</span>
      </div>
    </div>
  );
}

/* ────────── Scale ladder + min size ────────── */
function ScaleLadderPlate() {
  const sizes = [16, 20, 28, 40, 64, 96, 160];
  return (
    <div className="plate">
      <div className="head">
        <span className="num">scale</span>
        <span>min 16px · favicon · UI · large</span>
      </div>
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around',
        gap: 14, padding: '40px 28px 24px', flexWrap: 'wrap',
      }}>
        {sizes.map(s => (
          <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'grid', placeItems: 'center', minHeight: s }}>
              <Signal size={s} ink={SG_INK} paper={SG_PAPER} accent={SG_ACCENT} />
            </div>
            <span style={{
              fontFamily: 'JetBrains Mono', fontSize: 9.5,
              letterSpacing: '0.14em', color: '#6B7280',
            }}>{s}px</span>
          </div>
        ))}
      </div>
      <div className="foot">
        <span className="name">Scale ladder</span>
        <span className="tag">do not reproduce below 16px · use Open variant if absolutely required</span>
      </div>
    </div>
  );
}

/* ────────── Color treatments (mono fallbacks) ────────── */
function ColorPlate() {
  const treatments = [
    { bg: SG_PAPER, ink: SG_INK,    accent: SG_ACCENT,  label: 'Paper · ink · accent', cap: 'PRIMARY' },
    { bg: SG_INK,   ink: SG_PAPER,  accent: SG_ACCENT,  label: 'Ink · paper · accent', cap: 'REVERSE' },
    { bg: SG_PAPER, ink: SG_INK,    accent: SG_INK,     label: 'Mono ink',             cap: 'MONO 1C' },
    { bg: SG_INK,   ink: SG_PAPER,  accent: SG_PAPER,   label: 'Mono paper (reversed)', cap: 'MONO 1C' },
    { bg: SG_ACCENT, ink: SG_PAPER, accent: SG_PAPER,   label: 'Accent · paper',       cap: 'TINTED' },
    { bg: SG_PAPER, ink: SG_ACCENT, accent: SG_ACCENT,  label: 'Accent on paper',      cap: 'TINTED' },
  ];
  return (
    <div className="plate">
      <div className="head">
        <span className="num">color</span>
        <span>treatments · 6 sanctioned</span>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 1, padding: 22, background: 'rgba(14,22,32,0.08)',
      }}>
        {treatments.map((t, i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column',
            background: t.bg,
            padding: '22px 16px 14px',
            gap: 12,
            color: t.bg === SG_INK || t.bg === SG_ACCENT ? SG_PAPER : SG_INK,
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono', fontSize: 9.5, letterSpacing: '0.18em',
              opacity: 0.7,
            }}>{t.cap}</div>
            <div style={{ display: 'grid', placeItems: 'center', padding: '4px 0' }}>
              <Signal size={120} ink={t.ink} paper={t.bg} accent={t.accent} />
            </div>
            <div style={{
              fontFamily: 'Manrope', fontSize: 11.5, letterSpacing: '-0.01em',
              opacity: 0.85,
            }}>{t.label}</div>
          </div>
        ))}
      </div>
      <div className="foot">
        <span className="name">Color treatments</span>
        <span className="tag">no other combinations permitted</span>
      </div>
    </div>
  );
}

window.VariationsPlate = VariationsPlate;
window.HeroPlate = HeroPlate;
window.ConstructionPlate = ConstructionPlate;
window.ClearSpacePlate = ClearSpacePlate;
window.ScaleLadderPlate = ScaleLadderPlate;
window.ColorPlate = ColorPlate;
window.SG_INK = SG_INK;
window.SG_PAPER = SG_PAPER;
window.SG_ACCENT = SG_ACCENT;
window.SignalChosen = Signal;
