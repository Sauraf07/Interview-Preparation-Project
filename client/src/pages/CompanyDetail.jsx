import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/axios';

const CompanyDetail = () => {
  const { slug } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    api.get(`/companies/${slug}`).then((res) => setCompany(res.data.data.company));
  }, [slug]);

  if (!company) {
    return <main className="container py-5 text-center"><span className="spinner-border" /></main>;
  }

  return (
    <main className="container py-4">
      <Link to="/" className="btn btn-link ps-0">&larr; Home</Link>
      <header className="mb-4">
        <h1>{company.name}</h1>
        <p className="text-muted">{company.tagline}</p>
      </header>

      <section className="row g-4">
        <article className="col-lg-6">
          <h4>Interview Process</h4>
          <ol className="list-group list-group-numbered">
            {company.interviewProcess?.map((step) => (
              <li key={step} className="list-group-item">{step}</li>
            ))}
          </ol>
        </article>

        <article className="col-lg-6">
          <h4>Roadmap</h4>
          <ul className="list-group">
            {company.roadmap?.map((r) => (
              <li key={r.step} className="list-group-item">
                <strong>Step {r.step}:</strong> {r.title} — <span className="text-muted">{r.description}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="col-lg-6">
          <h4>Questions</h4>
          <ul className="list-group">
            {company.questions?.map((q) => (
              <li key={q.title} className="list-group-item">
                <strong>{q.title}</strong>
                <br />
                <small className="text-muted">{q.description}</small>
                <span className="badge bg-secondary ms-2">{q.difficulty}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="col-lg-6">
          <h4>Coding Problems</h4>
          <ul className="list-group">
            {company.codingProblems?.map((p) => (
              <li key={p.title} className="list-group-item">
                <strong>{p.title}</strong> — {p.description}
                <span className="badge bg-primary ms-2">{p.difficulty}</span>
              </li>
            ))}
          </ul>
          <Link to="/coding" className="btn btn-primary mt-3">Practice in editor</Link>
        </article>

        <article className="col-12">
          <h4>Resources</h4>
          <ul className="list-group">
            {company.resources?.map((r) => (
              <li key={r.title} className="list-group-item d-flex justify-content-between">
                <span>{r.title} <span className="badge bg-info">{r.type}</span></span>
                <a href={r.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">Open</a>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
};

export default CompanyDetail;
