import { Link } from 'react-router-dom';

const HeroSection = () => (
  <section className="hero-gradient text-white py-5 position-relative overflow-hidden bg-grid-pattern">
    {/* Floating background blur effects */}
    <div className="hero-glow-circle-1"></div>
    <div className="hero-glow-circle-2"></div>
    
    <div className="container-fluid px-3 px-lg-5 py-4 py-lg-5 position-relative z-2">
      <div className="row align-items-center g-5">
        <div className="col-lg-7">
          <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 mb-3 px-3 py-2 fs-6 rounded-pill d-inline-flex align-items-center gap-2">
            <i className="bi bi-rocket-takeoff-fill text-primary"></i>
            <span>Interactive Interview Preparation Hub</span>
          </span>
          <h1 className="display-4 fw-extrabold mb-3 lh-sm text-white">
            Ace Your Next <span className="brand-gradient-text">Technical Interview</span>
          </h1>
          <p className="lead mb-4 text-muted" style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>
            Practice curated coding challenges, solve platform-specific mock questions, take real-time interactive quizzes, and follow structured engineering roadmaps.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <Link to="/quizzes" className="btn btn-primary btn-lg px-4 py-3 d-inline-flex align-items-center gap-2">
              <i className="bi bi-play-circle-fill"></i>
              <span>Take a Quiz</span>
            </Link>
            <Link to="/questions" className="btn btn-outline-light btn-lg px-4 py-3 d-inline-flex align-items-center gap-2">
              <i className="bi bi-search"></i>
              <span>Browse Questions</span>
            </Link>
            <Link to="/coding" className="btn btn-outline-light btn-lg px-4 py-3 d-inline-flex align-items-center gap-2">
              <i className="bi bi-code-slash"></i>
              <span>Start Coding</span>
            </Link>
          </div>
        </div>
        <div className="col-lg-5 d-none d-lg-block">
          <div className="hero-stat-card p-4 text-center">
            <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
              <i className="bi bi-database-check fs-2" style={{ color: '#06b6d4' }}></i>
              <p className="mb-0 fs-2 fw-extrabold text-white">500+</p>
            </div>
            <p className="mb-0 text-muted small text-uppercase tracking-wider fw-semibold">
              Questions • Quizzes • Reference Roadmaps
            </p>
            <hr className="border-white border-opacity-10 my-3" />
            <div className="row g-3 text-start small">
              <div className="col-6 d-flex align-items-center gap-2 text-muted">
                <i className="bi bi-patch-check-fill text-success fs-5"></i>
                <span>DSA Quizzes</span>
              </div>
              <div className="col-6 d-flex align-items-center gap-2 text-muted">
                <i className="bi bi-patch-check-fill text-success fs-5"></i>
                <span>System Design</span>
              </div>
              <div className="col-6 d-flex align-items-center gap-2 text-muted">
                <i className="bi bi-patch-check-fill text-success fs-5"></i>
                <span>DBMS & OS Prep</span>
              </div>
              <div className="col-6 d-flex align-items-center gap-2 text-muted">
                <i className="bi bi-patch-check-fill text-success fs-5"></i>
                <span>Interactive IDE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
