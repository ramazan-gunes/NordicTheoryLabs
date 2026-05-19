/* ──────────────────────────────────────────────────────────────────────────
   Plate components — one per artboard
   - Hero: a logo at presentation size, on light or dark ground
   - Scales: same mark at favicon / nav / large display sizes
   ────────────────────────────────────────────────────────────────────────── */

const INK = '#0E1620';
const PAPER = '#F1EEE6';
const ACCENT = 'oklch(0.55 0.13 220)';

/* A single mark presented on a plate (light or dark) */
function MarkPlate({ entry, mode = 'light', notes }) {
  const ink   = mode === 'dark' ? PAPER : INK;
  const paper = mode === 'dark' ? INK   : PAPER;
  const dark  = mode === 'dark';
  const { id, name, sub, C, square } = entry;

  const stageSize = square ? 280 : 520;

  return (
    <div className={'plate' + (dark ? ' dark' : '')}>
      <div className="head">
        <span className="num">{id} · {mode === 'dark' ? 'reverse' : 'primary'}</span>
        <span>{square ? 'mark' : 'wordmark'}</span>
      </div>
      <div className="stage">
        <C size={stageSize} ink={ink} paper={paper} accent={ACCENT} />
      </div>
      <div className="foot">
        <span className="name">{name}</span>
        <span className="tag">{sub}</span>
      </div>
    </div>
  );
}

/* Scale comparison — same mark at favicon / nav / large */
function ScalePlate({ entry }) {
  const { C, square, name } = entry;
  return (
    <div className="plate" style={{ gridTemplateRows: 'auto 1fr' }}>
      <div className="head">
        <span className="num">scales</span>
        <span>16 · 28 · 64 · 160 px</span>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        padding: '28px 30px 30px',
        gap: '30px',
        alignItems: 'center',
      }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10.5, letterSpacing: '0.14em', color: '#6B7280', textTransform: 'uppercase', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          In situ
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 28, flexWrap: 'wrap' }}>
          {[16, 28, 64, 160].map(s => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'grid', placeItems: 'center', minHeight: s }}>
                <C size={s} ink={INK} paper={PAPER} accent={ACCENT} />
              </div>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9.5, letterSpacing: '0.14em', color: '#6B7280' }}>{s}px</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* In-situ: nav bar + footer wordmark mockup with this mark */
function InSituPlate({ entry }) {
  const { C, square, name } = entry;

  return (
    <div className="plate" style={{ gridTemplateRows: 'auto 1fr auto' }}>
      <div className="head">
        <span className="num">in situ</span>
        <span>nav · footer · favicon</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, padding: '24px 26px' }}>

        {/* mock nav */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px',
          border: '1px solid rgba(14,22,32,0.12)',
          borderRadius: 10,
          background: '#F1EEE6',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <C size={28} ink={INK} paper={PAPER} accent={ACCENT} />
            <span style={{ fontFamily: 'Manrope', fontWeight: 500, fontSize: 14, letterSpacing: '-0.01em' }}>
              Nordic <em style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontWeight: 400 }}>Theory</em> Labs
            </span>
          </div>
          <div style={{ display: 'flex', gap: 16, fontFamily: 'Manrope', fontSize: 12, color: '#2A323E' }}>
            <span>Apps</span><span>Approach</span><span>Notes</span><span>Contact</span>
          </div>
        </div>

        {/* mock browser tab */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px 6px 8px',
            background: '#E9E5DA',
            borderRadius: '10px 10px 0 0',
            maxWidth: 280,
            border: '1px solid rgba(14,22,32,0.08)',
            borderBottom: 0,
          }}>
            <span style={{ display: 'inline-grid', placeItems: 'center', width: 16, height: 16 }}>
              <C size={16} ink={INK} paper={PAPER} accent={ACCENT} />
            </span>
            <span style={{ fontFamily: 'Manrope', fontSize: 11.5, color: '#0E1620', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Nordic Theory Labs — Stockholm
            </span>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#6B7280' }}>×</span>
          </div>
        </div>

        {/* big footer wordmark in ink */}
        <div style={{
          padding: '28px 22px',
          background: '#0E1620',
          color: '#F1EEE6',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16,
        }}>
          <C size={42} ink={PAPER} paper={INK} accent={ACCENT} />
          <span style={{
            fontFamily: 'Manrope', fontWeight: 600, fontSize: 28, letterSpacing: '-0.035em',
          }}>
            Nordic <em style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontWeight: 400 }}>Theory</em> Labs<em style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontWeight: 400, color: ACCENT }}>°</em>
          </span>
        </div>
      </div>

      <div className="foot">
        <span className="name">{name}</span>
        <span className="tag">how it lives</span>
      </div>
    </div>
  );
}

