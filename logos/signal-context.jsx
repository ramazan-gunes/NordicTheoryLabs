/* ──────────────────────────────────────────────────────────────────────────
   Signal · in-context applications + don'ts
   ────────────────────────────────────────────────────────────────────────── */

const Signal = window.SignalChosen;
const SG_INK = window.SG_INK;
const SG_PAPER = window.SG_PAPER;
const SG_ACCENT = window.SG_ACCENT;

/* ────────── Browser chrome ────────── */
function BrowserPlate() {
  return (
    <div className="plate">
      <div className="head">
        <span className="num">in situ · browser</span>
        <span>favicon · tab · nav</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '24px 26px' }}>
        {/* tab strip */}
        <div style={{
          background: '#D8D2C3', borderRadius: '10px 10px 0 0',
          padding: '8px 8px 0', display: 'flex', gap: 4,
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 14px 8px 10px', background: SG_PAPER,
            borderRadius: '8px 8px 0 0', maxWidth: 240,
          }}>
            <Signal size={14} ink={SG_INK} paper={SG_PAPER} accent={SG_ACCENT} />
            <span style={{ fontFamily: 'Manrope', fontSize: 11.5, color: SG_INK, whiteSpace: 'nowrap' }}>
              Nordic Theory Labs
            </span>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#6B7280' }}>×</span>
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', borderRadius: '8px 8px 0 0',
            fontFamily: 'Manrope', fontSize: 11.5, color: '#6B7280', maxWidth: 160,
          }}>
            <span style={{ width: 12, height: 12, background: '#E9E5DA', borderRadius: 2 }} />
            <span style={{ whiteSpace: 'nowrap' }}>Körkort Hero</span>
          </div>
        </div>

        {/* address bar */}
        <div style={{
          background: SG_PAPER, padding: '10px 14px',
          borderRadius: 8, border: '1px solid rgba(14,22,32,0.10)',
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'JetBrains Mono', fontSize: 11, color: '#6B7280',
        }}>
          <span>⌂</span>
          <span>nordictheorylabs.se</span>
        </div>

        {/* nav */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px', border: '1px solid rgba(14,22,32,0.12)',
          borderRadius: 10, background: SG_PAPER,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Signal size={32} ink={SG_INK} paper={SG_PAPER} accent={SG_ACCENT} />
            <span style={{ fontFamily: 'Manrope', fontWeight: 500, fontSize: 15, letterSpacing: '-0.01em' }}>
              Nordic <em style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontWeight: 400 }}>Theory</em> Labs
            </span>
          </div>
          <div style={{ display: 'flex', gap: 18, fontFamily: 'Manrope', fontSize: 12.5, color: '#2A323E' }}>
            <span>Apps</span><span>Approach</span><span>Notes</span><span>Contact</span>
          </div>
        </div>
      </div>
      <div className="foot">
        <span className="name">Browser</span>
        <span className="tag">favicon 14px · nav 32px</span>
      </div>
    </div>
  );
}

/* ────────── App icon — iOS squircle + Android round ────────── */
function AppIconPlate() {
  return (
    <div className="plate">
      <div className="head">
        <span className="num">in situ · app icon</span>
        <span>iOS · Android · App Store</span>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        gap: 24, padding: '36px 28px',
      }}>
        {/* iOS squircle, solid variant for max contrast */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 132, height: 132,
            background: SG_INK,
            borderRadius: 30,
            display: 'grid', placeItems: 'center',
            boxShadow: '0 8px 24px rgba(14,22,32,0.18)',
          }}>
            <svg width="100" viewBox="0 0 220 220">
              <path d={window.signalSinePath()} fill="none" stroke={SG_PAPER}
                    strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="130" cy="110" r="8" fill={SG_ACCENT} />
            </svg>
          </div>
          <div style={{ fontFamily: 'Manrope', fontSize: 12, color: SG_INK }}>Nordic Theory</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#6B7280', letterSpacing: '0.14em' }}>iOS · 132PT</div>
        </div>

        {/* Android round, accent ground */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 132, height: 132,
            background: SG_ACCENT,
            borderRadius: '50%',
            display: 'grid', placeItems: 'center',
            boxShadow: '0 8px 24px rgba(14,22,32,0.18)',
          }}>
            <svg width="92" viewBox="0 0 220 220">
              <path d={window.signalSinePath()} fill="none" stroke={SG_PAPER}
                    strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="130" cy="110" r="9" fill={SG_INK} />
            </svg>
          </div>
          <div style={{ fontFamily: 'Manrope', fontSize: 12, color: SG_INK }}>Nordic Theory</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#6B7280', letterSpacing: '0.14em' }}>ANDROID · 132DP</div>
        </div>

        {/* App Store tile, paper ground */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 132, height: 132,
            background: SG_PAPER,
            borderRadius: 30,
            display: 'grid', placeItems: 'center',
            border: '1px solid rgba(14,22,32,0.10)',
          }}>
            <Signal size={104} ink={SG_INK} paper={SG_PAPER} accent={SG_ACCENT} />
          </div>
          <div style={{ fontFamily: 'Manrope', fontSize: 12, color: SG_INK }}>Nordic Theory</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#6B7280', letterSpacing: '0.14em' }}>STORE · LIGHT</div>
        </div>
      </div>
      <div className="foot">
        <span className="name">App icon</span>
        <span className="tag">solid for iOS · accent for Android · paper for store</span>
      </div>
    </div>
  );
}

