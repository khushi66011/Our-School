// ===== APP STATE =====
let appState = {
  user: null,
  language: 'en',
  currentModule: null,
  currentSubject: null,
  currentChapter: null,
  screenHistory: [],
  quizData: { questions: [], current: 0, score: 0, answers: [], difficulty: 'easy' },
  progress: {},
  completedChapters: [],
  quizScores: []
};

// ===== LANGUAGES =====
const languages = [
  { code: 'en', name: 'English (US)', native: 'English', flag: '🇺🇸' },
  { code: 'en-uk', name: 'English (UK)', native: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
];

// ===== MODULES =====
const modules = [
  { id: 'class10', name: 'Class 10', sub: 'CBSE Board', icon: 'looks_one', color: '#4CAF50', subjects: ['maths','science','english','social'] },
  { id: 'class11', name: 'Class 11', sub: 'CBSE Board', icon: 'looks_two', color: '#2196F3', subjects: ['maths','physics','chemistry','biology'] },
  { id: 'class12', name: 'Class 12', sub: 'CBSE Board', icon: 'looks_3', color: '#9C27B0', subjects: ['maths','physics','chemistry','biology'] },
  { id: 'jee', name: 'JEE Prep', sub: 'IIT JEE', icon: 'engineering', color: '#F44336', subjects: ['maths','physics','chemistry'] },
  { id: 'neet', name: 'NEET Prep', sub: 'Medical Entrance', icon: 'medical_services', color: '#E91E63', subjects: ['physics','chemistry','biology'] },
  { id: 'cuet', name: 'CUET', sub: 'Central Univ.', icon: 'account_balance', color: '#FF9800', subjects: ['maths','english','gk'] },
  { id: 'english', name: 'Learn English', sub: 'Grammar & Vocab', icon: 'language', color: '#00BCD4', subjects: ['grammar','vocab','speaking','reading'] },
];

// ===== SUBJECTS =====
const subjects = {
  maths: { name: 'Mathematics', icon: 'calculate', color: '#4CAF50' },
  science: { name: 'Science', icon: 'science', color: '#2196F3' },
  english: { name: 'English', icon: 'menu_book', color: '#FF9800' },
  social: { name: 'Social Studies', icon: 'public', color: '#9C27B0' },
  physics: { name: 'Physics', icon: 'bolt', color: '#F44336' },
  chemistry: { name: 'Chemistry', icon: 'biotech', color: '#E91E63' },
  biology: { name: 'Biology', icon: 'eco', color: '#43A047' },
  gk: { name: 'General Knowledge', icon: 'emoji_objects', color: '#FF5722' },
  grammar: { name: 'Grammar', icon: 'spellcheck', color: '#3F51B5' },
  vocab: { name: 'Vocabulary', icon: 'translate', color: '#00BCD4' },
  speaking: { name: 'Speaking', icon: 'record_voice_over', color: '#FF9800' },
  reading: { name: 'Reading', icon: 'chrome_reader_mode', color: '#795548' },
};

// ===== CHAPTERS (Class 10 Maths - 5 full chapters) =====
const chaptersData = {
  class10_maths: [
    {
      id: 'c10m1', num: 1, name: 'Real Numbers',
      meta: '4 lessons • 30 min',
      video: 'https://www.youtube.com/watch?v=q5uYsUGLkjI',
      videoLabel: 'Real Numbers - Class 10 | NCERT',
      notes: `Real Numbers form the foundation of Class 10 Mathematics.\n\n• Every positive integer can be expressed as a product of prime numbers (Fundamental Theorem of Arithmetic).\n• Euclid's Division Lemma: For any two positive integers a and b, there exist unique q and r such that a = bq + r, where 0 ≤ r < b.\n• HCF and LCM can be found using prime factorization.\n• Irrational numbers like √2, √3, π cannot be expressed as p/q form.\n• The decimal expansion of rationals is either terminating or non-terminating repeating.`,
      book: 'https://ncert.nic.in/textbook/pdf/jemh101.pdf',
      pyq: 'https://cbseacademic.nic.in/web_material/PreviousYearPaper/2023/Maths10_2023.pdf',
      quizQuestions: [
        { q: 'According to the Fundamental Theorem of Arithmetic, every composite number can be expressed as:', opts: ['Sum of primes', 'Product of primes', 'Difference of primes', 'Quotient of primes'], ans: 1, exp: 'Every composite number can be expressed as a product of primes in a unique way.' },
        { q: 'Which of the following is an irrational number?', opts: ['√4', '√9', '√16', '√2'], ans: 3, exp: '√2 = 1.41421... which is non-terminating and non-repeating, hence irrational.' },
        { q: 'HCF of 12 and 18 is:', opts: ['2', '3', '6', '9'], ans: 2, exp: '12 = 2² × 3, 18 = 2 × 3². HCF = 2 × 3 = 6.' },
        { q: 'The decimal expansion of 1/3 is:', opts: ['0.3', '0.33', '0.333...', '0.313'], ans: 2, exp: '1/3 = 0.333... which is non-terminating but repeating.' },
        { q: 'LCM of 4 and 6 is:', opts: ['12', '6', '24', '2'], ans: 0, exp: 'LCM(4,6) = 12. Using prime factors: 4=2², 6=2×3. LCM=2²×3=12.' },
        { q: 'Euclid\'s Division Lemma states a = bq + r where r satisfies:', opts: ['0 < r < b', '0 ≤ r < b', '0 < r ≤ b', '0 ≤ r ≤ b'], ans: 1, exp: 'r must satisfy 0 ≤ r < b (r can be 0 but must be less than b).' },
        { q: 'The HCF of two consecutive integers is:', opts: ['0', '1', '2', 'The larger number'], ans: 1, exp: 'Consecutive integers share no common factor greater than 1, so HCF = 1.' },
        { q: '√5 is:', opts: ['Rational', 'Irrational', 'Integer', 'Natural'], ans: 1, exp: 'The square root of any prime number is irrational.' },
        { q: 'Which number has a terminating decimal expansion?', opts: ['1/7', '1/3', '1/4', '1/9'], ans: 2, exp: '1/4 = 0.25. Denominator 4 = 2², which has only factor 2, so it terminates.' },
        { q: 'If HCF(a,b) = 5 and LCM(a,b) = 60, what is a × b?', opts: ['12', '55', '300', '65'], ans: 2, exp: 'HCF × LCM = a × b. So 5 × 60 = 300.' },
      ]
    },
    {
      id: 'c10m2', num: 2, name: 'Polynomials',
      meta: '5 lessons • 40 min',
      video: 'https://www.youtube.com/watch?v=z6u5o0dN-GI',
      videoLabel: 'Polynomials - Class 10 | NCERT',
      notes: `Polynomials are algebraic expressions with one or more terms.\n\n• A polynomial p(x) = aₙxⁿ + ... + a₁x + a₀\n• Degree of a polynomial = highest power of x\n• Zeroes of polynomial: values of x where p(x) = 0\n• For quadratic ax² + bx + c:\n  - Sum of zeroes = -b/a\n  - Product of zeroes = c/a\n• Division Algorithm: p(x) = g(x)·q(x) + r(x)\n• Geometrically, zeroes = x-intercepts of the graph`,
      book: 'https://ncert.nic.in/textbook/pdf/jemh102.pdf',
      pyq: 'https://cbseacademic.nic.in/',
      quizQuestions: [
        { q: 'The degree of polynomial 5x³ - 2x² + x - 7 is:', opts: ['1', '2', '3', '4'], ans: 2, exp: 'The highest power of x is 3, so degree = 3.' },
        { q: 'Number of zeroes of a quadratic polynomial is at most:', opts: ['1', '2', '3', '0'], ans: 1, exp: 'A quadratic polynomial has degree 2, so at most 2 zeroes.' },
        { q: 'If p(x) = x² - 5x + 6, then sum of zeroes is:', opts: ['-5', '5', '6', '-6'], ans: 1, exp: 'Sum of zeroes = -b/a = -(-5)/1 = 5.' },
        { q: 'Product of zeroes of 2x² - 3x + 1 is:', opts: ['3/2', '1/2', '-3/2', '2'], ans: 1, exp: 'Product = c/a = 1/2.' },
        { q: 'Which is a zero of p(x) = x² - 4?', opts: ['1', '4', '2', '3'], ans: 2, exp: 'p(2) = 4 - 4 = 0. So 2 is a zero.' },
        { q: 'A linear polynomial has how many zeroes?', opts: ['0', '1', '2', 'Infinite'], ans: 1, exp: 'A linear polynomial (degree 1) always has exactly one zero.' },
        { q: 'If zeroes of quadratic are 2 and 3, the polynomial is:', opts: ['x²+5x+6', 'x²-5x+6', 'x²-5x-6', 'x²+5x-6'], ans: 1, exp: 'p(x) = x² - (2+3)x + (2×3) = x² - 5x + 6.' },
        { q: 'Geometrically, a zero of a polynomial is where the graph:', opts: ['Touches y-axis', 'Crosses x-axis', 'Reaches maximum', 'Has a curve'], ans: 1, exp: 'Zeroes of a polynomial are the x-coordinates where the graph intersects the x-axis.' },
        { q: 'Division algorithm for polynomials: p(x) = g(x)·q(x) + r(x). Here r(x) is:', opts: ['Divisor', 'Quotient', 'Remainder', 'Dividend'], ans: 2, exp: 'r(x) is the remainder in polynomial division.' },
        { q: 'The graph of a quadratic polynomial is a:', opts: ['Straight line', 'Circle', 'Parabola', 'Hyperbola'], ans: 2, exp: 'Every quadratic polynomial traces a parabolic curve.' },
      ]
    },
    {
      id: 'c10m3', num: 3, name: 'Linear Equations',
      meta: '6 lessons • 50 min',
      video: 'https://www.youtube.com/watch?v=6R8mFUEy4ks',
      videoLabel: 'Linear Equations in 2 Variables - Class 10',
      notes: `A pair of linear equations in two variables:\n\na₁x + b₁y + c₁ = 0\na₂x + b₂y + c₂ = 0\n\n• Graphical Method: Plot both lines\n• Substitution Method: Solve for one variable, substitute\n• Elimination Method: Multiply and add/subtract\n\nConsistency Conditions:\n• Unique solution: a₁/a₂ ≠ b₁/b₂ (lines intersect)\n• Infinitely many: a₁/a₂ = b₁/b₂ = c₁/c₂ (lines coincide)\n• No solution: a₁/a₂ = b₁/b₂ ≠ c₁/c₂ (parallel lines)`,
      book: 'https://ncert.nic.in/textbook/pdf/jemh103.pdf',
      pyq: 'https://cbseacademic.nic.in/',
      quizQuestions: [
        { q: 'A pair of linear equations has a unique solution when lines are:', opts: ['Parallel', 'Coincident', 'Intersecting', 'Perpendicular'], ans: 2, exp: 'Intersecting lines give exactly one solution (unique).' },
        { q: 'Solve: x + y = 5 and x - y = 1. Value of x is:', opts: ['2', '3', '4', '1'], ans: 1, exp: 'Adding both: 2x = 6, x = 3.' },
        { q: 'For no solution: a₁/a₂ = b₁/b₂ but:', opts: ['= c₁/c₂', '≠ c₁/c₂', '> c₁/c₂', '< c₁/c₂'], ans: 1, exp: 'When a₁/a₂ = b₁/b₂ ≠ c₁/c₂, lines are parallel — no solution.' },
        { q: 'What is the graphical representation of 2x + y = 4?', opts: ['Parabola', 'Circle', 'Straight line', 'Curve'], ans: 2, exp: 'Every linear equation in two variables represents a straight line.' },
        { q: 'In substitution method, we first:', opts: ['Add equations', 'Multiply equations', 'Express one variable in terms of other', 'Divide equations'], ans: 2, exp: 'We express one variable in terms of the other and substitute.' },
        { q: 'If x = 2, y = 1 satisfies 2x + 3y = k, then k =', opts: ['6', '7', '8', '5'], ans: 1, exp: '2(2) + 3(1) = 4 + 3 = 7.' },
        { q: 'Two equations with infinitely many solutions represent:', opts: ['Parallel lines', 'Intersecting lines', 'The same line', 'Perpendicular lines'], ans: 2, exp: 'Coincident (same) lines satisfy both equations for every point.' },
        { q: 'The elimination method works by:', opts: ['Drawing graphs', 'Multiplying and adding/subtracting to eliminate a variable', 'Substituting values', 'Guessing'], ans: 1, exp: 'We multiply equations to make coefficients equal, then add/subtract to eliminate.' },
        { q: 'A linear equation in two variables has:', opts: ['One solution', 'Two solutions', 'Infinite solutions', 'No solution'], ans: 2, exp: 'A single linear equation has infinitely many solutions (all points on the line).' },
        { q: 'Sum of two numbers is 20 and difference is 4. The larger number is:', opts: ['10', '12', '14', '8'], ans: 1, exp: 'x + y = 20, x - y = 4 → 2x = 24 → x = 12.' },
      ]
    },
    {
      id: 'c10m4', num: 4, name: 'Quadratic Equations',
      meta: '5 lessons • 45 min',
      video: 'https://www.youtube.com/watch?v=MxBiYX4suPs',
      videoLabel: 'Quadratic Equations - Class 10 | NCERT',
      notes: `A quadratic equation: ax² + bx + c = 0, where a ≠ 0\n\nMethods to Solve:\n1. Factorisation: Split middle term\n2. Completing the Square\n3. Quadratic Formula: x = (-b ± √(b²-4ac)) / 2a\n\nDiscriminant D = b² - 4ac:\n• D > 0: Two distinct real roots\n• D = 0: Two equal real roots\n• D < 0: No real roots\n\nNature of roots depends on the discriminant!`,
      book: 'https://ncert.nic.in/textbook/pdf/jemh104.pdf',
      pyq: 'https://cbseacademic.nic.in/',
      quizQuestions: [
        { q: 'The quadratic formula gives x =', opts: ['(-b ± √D)/a', '(-b ± √D)/2a', '(b ± √D)/2a', '(-b ± D)/2a'], ans: 1, exp: 'x = (-b ± √(b²-4ac)) / 2a is the quadratic formula.' },
        { q: 'Discriminant of x² - 4x + 4 = 0 is:', opts: ['0', '8', '-8', '16'], ans: 0, exp: 'D = b²-4ac = 16-16 = 0. Equal roots.' },
        { q: 'If D < 0, the quadratic equation has:', opts: ['2 real roots', '1 real root', 'No real roots', 'Infinite roots'], ans: 2, exp: 'Negative discriminant means no real roots (complex roots).' },
        { q: 'Roots of x² - 5x + 6 = 0 are:', opts: ['2 and 4', '1 and 6', '2 and 3', '3 and 4'], ans: 2, exp: 'Factorising: (x-2)(x-3) = 0, so x = 2 or x = 3.' },
        { q: 'Which equation is quadratic?', opts: ['x + 5 = 0', '2x² + 3 = 0', 'x³ + x = 0', 'x/2 = 1'], ans: 1, exp: '2x² + 3 = 0 has degree 2, making it quadratic.' },
        { q: 'D = 0 means the equation has:', opts: ['No solution', 'Two equal roots', 'Two different roots', 'Infinitely many roots'], ans: 1, exp: 'When D = 0, both roots are equal: x = -b/2a.' },
        { q: 'Sum of roots of 2x² - 6x + 3 = 0 is:', opts: ['6', '3/2', '3', '-3'], ans: 1, exp: 'Sum = -b/a = 6/2 = 3... wait: -(-6)/2 = 3.' },
        { q: 'Which method always works to solve a quadratic equation?', opts: ['Factorisation', 'Completing square', 'Quadratic formula', 'Trial and error'], ans: 2, exp: 'The quadratic formula always works for any quadratic equation.' },
        { q: 'A quadratic equation has at most how many roots?', opts: ['1', '2', '3', '4'], ans: 1, exp: 'By degree theorem, a degree-2 equation has at most 2 roots.' },
        { q: 'For 3x² + 2x - 1 = 0, product of roots is:', opts: ['2/3', '-1/3', '1/3', '-2/3'], ans: 1, exp: 'Product = c/a = -1/3.' },
      ]
    },
    {
      id: 'c10m5', num: 5, name: 'Arithmetic Progressions',
      meta: '4 lessons • 35 min',
      video: 'https://www.youtube.com/watch?v=SfIEgIzAvbI',
      videoLabel: 'Arithmetic Progressions - Class 10 | NCERT',
      notes: `An Arithmetic Progression (AP) is a sequence where the difference between consecutive terms is constant.\n\nKey Formulas:\n• nth term: aₙ = a + (n-1)d\n  where a = first term, d = common difference\n• Sum of n terms: Sₙ = n/2[2a + (n-1)d]\n• Alternatively: Sₙ = n/2(a + l) where l = last term\n\nExamples of AP:\n• 2, 5, 8, 11, 14... (d = 3)\n• 10, 7, 4, 1... (d = -3)\n\nIf sum of first n terms = S, then nth term = Sₙ - Sₙ₋₁`,
      book: 'https://ncert.nic.in/textbook/pdf/jemh105.pdf',
      pyq: 'https://cbseacademic.nic.in/',
      quizQuestions: [
        { q: 'Common difference of AP: 5, 8, 11, 14 is:', opts: ['2', '3', '4', '5'], ans: 1, exp: 'd = 8 - 5 = 3.' },
        { q: '10th term of AP 3, 7, 11, 15... is:', opts: ['35', '39', '43', '27'], ans: 1, exp: 'a = 3, d = 4. a₁₀ = 3 + 9×4 = 3 + 36 = 39.' },
        { q: 'Sum of first 10 natural numbers is:', opts: ['45', '50', '55', '60'], ans: 2, exp: 'S = n(n+1)/2 = 10×11/2 = 55.' },
        { q: 'Which sequence is an AP?', opts: ['1, 2, 4, 8', '1, 3, 6, 10', '2, 5, 8, 11', '1, 1, 2, 3'], ans: 2, exp: '2, 5, 8, 11 has constant difference of 3.' },
        { q: 'Formula for nth term of AP is:', opts: ['a + nd', 'a + (n-1)d', 'a + (n+1)d', 'na + d'], ans: 1, exp: 'aₙ = a + (n-1)d, where a is first term and d is common difference.' },
        { q: 'If first term = 5, d = 3, find 5th term:', opts: ['15', '17', '20', '18'], ans: 1, exp: 'a₅ = 5 + 4×3 = 5 + 12 = 17.' },
        { q: 'Sum of n terms = n/2[2a + (n-1)d]. What is the formula simplified for last term l?', opts: ['n/2(2a-l)', 'n(a+l)', 'n/2(a+l)', 'n(a-l)'], ans: 2, exp: 'Sₙ = n/2(a + l) where l is the last term.' },
        { q: 'How many terms in AP: 3, 6, 9... 99?', opts: ['30', '32', '33', '29'], ans: 2, exp: 'aₙ = 99, a=3, d=3. 3+(n-1)×3=99 → n-1=32 → n=33.' },
        { q: 'The middle term of AP 7, 13, 19, 25, 31 is:', opts: ['13', '19', '25', '7'], ans: 1, exp: 'Middle term is the 3rd term = 19.' },
        { q: 'If AP is 1, -1, -3, -5... what is d?', opts: ['2', '-2', '1', '-1'], ans: 1, exp: 'd = -1 - 1 = -2.' },
      ]
    },
  ],
  class11_maths: [
    { id: 'c11m1', num: 1, name: 'Sets', meta: '5 lessons • 40 min', video: 'https://www.youtube.com/watch?v=UzaXjhNhsxk', videoLabel: 'Sets - Class 11', notes: 'A set is a well-defined collection of objects.\n\n• Representation: Roster and Set-builder form\n• Types: Empty, Singleton, Finite, Infinite, Universal\n• Operations: Union (∪), Intersection (∩), Complement (A\')\n• De Morgan\'s Law: (A∪B)\' = A\'∩B\'', book: 'https://ncert.nic.in/', pyq: 'https://cbseacademic.nic.in/', quizQuestions: [] },
    { id: 'c11m2', num: 2, name: 'Relations and Functions', meta: '5 lessons • 45 min', video: 'https://youtube.com', videoLabel: 'Relations & Functions - Class 11', notes: 'A relation from set A to B is a subset of A×B.\n\n• Function: Special relation where each element of A maps to exactly one in B\n• Domain, Range, Co-domain\n• Types: One-one, Onto, Into, Bijective\n• Even/Odd functions', book: 'https://ncert.nic.in/', pyq: 'https://cbseacademic.nic.in/', quizQuestions: [] },
  ],
  class12_maths: [
    { id: 'c12m1', num: 1, name: 'Relations and Functions', meta: '6 lessons • 50 min', video: 'https://youtube.com', videoLabel: 'Relations & Functions - Class 12', notes: 'Advanced study of Relations and Functions at Class 12 level.', book: 'https://ncert.nic.in/', pyq: 'https://cbseacademic.nic.in/', quizQuestions: [] },
    { id: 'c12m2', num: 2, name: 'Inverse Trigonometric Functions', meta: '4 lessons • 35 min', video: 'https://youtube.com', videoLabel: 'Inverse Trig - Class 12', notes: 'Inverse of trigonometric functions and their properties.', book: 'https://ncert.nic.in/', pyq: 'https://cbseacademic.nic.in/', quizQuestions: [] },
  ],
};

// Default chapter template for subjects without full data
function getDefaultChapters(moduleId, subjectId) {
  const key = `${moduleId}_${subjectId}`;
  if (chaptersData[key]) return chaptersData[key];
  return [1,2,3,4,5].map(i => ({
    id: `${key}_c${i}`, num: i, name: `Chapter ${i}`,
    meta: '4 lessons • 30 min',
    video: 'https://www.youtube.com/results?search_query=ncert+class+' + moduleId.replace('class','') + '+' + subjectId + '+chapter+' + i,
    videoLabel: `Chapter ${i} - Watch on YouTube`,
    notes: `This chapter covers important topics in ${subjects[subjectId]?.name || subjectId}. Complete the chapter and take the quiz to test your understanding.`,
    book: 'https://ncert.nic.in/',
    pyq: 'https://cbseacademic.nic.in/',
    quizQuestions: getDefaultQuiz(),
  }));
}

function getDefaultQuiz() {
  return [
    { q: 'This is a sample question 1?', opts: ['Option A', 'Option B', 'Option C', 'Option D'], ans: 0, exp: 'Option A is correct.' },
    { q: 'This is a sample question 2?', opts: ['Option A', 'Option B', 'Option C', 'Option D'], ans: 1, exp: 'Option B is correct.' },
    { q: 'This is a sample question 3?', opts: ['Option A', 'Option B', 'Option C', 'Option D'], ans: 2, exp: 'Option C is correct.' },
    { q: 'This is a sample question 4?', opts: ['Option A', 'Option B', 'Option C', 'Option D'], ans: 3, exp: 'Option D is correct.' },
    { q: 'This is a sample question 5?', opts: ['Option A', 'Option B', 'Option C', 'Option D'], ans: 0, exp: 'Option A is correct.' },
  ];
}

// ===== WORD OF THE DAY DATA =====
const words = [
  { word: 'Perseverance', meaning: 'Continued effort despite difficulty or delay' },
  { word: 'Diligence', meaning: 'Careful and hard work; persistent effort' },
  { word: 'Tenacity', meaning: 'The quality of being very determined; holding firm' },
  { word: 'Eloquent', meaning: 'Fluent or persuasive in speaking or writing' },
  { word: 'Ambiguous', meaning: 'Open to more than one interpretation; unclear' },
  { word: 'Ephemeral', meaning: 'Lasting for a very short time' },
  { word: 'Pragmatic', meaning: 'Dealing with things sensibly and realistically' },
  { word: 'Lucid', meaning: 'Expressed clearly; easy to understand' },
  { word: 'Verbose', meaning: 'Using more words than necessary; wordy' },
  { word: 'Discern', meaning: 'To recognize or find out something' },
];

const badges = [
  { name: 'First Login', icon: 'login', color: '#4CAF50', earned: true },
  { name: 'Quiz Master', icon: 'quiz', color: '#FF9800', earned: false },
  { name: 'Chapter Done', icon: 'check_circle', color: '#2196F3', earned: false },
  { name: '3-Day Streak', icon: 'local_fire_department', color: '#F44336', earned: false },
  { name: 'Perfect Score', icon: 'stars', color: '#9C27B0', earned: false },
  { name: 'Week Warrior', icon: 'military_tech', color: '#FF5722', earned: false },
];

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  buildLanguageList();
  buildModuleGrid();

  // Auto advance splash
  setTimeout(() => {
    if (appState.user) {
      showScreen('screen-home');
      updateHomeUI();
    } else {
      showScreen('screen-login');
    }
  }, 2500);
});

