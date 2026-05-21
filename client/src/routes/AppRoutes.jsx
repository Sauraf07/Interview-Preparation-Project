import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatBot from '../components/chatbot/ChatBot';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import AdminDashboard from '../pages/AdminDashboard';
import Questions from '../pages/Questions';
import QuestionDetail from '../pages/QuestionDetail';
import CompanyDetail from '../pages/CompanyDetail';
import Coding from '../pages/Coding';
import CodingProblem from '../pages/CodingProblem';
import Learning from '../pages/Learning';
import Quizzes from '../pages/Quizzes';
import QuizPlay from '../pages/QuizPlay';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

const AppRoutes = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/questions/:id" element={<QuestionDetail />} />
      <Route path="/companies/:slug" element={<CompanyDetail />} />
      <Route path="/learning" element={<Learning />} />
      <Route path="/quizzes" element={<Quizzes />} />
      <Route path="/quizzes/:slug" element={<QuizPlay />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coding" element={<Coding />} />
        <Route path="/coding/:id" element={<CodingProblem />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <ChatBot />
  </>
);

export default AppRoutes;