/* ────────── Business card ────────── */
function CardPlate() {
  return (
    <div className="plate">
      <div className="head">
        <span className="num">in situ · card</span>
        <span>front · back</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 22, padding: '32px 24px' }}>
        {/* front */}
        <div style={{
          width: 260, height: 156, background: SG_PAPER,
          borderRadius: 6, border: '1px solid rgba(14,22,32,0.12)',
          padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          boxShadow: '0 8px 22px rgba(14,22,32,0.10)',
        }}>
          <Signal size={36} ink={SG_INK} paper={SG_PAPER} accent={SG_ACCENT} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: 13, letterSpacing: '-0.01em' }}>
              Nordic <em style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontWeight: 400 }}>Theory</em> Labs
            </span>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#6B7280', letterSpacing: '0.14em' }}>
              GÖTGATAN 22 · 116 46 · STHLM
            </span>
          </div>
        </div>

        {/* back — solid ink with reversed mark */}
        <div style={{
          width: 260, height: 156, background: SG_INK,
          borderRadius: 6, display: 'grid', placeItems: 'center',
          boxShadow: '0 8px 22px rgba(14,22,32,0.10)',
        }}>
          <svg width="80" viewBox="0 0 220 220">
            <path d={window.signalSinePath()} fill="none" stroke={SG_PAPER}
                  strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="130" cy="110" r="5.5" fill={SG_ACCENT} />
          </svg>
        </div>
      </div>
      <div className="foot">
        <span className="name">Card</span>
        <span className="tag">85 × 55 mm · uncoated 350gsm</span>
      </div>
    </div>
  );
}

/* ────────── Stickers / merch ────────── */
function StickersPlate() {
  return (
    <div className="plate">
      <div className="head">
        <span className="num">in situ · stickers</span>
        <span>die-cut · circle · square · pill</span>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        gap: 18, padding: '36px 24px',
      }}>
        {/* circle, accent */}
        <div style={{
          width: 110, height: 110, borderRadius: '50%', background: SG_ACCENT,
          display: 'grid', placeItems: 'center',
          boxShadow: '0 6px 18px rgba(14,22,32,0.12)',
        }}>
          <svg width="76" viewBox="0 0 220 220">
            <path d={window.signalSinePath()} fill="none" stroke={SG_PAPER}
                  strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="130" cy="110" r="7" fill={SG_INK} />
          </svg>
        </div>
        {/* square, paper */}
        <div style={{
          width: 110, height: 110, borderRadius: 6, background: SG_PAPER,
          display: 'grid', placeItems: 'center',
          border: '1px solid rgba(14,22,32,0.10)',
          boxShadow: '0 6px 18px rgba(14,22,32,0.10)',
        }}>
          <Signal size={84} ink={SG_INK} paper={SG_PAPER} accent={SG_ACCENT} />
        </div>
        {/* pill, ink */}
        <div style={{
          padding: '14px 22px', borderRadius: 999, background: SG_INK,
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 6px 18px rgba(14,22,32,0.18)',
        }}>
          <svg width="22" viewBox="0 0 220 220">
            <path d={window.signalSinePath()} fill="none" stroke={SG_PAPER}
                  strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="130" cy="110" r="11" fill={SG_ACCENT} />
          </svg>
          <span style={{
            fontFamily: 'Manrope', fontWeight: 600, fontSize: 14, color: SG_PAPER, letterSpacing: '-0.01em',
          }}>nordic <em style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontWeight: 400 }}>theory</em></span>
        </div>
      </div>
      <div className="foot">
        <span className="name">Stickers · pins</span>
        <span className="tag">die-cut to silhouette · safe at 28mm</span>
      </div>
    </div>
  );
}

