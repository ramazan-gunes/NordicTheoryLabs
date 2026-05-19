/* ──────────────────────────────────────────────────────────────────────────
   Design canvas — Nordic Theory Labs logo exploration
   ────────────────────────────────────────────────────────────────────────── */

function App() {
  const marks = window.MARKS;

  return (
    <DesignCanvas>
      {/* ───── 00 · Intro ───── */}
      <DCSection id="intro" title="Logo exploration" subtitle="Eight directions for the Nordic Theory Labs mark · v1">
        <DCArtboard id="cover" label="Brief" width={1100} height={520}>
          <CoverPlate />
        </DCArtboard>
        <DCArtboard id="how-to-read" label="How to read" width={760} height={520}>
          <NotesPlate />
        </DCArtboard>
      </DCSection>

      {/* one section per direction */}
      {marks.map(m => {
        // wordmark wants wider plates
        const W = m.square ? 520 : 760;
        const H = 380;
        return (
          <DCSection
            key={m.id}
            id={`row-${m.key}`}
            title={`${m.id} · ${m.name}`}
            subtitle={m.idea}
          >
            <DCArtboard id={`${m.key}-light`} label="Primary · paper" width={W} height={H}>
              <MarkPlate entry={m} mode="light" />
            </DCArtboard>

            <DCArtboard id={`${m.key}-dark`} label="Reverse · ink" width={W} height={H}>
              <MarkPlate entry={m} mode="dark" />
            </DCArtboard>

            <DCArtboard id={`${m.key}-scales`} label="Scale ladder" width={620} height={H}>
              <ScalePlate entry={m} />
            </DCArtboard>

            <DCArtboard id={`${m.key}-insitu`} label="In situ" width={620} height={520}>
              <InSituPlate entry={m} />
            </DCArtboard>
          </DCSection>
        );
      })}
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
