const Company = require("../models/Company");
const Question = require("../models/Question");
const CodingProblem = require("../models/CodingProblem");
const LearningMaterial = require("../models/LearningMaterial");

const companies = [
  {
    slug: "google",
    name: "Google",
    tagline: "Focus on algorithms, system design, and Googleyness",
    interviewProcess: [
      "Online assessment (coding + MCQs)",
      "Phone screen with a Google engineer",
      "On-site: 4-5 technical rounds",
      "Hiring committee review",
    ],
    questions: [
      {
        title: "Tell me about a challenging project",
        description: "Behavioral — impact and trade-offs",
        difficulty: "medium",
      },
      {
        title: "Design Google Search autocomplete",
        description: "System design at scale",
        difficulty: "hard",
      },
    ],
    codingProblems: [
      {
        title: "Two Sum variant",
        description: "Array + hash map",
        difficulty: "medium",
      },
      {
        title: "Word Ladder",
        description: "BFS on graph of words",
        difficulty: "hard",
      },
    ],
    roadmap: [
      {
        step: 1,
        title: "DSA fundamentals",
        description: "Arrays, trees, graphs, DP",
      },
      {
        step: 2,
        title: "System design",
        description: "Scalability, caching, sharding",
      },
      {
        step: 3,
        title: "Googleyness prep",
        description: "Leadership principles & teamwork stories",
      },
    ],
    resources: [
      {
        title: "Google Interview Guide",
        url: "https://careers.google.com/",
        type: "doc",
      },
    ],
  },
  {
    slug: "amazon",
    name: "Amazon",
    tagline: "Leadership Principles drive every round",
    interviewProcess: [
      "Online assessment",
      "Phone screen",
      "Loop: 4-5 interviews (LP + technical)",
      "Bar raiser round",
    ],
    questions: [
      {
        title: "Tell me about a time you disagreed with your manager",
        description: "LP: Have Backbone; Disagree and Commit",
        difficulty: "medium",
      },
      {
        title: "Design Amazon order tracking",
        description: "Distributed systems",
        difficulty: "hard",
      },
    ],
    codingProblems: [
      {
        title: "Reorder data in log files",
        description: "Sorting + strings",
        difficulty: "medium",
      },
      {
        title: "Number of islands",
        description: "DFS/BFS grid",
        difficulty: "medium",
      },
    ],
    roadmap: [
      {
        step: 1,
        title: "Memorize 16 LPs",
        description: "STAR format stories for each",
      },
      {
        step: 2,
        title: "OA practice",
        description: "CodeSignal-style problems",
      },
      {
        step: 3,
        title: "System design",
        description: "Retail & AWS scenarios",
      },
    ],
    resources: [
      {
        title: "Amazon Leadership Principles",
        url: "https://www.amazon.jobs/content/en/our-workplace/leadership-principles",
        type: "doc",
      },
    ],
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    tagline: "Balanced coding, design, and collaboration",
    interviewProcess: [
      "Recruiter screen",
      "Technical phone screen",
      "On-site loop (4 rounds)",
      "Team match & offer",
    ],
    questions: [
      {
        title: "Explain a project where you improved performance",
        description: "Technical depth + metrics",
        difficulty: "medium",
      },
      {
        title: "Design OneDrive file sync",
        description: "Consistency and conflict resolution",
        difficulty: "hard",
      },
    ],
    codingProblems: [
      {
        title: "Reverse linked list",
        description: "Pointer manipulation",
        difficulty: "easy",
      },
      {
        title: "LRU Cache",
        description: "Hash map + doubly linked list",
        difficulty: "medium",
      },
    ],
    roadmap: [
      {
        step: 1,
        title: "Core DSA",
        description: "Focus on clarity and communication",
      },
      { step: 2, title: "OOP & design", description: "C#/.NET if applicable" },
      { step: 3, title: "Behavioral", description: "Growth mindset stories" },
    ],
    resources: [
      {
        title: "Microsoft Careers",
        url: "https://careers.microsoft.com/",
        type: "doc",
      },
    ],
  },
  {
    slug: "infosys",
    name: "Infosys",
    tagline: "Aptitude, technical basics, and communication",
    interviewProcess: [
      "Online aptitude test",
      "Technical interview",
      "HR interview",
    ],
    questions: [
      {
        title: "Explain OOP concepts",
        description: "Encapsulation, inheritance, polymorphism",
        difficulty: "easy",
      },
      {
        title: "Difference between SQL and NoSQL",
        description: "Database fundamentals",
        difficulty: "medium",
      },
    ],
    codingProblems: [
      {
        title: "Find factorial",
        description: "Loops / recursion",
        difficulty: "easy",
      },
      {
        title: "Check palindrome string",
        description: "Two-pointer approach",
        difficulty: "easy",
      },
    ],
    roadmap: [
      {
        step: 1,
        title: "Aptitude",
        description: "Quant, logical reasoning, verbal",
      },
      { step: 2, title: "Core CS", description: "DBMS, OS, networks" },
      {
        step: 3,
        title: "Basic coding",
        description: "Java/Python fundamentals",
      },
    ],
    resources: [
      {
        title: "Infosys Careers",
        url: "https://www.infosys.com/careers/",
        type: "doc",
      },
    ],
  },
  {
    slug: "tcs",
    name: "Tata Consultancy Services",
    tagline: "NQT, technical, and HR rounds",
    interviewProcess: [
      "TCS NQT / National Qualifier Test",
      "Technical interview",
      "Managerial / HR round",
    ],
    questions: [
      {
        title: "What is a deadlock?",
        description: "OS concepts",
        difficulty: "medium",
      },
      {
        title: "Explain your final year project",
        description: "Project deep-dive",
        difficulty: "medium",
      },
    ],
    codingProblems: [
      {
        title: "Armstrong number check",
        description: "Number theory basics",
        difficulty: "easy",
      },
      {
        title: "Array rotation",
        description: "Array manipulation",
        difficulty: "medium",
      },
    ],
    roadmap: [
      {
        step: 1,
        title: "NQT prep",
        description: "Aptitude + programming logic",
      },
      {
        step: 2,
        title: "Technical subjects",
        description: "C, Java, DBMS, CN",
      },
      {
        step: 3,
        title: "HR readiness",
        description: "Communication & confidence",
      },
    ],
    resources: [
      { title: "TCS Careers", url: "https://www.tcs.com/careers", type: "doc" },
    ],
  },
];

