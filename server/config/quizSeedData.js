const Quiz = require("../models/Quiz");
const QuizQuestion = require("../models/QuizQuestion");

const quizzes = [
  {
    title: "DSA Fundamentals",
    slug: "dsa-fundamentals",
    description: "Arrays, stacks, queues, trees, and time complexity basics.",
    category: "dsa",
    difficulty: "easy",
    timePerQuestion: 40,
    icon: "🧮",
    color: "#6366f1",
    questions: [
      {
        question: "What is the average time complexity of accessing an element by index in an array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correctIndex: 0,
        explanation: "Array index access is constant time O(1).",
      },
      {
        question: "Which data structure uses LIFO (Last In First Out)?",
        options: ["Queue", "Stack", "Heap", "Graph"],
        correctIndex: 1,
        explanation: "Stack follows Last In First Out.",
      },
      {
        question: "Binary Search works on:",
        options: ["Unsorted arrays", "Sorted arrays", "Linked lists only", "Graphs"],
        correctIndex: 1,
        explanation: "Binary search requires a sorted collection.",
      },
      {
        question: "Worst-case time complexity of Quick Sort is:",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correctIndex: 2,
        explanation: "Poor pivot choice can lead to O(n²) worst case.",
      },
      {
        question: "A BST in-order traversal gives elements in:",
        options: ["Random order", "Sorted order", "Reverse sorted", "Level order"],
        correctIndex: 1,
        explanation: "In-order traversal of BST yields sorted sequence.",
      },
      {
        question: "Hash table average lookup time is:",
        options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        correctIndex: 0,
        explanation: "With a good hash function, average lookup is O(1).",
      },
      {
        question: "BFS is typically implemented using:",
        options: ["Stack", "Queue", "Priority Queue only", "Set"],
        correctIndex: 1,
        explanation: "BFS uses a queue to explore level by level.",
      },
      {
        question: "Which is NOT a linear data structure?",
        options: ["Array", "Linked List", "Tree", "Queue"],
        correctIndex: 2,
        explanation: "Tree is hierarchical, not linear.",
      },
    ],
  },
  {
    title: "JavaScript Essentials",
    slug: "javascript-essentials",
    description: "Closures, promises, event loop, and ES6+ concepts.",
    category: "javascript",
    difficulty: "medium",
    timePerQuestion: 45,
    icon: "⚡",
    color: "#f59e0b",
    questions: [
      {
        question: "typeof null in JavaScript returns:",
        options: ['"null"', '"object"', '"undefined"', '"boolean"'],
        correctIndex: 1,
        explanation: "typeof null is a long-standing quirk returning 'object'.",
      },
      {
        question: "Which creates a block-scoped variable?",
        options: ["var", "let", "function", "global"],
        correctIndex: 1,
        explanation: "let and const are block-scoped.",
      },
      {
        question: "Promise.all fails when:",
        options: ["Any promise rejects", "All reject", "First resolves", "Never"],
        correctIndex: 0,
        explanation: "Promise.all rejects if any input promise rejects.",
      },
      {
        question: "Event loop processes microtasks before:",
        options: ["Next macrotask", "Rendering only", "Network I/O only", "Nothing"],
        correctIndex: 0,
        explanation: "Microtasks run before the next macrotask.",
      },
      {
        question: "=== checks:",
        options: ["Value only", "Type and value", "Reference only", "Prototype"],
        correctIndex: 1,
        explanation: "Strict equality checks type and value.",
      },
      {
        question: "Arrow functions do NOT have their own:",
        options: ["Parameters", "this binding", "Return", "Name"],
        correctIndex: 1,
        explanation: "Arrow functions lexically inherit this.",
      },
    ],
  },
  {
    title: "DBMS & SQL",
    slug: "dbms-sql",
    description: "Normalization, indexing, transactions, and SQL queries.",
    category: "dbms",
    difficulty: "medium",
    timePerQuestion: 50,
    icon: "🗄️",
    color: "#10b981",
    questions: [
      {
        question: "ACID stands for:",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Access, Control, Index, Data",
          "Array, Cache, ID, Disk",
          "None of these",
        ],
        correctIndex: 0,
        explanation: "ACID defines reliable transaction properties.",
      },
      {
        question: "Which normal form removes partial dependency?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctIndex: 1,
        explanation: "2NF removes partial dependency on composite keys.",
      },
      {
        question: "PRIMARY KEY constraint ensures:",
        options: ["Duplicates allowed", "Unique + NOT NULL", "Only NULL", "Foreign reference"],
        correctIndex: 1,
        explanation: "Primary keys are unique and not null.",
      },
      {
        question: "Index on a column speeds up:",
        options: ["INSERT always", "SELECT with WHERE on that column", "DELETE all rows", "DROP table"],
        correctIndex: 1,
        explanation: "Indexes help filter/search queries.",
      },
      {
        question: "JOIN that returns all rows from both tables when match exists:",
        options: ["INNER JOIN", "LEFT JOIN", "FULL OUTER JOIN", "CROSS JOIN"],
        correctIndex: 0,
        explanation: "INNER JOIN returns matching rows from both sides.",
      },
      {
        question: "Deadlock occurs when:",
        options: [
          "Processes wait for each other circularly",
          "CPU is idle",
          "Disk is full",
          "Network is down",
        ],
        correctIndex: 0,
        explanation: "Circular wait causes deadlock.",
      },
    ],
  },
  {
    title: "Operating Systems",
    slug: "operating-systems",
    description: "Processes, scheduling, memory, and synchronization.",
    category: "os",
    difficulty: "medium",
    timePerQuestion: 50,
    icon: "💻",
    color: "#8b5cf6",
    questions: [
      {
        question: "Round Robin scheduling uses:",
        options: ["Priority only", "Time quantum", "FCFS only", "No preemption"],
        correctIndex: 1,
        explanation: "RR allocates CPU in fixed time slices.",
      },
      {
        question: "Virtual memory allows:",
        options: [
          "Programs larger than physical RAM",
          "Faster CPU clock",
          "No paging",
          "Only single process",
        ],
        correctIndex: 0,
        explanation: "VM extends effective memory using disk.",
      },
      {
        question: "Mutex is used for:",
        options: ["Memory allocation", "Mutual exclusion", "File naming", "Scheduling"],
        correctIndex: 1,
        explanation: "Mutex locks critical sections.",
      },
      {
        question: "Page fault occurs when:",
        options: [
          "Required page not in RAM",
          "CPU overheats",
          "Disk is formatted",
          "Process exits",
        ],
        correctIndex: 0,
        explanation: "Fault triggers loading page from disk.",
      },
      {
        question: "Thrashing happens when:",
        options: [
          "Excessive paging",
          "No processes",
          "High cache hit",
          "Single core only",
        ],
        correctIndex: 0,
        explanation: "Too much paging degrades performance.",
      },
    ],
  },
  {
    title: "Computer Networks",
    slug: "computer-networks",
    description: "TCP/IP, DNS, HTTP, and network layers.",
    category: "cn",
    difficulty: "medium",
    timePerQuestion: 45,
    icon: "🌐",
    color: "#0ea5e9",
    questions: [
      {
        question: "TCP provides:",
        options: ["Connectionless delivery", "Reliable ordered delivery", "No flow control", "Only broadcast"],
        correctIndex: 1,
        explanation: "TCP is connection-oriented and reliable.",
      },
      {
        question: "DNS translates:",
        options: ["IP to MAC", "Domain names to IP", "Port to socket", "HTTP to FTP"],
        correctIndex: 1,
        explanation: "DNS resolves hostnames to IP addresses.",
      },
      {
        question: "HTTP status 404 means:",
        options: ["Success", "Not Found", "Server Error", "Redirect"],
        correctIndex: 1,
        explanation: "404 indicates resource not found.",
      },
      {
        question: "OSI model has how many layers?",
        options: ["4", "5", "7", "9"],
        correctIndex: 2,
        explanation: "OSI defines 7 layers.",
      },
      {
        question: "HTTPS adds security via:",
        options: ["FTP", "TLS/SSL", "SMTP", "ARP"],
        correctIndex: 1,
        explanation: "HTTPS encrypts HTTP with TLS.",
      },
    ],
  },
  {
    title: "System Design Basics",
    slug: "system-design-basics",
    description: "Scalability, caching, load balancing, and CAP theorem.",
    category: "system-design",
    difficulty: "hard",
    timePerQuestion: 55,
    icon: "🏗️",
    color: "#ec4899",
    questions: [
      {
        question: "CAP theorem states you can guarantee at most:",
        options: ["All three always", "Two of C, A, P", "Only one", "None"],
        correctIndex: 1,
        explanation: "Distributed systems trade off C, A, and P.",
      },
      {
        question: "CDN primarily reduces:",
        options: ["Database size", "Latency for static content", "CPU cores", "Code bugs"],
        correctIndex: 1,
        explanation: "CDNs cache content closer to users.",
      },
      {
        question: "Horizontal scaling means:",
        options: ["Bigger machine", "More machines", "Less RAM", "Single server"],
        correctIndex: 1,
        explanation: "Scale out by adding nodes.",
      },
      {
        question: "Redis is commonly used as:",
        options: ["Relational DB only", "In-memory cache/store", "File system", "Compiler"],
        correctIndex: 1,
        explanation: "Redis is an in-memory data store.",
      },
      {
        question: "Load balancer distributes traffic to:",
        options: ["One server", "Multiple backend servers", "Clients only", "DNS only"],
        correctIndex: 1,
        explanation: "LB spreads requests across pool.",
      },
    ],
  },
  {
    title: "HR & Behavioral",
    slug: "hr-behavioral",
    description: "STAR method, teamwork, and common HR scenarios.",
    category: "hr",
    difficulty: "easy",
    timePerQuestion: 35,
    icon: "🤝",
    color: "#14b8a6",
    questions: [
      {
        question: "STAR stands for:",
        options: [
          "Situation, Task, Action, Result",
          "Skill, Time, Aim, Review",
          "Start, Test, Apply, Run",
          "None",
        ],
        correctIndex: 0,
        explanation: "STAR structures behavioral answers.",
      },
      {
        question: "Best answer to 'Tell me about yourself':",
        options: [
          "Full life story",
          "Concise professional summary",
          "Salary demand",
          "Only hobbies",
        ],
        correctIndex: 1,
        explanation: "Keep it relevant and professional.",
      },
      {
        question: "Conflict with teammate — you should emphasize:",
        options: ["Blame", "Collaboration and resolution", "Quitting", "Ignoring"],
        correctIndex: 1,
        explanation: "Show maturity and teamwork.",
      },
      {
        question: "'Why this company?' should reflect:",
        options: ["Random guess", "Research and alignment", "Only salary", "Other offers"],
        correctIndex: 1,
        explanation: "Show genuine interest and fit.",
      },
    ],
  },
];

const seedQuizzes = async () => {
  for (const quizData of quizzes) {
    const { questions, ...quizFields } = quizData;
    const [quiz] = await Quiz.findOrCreate({
      where: { slug: quizFields.slug },
      defaults: quizFields,
    });
    await quiz.update(quizFields);

    const existingCount = await QuizQuestion.count({ where: { quizId: quiz.id } });
    if (existingCount === 0 && questions?.length) {
      await QuizQuestion.bulkCreate(
        questions.map((q, i) => ({
          ...q,
          quizId: quiz.id,
          order: i,
        })),
      );
    }
  }
  console.log(`Upserted ${quizzes.length} quizzes with questions`);
};

module.exports = seedQuizzes;