function loadState() {
  try {
    const saved = localStorage.getItem('ourschool_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      appState = { ...appState, ...parsed };
    }
  } catch (e) {}
}

function saveState() {
  try { localStorage.setItem('ourschool_state', JSON.stringify(appState)); } catch (e) {}
}

// ===== SCREEN MANAGEMENT =====
function showScreen(id) {
  const prev = document.querySelector('.screen.active');
  if (prev && prev.id !== id) appState.screenHistory.push(prev.id);
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const next = document.getElementById(id);
  if (next) next.classList.add('active');
}

function goBack() {
  if (appState.screenHistory.length) {
    const prev = appState.screenHistory.pop();
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(prev);
    if (el) el.classList.add('active');
  } else {
    showScreen('screen-home');
  }
}

function goHome() {
  appState.screenHistory = [];
  showScreen('screen-home');
  updateHomeUI();
  setActiveNav('home');
}

// ===== LOGIN FLOW =====
document.getElementById('btn-get-otp').addEventListener('click', () => {
  const phone = document.getElementById('phone-input').value.trim();
  if (phone.length !== 10) { showToast('Enter valid 10-digit number'); return; }
  document.getElementById('otp-section').classList.remove('hidden');
  document.getElementById('btn-get-otp').textContent = 'OTP Sent!';
  showToast('OTP sent: 1234 (demo)');
  // OTP auto-jump
  const boxes = document.querySelectorAll('.otp-box');
  boxes.forEach((b, i) => {
    b.addEventListener('input', () => { if (b.value && i < 3) boxes[i+1].focus(); });
    b.addEventListener('keydown', e => { if (e.key === 'Backspace' && !b.value && i > 0) boxes[i-1].focus(); });
  });
});