const sampleQuestions = [
  {
    title: "Explain REST vs GraphQL",
    description: "Compare API design approaches, trade-offs, and use cases.",
    category: "technical",
    difficulty: "medium",
    tags: ["api", "web", "backend"],
    company: "general",
  },
  {
    title: "What is your greatest strength?",
    description: "HR question — align strength with role requirements.",
    category: "hr",
    difficulty: "easy",
    tags: ["hr", "behavioral"],
    company: "general",
  },
  {
    title: "Design a URL shortener",
    description: "System design: hashing, storage, redirects, analytics.",
    category: "system-design",
    difficulty: "hard",
    tags: ["system-design", "scalability"],
    company: "general",
  },
  {
    title: "Reverse a binary tree",
    description: "Classic tree recursion problem.",
    category: "coding",
    difficulty: "easy",
    tags: ["trees", "recursion", "dsa"],
    company: "general",
  },
];

const sampleCodingProblems = [
  {
    title: "Two Sum",
    description:
      "Given an array of integers and a target, return indices of two numbers that add up to target.",
    difficulty: "easy",
    tags: ["array", "hash-map"],
    testCases: [
      { input: "4 2 7 11 15\n9", expectedOutput: "0 1", isHidden: false },
      { input: "3 2 4\n6", expectedOutput: "1 2", isHidden: true },
    ],
    starterCode: {
      javascript: "function twoSum(nums, target) {\n  // your code\n}\n",
      python: "def two_sum(nums, target):\n    pass\n",
      java: "class Solution {\n  public int[] twoSum(int[] nums, int target) {\n    return new int[]{};\n  }\n}\n",
    },
  },
];

