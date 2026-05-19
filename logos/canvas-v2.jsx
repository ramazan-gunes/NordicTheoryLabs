/* ──────────────────────────────────────────────────────────────────────────
   Design canvas · v2 — eight icon marks for Nordic Theory Labs
   ────────────────────────────────────────────────────────────────────────── */

function App() {
  const marks = window.MARKS;

  return (
    <DesignCanvas>
      <DCSection id="intro" title="Logo exploration · v2" subtitle="Eight icon directions · iconic, geometric, software-forward">
        <DCArtboard id="cover" label="Brief" width={1100} height={520}>
          <CoverPlate />
        </DCArtboard>
        <DCArtboard id="how-to-read" label="How to read" width={760} height={520}>
          <NotesPlate />
        </DCArtboard>
      </DCSection>

      {marks.map(m => {
        const W = 520, H = 380;
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
