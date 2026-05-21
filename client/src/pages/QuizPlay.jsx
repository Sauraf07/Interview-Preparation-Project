import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const QuizPlay = () => {
  const { slug } = useParams();
  const { isAuthenticated } = useAuth();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    api
      .get(`/quizzes/${slug}`)
      .then((res) => {
        const q = res.data.data.quiz;
        setQuiz(q);
        setAnswers(new Array(q.questions.length).fill(null));
        setTimeLeft(q.timePerQuestion || 45);
      })
      .catch(() => toast.error('Quiz not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  const submitQuiz = useCallback(
    async (finalAnswers) => {
      setSubmitting(true);
      const timeTaken = Math.round((Date.now() - startTime) / 1000);
      try {
        const { data } = await api.post(`/quizzes/${slug}/submit`, {
          answers: finalAnswers,
          timeTaken,
        });
        setResult(data.data);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Submit failed');
      } finally {
        setSubmitting(false);
      }
    },
    [slug, startTime],
  );

  const goNext = useCallback((skipCheck = false) => {
    const answerIndex = selected ?? -1;
    if (!skipCheck && selected === null) {
      toast.info('Select an answer first');
      return;
    }
    const nextAnswers = [...answers];
    nextAnswers[current] = answerIndex;
    setAnswers(nextAnswers);

    if (current + 1 >= quiz.questions.length) {
      submitQuiz(nextAnswers);
      return;
    }

    setCurrent((c) => c + 1);
    setSelected(nextAnswers[current + 1] ?? null);
    setTimeLeft(quiz.timePerQuestion || 45);
  }, [answers, current, quiz, selected, submitQuiz]);

  useEffect(() => {
    if (!started || result || !quiz) return undefined;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setTimeout(() => goNext(true), 0);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, current, result, quiz, goNext]);

  const handleStart = () => {
    setStarted(true);
    setStartTime(Date.now());
    setTimeLeft(quiz.timePerQuestion || 45);
  };

  if (loading) {
    return (
      <main className="page-loader">
        <div className="spinner-app" />
      </main>
    );
  }

  if (!quiz) {
    return (
      <main className="container py-5 text-center">
        <p>Quiz not found.</p>
        <Link to="/quizzes">Back to quizzes</Link>
      </main>
    );
  }

  if (result) {
    return (
      <main className="container-fluid px-3 px-lg-5 py-5 fade-in">
        <div className="row justify-content-center">
          <article className="col-lg-8">
            <div className="card border-0 shadow-lg p-4 p-md-5 text-center">
              <div className="score-svg-container mb-4">
                <svg width="160" height="160" viewBox="0 0 160 160">
                  <defs>
                    <linearGradient id="pass-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                    <linearGradient id="fail-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fb7185" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                  </defs>
                  <circle className="score-svg-bg" cx="80" cy="80" r="70" />
                  <circle
                    className={`score-svg-circle ${result.passed ? 'pass' : 'fail'}`}
                    cx="80"
                    cy="80"
                    r="70"
                    strokeDasharray="440"
                    strokeDashoffset={440 - (440 * result.percentage) / 100}
                  />
                </svg>
                <div className={`score-percentage ${result.passed ? 'pass' : 'fail'}`}>
                  {result.percentage}%
                </div>
              </div>
              <h2 className="section-title">{result.passed ? 'Great job!' : 'Keep practicing!'}</h2>
              <p className="text-muted mb-4">
                You scored {result.score} out of {result.total} on {result.quizTitle}
              </p>
              {!isAuthenticated && (
                <p className="small text-muted">Login to save your quiz history.</p>
              )}
              <div className="d-flex gap-2 justify-content-center flex-wrap">
                <Link to={`/quizzes/${slug}`} className="btn btn-primary btn-glow" onClick={() => window.location.reload()}>
                  Retry
                </Link>
                <Link to="/quizzes" className="btn btn-outline-secondary">
                  More Quizzes
                </Link>
              </div>
            </div>

            <section className="mt-4">
              <h4 className="section-title mb-3">Review Answers</h4>
              {result.results?.map((r, i) => (
                <div
                  key={r.questionId}
                  className={`card border-0 shadow-sm mb-3 ${r.correct ? 'border-start border-success border-4' : 'border-start border-danger border-4'}`}
                >
                  <div className="card-body">
                    <p className="fw-semibold mb-2 d-flex align-items-center justify-content-between flex-wrap gap-2">
                      <span>{i + 1}. {r.question}</span>
                      {r.selectedIndex < 0 ? (
                        <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">Skipped (Time Up)</span>
                      ) : r.correct ? (
                        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">✓ Correct</span>
                      ) : (
                        <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25">✗ Incorrect</span>
                      )}
                    </p>
                    
                    <div className="review-options-deck">
                      {r.options.map((opt, oIdx) => {
                        const isUserChoice = r.selectedIndex === oIdx;
                        const isCorrectChoice = r.correctIndex === oIdx;
                        
                        let itemClass = '';
                        if (isCorrectChoice) {
                          itemClass = 'correct-answer';
                        } else if (isUserChoice && !r.correct) {
                          itemClass = 'incorrect-choice';
                        }
                        
                        return (
                          <div key={oIdx} className={`review-option-item ${itemClass}`}>
                            <div className="review-radio-visual d-flex align-items-center justify-content-center">
                              {isCorrectChoice && <span className="text-white" style={{ fontSize: '9px' }}>✓</span>}
                              {isUserChoice && !r.correct && <span className="text-white" style={{ fontSize: '9px' }}>✗</span>}
                            </div>
                            <span className="fw-bold me-1" style={{ opacity: 0.8 }}>
                              {String.fromCharCode(65 + oIdx)}.
                            </span>
                            <span className="flex-grow-1">{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    {r.explanation && (
                      <div className="mt-3 p-3 rounded bg-info bg-opacity-5 border border-info border-opacity-10 text-info small d-flex gap-2 align-items-start">
                        <span className="fs-5 lh-1">💡</span>
                        <div>
                          <strong className="d-block mb-1">Explanation</strong>
                          {r.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </section>
          </article>
        </div>
      </main>
    );
  }

  if (!started) {
    return (
      <main className="container-fluid px-3 px-lg-5 py-5 fade-in">
        <div className="row justify-content-center">
          <article className="col-lg-7">
            <div className="card border-0 shadow-lg overflow-hidden">
              <div style={{ height: 6, background: quiz.color || '#6366f1' }} />
              <div className="card-body p-4 p-md-5 text-center">
                <span className="display-4">{quiz.icon}</span>
                <h1 className="section-title mt-3">{quiz.title}</h1>
                <p className="text-muted">{quiz.description}</p>
                <div className="d-flex justify-content-center gap-3 my-4 flex-wrap">
                  <span className="badge bg-primary bg-opacity-10 text-primary fs-6">
                    {quiz.questions.length} Questions
                  </span>
                  <span className="badge bg-secondary bg-opacity-10 text-secondary fs-6">
                    {quiz.difficulty}
                  </span>
                  <span className="badge bg-info bg-opacity-10 text-info fs-6">
                    {quiz.timePerQuestion}s per question
                  </span>
                </div>
                <button type="button" className="btn btn-primary btn-lg btn-glow px-5" onClick={handleStart}>
                  Start Quiz
                </button>
                <div className="mt-3">
                  <Link to="/quizzes" className="text-muted small">
                    ← Back to all quizzes
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
    );
  }

  const q = quiz.questions[current];
  const progress = ((current + 1) / quiz.questions.length) * 100;

  return (
    <main className="container-fluid px-3 px-lg-5 py-4 fade-in">
      <div className="row justify-content-center">
        <article className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-semibold text-muted">
              Question {current + 1} of {quiz.questions.length}
            </span>
            <span className={`timer-badge ${timeLeft <= 10 ? 'urgent' : ''}`}>
              ⏱ {timeLeft}s
            </span>
          </div>
          <div className="quiz-progress mb-4">
            <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
          </div>

          <div className="card border-0 shadow-lg p-4 p-md-5">
            <h3 className="section-title mb-4">{q.question}</h3>
            <div className="d-flex flex-column gap-3" role="radiogroup" aria-label="Quiz Options">
              {q.options.map((opt, idx) => (
                <label
                  key={idx}
                  className={`quiz-option-card ${selected === idx ? 'active' : ''} ${submitting ? 'disabled' : ''}`}
                >
                  <input
                    type="radio"
                    name={`question-${current}`}
                    value={idx}
                    checked={selected === idx}
                    onChange={() => !submitting && setSelected(idx)}
                    className="d-none"
                    disabled={submitting}
                  />
                  <div className="custom-radio-indicator">
                    <div className="radio-dot" />
                  </div>
                  <span className="fw-bold text-primary">{String.fromCharCode(65 + idx)}.</span>
                  <span className="flex-grow-1">{opt}</span>
                </label>
              ))}
            </div>
            <div className="d-flex justify-content-between mt-4 pt-3 border-top">
              <button
                type="button"
                className="btn btn-outline-secondary"
                disabled={current === 0 || submitting}
                onClick={() => {
                  if (current > 0) {
                    setCurrent((c) => c - 1);
                    setSelected(answers[current - 1]);
                    setTimeLeft(quiz.timePerQuestion || 45);
                  }
                }}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn btn-primary btn-glow px-4"
                onClick={goNext}
                disabled={submitting}
              >
                {submitting
                  ? 'Submitting...'
                  : current + 1 >= quiz.questions.length
                    ? 'Finish'
                    : 'Next'}
              </button>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};

export default QuizPlay;
