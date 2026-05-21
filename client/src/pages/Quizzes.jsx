import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const difficultyClass = {
  easy: 'badge-difficulty-easy',
  medium: 'badge-difficulty-medium',
  hard: 'badge-difficulty-hard',
};

const categories = [
  { id: '', label: 'All' },
  { id: 'dsa', label: 'DSA' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'dbms', label: 'DBMS' },
  { id: 'os', label: 'OS' },
  { id: 'cn', label: 'Networks' },
  { id: 'system-design', label: 'System Design' },
  { id: 'hr', label: 'HR' },
];

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category) params.category = category;
    if (difficulty) params.difficulty = difficulty;
    api
      .get('/quizzes', { params })
      .then((res) => setQuizzes(res.data.data.quizzes))
      .catch(() => setQuizzes([]))
      .finally(() => setLoading(false));
  }, [category, difficulty]);

  return (
    <main className="container-fluid px-3 px-lg-5 py-4 fade-in">
      <header className="mb-4">
        <h1 className="section-title">Knowledge Quizzes</h1>
        <p className="text-muted">
          Pick a topic, beat the timer, and see how you score instantly.
        </p>
      </header>

      <section className="card border-0 shadow-sm mb-4 p-3">
        <div className="row g-3 align-items-end">
          <div className="col-md-6">
            <label className="form-label small fw-semibold">Category</label>
            <div className="d-flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`btn btn-sm ${category === c.id ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setCategory(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-semibold">Difficulty</label>
            <select
              className="form-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">All levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="page-loader"><div className="spinner-app" /></div>
      ) : (
        <section className="row g-4">
          {quizzes.map((quiz) => (
            <article key={quiz.id} className="col-md-6 col-lg-4">
              <Link to={`/quizzes/${quiz.slug}`} className="text-decoration-none">
                <div className="card-interactive quiz-card h-100">
                  <div
                    className="quiz-card-accent"
                    style={{ background: quiz.color || '#6366f1' }}
                  />
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start">
                      <span className="fs-1">{quiz.icon}</span>
                      <span className={`badge ${difficultyClass[quiz.difficulty]}`}>
                        {quiz.difficulty}
                      </span>
                    </div>
                    <h4 className="text-dark mt-2">{quiz.title}</h4>
                    <p className="text-muted small">{quiz.description}</p>
                    <div className="d-flex gap-2 mt-3">
                      <span className="badge bg-primary bg-opacity-10 text-primary">
                        {quiz.questionCount} Qs
                      </span>
                      <span className="badge bg-secondary bg-opacity-10 text-secondary">
                        {quiz.timePerQuestion}s / Q
                      </span>
                    </div>
                    <span className="btn btn-primary btn-sm mt-3 w-100 btn-glow">Start Quiz</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
          {quizzes.length === 0 && (
            <p className="text-muted col-12">No quizzes found for this filter.</p>
          )}
        </section>
      )}
    </main>
  );
};

export default Quizzes;