document.getElementById('btn-verify-otp').addEventListener('click', () => {
  const otp = [...document.querySelectorAll('.otp-box')].map(b => b.value).join('');
  if (otp === '1234') {
    document.getElementById('otp-section').classList.add('hidden');
    document.getElementById('name-section').classList.remove('hidden');
  } else {
    showToast('Wrong OTP. Use 1234');
  }
});

document.getElementById('btn-save-name').addEventListener('click', () => {
  const name = document.getElementById('name-input').value.trim();
  if (!name) { showToast('Please enter your name'); return; }
  const phone = document.getElementById('phone-input').value;
  appState.user = { name, phone };
  saveState();
  showScreen('screen-language');
});

// ===== LANGUAGE =====
function buildLanguageList() {
  const list = document.getElementById('lang-list');
  list.innerHTML = languages.map(l => `
    <div class="lang-item ${appState.language === l.code ? 'selected' : ''}" data-code="${l.code}" onclick="selectLang('${l.code}')">
      <span class="lang-flag">${l.flag}</span>
      <div>
        <div class="lang-name">${l.name}</div>
        <div class="lang-native">${l.native}</div>
      </div>
      <div class="lang-radio"></div>
    </div>
  `).join('');
}

function selectLang(code) {
  appState.language = code;
  document.querySelectorAll('.lang-item').forEach(el => {
    el.classList.toggle('selected', el.dataset.code === code);
  });
}

