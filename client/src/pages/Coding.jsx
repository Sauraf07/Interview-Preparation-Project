import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Coding = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    api.get('/coding').then((res) => setProblems(res.data.data.problems));
  }, []);

  return (
    <main className="container py-4">
      <h2 className="mb-4">Coding Problems</h2>
      <table className="table table-hover bg-white shadow-sm rounded">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Tags</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td><span className="badge bg-primary">{p.difficulty}</span></td>
              <td>{p.tags?.join(', ')}</td>
              <td>
                <Link to={`/coding/${p.id}`} className="btn btn-sm btn-success">Solve</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Coding;
