/* ──────────────────────────────────────────────────────────────────────────
   Signal — system sheet canvas
   ────────────────────────────────────────────────────────────────────────── */

function App() {
  return (
    <DesignCanvas>
      <DCSection id="brief" title="Signal · system sheet"
                 subtitle="Variations, construction, scale, color, in-context, don'ts">
        <DCArtboard id="brief" label="Brief" width={1100} height={520}>
          <SignalBriefPlate />
        </DCArtboard>
        <DCArtboard id="hero" label="Primary lockup" width={920} height={420}>
          <HeroPlate />
        </DCArtboard>
      </DCSection>

      <DCSection id="variations" title="01 · Variations"
                 subtitle="Six explorations of the same DNA — pick the cell, the pill, the solid, the open, the grid, or the echo">
        <DCArtboard id="variations" label="Six variants · A · Cell chosen" width={1080} height={620}>
          <VariationsPlate />
        </DCArtboard>
      </DCSection>

      <DCSection id="construction" title="02 · Construction"
                 subtitle="220u canvas · 8-unit grid · 1.5 sine cycles · stroke 4u">
        <DCArtboard id="construction" label="Geometry" width={560} height={520}>
          <ConstructionPlate />
        </DCArtboard>
        <DCArtboard id="clear-space" label="Clear space" width={560} height={520}>
          <ClearSpacePlate />
        </DCArtboard>
      </DCSection>

      <DCSection id="scale" title="03 · Scale"
                 subtitle="From 16-pixel favicon to 160-pixel hero — same vector, no overrides">
        <DCArtboard id="scale" label="Scale ladder" width={1080} height={360}>
          <ScaleLadderPlate />
        </DCArtboard>
      </DCSection>

      <DCSection id="color" title="04 · Color"
                 subtitle="Six sanctioned treatments — primary, reverse, two monos, two tints">
        <DCArtboard id="color" label="Treatments" width={1080} height={560}>
          <ColorPlate />
        </DCArtboard>
      </DCSection>

      <DCSection id="in-situ" title="05 · In situ"
                 subtitle="Browser chrome, app icons, business card, stickers / pins">
        <DCArtboard id="browser" label="Browser" width={680} height={460}>
          <BrowserPlate />
        </DCArtboard>
        <DCArtboard id="app-icon" label="App icon · iOS · Android · Store" width={760} height={400}>
          <AppIconPlate />
        </DCArtboard>
        <DCArtboard id="card" label="Business card" width={680} height={360}>
          <CardPlate />
        </DCArtboard>
        <DCArtboard id="stickers" label="Stickers" width={680} height={360}>
          <StickersPlate />
        </DCArtboard>
      </DCSection>

      <DCSection id="donts" title="06 · Don'ts"
                 subtitle="Stretch, rotate, recolor, gradient, weight shift, clutter — six common mistakes">
        <DCArtboard id="donts" label="Six don'ts" width={1080} height={460}>
          <DontsPlate />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
