import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api/axios';

const difficultyBadge = { easy: 'success', medium: 'warning', hard: 'danger' };

const Questions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [questions, setQuestions] = useState([]);
  const [meta, setMeta] = useState({ categories: [], difficulties: [], tags: [] });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    difficulty: searchParams.get('difficulty') || '',
    tag: searchParams.get('tag') || '',
  });

  const fetchQuestions = () => {
    setLoading(true);
    const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
    api
      .get('/questions', { params: { ...params, limit: 20 } })
      .then((res) => setQuestions(res.data.data.questions))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    api.get('/questions/meta/categories').then((res) => setMeta(res.data.data));
  }, []);

  useEffect(() => {
    fetchQuestions();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => v && params.set(k, v));
    setSearchParams(params);
  }, [filters.category, filters.difficulty, filters.tag, filters.search]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchQuestions();
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Interview Questions</h2>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <form onSubmit={handleSearch} className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                name="search"
                className="form-control"
                placeholder="Search..."
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <select name="category" className="form-select" value={filters.category} onChange={handleFilterChange}>
                <option value="">All categories</option>
                {meta.categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <select name="difficulty" className="form-select" value={filters.difficulty} onChange={handleFilterChange}>
                <option value="">All levels</option>
                {meta.difficulties.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <select name="tag" className="form-select" value={filters.tag} onChange={handleFilterChange}>
                <option value="">All tags</option>
                {meta.tags.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">Filter</button>
            </div>
          </form>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border" /></div>
      ) : (
        <div className="row g-3">
          {questions.map((q) => (
            <div key={q.id} className="col-md-6">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <span className={`badge bg-${difficultyBadge[q.difficulty]} me-1`}>{q.difficulty}</span>
                  <span className="badge bg-secondary">{q.category}</span>
                  <h5 className="mt-2">{q.title}</h5>
                  <p className="text-muted small">{q.description?.slice(0, 120)}...</p>
                  <Link to={`/questions/${q.id}`} className="btn btn-sm btn-primary">View</Link>
                </div>
              </div>
            </div>
          ))}
          {questions.length === 0 && <p className="text-muted">No questions found.</p>}
        </div>
      )}
    </div>
  );
};

export default Questions;
