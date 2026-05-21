import { Link } from 'react-router-dom';

const mockCodeSnippets = {
  'Two Sum': `function twoSum(nums, target) {
  const map = new Map();
  for(let i=0; i<nums.length; i++) {
    let diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
}`,
  'Reverse linked list': `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
  'LRU Cache': `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    // ...
  }
}`
};

const getSnippet = (title) => {
  return mockCodeSnippets[title] || `function solveProblem(input) {
  // Write your implementation here
  // Return solution
  return null;
}`;
};

const CodingPractice = ({ problems = [] }) => (
  <section className="py-5">
    <div className="container-fluid px-3 px-lg-5">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="section-title mb-1 text-white fw-extrabold">
            <i className="bi bi-code-slash text-primary me-2"></i>Interactive Coding Challenges
          </h2>
          <p className="text-muted mb-0">Write, compile, and run code directly in your browser with comprehensive test suite verification</p>
        </div>
        <Link to="/coding" className="btn btn-outline-primary d-inline-flex align-items-center gap-2">
          <i className="bi bi-terminal"></i>
          <span>Open Full Workspace</span>
        </Link>
      </div>
      <div className="row g-4">
        {problems.map((p) => {
          const codeText = getSnippet(p.title);
          const codeLines = codeText.split('\n');
          return (
            <div key={p.id || p._id} className="col-12 col-lg-6">
              <div className="card mock-ide-card h-100 d-flex flex-column border-0">
                {/* Mock IDE Window Header */}
                <div className="mock-ide-header">
                  <div className="d-flex align-items-center gap-3">
                    <div className="mock-ide-dots">
                      <span className="mock-ide-dot" style={{ backgroundColor: '#ff5f56' }}></span>
                      <span className="mock-ide-dot" style={{ backgroundColor: '#ffbd2e' }}></span>
                      <span className="mock-ide-dot" style={{ backgroundColor: '#27c93f' }}></span>
                    </div>
                    <span className="text-muted small d-inline-flex align-items-center gap-1 font-monospace">
                      <i className="bi bi-file-earmark-code text-primary"></i>
                      <span>solution.js</span>
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-10 rounded text-uppercase" style={{ fontSize: '0.7rem' }}>
                      {p.difficulty}
                    </span>
                  </div>
                </div>
                
                {/* Mock IDE Workspace */}
                <div className="mock-ide-editor flex-grow-1 font-monospace py-3">
                  {codeLines.map((line, idx) => (
                    <div key={idx} className="mock-ide-line py-0">
                      <span className="mock-ide-num">{idx + 1}</span>
                      <span className="mock-ide-code text-white-50" style={{ whiteSpace: 'pre' }}>
                        {line.startsWith('//') ? (
                          <span style={{ color: 'var(--text-dim)' }}>{line}</span>
                        ) : line.includes('function') || line.includes('class') || line.includes('let') || line.includes('const') || line.includes('return') ? (
                          <span style={{ color: '#d946ef' }}>{line}</span>
                        ) : (
                          line
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* IDE Footer Actions */}
                <div className="p-3 border-top border-white border-opacity-5 d-flex align-items-center justify-content-between" style={{ background: '#0a0e16' }}>
                  <div className="d-flex flex-wrap gap-1">
                    {p.tags?.slice(0, 2).map((t) => (
                      <span key={t} className="badge bg-white bg-opacity-5 text-white-50 border border-white border-opacity-5 small text-capitalize">
                        {t}
                      </span>
                    ))}
                    {(!p.tags || p.tags.length === 0) && (
                      <span className="badge bg-white bg-opacity-5 text-white-50 border border-white border-opacity-5 small text-uppercase">
                        Algorithm
                      </span>
                    )}
                  </div>
                  <Link to={`/coding/${p.id || p._id}`} className="btn btn-primary btn-sm px-3 d-inline-flex align-items-center gap-1">
                    <span>Solve Challenge</span>
                    <i className="bi bi-chevron-right small"></i>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        {problems.length === 0 && (
          <div className="col-12 text-center py-5 glass-card border border-white border-opacity-5 rounded-4">
            <i className="bi bi-code-square fs-1 text-muted mb-2 d-block"></i>
            <p className="text-muted mb-0">Coding problems are loading. Please wait a moment...</p>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default CodingPractice;
