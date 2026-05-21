import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const links = [
    { to: '/quizzes', label: 'Take a Quiz', desc: 'Test DSA, DBMS, OS, JS and more with timers', icon: '🎯' },
    { to: '/questions', label: 'Practice Questions', desc: 'Browse by category, difficulty, and tags', icon: '📋' },
    { to: '/coding', label: 'Coding Practice', desc: 'Solve problems in the Monaco editor', icon: '💻' },
    { to: '/learning', label: 'Learning Materials', desc: 'PDFs, notes, videos, cheat sheets', icon: '📚' },
    { to: '/companies/google', label: 'Company Prep', desc: 'Google, Amazon, TCS, and more', icon: '🏢' },
  ];

  return (
    <main className="container py-5">
      <header className="mb-4">
        <h2 className="section-title">Dashboard</h2>
        <p className="text-muted mb-0">Welcome, {user?.name} <span className="badge bg-primary">{user?.role}</span></p>
      </header>
      <section className="row g-3">
        {links.map((l) => (
          <article key={l.to} className="col-md-6">
            <Link to={l.to} className="card-interactive h-100 text-decoration-none d-block">
              <section className="card-body">
                <span className="fs-3 d-block mb-2">{l.icon}</span>
                <h5 className="text-dark">{l.label}</h5>
                <p className="text-muted small mb-0">{l.desc}</p>
              </section>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Dashboard;
