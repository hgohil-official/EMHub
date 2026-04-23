// Sidebar — grouped by category.group: top / format / practice / concept / bottom
function Sidebar({ categories, active, onSelect, counts, open, onClose }) {
  const groupDefs = [
    { key: 'top',      label: null },
    { key: 'format',   label: 'Formats' },
    { key: 'practice', label: 'Practices' },
    { key: 'concept',  label: 'Concepts' },
    { key: 'bottom',   label: null },
  ];
  return (
    <aside className="sidebar" data-open={open}>
      <div className="side-brand">
        <div className="brand-mark">E</div>
        <div className="brand-name">EM Hub</div>
      </div>
      <nav className="side-nav">
        {groupDefs.map((g) => {
          const items = categories.filter(c => c.group === g.key);
          if (items.length === 0) return null;
          return (
            <React.Fragment key={g.key}>
              {g.label && <div className="side-group">{g.label}</div>}
              {!g.label && g.key !== 'top' && <div className="side-divider" />}
              {items.map(c => (
                <button
                  key={c.id}
                  className="side-item"
                  data-active={active === c.id}
                  onClick={() => { onSelect(c.id); onClose?.(); }}
                >
                  <span className="s-icon">{c.icon === 'bookmark' ? window.SIcon.bookmark(false) : (window.SIcon[c.icon] || null)}</span>
                  <span className="s-label">{c.label}</span>
                  {counts[c.id] != null && <span className="s-count">{counts[c.id]}</span>}
                </button>
              ))}
            </React.Fragment>
          );
        })}
      </nav>
    </aside>
  );
}

// Resource card — shows publisher/duration/price when present
function ResourceCard({ r, saved, onSave, onOpen }) {
  const metaBits = [r.author, r.publisher, r.year].filter(Boolean);
  return (
    <article className="res-card" onClick={() => onOpen(r)}>
      <div className="res-head">
        <span className="type-pill">{r.type}{r.official ? ' · Official' : ''}</span>
        <button className="bm-btn" data-saved={saved} onClick={e => { e.stopPropagation(); onSave(r.id); }}>
          {window.SIcon.bookmark(saved)}
        </button>
      </div>
      <div className="res-title">{r.title}</div>
      <div className="res-author">{metaBits.join(' · ')}</div>
      <div className="res-blurb">{r.takeaway || r.blurb}</div>
      <div className="res-foot">
        <div className="res-tags">
          {(r.tags || []).slice(0, 2).map(t => <span key={t} className="tag">{t}</span>)}
          {r.duration && <span className="tag tag-meta">{r.duration}</span>}
          {r.price && <span className="tag tag-meta">{r.price}</span>}
        </div>
        <span className="level-badge" data-level={r.level}>{r.level}</span>
      </div>
    </article>
  );
}

// Detail panel
function DetailPanel({ resource, saved, onSave, onClose }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const open = !!resource;
  return (
    <>
      <div className="panel-overlay" data-open={open} onClick={onClose}></div>
      <aside className="panel" data-open={open}>
        {resource && (
          <>
            <div className="panel-head">
              <span className="type-pill">{resource.type}{resource.official ? ' · Official' : ''}</span>
              <button className="icon-btn" onClick={onClose}>{window.SIcon.close}</button>
            </div>
            <div className="panel-body">
              <h2>{resource.title}</h2>
              <div className="byline">{[resource.author, resource.publisher, resource.year].filter(Boolean).join(' · ')}</div>
              {resource.takeaway && <p className="takeaway">{resource.takeaway}</p>}
              <p style={{marginTop:12, fontSize:14.5, lineHeight:1.6, color:'var(--ink-2)'}}>{resource.blurb}</p>
              <div className="panel-meta">
                <div className="cell"><div className="k">Level</div><div className="v">{resource.level}</div></div>
                <div className="cell"><div className="k">Format</div><div className="v">{resource.type}</div></div>
                {resource.duration && <div className="cell"><div className="k">Duration</div><div className="v">{resource.duration}</div></div>}
                {resource.price && <div className="cell"><div className="k">Price</div><div className="v">{resource.price}</div></div>}
                {resource.language && resource.language !== 'English' && <div className="cell"><div className="k">Language</div><div className="v">{resource.language}</div></div>}
                {resource.prereq && <div className="cell"><div className="k">Prereq</div><div className="v">{resource.prereq}</div></div>}
                <div className="cell"><div className="k">Domains</div><div className="v">{(resource.domain||[]).join(' · ')}</div></div>
                <div className="cell"><div className="k">Tags</div><div className="v" style={{fontFamily:"'JetBrains Mono', monospace", fontSize:12}}>{(resource.tags||[]).map(t => '#'+t).join(' ')}</div></div>
              </div>
              <div style={{display:'flex', gap:10}}>
                <a className="btn btn-primary" href={resource.url} target="_blank" rel="noreferrer">Open resource {window.SIcon.arrow}</a>
                <button className="btn btn-ghost" onClick={() => onSave(resource.id)}>
                  {window.SIcon.bookmark(saved)} {saved ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

window.Sidebar = Sidebar;
window.ResourceCard = ResourceCard;
window.DetailPanel = DetailPanel;
