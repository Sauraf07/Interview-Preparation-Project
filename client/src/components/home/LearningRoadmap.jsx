import { Link } from 'react-router-dom';

const getMaterialStyle = (type) => {
  switch (type?.toLowerCase()) {
    case 'pdf':
      return { icon: 'bi-file-earmark-pdf-fill', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.08)' };
    case 'video':
      return { icon: 'bi-play-btn-fill', color: '#10b981', bg: 'rgba(16, 185, 129, 0.08)' };
    case 'cheatsheet':
      return { icon: 'bi-file-earmark-code-fill', color: '#d946ef', bg: 'rgba(217, 70, 239, 0.08)' };
    default:
      return { icon: 'bi-file-earmark-text-fill', color: '#818cf8', bg: 'rgba(129, 140, 248, 0.08)' };
  }
};

const LearningRoadmap = ({ roadmap = [], materials = [] }) => (
  <section className="py-5" style={{ background: 'rgba(9, 13, 22, 0.25)' }}>
    <div className="container-fluid px-3 px-lg-5">
      <div className="row g-5">
        
        {/* Left Column: Learning Roadmap Steps */}
        <div className="col-lg-6">
          <div className="mb-4">
            <h2 className="section-title mb-1 text-white fw-extrabold">
              <i className="bi bi-map text-primary me-2"></i>Preparation Roadmap
            </h2>
            <p className="text-muted mb-0">Follow this step-by-step master roadmap to structure your efforts</p>
          </div>
          
          <div className="timeline-path mt-4 ms-2">
            {roadmap.map((step) => (
              <div key={step.step} className="timeline-node">
                <span className="timeline-indicator">
                  {step.step}
                </span>
                <div className="timeline-content-card">
                  <h6 className="mb-1 text-white fw-bold fs-6">{step.title}</h6>
                  <p className="mb-0 small text-muted lh-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Column: Curated Study Materials */}
        <div className="col-lg-6">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="section-title mb-1 text-white fw-extrabold">
                <i className="bi bi-bookmark-star text-primary me-2"></i>Curated Study Assets
              </h2>
              <p className="text-muted mb-0">Syllabus, cheatsheets, and handbooks recommended by engineers</p>
            </div>
            <Link to="/learning" className="btn btn-outline-primary btn-sm px-3 d-inline-flex align-items-center gap-2">
              <span>View All</span>
              <i className="bi bi-chevron-right small"></i>
            </Link>
          </div>
          
          <div className="row g-3">
            {materials.slice(0, 4).map((m) => {
              const meta = getMaterialStyle(m.type);
              return (
                <div key={m.id || m._id} className="col-12 col-sm-6">
                  <div className="card-interactive h-100 d-flex flex-column border-0">
                    <div className="card-body p-3 d-flex flex-column h-100">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <span 
                          className="fs-4 p-2 rounded d-flex align-items-center justify-content-center"
                          style={{ width: '40px', height: '40px', backgroundColor: meta.bg, color: meta.color }}
                        >
                          <i className={`bi ${meta.icon}`}></i>
                        </span>
                        <span 
                          className="badge border text-capitalize"
                          style={{ borderColor: `${meta.color}30`, color: meta.color, backgroundColor: `${meta.color}08` }}
                        >
                          {m.type}
                        </span>
                      </div>
                      <p className="small mb-3 fw-bold text-white text-truncate-2 lh-base flex-grow-1" style={{ minHeight: '38px' }}>
                        {m.title}
                      </p>
                      
                      <div className="mt-auto pt-2 border-top border-white border-opacity-5 d-flex align-items-center justify-content-between">
                        <span className="badge bg-white bg-opacity-5 text-white-50 border border-white border-opacity-5 text-uppercase">
                          {m.category || 'General'}
                        </span>
                        
                        {m.link ? (
                          <a 
                            href={m.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-primary small fw-semibold text-decoration-none d-inline-flex align-items-center gap-1 quiz-play-link"
                          >
                            <span>Open</span>
                            <i className="bi bi-box-arrow-up-right small"></i>
                          </a>
                        ) : (
                          <Link 
                            to="/learning" 
                            className="text-primary small fw-semibold text-decoration-none d-inline-flex align-items-center gap-1 quiz-play-link"
                          >
                            <span>View</span>
                            <i className="bi bi-chevron-right small"></i>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {materials.length === 0 && (
              <div className="col-12 text-center py-5 glass-card border border-white border-opacity-5 rounded-4">
                <i className="bi bi-journal-x fs-1 text-muted mb-2 d-block"></i>
                <p className="text-muted mb-0">Study resources are loading. Please wait a moment...</p>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  </section>
);

export default LearningRoadmap;
