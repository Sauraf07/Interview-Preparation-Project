import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-app sticky-top shadow-sm">
      <div className="container-fluid px-3 px-lg-5">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <i className="bi bi-terminal-fill fs-3" style={{ background: 'linear-gradient(90deg, #818cf8, #d946ef)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}></i>
          <span className="brand-gradient-text fs-4">InterviewPrep</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: 'none', background: 'transparent' }}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3 gap-1">
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/" end>
                <i className="bi bi-house-door me-2"></i>Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/quizzes">
                <i className="bi bi-patch-question me-2"></i>Quizzes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/questions">
                <i className="bi bi-chat-left-text me-2"></i>Questions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/coding">
                <i className="bi bi-code-slash me-2"></i>Coding
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/learning">
                <i className="bi bi-journal-bookmark me-2"></i>Learning
              </NavLink>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink className="nav-link d-flex align-items-center" to="/dashboard">
                  <i className="bi bi-speedometer2 me-2"></i>Dashboard
                </NavLink>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link d-flex align-items-center" to="/admin">
                  <i className="bi bi-shield-lock me-2"></i>Admin
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto gap-2">
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link d-flex align-items-center" to="/login">
                    <i className="bi bi-box-arrow-in-right me-2"></i>Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link btn btn-primary px-4 d-flex align-items-center justify-content-center text-white" to="/register">
                    <i className="bi bi-person-plus-fill me-2"></i>Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item d-flex align-items-center">
                  <span className="navbar-text text-light me-3 d-flex align-items-center">
                    <i className="bi bi-person-circle me-2 text-primary fs-5"></i>
                    Hi, <strong className="text-white ms-1">{user?.name}</strong>
                  </span>
                </li>
                <li className="nav-item">
                  <button type="button" className="btn btn-outline-light btn-sm px-3 py-2 d-flex align-items-center" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