const learningMaterials = [
  {
    title: "NeetCode Roadmap",
    description: "Structured DSA roadmap for interview prep",
    type: "notes",
    link: "https://neetcode.io/roadmap",
    category: "dsa",
  },
  {
    title: "Open Data Structures",
    description: "Free textbook for core data structures",
    type: "pdf",
    link: "https://opendatastructures.org/",
    category: "dsa",
  },
  {
    title: "Princeton Algorithms Cheatsheet",
    description: "Algorithm complexity and patterns reference",
    type: "cheatsheet",
    link: "https://algs4.cs.princeton.edu/cheatsheet/",
    category: "dsa",
  },
  {
    title: "GeeksforGeeks DSA Self-Paced Syllabus",
    description: "Topic-wise DSA planning checklist",
    type: "notes",
    link: "https://www.geeksforgeeks.org/dsa-tutorial-learn-data-structures-and-algorithms/",
    category: "dsa",
  },
  {
    title: "CP Algorithms",
    description: "Advanced algorithms and data structures notes",
    type: "notes",
    link: "https://cp-algorithms.com/",
    category: "dsa",
  },
  {
    title: "LeetCode Interview Guide",
    description: "LeetCode interview preparation resources",
    type: "notes",
    link: "https://leetcode.com/explore/interview/",
    category: "dsa",
  },
  {
    title: "Tech Interview Handbook",
    description: "Curated coding interview prep handbook",
    type: "notes",
    link: "https://www.techinterviewhandbook.org/",
    category: "dsa",
  },
  {
    title: "NeetCode YouTube",
    description: "Video explanations of popular interview problems",
    type: "video",
    link: "https://www.youtube.com/@NeetCode",
    category: "dsa",
  },
  {
    title: "Abdul Bari Algorithms Playlist",
    description: "Clear algorithm explanations with intuition",
    type: "video",
    link: "https://www.youtube.com/@abdul_bari",
    category: "dsa",
  },
  {
    title: "Take U Forward (Striver)",
    description: "A2Z DSA sheet and coding interview videos",
    type: "video",
    link: "https://www.youtube.com/@takeUforward",
    category: "dsa",
  },

  {
    title: "System Design Primer",
    description: "Most popular GitHub system design notes",
    type: "notes",
    link: "https://github.com/donnemartin/system-design-primer",
    category: "system-design",
  },
  {
    title: "System Design Handbook",
    description: "Long-form system design roadmap and concepts",
    type: "notes",
    link: "https://github.com/NarendraKoya999/system-design-handbook",
    category: "system-design",
  },
  {
    title: "InterviewReady System Design Resources",
    description: "Curated links for system design preparation",
    type: "notes",
    link: "https://github.com/InterviewReady/system-design-resources",
    category: "system-design",
  },
  {
    title: "ByteByteGo Blog",
    description: "Concise system design guides and architecture topics",
    type: "notes",
    link: "https://blog.bytebytego.com/",
    category: "system-design",
  },
  {
    title: "AWS Architecture Center",
    description: "Real architecture patterns and reference diagrams",
    type: "notes",
    link: "https://aws.amazon.com/architecture/",
    category: "system-design",
  },
  {
    title: "Google SRE Book",
    description: "Reliability engineering principles from Google",
    type: "pdf",
    link: "https://sre.google/books/",
    category: "system-design",
  },
  {
    title: "High Scalability",
    description: "Case studies on scaling real-world systems",
    type: "notes",
    link: "https://highscalability.com/",
    category: "system-design",
  },
  {
    title: "Gaurav Sen YouTube",
    description: "System design interview video walkthroughs",
    type: "video",
    link: "https://www.youtube.com/@gkcs",
    category: "system-design",
  },

  {
    title: "Operating Systems: Three Easy Pieces",
    description: "Foundational OS textbook (free)",
    type: "pdf",
    link: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
    category: "os",
  },
  {
    title: "MIT 6.S081 (Operating Systems)",
    description: "MIT OS course with lectures and labs",
    type: "video",
    link: "https://pdos.csail.mit.edu/6.S081/",
    category: "os",
  },
  {
    title: "Stanford CS140e",
    description: "Operating systems concepts and projects",
    type: "notes",
    link: "https://cs140e.sergio.bz/",
    category: "os",
  },
  {
    title: "OS Interview Questions (GFG)",
    description: "Frequently asked OS interview questions",
    type: "notes",
    link: "https://www.geeksforgeeks.org/operating-systems/",
    category: "os",
  },

  {
    title: "Database System Concepts Notes",
    description: "Core DBMS fundamentals and SQL theory",
    type: "notes",
    link: "https://www.geeksforgeeks.org/dbms/",
    category: "dbms",
  },
  {
    title: "PostgreSQL Official Documentation",
    description: "Comprehensive SQL and PostgreSQL docs",
    type: "notes",
    link: "https://www.postgresql.org/docs/",
    category: "dbms",
  },
  {
    title: "MySQL 8.0 Reference Manual",
    description: "Official MySQL manual and SQL features",
    type: "notes",
    link: "https://dev.mysql.com/doc/refman/8.0/en/",
    category: "dbms",
  },
  {
    title: "MongoDB mongosh Cheat Sheet",
    description: "MongoDB shell command reference",
    type: "cheatsheet",
    link: "https://www.mongodb.com/docs/mongodb-shell/reference/cheatsheet/",
    category: "dbms",
  },
  {
    title: "SQL to MongoDB Mapping Chart",
    description: "Translate SQL concepts to MongoDB",
    type: "cheatsheet",
    link: "https://www.mongodb.com/docs/manual/reference/sql-comparison/",
    category: "dbms",
  },
  {
    title: "SQLBolt",
    description: "Interactive SQL learning and practice notes",
    type: "notes",
    link: "https://sqlbolt.com/",
    category: "dbms",
  },

  {
    title: "Computer Networking: A Top-Down Approach notes",
    description: "High-value networking topics summary",
    type: "notes",
    link: "https://gaia.cs.umass.edu/kurose_ross/online_lectures.htm",
    category: "cn",
  },
  {
    title: "Stanford CS144",
    description: "Computer networking course materials",
    type: "notes",
    link: "https://cs144.github.io/",
    category: "cn",
  },
  {
    title: "Beej’s Guide to Network Programming",
    description: "Socket programming and networking basics",
    type: "notes",
    link: "https://beej.us/guide/bgnet/",
    category: "cn",
  },
  {
    title: "Computer Networks (Neso Academy)",
    description: "Networking interview prep video playlists",
    type: "video",
    link: "https://www.youtube.com/@nesoacademy",
    category: "cn",
  },

  {
    title: "JavaScript Info",
    description: "Deep JavaScript notes for frontend interviews",
    type: "notes",
    link: "https://javascript.info/",
    category: "frontend",
  },
  {
    title: "React Official Docs",
    description: "Official React docs and learning paths",
    type: "notes",
    link: "https://react.dev/learn",
    category: "frontend",
  },
  {
    title: "MDN Web Docs",
    description: "HTML/CSS/JS and browser API reference",
    type: "notes",
    link: "https://developer.mozilla.org/",
    category: "frontend",
  },
  {
    title: "Frontend Interview Handbook",
    description: "Frontend interview questions and concepts",
    type: "notes",
    link: "https://www.frontendinterviewhandbook.com/",
    category: "frontend",
  },
  {
    title: "CSS Tricks Almanac",
    description: "CSS property reference and examples",
    type: "cheatsheet",
    link: "https://css-tricks.com/almanac/",
    category: "frontend",
  },

  {
    title: "Node.js Docs",
    description: "Official Node.js runtime and APIs",
    type: "notes",
    link: "https://nodejs.org/docs/latest/api/",
    category: "backend",
  },
  {
    title: "Express.js Guide",
    description: "Official Express framework guide",
    type: "notes",
    link: "https://expressjs.com/en/guide/routing.html",
    category: "backend",
  },
  {
    title: "REST API Tutorial",
    description: "REST fundamentals for backend interviews",
    type: "notes",
    link: "https://restfulapi.net/",
    category: "backend",
  },
  {
    title: "OWASP Top 10",
    description: "Critical backend security checklist",
    type: "cheatsheet",
    link: "https://owasp.org/www-project-top-ten/",
    category: "backend",
  },

  {
    title: "Roadmap.sh DevOps",
    description: "Step-by-step DevOps roadmap",
    type: "notes",
    link: "https://roadmap.sh/devops",
    category: "devops",
  },
  {
    title: "Docker Docs",
    description: "Official Docker usage and deployment docs",
    type: "notes",
    link: "https://docs.docker.com/",
    category: "devops",
  },
  {
    title: "Kubernetes Docs",
    description: "Official Kubernetes learning resources",
    type: "notes",
    link: "https://kubernetes.io/docs/home/",
    category: "devops",
  },
  {
    title: "GitHub Actions Docs",
    description: "CI/CD workflows and automation docs",
    type: "notes",
    link: "https://docs.github.com/en/actions",
    category: "devops",
  },

  {
    title: "The Odin Project",
    description: "Structured full-stack web dev path",
    type: "notes",
    link: "https://www.theodinproject.com/paths",
    category: "roadmap",
  },
  {
    title: "Roadmap.sh Software Engineer",
    description: "Complete software engineering roadmap",
    type: "notes",
    link: "https://roadmap.sh/software-design-architecture",
    category: "roadmap",
  },
  {
    title: "Developer Roadmaps",
    description: "Role-based roadmaps for all stacks",
    type: "notes",
    link: "https://roadmap.sh/",
    category: "roadmap",
  },

  {
    title: "LeetCode Patterns Cheat Sheet",
    description: "Common coding interview problem patterns",
    type: "cheatsheet",
    link: "https://seanprashad.com/leetcode-patterns/",
    category: "cheatsheets",
  },
  {
    title: "Big-O Cheat Sheet",
    description: "Complexity reference for common operations",
    type: "cheatsheet",
    link: "https://www.bigocheatsheet.com/",
    category: "cheatsheets",
  },
  {
    title: "Python Cheat Sheet",
    description: "Core Python syntax and usage reference",
    type: "cheatsheet",
    link: "https://www.pythoncheatsheet.org/",
    category: "cheatsheets",
  },
  {
    title: "Java Cheat Sheet",
    description: "Java syntax and collections quick guide",
    type: "cheatsheet",
    link: "https://www.codecademy.com/learn/learn-java/modules/learn-java-introduction/cheatsheet",
    category: "cheatsheets",
  },
  {
    title: "Git Cheat Sheet",
    description: "Most-used Git commands at a glance",
    type: "cheatsheet",
    link: "https://education.github.com/git-cheat-sheet-education.pdf",
    category: "cheatsheets",
  },

  {
    title: "Google Interview Warmup",
    description: "Google interview preparation overview",
    type: "notes",
    link: "https://www.google.com/about/careers/applications/how-we-hire/interview/",
    category: "company",
  },
  {
    title: "Amazon Leadership Principles",
    description: "Core Amazon behavioral interview framework",
    type: "notes",
    link: "https://www.amazon.jobs/content/en/our-workplace/leadership-principles",
    category: "company",
  },
  {
    title: "Microsoft Interview Process",
    description: "Career site and interview guidance",
    type: "notes",
    link: "https://careers.microsoft.com/",
    category: "company",
  },
  {
    title: "Infosys Careers Preparation",
    description: "Infosys official hiring and campus prep",
    type: "notes",
    link: "https://www.infosys.com/careers/",
    category: "company",
  },
  {
    title: "TCS Careers and NQT",
    description: "TCS hiring and test prep info",
    type: "notes",
    link: "https://www.tcs.com/careers",
    category: "company",
  },

  {
    title: "Resume Checklist (Harvard)",
    description: "Actionable resume guidelines",
    type: "pdf",
    link: "https://careerservices.fas.harvard.edu/resources/bullet-point-resume-template/",
    category: "career",
  },
  {
    title: "STAR Method Interview Guide",
    description: "Behavioral answer framework for HR rounds",
    type: "notes",
    link: "https://www.themuse.com/advice/star-interview-method",
    category: "career",
  },
  {
    title: "Interviewing.io Blog",
    description: "Practical interview tips from mock interviews",
    type: "notes",
    link: "https://interviewing.io/blog",
    category: "career",
  },
];

const seedQuizzes = require("./quizSeedData");

const seedDatabase = async () => {
  const companyCount = await Company.count();
  if (companyCount === 0) {
    await Company.bulkCreate(companies);
    console.log("Seeded companies");
  }

  const questionCount = await Question.count();
  if (questionCount === 0) {
    await Question.bulkCreate(sampleQuestions);
    console.log("Seeded sample questions");
  }

  const codingCount = await CodingProblem.count();
  if (codingCount === 0) {
    await CodingProblem.bulkCreate(sampleCodingProblems);
    console.log("Seeded coding problems");
  }

  if (learningMaterials.length) {
    for (const material of learningMaterials) {
      const existing = await LearningMaterial.findOne({
        where: { link: material.link },
      });
      if (existing) {
        await existing.update({ ...material, isPublished: true });
      } else {
        await LearningMaterial.create({ ...material, isPublished: true });
      }
    }
    console.log(`Upserted ${learningMaterials.length} learning materials`);
  }

  await seedQuizzes();
};

module.exports = seedDatabase;