document.getElementById('btn-save-lang').addEventListener('click', () => {
  saveState();
  showToast('Language saved!');
  showScreen('screen-home');
  updateHomeUI();
});

// ===== HOME =====
function updateHomeUI() {
  if (!appState.user) return;
  const name = appState.user.name;
  document.getElementById('home-username').textContent = name;
  document.getElementById('home-avatar').textContent = name[0].toUpperCase();
  updateProgress();
  updateWotd();
}

let wotdIndex = Math.floor(Math.random() * words.length);
function updateWotd() {
  const w = words[wotdIndex % words.length];
  document.getElementById('wotd-word').textContent = w.word;
  document.getElementById('wotd-meaning').textContent = w.meaning;
}

document.getElementById('wotd-next').addEventListener('click', () => {
  wotdIndex++;
  updateWotd();
});

function updateProgress() {
  const done = appState.completedChapters.length;
  const total = 20;
  const pct = Math.min(100, Math.round((done / total) * 100));
  document.getElementById('prog-pct').textContent = pct + '%';
  const arc = document.getElementById('prog-arc');
  const circum = 2 * Math.PI * 42;
  const fill = (pct / 100) * circum;
  arc.setAttribute('stroke-dasharray', `${fill} ${circum}`);

  const mins = done * 8;
  document.getElementById('daily-mins').textContent = mins + ' min';
  document.getElementById('weekly-mins').textContent = (mins * 4) + ' min';
  document.getElementById('streak-val').textContent = Math.min(done, 7) + ' days';
}