/* ────────── Don'ts ────────── */
function DontsPlate() {
  const dontStyle = {
    background: SG_PAPER, padding: '18px 14px 12px',
    display: 'flex', flexDirection: 'column', gap: 10, position: 'relative',
  };
  const cross = {
    position: 'absolute', top: 8, right: 8,
    width: 16, height: 16, borderRadius: '50%',
    background: 'oklch(0.62 0.18 25)',
    color: SG_PAPER, fontSize: 12, fontFamily: 'Manrope', fontWeight: 600,
    display: 'grid', placeItems: 'center', lineHeight: 1,
  };
  const cap = {
    fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.14em',
    color: '#6B7280', textTransform: 'uppercase',
  };

  return (
    <div className="plate">
      <div className="head">
        <span className="num">do not</span>
        <span>six common mistakes</span>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 1, padding: 22, background: 'rgba(14,22,32,0.08)',
      }}>
        {/* 1 · stretch */}
        <div style={dontStyle}>
          <span style={cross}>×</span>
          <div style={{ display: 'grid', placeItems: 'center', height: 100 }}>
            <div style={{ transform: 'scaleX(1.4)' }}>
              <Signal size={84} ink={SG_INK} paper={SG_PAPER} accent={SG_ACCENT} />
            </div>
          </div>
          <span style={cap}>stretch</span>
        </div>
        {/* 2 · rotate */}
        <div style={dontStyle}>
          <span style={cross}>×</span>
          <div style={{ display: 'grid', placeItems: 'center', height: 100 }}>
            <div style={{ transform: 'rotate(-18deg)' }}>
              <Signal size={84} ink={SG_INK} paper={SG_PAPER} accent={SG_ACCENT} />
            </div>
          </div>
          <span style={cap}>rotate</span>
        </div>
        {/* 3 · recolor */}
        <div style={dontStyle}>
          <span style={cross}>×</span>
          <div style={{ display: 'grid', placeItems: 'center', height: 100 }}>
            <Signal size={84} ink="oklch(0.6 0.2 30)" paper={SG_PAPER} accent="oklch(0.7 0.18 130)" />
          </div>
          <span style={cap}>recolor</span>
        </div>
        {/* 4 · gradient */}
        <div style={dontStyle}>
          <span style={cross}>×</span>
          <div style={{ display: 'grid', placeItems: 'center', height: 100 }}>
            <svg width="84" viewBox="0 0 220 220">
              <defs>
                <linearGradient id="dontGrad" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.6 0.18 280)" />
                  <stop offset="100%" stopColor="oklch(0.7 0.18 30)" />
                </linearGradient>
              </defs>
              <rect x="30" y="30" width="160" height="160" rx="22" fill="none" stroke="url(#dontGrad)" strokeWidth="3" />
              <path d={window.signalSinePath()} fill="none" stroke="url(#dontGrad)" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>
          <span style={cap}>gradient</span>
        </div>
        {/* 5 · outline */}
        <div style={dontStyle}>
          <span style={cross}>×</span>
          <div style={{ display: 'grid', placeItems: 'center', height: 100 }}>
            <svg width="84" viewBox="0 0 220 220">
              <rect x="30" y="30" width="160" height="160" rx="22" fill="none" stroke={SG_INK} strokeWidth="1.6" />
              <path d={window.signalSinePath()} fill="none" stroke={SG_INK}
                    strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={cap}>weight ≠ 4u</span>
        </div>
        {/* 6 · clutter */}
        <div style={dontStyle}>
          <span style={cross}>×</span>
          <div style={{ display: 'grid', placeItems: 'center', height: 100 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
              <Signal size={50} ink={SG_INK} paper={SG_PAPER} accent={SG_ACCENT} />
              <span style={{ fontFamily: 'Manrope', fontSize: 10, color: SG_INK, fontWeight: 700 }}>NTL™</span>
            </div>
          </div>
          <span style={cap}>add tagline</span>
        </div>
      </div>
      <div className="foot">
        <span className="name">Don'ts</span>
        <span className="tag">if in doubt — leave it alone</span>
      </div>
    </div>
  );
}

/* ────────── Brief / opening copy ────────── */
function SignalBriefPlate() {
  return (
    <div className="cover">
      <span className="eyebrow">Logo System · Signal · Stockholm</span>
      <h1>
        <em>Signal</em> as the<br />studio mark<span className="deg">.</span>
      </h1>
      <p>
        Six small explorations of the same idea, then everything you need to ship one:
        construction grid, clear-space rule, scale ladder down to 16 pixels, six sanctioned
        color treatments, in-context applications, and six things never to do. The canonical
        variant is <b>A · Cell</b> — the rounded cell, the 1.5-cycle sine, the single accent
        sample dot.
      </p>
      <div className="grid">
        <div>
          <div className="k">Mark</div>
          <div className="v">08 · <em>Signal</em></div>
        </div>
        <div>
          <div className="k">Canonical variant</div>
          <div className="v">A · Cell</div>
        </div>
        <div>
          <div className="k">Stroke weight</div>
          <div className="v">4u on a 220u canvas</div>
        </div>
        <div>
          <div className="k">Minimum size</div>
          <div className="v">16 px / 4 mm</div>
        </div>
      </div>
    </div>
  );
}

window.BrowserPlate = BrowserPlate;
window.AppIconPlate = AppIconPlate;
window.CardPlate = CardPlate;
window.StickersPlate = StickersPlate;
window.DontsPlate = DontsPlate;
window.SignalBriefPlate = SignalBriefPlate;
