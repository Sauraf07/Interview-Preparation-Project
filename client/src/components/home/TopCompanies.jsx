import { Link } from 'react-router-dom';

const companyBrands = {
  google: { color: '#f43f5e', rgb: '244, 63, 94', icon: 'bi-google', class: 'company-card-google' },
  amazon: { color: '#f59e0b', rgb: '245, 158, 11', icon: 'bi-amazon', class: 'company-card-amazon' },
  microsoft: { color: '#06b6d4', rgb: '6, 182, 212', icon: 'bi-microsoft', class: 'company-card-microsoft' },
  infosys: { color: '#6366f1', rgb: '99, 102, 241', icon: 'bi-cpu', class: 'company-card-infosys' },
  tcs: { color: '#38bdf8', rgb: '56, 189, 248', icon: 'bi-gear-wide-connected', class: 'company-card-tcs' },
};

const TopCompanies = ({ companies = [] }) => (
  <section className="py-5">
    <div className="container-fluid px-3 px-lg-5">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="section-title mb-1 text-white fw-extrabold">
            <i className="bi bi-building-check text-primary me-2"></i>Top Target Companies
          </h2>
          <p className="text-muted mb-0">Explore company-specific guides, interview structures, and curated questions</p>
        </div>
      </div>
      <div className="row g-4">
        {companies.map((company) => {
          const brand = companyBrands[company.slug] || { 
            color: 'var(--primary)', 
            rgb: '99, 102, 241', 
            icon: 'bi-building', 
            class: '' 
          };
          return (
            <div key={company.slug} className="col-12 col-sm-6 col-md-4 col-lg">
              <Link
                to={`/companies/${company.slug}`}
                className={`card-interactive h-100 text-decoration-none d-block ${brand.class}`}
              >
                <div className="card-body text-center p-4">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <span 
                      className="fs-3 d-flex align-items-center justify-content-center rounded-circle"
                      style={{ 
                        width: '60px', 
                        height: '60px', 
                        background: `rgba(${brand.rgb}, 0.08)`, 
                        border: `1px solid rgba(${brand.rgb}, 0.2)`,
                        color: brand.color
                      }}
                    >
                      <i className={`bi ${brand.icon}`}></i>
                    </span>
                  </div>
                  <h6 className="card-title text-white fw-bold mb-1 fs-5">{company.name}</h6>
                  <p className="card-text small text-muted mb-0 lh-base" style={{ fontSize: '0.85rem' }}>{company.tagline}</p>
                </div>
              </Link>
            </div>
          );
        })}
        {companies.length === 0 && (
          <div className="col-12 text-center py-5 glass-card border border-white border-opacity-5 rounded-4">
            <i className="bi bi-building-exclamation fs-1 text-muted mb-2 d-block"></i>
            <p className="text-muted mb-0">Company guides are loading. Please wait a moment...</p>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default TopCompanies;