/* Cover plate — brand context */
function CoverPlate() {
  return (
    <div className="cover">
      <span className="eyebrow">Logo Exploration · v1 · Stockholm</span>
      <h1>
        Eight directions<br />
        for the <em>Nordic</em><br />
        Theory Labs mark<span className="deg">°</span>
      </h1>
      <p>
        Each row presents one direction in three views: the mark on paper, the mark reversed onto ink,
        and the mark living in context (browser tab, navigation, footer). The visual DNA is fixed —
        warm paper, deep ink, an italic <em>Instrument Serif</em> grace note, and a single aurora accent.
        What changes per row is the underlying idea: typographic restraint, monogram, cartographic abstraction,
        academic seal, lab vessel.
      </p>

      <div className="grid">
        <div>
          <div className="k">Palette</div>
          <div className="v">Paper / Ink / Aurora</div>
          <div className="swatches">
            <i style={{ background: '#F1EEE6' }} />
            <i style={{ background: '#0E1620' }} />
            <i style={{ background: 'oklch(0.72 0.13 175)' }} />
            <i style={{ background: 'oklch(0.55 0.13 220)' }} />
          </div>
        </div>
        <div>
          <div className="k">Type</div>
          <div className="v">Manrope · <em>Instrument Serif</em> · JetBrains Mono</div>
        </div>
        <div>
          <div className="k">Anchor glyph</div>
          <div className="v" style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 40, lineHeight: 1 }}>°</div>
        </div>
        <div>
          <div className="k">Studio</div>
          <div className="v">Independent software<br />Söder, Stockholm</div>
        </div>
      </div>
    </div>
  );
}

/* Notes plate — design principles & how to pick */
function NotesPlate() {
  return (
    <div className="notes">
      <h2>How to <em>read</em> this canvas</h2>
      <ul>
        <li data-n="01"><b>Each row is one direction.</b> Three artboards: primary (paper), reverse (ink), in-situ (browser + nav + footer mock).</li>
        <li data-n="02"><b>Wordmark (01)</b> can be the standalone studio signature. Any of 02–08 can be a companion mark next to it.</li>
        <li data-n="03"><b>02 N° Chip</b> is the closest evolution of what’s already on the site — safest, easiest to ship.</li>
        <li data-n="04"><b>03 Aurora & 04 Parallel</b> are the most concept-forward — they lean into the “Nordic Theory” reading (theory = abstraction / latitude / aurora).</li>
        <li data-n="05"><b>05 Compass & 06 Seal</b> are studio-flavored — directional or academic, both work at small sizes.</li>
        <li data-n="06"><b>07 Vessel & 08 Disc</b> are the most graphic — strongest as App Store / sticker / merch icons.</li>
        <li data-n="07"><b>The accent oklch(0.55 0.13 220) is shared.</b> Whichever mark wins, it carries through the existing site without touching the palette.</li>
        <li data-n="08"><b>Next step:</b> pick 1–2 directions and I’ll produce a small lock-up sheet (clear-space, min-size, monochrome fallback, favicon/PNG export).</li>
      </ul>
    </div>
  );
}

window.MarkPlate = MarkPlate;
window.ScalePlate = ScalePlate;
window.InSituPlate = InSituPlate;
window.CoverPlate = CoverPlate;
window.NotesPlate = NotesPlate;