// ===== MODULE GRID =====
const moduleColors = ['#4CAF50','#2196F3','#9C27B0','#F44336','#E91E63','#FF9800','#00BCD4'];
function buildModuleGrid() {
  const grid = document.getElementById('module-grid');
  grid.innerHTML = modules.map((m, i) => {
    const prog = getModuleProgress(m.id);
    return `
      <div class="module-card" style="background: linear-gradient(135deg, ${m.color}, ${m.color}cc)" onclick="openModule('${m.id}')">
        <span class="material-icons-round module-card-icon" style="color:rgba(255,255,255,0.9)">${m.icon}</span>
        <div class="module-card-name">${m.name}</div>
        <div class="module-card-sub">${m.sub}</div>
        <div class="module-card-prog">
          <div class="module-prog-bar"><div class="module-prog-fill" style="width:${prog}%"></div></div>
        </div>
      </div>
    `;
  }).join('');
}

function getModuleProgress(moduleId) {
  if (!appState.progress[moduleId]) return 0;
  return appState.progress[moduleId];
}

// ===== OPEN MODULE =====
function openModule(moduleId) {
  appState.currentModule = moduleId;
  const mod = modules.find(m => m.id === moduleId);
  document.getElementById('module-title').textContent = mod.name;

  const prog = getModuleProgress(moduleId);
  document.getElementById('mpb-bar').style.width = prog + '%';
  document.getElementById('mpb-pct').textContent = prog + '%';

  const grid = document.getElementById('subject-grid');
  grid.innerHTML = mod.subjects.map(sid => {
    const s = subjects[sid] || { name: sid, icon: 'book', color: '#888' };
    const chapters = getDefaultChapters(moduleId, sid);
    return `
      <div class="subject-card" onclick="openSubject('${sid}')">
        <span class="material-icons-round subj-icon" style="color:${s.color}">${s.icon}</span>
        <div class="subj-name">${s.name}</div>
        <div class="subj-chapters">${chapters.length} chapters</div>
      </div>
    `;
  }).join('');

  showScreen('screen-module');
}

