import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchSection = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/questions?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleQuickSearch = (term) => {
    setQuery(term);
    navigate(`/questions?search=${encodeURIComponent(term)}`);
  };

  const quickSearches = ['Arrays', 'System Design', 'React', 'Google', 'TCS', 'Behavioral'];

  return (
    <section className="py-4 position-relative border-bottom border-white border-opacity-5" style={{ background: 'rgba(9, 13, 22, 0.4)' }}>
      <div className="container-fluid px-3 px-lg-5">
        <form onSubmit={handleSubmit} className="row g-2 justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="search-glow-wrap">
              <div className="input-group input-group-lg bg-dark bg-opacity-70 rounded-3 overflow-hidden border-0">
                <span className="input-group-text bg-transparent border-0 text-muted px-3">
                  <i className="bi bi-search fs-5" style={{ color: '#818cf8' }}></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-transparent border-0 text-white shadow-none ps-0"
                  placeholder="Search questions, topics, languages, or companies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{ fontSize: '1.05rem' }}
                />
                <button type="submit" className="btn btn-primary px-4 py-2 border-0 d-inline-flex align-items-center gap-2">
                  <span>Search</span>
                  <i className="bi bi-arrow-right-short fs-5"></i>
                </button>
              </div>
            </div>
            
            {/* Quick search tags */}
            <div className="d-flex flex-wrap align-items-center justify-content-center mt-3 gap-2">
              <span className="text-muted small me-1">Popular searches:</span>
              {quickSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleQuickSearch(term)}
                  className="btn btn-sm btn-outline-light border-0 px-3 py-1 rounded-pill small text-white-50"
                  style={{ fontSize: '0.8rem', background: 'rgba(255, 255, 255, 0.08)' }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchSection;
