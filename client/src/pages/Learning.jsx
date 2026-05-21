import { useEffect, useState } from 'react';
import api from '../api/axios';

const typeIcons = { pdf: 'PDF', notes: 'Notes', video: 'Video', cheatsheet: 'Cheat Sheet' };

const Learning = () => {
  const [materials, setMaterials] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const params = filter ? { type: filter } : {};
    api.get('/materials', { params }).then((res) => setMaterials(res.data.data.materials));
  }, [filter]);

  return (
    <main className="container py-4">
      <h2 className="mb-4">Learning Materials</h2>
      <section className="btn-group mb-4 flex-wrap" role="group">
        <button type="button" className={`btn btn-outline-primary ${!filter ? 'active' : ''}`} onClick={() => setFilter('')}>All</button>
        {['pdf', 'notes', 'video', 'cheatsheet'].map((t) => (
          <button key={t} type="button" className={`btn btn-outline-primary ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>
            {typeIcons[t]}
          </button>
        ))}
      </section>

      <section className="row g-3">
        {materials.map((m) => (
          <article key={m.id} className="col-md-6 col-lg-4">
            <section className="card h-100 shadow-sm border-0">
              <section className="card-body">
                <span className="badge bg-secondary mb-2">{typeIcons[m.type] || m.type}</span>
                <h5>{m.title}</h5>
                <p className="text-muted small">{m.description}</p>
                <span className="badge bg-light text-dark">{m.category}</span>
              </section>
              <section className="card-footer bg-white border-0">
                {m.link && (
                  <a href={m.link} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary me-2">Open link</a>
                )}
                {m.fileUrl && (
                  <a href={m.fileUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">Download</a>
                )}
              </section>
            </section>
          </article>
        ))}
        {materials.length === 0 && <p className="text-muted">No materials yet. Admin can upload from the panel.</p>}
      </section>
    </main>
  );
};

export default Learning;
