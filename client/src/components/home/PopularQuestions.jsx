import { Link } from 'react-router-dom';

const difficultyBadge = { 
  easy: 'badge-difficulty-easy', 
  medium: 'badge-difficulty-medium', 
  hard: 'badge-difficulty-hard' 
};

const PopularQuestions = ({ questions = [] }) => (
  <section className="py-5" style={{ background: 'rgba(9, 13, 22, 0.3)' }}>
    <div className="container-fluid px-3 px-lg-5">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="section-title mb-1 text-white fw-extrabold">
            <i className="bi bi-chat-left-text text-primary me-2"></i>Popular Interview Questions
          </h2>
          <p className="text-muted mb-0">Review conceptual, behavioral, and architectural questions frequently asked in real loops</p>
        </div>
        <Link to="/questions" className="btn btn-outline-primary d-inline-flex align-items-center gap-2">
          <span>View All</span>
          <i className="bi bi-chevron-right small"></i>
        </Link>
      </div>
      <div className="row g-4">
        {questions.map((q) => (
          <div key={q.id || q._id} className="col-12 col-md-6 col-lg-4">
            <div className="card-interactive h-100 d-flex flex-column">
              <div className="card-body p-4 d-flex flex-column h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className={`badge ${difficultyBadge[q.difficulty] || ''} text-capitalize`}>
                    {q.difficulty}
                  </span>
                  <span className="badge bg-white bg-opacity-5 text-white-50 border border-white border-opacity-5 text-capitalize">
                    {q.category}
                  </span>
                </div>
                <h5 className="text-white fw-bold mb-3" style={{ fontSize: '1.05rem', lineHeight: '1.5' }}>
                  {q.title}
                </h5>
                <div className="d-flex flex-wrap gap-2 mt-auto pt-3 border-top border-white border-opacity-5">
                  {q.tags?.slice(0, 3).map((tag) => (
                    <span 
                      key={tag} 
                      className="badge bg-white bg-opacity-5 text-white-50 border border-white border-opacity-5 d-inline-flex align-items-center gap-1"
                      style={{ fontSize: '0.75rem' }}
                    >
                      <i className="bi bi-tag-fill text-muted small"></i>
                      <span>{tag}</span>
                    </span>
                  ))}
                  {(!q.tags || q.tags.length === 0) && (
                    <span className="badge bg-white bg-opacity-5 text-white-50 border border-white border-opacity-5 small">
                      General
                    </span>
                  )}
                </div>
              </div>
              <div className="card-footer bg-transparent border-0 pt-0 pb-4 px-4">
                <Link to={`/questions/${q.id || q._id}`} className="btn btn-sm btn-primary w-100 py-2 d-inline-flex align-items-center justify-content-center gap-2">
                  <span>Solve Question</span>
                  <i className="bi bi-arrow-right-short fs-5"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
        {questions.length === 0 && (
          <div className="col-12 text-center py-5 glass-card border border-white border-opacity-5 rounded-4">
            <i className="bi bi-chat-square-exclamation fs-1 text-muted mb-2 d-block"></i>
            <p className="text-muted mb-0">No questions posted yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default PopularQuestions;
