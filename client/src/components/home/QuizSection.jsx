import { Link } from 'react-router-dom';

const difficultyClass = {
  easy: 'badge-difficulty-easy',
  medium: 'badge-difficulty-medium',
  hard: 'badge-difficulty-hard',
};

const QuizSection = ({ quizzes = [] }) => (
  <section className="py-5">
    <div className="container-fluid px-3 px-lg-5">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="section-title mb-1 text-white fw-extrabold">
            <i className="bi bi-patch-question text-primary me-2"></i>Test Your Knowledge
          </h2>
          <p className="text-muted mb-0">Interactive domain-specific quizzes with instant, actionable feedback</p>
        </div>
        <Link to="/quizzes" className="btn btn-outline-primary d-inline-flex align-items-center gap-2">
          <span>All Quizzes</span>
          <i className="bi bi-chevron-right small"></i>
        </Link>
      </div>
      <div className="row g-4">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="col-md-6 col-lg-3">
            <Link to={`/quizzes/${quiz.slug}`} className="text-decoration-none h-100 d-block">
              <article 
                className="card-interactive quiz-card h-100 d-flex flex-column"
                style={{ borderLeft: `4px solid ${quiz.color || 'var(--primary)'}` }}
              >
                <div className="card-body p-4 d-flex flex-column h-100">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span 
                      className="fs-3 p-2 rounded-3 bg-white bg-opacity-5 d-flex align-items-center justify-content-center"
                      style={{ width: '48px', height: '48px', border: '1px solid rgba(255, 255, 255, 0.05)' }}
                    >
                      {quiz.icon || '📝'}
                    </span>
                    <span className={`badge rounded-pill text-capitalize ${difficultyClass[quiz.difficulty] || ''}`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                  <h5 className="text-white fw-bold mb-2 text-truncate-2">{quiz.title}</h5>
                  <div className="d-flex align-items-center gap-3 text-muted small mb-4 mt-auto">
                    <span className="d-flex align-items-center gap-1">
                      <i className="bi bi-list-task text-primary"></i>
                      <span>{quiz.questionCount} Qs</span>
                    </span>
                    <span className="d-flex align-items-center gap-1">
                      <i className="bi bi-clock" style={{ color: '#d946ef' }}></i>
                      <span>{quiz.timePerQuestion}s/Q</span>
                    </span>
                  </div>
                  <div className="pt-2 border-top border-white border-opacity-5 d-flex align-items-center justify-content-between">
                    <span className="badge bg-white bg-opacity-5 text-white-50 border border-white border-opacity-5 text-capitalize">
                      {quiz.category}
                    </span>
                    <span className="text-primary small fw-semibold d-inline-flex align-items-center gap-1 quiz-play-link">
                      <span>Start</span>
                      <i className="bi bi-play-fill"></i>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        ))}
        {quizzes.length === 0 && (
          <div className="col-12 text-center py-5 glass-card border border-white border-opacity-5 rounded-4">
            <i className="bi bi-database-exclamation fs-1 text-muted mb-2 d-block"></i>
            <p className="text-muted mb-0">Quizzes are loading. Please wait a moment...</p>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default QuizSection;
