import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/axios';

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    api.get(`/questions/${id}`).then((res) => setQuestion(res.data.data.question));
  }, [id]);

  if (!question) {
    return <main className="container py-5 text-center"><span className="spinner-border" /></main>;
  }

  return (
    <main className="container py-4">
      <Link to="/questions" className="btn btn-link ps-0">&larr; Back</Link>
      <article className="card border-0 shadow-sm">
        <section className="card-body p-4">
          <span className="badge bg-secondary me-1">{question.category}</span>
          <span className="badge bg-primary">{question.difficulty}</span>
          <h2 className="mt-3">{question.title}</h2>
          <p className="text-muted">{question.description}</p>
          <section className="mb-3">
            {question.tags?.map((tag) => (
              <span key={tag} className="badge bg-light text-dark border me-1">{tag}</span>
            ))}
          </section>
          {question.answer && (
            <>
              <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setShowAnswer(!showAnswer)}>
                {showAnswer ? 'Hide answer' : 'Show answer'}
              </button>
              {showAnswer && <p className="mt-3 p-3 bg-light rounded">{question.answer}</p>}
            </>
          )}
        </section>
      </article>
    </main>
  );
};

export default QuestionDetail;
