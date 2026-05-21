const axios = require('axios');

const LANGUAGE_IDS = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
};

const getJudge0Client = () => {
  const baseURL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
  const headers = { 'Content-Type': 'application/json' };

  if (process.env.JUDGE0_API_KEY) {
    headers['X-RapidAPI-Key'] = process.env.JUDGE0_API_KEY;
    headers['X-RapidAPI-Host'] = process.env.JUDGE0_RAPIDAPI_HOST || 'judge0-ce.p.rapidapi.com';
  }

  return axios.create({ baseURL, headers, timeout: 30000 });
};

const submitCode = async ({ sourceCode, language, stdin = '' }) => {
  const client = getJudge0Client();
  const languageId = LANGUAGE_IDS[language] || LANGUAGE_IDS.javascript;

  const { data: submission } = await client.post('/submissions?base64_encoded=false&wait=true', {
    source_code: sourceCode,
    language_id: languageId,
    stdin,
  });

  return {
    stdout: submission.stdout || '',
    stderr: submission.stderr || '',
    status: submission.status?.description || 'Unknown',
    time: submission.time,
    memory: submission.memory,
  };
};

const runTestCases = async ({ sourceCode, language, testCases }) => {
  const results = [];

  for (const testCase of testCases) {
    const result = await submitCode({
      sourceCode,
      language,
      stdin: testCase.input,
    });

    const actual = (result.stdout || '').trim();
    const expected = (testCase.expectedOutput || '').trim();
    const passed = actual === expected && !result.stderr;

    results.push({
      input: testCase.isHidden ? '[hidden]' : testCase.input,
      expectedOutput: testCase.isHidden ? '[hidden]' : expected,
      actualOutput: testCase.isHidden ? '[hidden]' : actual,
      passed,
      status: result.status,
      stderr: result.stderr,
    });
  }

  return {
    allPassed: results.every((r) => r.passed),
    results,
  };
};

module.exports = { submitCode, runTestCases, LANGUAGE_IDS };