// ===== OPEN SUBJECT =====
function openSubject(subjectId) {
  appState.currentSubject = subjectId;
  const s = subjects[subjectId] || { name: subjectId };
  document.getElementById('subject-title').textContent = s.name;

  const chapters = getDefaultChapters(appState.currentModule, subjectId);
  const list = document.getElementById('chapter-list');
  list.innerHTML = chapters.map(ch => {
    const done = appState.completedChapters.includes(ch.id);
    return `
      <div class="chapter-card" onclick="openChapter('${ch.id}', '${subjectId}')">
        <div class="chapter-num">${ch.num}</div>
        <div class="chapter-info">
          <div class="chapter-name">${ch.name}</div>
          <div class="chapter-meta">${ch.meta}</div>
        </div>
        <div class="chapter-status ${done ? 'done' : ''}">
          <span class="material-icons-round">${done ? 'check_circle' : 'radio_button_unchecked'}</span>
        </div>
      </div>
    `;
  }).join('');

  showScreen('screen-subject');
}

// ===== OPEN CHAPTER =====
function openChapter(chapterId, subjectId) {
  const chapters = getDefaultChapters(appState.currentModule, subjectId || appState.currentSubject);
  const ch = chapters.find(c => c.id === chapterId);
  if (!ch) return;
  appState.currentChapter = ch;

  document.getElementById('chapter-title').textContent = ch.name;
  document.getElementById('video-label').textContent = ch.videoLabel;
  document.getElementById('chapter-notes').textContent = ch.notes;
  document.getElementById('book-btn').href = ch.book;
  document.getElementById('pyq-btn').href = ch.pyq;

  document.getElementById('chapter-video').onclick = () => {
    window.open(ch.video, '_blank') || showToast('Open: ' + ch.video);
  };

  document.getElementById('start-quiz-btn').onclick = () => startQuiz(ch);

  showScreen('screen-chapter');
}

