// Career Path Guide — tabs + expandable step cards
function CareerPath() {
  const paths = window.ARCH_PATHS;
  const [pathId, setPathId] = React.useState(() => localStorage.getItem('arch-path') || paths[0].id);
  const [openStep, setOpenStep] = React.useState(0);
  React.useEffect(() => { localStorage.setItem('arch-path', pathId); setOpenStep(0); }, [pathId]);
  const path = paths.find(p => p.id === pathId) || paths[0];
  const totalSteps = path.steps.length;
  const pct = Math.round(((openStep + 1) / totalSteps) * 100);

  return (
    <div>
      <div className="rm-hero">
        <h2>Career Path Guide</h2>
        <p>
          Pick a path and follow a curated {totalSteps}-step progression — no firehose of resources, just what
          you need at each stage. Each step has a handful of hand-picked entries.
        </p>
        <div className="path-pills">
          {paths.map(p => (
            <button
              key={p.id}
              className="pill"
              data-active={pathId === p.id}
              onClick={() => setPathId(p.id)}
            >
              <span className="p-icon">{window.SIcon[p.icon]}</span>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rm-body">
        <div className="rm-summary">
          <h3>{path.label}</h3>
          <p>{path.summary}</p>
        </div>

        <div className="rm-progress-card">
          <span className="step-label">Step {openStep + 1} of {totalSteps}</span>
          <div className="rm-bar"><div className="fill" style={{width: `${pct}%`}}></div></div>
        </div>

        <div className="rm-steps">
          {path.steps.map((step, i) => {
            const isOpen = openStep === i;
            return (
              <div key={i} className="rm-step" data-open={isOpen} data-active={i <= openStep}>
                <div className="num">{i + 1}</div>
                <div className="rm-step-card">
                  <button className="rm-step-head" onClick={() => setOpenStep(isOpen ? -1 : i)}>
                    <span className="s-icon">{window.SIcon[step.icon]}</span>
                    <span className="s-title">{step.title}</span>
                    <span className="s-count">{step.picks.length} picks</span>
                    <span className="chev">{window.SIcon.chevron}</span>
                  </button>
                  {isOpen && (
                    <div className="rm-step-body">
                      {step.note && <div className="note">{step.note}</div>}
                      {step.picks.map((pk, pi) => (
                        <div key={pi} className="rm-pick">
                          <div className="p-title">{pk.title}</div>
                          <div className="p-desc">{pk.desc}</div>
                          <div className="p-tags">
                            {pk.tags.map(t => <span key={t} className="badge">{t}</span>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Tweaks
function TweaksPanel({ state, setState }) {
  const accents = [
    { k: 'blueprint', v: '#1a3557', l: 'Blueprint' },
    { k: 'sage',      v: '#355b4e', l: 'Sage' },
    { k: 'ink',       v: '#1a1b1e', l: 'Ink' },
    { k: 'copper',    v: '#8c4a2b', l: 'Copper' },
  ];
  return (
    <div className="tweaks">
      <h4>Tweaks</h4>
      <div className="tweak-row">
        <label>Accent</label>
        <div className="opts">
          {accents.map(a => (
            <button key={a.k} data-on={state.accent === a.v} onClick={() => setState({ accent: a.v })}>{a.l}</button>
          ))}
        </div>
      </div>
      <div className="tweak-row">
        <label>Density · {state.density.toFixed(2)}×</label>
        <input type="range" min="0.8" max="1.2" step="0.05" value={state.density}
          onChange={e => setState({ density: parseFloat(e.target.value) })} />
      </div>
    </div>
  );
}

window.CareerPath = CareerPath;
window.TweaksPanel = TweaksPanel;
