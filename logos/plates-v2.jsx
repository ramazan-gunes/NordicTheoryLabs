/* ──────────────────────────────────────────────────────────────────────────
   Plate overrides for v2 — new Cover + Notes copy.
   Loaded AFTER plates.jsx so it replaces window.CoverPlate and
   window.NotesPlate. MarkPlate / ScalePlate / InSituPlate are unchanged.
   ────────────────────────────────────────────────────────────────────────── */

function CoverPlateV2() {
  return (
    <div className="cover">
      <span className="eyebrow">Logo Exploration · v2 · Stockholm</span>
      <h1>
        Eight <em>icon</em> marks<br />
        for a software studio<span className="deg">.</span>
      </h1>
      <p>
        v1 leaned typographic and academic — italic N, compass, seal, flask. Useful, but quiet.
        v2 swings the other way: abstract geometric icons that earn their place next to Linear, Vercel, Arc, Raycast.
        Each direction is a single, committed shape. The wordmark sits beside the mark, not inside it,
        so any of these eight can carry the brand from a 16-pixel favicon to an App Store tile.
      </p>

      <div className="grid">
        <div>
          <div className="k">Palette</div>
          <div className="v">Paper / Ink / Accent</div>
          <div className="swatches">
            <i style={{ background: '#F1EEE6' }} />
            <i style={{ background: '#0E1620' }} />
            <i style={{ background: 'oklch(0.55 0.13 220)' }} />
          </div>
        </div>
        <div>
          <div className="k">Type</div>
          <div className="v">Manrope · <em>Instrument Serif</em> · JetBrains Mono</div>
        </div>
        <div>
          <div className="k">Constraint</div>
          <div className="v">One shape. <em>No</em> illustration. Geometry only.</div>
        </div>
        <div>
          <div className="k">Studio</div>
          <div className="v">Independent software<br />Söder, Stockholm</div>
        </div>
      </div>
    </div>
  );
}

function NotesPlateV2() {
  return (
    <div className="notes">
      <h2>How to <em>read</em> v2</h2>
      <ul>
        <li data-n="01"><b>Every mark is square.</b> The wordmark lives beside it in the lockup; the icon doesn't carry the name.</li>
        <li data-n="02"><b>01 Aperture &amp; 04 Polestar</b> are the strongest silhouettes — best favicons, best app-store tiles.</li>
        <li data-n="03"><b>02 Theorem</b> is the boldest brand bet. ∎ is already in math; the notched corner makes it ours.</li>
        <li data-n="04"><b>03 Prism &amp; 08 Signal</b> are the most "lab" — refraction and signal as proxies for the work.</li>
        <li data-n="05"><b>05 Lattice &amp; 06 Brackets</b> sit closest to developer-tool vernacular — graph + syntax.</li>
        <li data-n="06"><b>07 Continuum</b> is the quietest concept piece — single stroke, no end-state.</li>
        <li data-n="07"><b>One accent only.</b> oklch(0.55 0.13 220) appears as a single dot in every mark — the brand handshake.</li>
        <li data-n="08"><b>Next step:</b> pick 1–2, I'll produce clear-space, min-size, monochrome fallback, and PNG/SVG export.</li>
      </ul>
    </div>
  );
}

/* override */
window.CoverPlate = CoverPlateV2;
window.NotesPlate = NotesPlateV2;