// ===== QUIZ =====
let currentDifficulty = 'easy';

function setDifficulty(diff) {
  currentDifficulty = diff;
  document.querySelectorAll('.diff-chip').forEach(c => c.classList.remove('active'));
  document.querySelector('.diff-chip.' + diff).classList.add('active');
}

function startQuiz(chapter) {
  let questions = chapter.quizQuestions || getDefaultQuiz();
  if (!questions.length) questions = getDefaultQuiz();

  // Shuffle and pick 10
  const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, Math.min(10, questions.length));

  appState.quizData = {
    questions: shuffled,
    current: 0,
    score: 0,
    answers: [],
    difficulty: currentDifficulty,
    chapterId: chapter.id,
  };

  showScreen('screen-quiz');
  renderQuestion();
}

function renderQuestion() {
  const { questions, current } = appState.quizData;
  if (current >= questions.length) { showResult(); return; }

  const q = questions[current];
  const total = questions.length;

  document.getElementById('quiz-counter').textContent = `${current + 1}/${total}`;
  document.getElementById('quiz-prog-fill').style.width = `${(current / total) * 100}%`;
  document.getElementById('question-text').textContent = q.q;
  document.getElementById('btn-next-q').style.display = 'none';

  const opts = document.getElementById('options-list');
  opts.innerHTML = q.opts.map((opt, i) => `
    <button class="option-btn" onclick="selectAnswer(${i})">${opt}</button>
  `).join('');
}

function selectAnswer(index) {
  const { questions, current } = appState.quizData;
  const q = questions[current];
  const buttons = document.querySelectorAll('.option-btn');

  buttons.forEach((b, i) => {
    b.classList.add('revealed');
    if (i === q.ans) b.classList.add('correct');
    else if (i === index && index !== q.ans) b.classList.add('wrong');
  });

  const correct = index === q.ans;
  if (correct) appState.quizData.score++;
  appState.quizData.answers.push({ selected: index, correct });

  // Show explanation
  const explanation = document.createElement('div');
  explanation.className = 'explanation';
  explanation.innerHTML = `<strong>${correct ? 'Correct!' : 'Incorrect.'}</strong> ${q.exp}`;
  document.getElementById('options-list').appendChild(explanation);

  document.getElementById('btn-next-q').style.display = 'flex';
}

document.getElementById('btn-next-q').addEventListener('click', () => {
  appState.quizData.current++;
  renderQuestion();
});

