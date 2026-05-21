import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { toast } from 'react-toastify';
import api from '../api/axios';

const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
];

const CodingProblem = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    api.get(`/coding/${id}`).then((res) => {
      const p = res.data.data.problem;
      setProblem(p);
      setCode(p.starterCode?.javascript || '');
    });
  }, [id]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    if (problem?.starterCode?.[lang]) setCode(problem.starterCode[lang]);
  };

  const handleRun = async () => {
    setRunning(true);
    setOutput('');
    try {
      const { data } = await api.post('/coding/run', { sourceCode: code, language, stdin });
      const result = data.data;
      setOutput(
        result.demo
          ? result.stdout
          : `Status: ${result.status}\n\nstdout:\n${result.stdout || '(empty)'}\n\nstderr:\n${result.stderr || '(empty)'}`
      );
    } catch (err) {
      toast.error(err.response?.data?.message || 'Run failed');
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    setRunning(true);
    setTestResults(null);
    try {
      const { data } = await api.post(`/coding/${id}/submit`, { sourceCode: code, language });
      setTestResults(data.data);
      if (data.data.allPassed) toast.success('All test cases passed!');
      else toast.warning('Some test cases failed');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submit failed');
    } finally {
      setRunning(false);
    }
  };

  if (!problem) {
    return <main className="container py-5 text-center"><span className="spinner-border" /></main>;
  }

  return (
    <main className="container-fluid py-3">
      <Link to="/coding" className="btn btn-link">&larr; All problems</Link>
      <header className="row mb-3">
        <section className="col-lg-4">
          <h4>{problem.title}</h4>
          <p className="text-muted small">{problem.description}</p>
          <span className="badge bg-primary">{problem.difficulty}</span>
        </section>
        <section className="col-lg-8 d-flex gap-2 align-items-start justify-content-lg-end flex-wrap">
          <select className="form-select w-auto" value={language} onChange={handleLanguageChange}>
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
          <button type="button" className="btn btn-secondary" onClick={handleRun} disabled={running}>
            Run
          </button>
          <button type="button" className="btn btn-success" onClick={handleSubmit} disabled={running}>
            Submit
          </button>
        </section>
      </header>

      <section className="row g-3">
        <section className="col-lg-7">
          <Editor height="400px" language={language} value={code} onChange={(v) => setCode(v || '')} theme="vs-dark" />
        </section>
        <section className="col-lg-5">
          <label className="form-label small">Custom Input (stdin)</label>
          <textarea className="form-control mb-2 font-monospace" rows={4} value={stdin} onChange={(e) => setStdin(e.target.value)} />
          <label className="form-label small">Output Console</label>
          <pre className="bg-dark text-light p-3 rounded small" style={{ minHeight: 120, maxHeight: 200, overflow: 'auto' }}>
            {output || 'Run your code to see output...'}
          </pre>
          {testResults && (
            <section className="mt-3">
              <h6>Test Cases {testResults.allPassed ? '✓' : '✗'}</h6>
              {testResults.message && <p className="text-warning small">{testResults.message}</p>}
              <ul className="list-group list-group-flush small">
                {testResults.results?.map((r, i) => (
                  <li key={i} className={`list-group-item ${r.passed ? 'list-group-item-success' : 'list-group-item-danger'}`}>
                    Case {i + 1}: {r.passed ? 'Passed' : 'Failed'} — {r.status}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>
      </section>
    </main>
  );
};

export default CodingProblem;
