import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axios';

const emptyQuestion = {
  title: '',
  description: '',
  category: 'technical',
  difficulty: 'easy',
  tags: '',
  company: '',
  answer: '',
};

const emptyMaterial = {
  title: '',
  description: '',
  type: 'notes',
  link: '',
  fileUrl: '',
  category: 'general',
};

const AdminDashboard = () => {
  const [tab, setTab] = useState('stats');
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [questionForm, setQuestionForm] = useState(emptyQuestion);
  const [materialForm, setMaterialForm] = useState(emptyMaterial);
  const [uploadFile, setUploadFile] = useState(null);

  const loadStats = () => api.get('/admin/stats').then((r) => setStats(r.data.data));
  const loadUsers = () => api.get('/admin/users').then((r) => setUsers(r.data.data.users));
  const loadQuestions = () => api.get('/admin/questions').then((r) => setQuestions(r.data.data.questions));
  const loadMaterials = () => api.get('/materials').then((r) => setMaterials(r.data.data.materials));

  useEffect(() => {
    loadStats();
    loadUsers();
    loadQuestions();
    loadMaterials();
  }, []);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await api.post('/questions', {
        ...questionForm,
        tags: questionForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
      });
      toast.success('Question added');
      setQuestionForm(emptyQuestion);
      loadQuestions();
      loadStats();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    await api.delete(`/questions/${id}`);
    toast.success('Deleted');
    loadQuestions();
    loadStats();
  };

  const handleUploadFile = async () => {
    if (!uploadFile) return toast.error('Select a file');
    const formData = new FormData();
    formData.append('file', uploadFile);
    try {
      const { data } = await api.post('/materials/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMaterialForm((prev) => ({
        ...prev,
        fileUrl: data.data.fileUrl,
      }));
      toast.success('File uploaded to Cloudinary');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    }
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    try {
      await api.post('/materials', materialForm);
      toast.success('Material added');
      setMaterialForm(emptyMaterial);
      setUploadFile(null);
      loadMaterials();
      loadStats();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const handleDeleteMaterial = async (id) => {
    if (!window.confirm('Delete material?')) return;
    await api.delete(`/materials/${id}`);
    toast.success('Deleted');
    loadMaterials();
    loadStats();
  };

  const handleRoleChange = async (userId, role) => {
    await api.patch(`/admin/users/${userId}/role`, { role });
    toast.success('Role updated');
    loadUsers();
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete user?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success('User deleted');
      loadUsers();
      loadStats();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const tabs = [
    { id: 'stats', label: 'Overview' },
    { id: 'questions', label: 'Questions' },
    { id: 'materials', label: 'Materials' },
    { id: 'users', label: 'Users' },
  ];

  return (
    <main className="container py-4">
      <h2 className="mb-4">Admin Panel</h2>

      <ul className="nav nav-tabs mb-4">
        {tabs.map((t) => (
          <li key={t.id} className="nav-item">
            <button type="button" className={`nav-link ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          </li>
        ))}
      </ul>

      {tab === 'stats' && (
        <section className="row g-3">
          {[
            { label: 'Users', value: stats.users },
            { label: 'Questions', value: stats.questions },
            { label: 'Materials', value: stats.materials },
            { label: 'Coding Problems', value: stats.codingProblems },
          ].map((s) => (
            <article key={s.label} className="col-6 col-md-3">
              <section className="card text-center border-0 shadow-sm">
                <section className="card-body">
                  <h3 className="text-primary">{s.value ?? 0}</h3>
                  <p className="mb-0 text-muted">{s.label}</p>
                </section>
              </section>
            </article>
          ))}
        </section>
      )}

      {tab === 'questions' && (
        <section className="row g-4">
          <article className="col-lg-5">
            <section className="card border-0 shadow-sm">
              <section className="card-header">Add Question</section>
              <section className="card-body">
                <form onSubmit={handleAddQuestion}>
                  <input className="form-control mb-2" placeholder="Title" value={questionForm.title} onChange={(e) => setQuestionForm({ ...questionForm, title: e.target.value })} required />
                  <textarea className="form-control mb-2" placeholder="Description" rows={3} value={questionForm.description} onChange={(e) => setQuestionForm({ ...questionForm, description: e.target.value })} required />
                  <select className="form-select mb-2" value={questionForm.category} onChange={(e) => setQuestionForm({ ...questionForm, category: e.target.value })}>
                    {['technical', 'hr', 'behavioral', 'system-design', 'aptitude', 'coding'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                  <select className="form-select mb-2" value={questionForm.difficulty} onChange={(e) => setQuestionForm({ ...questionForm, difficulty: e.target.value })}>
                    {['easy', 'medium', 'hard'].map((d) => <option key={d}>{d}</option>)}
                  </select>
                  <input className="form-control mb-2" placeholder="Tags (comma separated)" value={questionForm.tags} onChange={(e) => setQuestionForm({ ...questionForm, tags: e.target.value })} />
                  <input className="form-control mb-2" placeholder="Company (optional)" value={questionForm.company} onChange={(e) => setQuestionForm({ ...questionForm, company: e.target.value })} />
                  <textarea className="form-control mb-2" placeholder="Answer (optional)" rows={2} value={questionForm.answer} onChange={(e) => setQuestionForm({ ...questionForm, answer: e.target.value })} />
                  <button type="submit" className="btn btn-primary w-100">Add Question</button>
                </form>
              </section>
            </section>
          </article>
          <article className="col-lg-7">
            <section className="card border-0 shadow-sm">
              <section className="card-header">All Questions</section>
              <ul className="list-group list-group-flush" style={{ maxHeight: 400, overflow: 'auto' }}>
                {questions.map((q) => (
                  <li key={q.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{q.title} <small className="text-muted">({q.difficulty})</small></span>
                    <button type="button" className="btn btn-sm btn-danger" onClick={() => handleDeleteQuestion(q.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </section>
      )}

      {tab === 'materials' && (
        <section className="row g-4">
          <article className="col-lg-5">
            <section className="card border-0 shadow-sm">
              <section className="card-header">Upload Material</section>
              <section className="card-body">
                <form onSubmit={handleAddMaterial}>
                  <input className="form-control mb-2" placeholder="Title" value={materialForm.title} onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })} required />
                  <textarea className="form-control mb-2" placeholder="Description" value={materialForm.description} onChange={(e) => setMaterialForm({ ...materialForm, description: e.target.value })} />
                  <select className="form-select mb-2" value={materialForm.type} onChange={(e) => setMaterialForm({ ...materialForm, type: e.target.value })}>
                    {['pdf', 'notes', 'video', 'cheatsheet'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <input className="form-control mb-2" placeholder="External link (optional)" value={materialForm.link} onChange={(e) => setMaterialForm({ ...materialForm, link: e.target.value })} />
                  <input type="file" className="form-control mb-2" onChange={(e) => setUploadFile(e.target.files[0])} />
                  <button type="button" className="btn btn-outline-secondary btn-sm mb-2" onClick={handleUploadFile}>Upload to Cloudinary</button>
                  {materialForm.fileUrl && <p className="small text-success">File URL set</p>}
                  <button type="submit" className="btn btn-primary w-100">Save Material</button>
                </form>
              </section>
            </section>
          </article>
          <article className="col-lg-7">
            <ul className="list-group">
              {materials.map((m) => (
                <li key={m.id} className="list-group-item d-flex justify-content-between">
                  <span>{m.title} ({m.type})</span>
                  <button type="button" className="btn btn-sm btn-danger" onClick={() => handleDeleteMaterial(m.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}

      {tab === 'users' && (
        <table className="table table-striped bg-white shadow-sm">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <select className="form-select form-select-sm w-auto" value={u.role} onChange={(e) => handleRoleChange(u.id, e.target.value)}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td>
                  <button type="button" className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default AdminDashboard;