function showResult() {
  const { score, questions, chapterId } = appState.quizData;
  const total = questions.length;
  const pct = Math.round((score / total) * 100);

  // Mark chapter complete
  if (!appState.completedChapters.includes(chapterId)) {
    appState.completedChapters.push(chapterId);
  }
  appState.quizScores.push({ chapterId, score, total, date: Date.now() });

  // Update module progress
  if (appState.currentModule) {
    const prev = appState.progress[appState.currentModule] || 0;
    appState.progress[appState.currentModule] = Math.min(100, prev + 10);
  }

  // Check badges
  if (score === total) {
    badges[4].earned = true; // Perfect score
  }
  if (appState.completedChapters.length >= 1) badges[2].earned = true;

  saveState();

  const icons = { 100: 'emoji_events', 70: 'thumb_up', 40: 'sentiment_neutral', 0: 'sentiment_dissatisfied' };
  const msgs = { 100: 'Perfect Score! Excellent!', 70: 'Great Job! Keep it up!', 40: 'Good effort! Review the chapter.', 0: 'Keep practicing!' };
  const colors = { 100: '#FF9800', 70: '#4CAF50', 40: '#2196F3', 0: '#F44336' };

  const tier = pct === 100 ? 100 : pct >= 70 ? 70 : pct >= 40 ? 40 : 0;
  document.getElementById('result-icon').textContent = icons[tier];
  document.getElementById('result-icon').style.color = colors[tier];
  document.getElementById('result-title').textContent = 'Quiz Complete!';
  document.getElementById('result-score').textContent = `${score}/${total}`;
  document.getElementById('result-msg').textContent = msgs[tier];

  // Details
  const details = document.getElementById('result-details');
  details.innerHTML = appState.quizData.questions.map((q, i) => {
    const a = appState.quizData.answers[i] || { correct: false };
    return `
      <div class="result-item">
        <span class="material-icons-round" style="color:${a.correct ? '#4CAF50' : '#F44336'}">${a.correct ? 'check_circle' : 'cancel'}</span>
        <div class="ri-text"><strong>Q${i+1}:</strong> ${q.q.substring(0, 60)}...</div>
      </div>
    `;
  }).join('');

  showScreen('screen-result');
}

function retryQuiz() {
  if (appState.currentChapter) startQuiz(appState.currentChapter);
}

// ===== TABS =====
function switchTab(tab) {
  setActiveNav(tab);
  if (tab === 'home') { goHome(); return; }
  if (tab === 'progress') { showProgressScreen(); showScreen('screen-progress'); return; }
  if (tab === 'profile') { showProfileScreen(); showScreen('screen-profile'); return; }
  if (tab === 'subjects') { openModule(modules[0].id); return; }
  if (tab === 'quizzes') { openModule(modules[0].id); return; }
}

function setActiveNav(tab) {
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tab);
  });
}

function showProgressScreen() {
  const container = document.getElementById('prog-module-list');
  container.innerHTML = modules.map(m => {
    const prog = getModuleProgress(m.id);
    return `
      <div class="prog-mod-card">
        <div class="pmc-header">
          <span class="material-icons-round pmc-icon" style="color:${m.color}">${m.icon}</span>
          <span class="pmc-name">${m.name}</span>
          <span class="pmc-pct">${prog}%</span>
        </div>
        <div class="pmc-bar-wrap"><div class="pmc-bar" style="width:${prog}%;background:${m.color}"></div></div>
      </div>
    `;
  }).join('');

  const bg = document.getElementById('badges-grid');
  bg.innerHTML = badges.map(b => `
    <div class="badge-card ${b.earned ? '' : 'locked'}">
      <div class="badge-icon"><span class="material-icons-round" style="color:${b.color}">${b.icon}</span></div>
      <div class="badge-name">${b.name}</div>
    </div>
  `).join('');
}

function showProfileScreen() {
  if (!appState.user) return;
  document.getElementById('profile-name').textContent = appState.user.name;
  document.getElementById('profile-phone').textContent = '+91 ' + appState.user.phone;
  document.getElementById('profile-avatar').textContent = appState.user.name[0].toUpperCase();
  document.getElementById('ps-chapters').textContent = appState.completedChapters.length;
  document.getElementById('ps-quizzes').textContent = appState.quizScores.length;
  document.getElementById('ps-badges').textContent = badges.filter(b => b.earned).length;
}

function setGoalPrompt() {
  const goal = prompt('Set daily study goal (minutes):', '30');
  if (goal && !isNaN(goal)) showToast(`Daily goal set: ${goal} minutes`);
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    appState.user = null;
    localStorage.removeItem('ourschool_state');
    appState = { user: null, language: 'en', currentModule: null, currentSubject: null, currentChapter: null, screenHistory: [], quizData: { questions: [], current: 0, score: 0, answers: [], difficulty: 'easy' }, progress: {}, completedChapters: [], quizScores: [] };
    showScreen('screen-login');
    // Reset login form
    document.getElementById('phone-input').value = '';
    document.querySelectorAll('.otp-box').forEach(b => b.value = '');
    document.getElementById('otp-section').classList.add('hidden');
    document.getElementById('name-section').classList.add('hidden');
    document.getElementById('btn-get-otp').innerHTML = '<span class="material-icons-round">sms</span> Get OTP';
  }
}

// ===== TOAST =====
function showToast(msg) {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
