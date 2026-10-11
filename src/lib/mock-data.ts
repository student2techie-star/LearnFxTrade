import { Course, Lesson, PayoutCertificate, User, Order, Enrollment } from './types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-forex-mastery',
    slug: 'forex-smart-money-concepts-mastery',
    title: 'Institutional Forex & Smart Money Concepts (SMC) Mastery',
    tagline: 'Trade like central banks and institutions. Master liquidity pools, order blocks, and supply/demand.',
    description: 'A comprehensive, battle-tested system to trade currency pairs (EUR/USD, GBP/JPY, XAU/USD gold) using algorithmic order flow, fair value gaps, liquidity grabs, and strict 1:3+ risk-to-reward ratios. Specially tailored for clearing prop firm challenges (FTMO, FundedNext, MFF).',
    priceInr: 4999,
    originalPriceInr: 14999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    category: 'Forex',
    level: 'Masterclass',
    isPublished: true,
    features: [
      'Institutional Smart Money Concepts (SMC) & Liquidity mapping',
      'Step-by-step Prop Firm Evaluation pass framework',
      'High-probability London & New York session models',
      'Gold (XAU/USD) & Forex pairs intraday scalping blueprints',
      'Prop Firm payout certificate strategy & risk manager spreadsheet',
      'Lifetime community access & weekly live market breakdowns'
    ],
    lessonsCount: 12,
    totalDuration: '14 Hours',
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'course-nifty-banknifty',
    slug: 'indian-market-options-price-action-pro',
    title: 'Indian Market: Nifty & BankNifty Price Action Blueprint',
    tagline: 'Master intraday index trading and option buying with precise pure price action and open interest.',
    description: 'Learn how to trade Nifty 50, Bank Nifty, and FinNifty with supreme precision. Avoid common retail traps, master CPR, volume profile, open interest (OI) data interpretation, and high-momentum expiry day setups.',
    priceInr: 3999,
    originalPriceInr: 11999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
    category: 'Indian Market',
    level: 'Intermediate',
    isPublished: true,
    features: [
      'Nifty & BankNifty institutional trap identification',
      'Option Buying vs Option Selling strategy breakdown',
      'Real-time Open Interest (OI) analysis & PCR manipulation clues',
      'Camarilla pivots & Central Pivot Range (CPR) mastery',
      'Expiry day Hero-or-Zero risk-controlled setups',
      'SEBI compliant trading discipline & capital preservation rules'
    ],
    lessonsCount: 10,
    totalDuration: '11 Hours',
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'course-prop-firm-accelerator',
    slug: 'prop-firm-funded-trader-accelerator',
    title: 'The Prop Firm Funded Trader Accelerator',
    tagline: 'Crack $100K & $200K funded accounts without blowing drawdowns. Repeatable payouts formula.',
    description: 'Detailed blueprint on passing Phase 1 & Phase 2 evaluations across FTMO, FundedNext, Alpha Capital, and The Funded Trader. Learn the psychology, daily drawdown buffers, position sizing algorithms, and weekend risk rules.',
    priceInr: 2999,
    originalPriceInr: 8999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    category: 'Forex',
    level: 'Advanced',
    isPublished: true,
    features: [
      'Evaluation phase execution manual (0.5% max risk per trade)',
      'Avoiding simulated slippage and news event pitfalls',
      'Real account payout guidelines & biometric profit harvesting',
      'Includes proprietary Lot Size & Drawdown Risk Calculator',
      'Real payout certificate proofs and case studies'
    ],
    lessonsCount: 8,
    totalDuration: '8.5 Hours',
    createdAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 'course-trading-psychology',
    slug: 'elite-trader-psychology-and-risk-system',
    title: 'Elite Trading Psychology & Strict Risk Engineering',
    tagline: 'Stop revenge trading, eliminate emotional tilt, and build an unbreakable trader mind.',
    description: 'Technical analysis is only 20% of trading; 80% is emotional control and probability mathematics. Master trade journaling, dealing with losing streaks, and executing trades without fear.',
    priceInr: 1999,
    originalPriceInr: 5999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    category: 'Psychology',
    level: 'Beginner',
    isPublished: true,
    features: [
      'Eliminating FOMO and Revenge Trading protocols',
      'Probability mindset & cognitive reframing techniques',
      'Standard Operating Procedure (SOP) pre-market checklists',
      'Daily performance tracking template included'
    ],
    lessonsCount: 6,
    totalDuration: '6 Hours',
    createdAt: '2026-02-10T10:00:00Z'
  }
];

export const INITIAL_LESSONS: Lesson[] = [
  // Forex Course Lessons
  {
    id: 'les-fx-1',
    courseId: 'course-forex-mastery',
    title: 'Lesson 1: Introduction to Institutional Market Structure (Free Preview)',
    videoId: 'M7lc1UVf-VE', // Clean YouTube preview video
    duration: '22:15',
    orderNo: 1,
    isFreePreview: true,
    description: 'Learn why retail support and resistance fail and how institutional banks engineer liquidity.'
  },
  {
    id: 'les-fx-2',
    courseId: 'course-forex-mastery',
    title: 'Lesson 2: Identifying Liquidity Pools & Stop Runs (Free Preview)',
    videoId: 'kJQP7kiw5Fk',
    duration: '28:40',
    orderNo: 2,
    isFreePreview: true,
    description: 'Deep dive into buy-side and sell-side liquidity grabs across London Open session.'
  },
  {
    id: 'les-fx-3',
    courseId: 'course-forex-mastery',
    title: 'Lesson 3: Order Blocks & Fair Value Gaps (FVG) Refinement',
    videoId: 'dQw4w9WgXcQ', // Secured behind login/enrollment
    duration: '35:10',
    orderNo: 3,
    isFreePreview: false,
    description: 'How to enter high-confluence trades with tight 5-10 pip stops using 1m and 5m refinement.'
  },
  {
    id: 'les-fx-4',
    courseId: 'course-forex-mastery',
    title: 'Lesson 4: Gold (XAU/USD) High Volatility Session Model',
    videoId: '3JZ_D3ELwOQ',
    duration: '41:20',
    orderNo: 4,
    isFreePreview: false,
    description: 'Trading Gold during NY Open and US CPI/PPI releases with defined invalidation levels.'
  },
  {
    id: 'les-fx-5',
    courseId: 'course-forex-mastery',
    title: 'Lesson 5: Risk Management & Passing 100K Prop Firm Challenges',
    videoId: 'fJ9rUzIMcZQ',
    duration: '30:05',
    orderNo: 5,
    isFreePreview: false,
    description: 'Managing max daily loss of 5% and overall loss of 10% with mathematical certainty.'
  },

  // Indian Market Lessons
  {
    id: 'les-in-1',
    courseId: 'course-nifty-banknifty',
    title: 'Lesson 1: The Indian Market Ecosystem & Index Microstructure (Free Preview)',
    videoId: 'L_LUpnjgPso',
    duration: '24:50',
    orderNo: 1,
    isFreePreview: true,
    description: 'Understanding the mechanics of Nifty 50, Bank Nifty, and heavyweights weightage.'
  },
  {
    id: 'les-in-2',
    courseId: 'course-nifty-banknifty',
    title: 'Lesson 2: Option Buying Setups using Open Interest & Volume Profile',
    videoId: 'ZXsQAXx_ao0',
    duration: '33:12',
    orderNo: 2,
    isFreePreview: false,
    description: 'How to time explosive option buyer entries to avoid theta decay.'
  },
  {
    id: 'les-in-3',
    courseId: 'course-nifty-banknifty',
    title: 'Lesson 3: CPR & Camarilla Pivot Range Strategy for Trending Days',
    videoId: 'C0DPdy98e4c',
    duration: '29:45',
    orderNo: 3,
    isFreePreview: false,
    description: 'Finding virgin CPR levels and directional breakouts on intraday charts.'
  },

  // Prop Firm Accelerator Lessons
  {
    id: 'les-prop-1',
    courseId: 'course-prop-firm-accelerator',
    title: 'Lesson 1: Prop Firm Rules Decoded: FTMO, FundedNext & MFF (Free Preview)',
    videoId: 'OPf0YbXqDm0',
    duration: '19:40',
    orderNo: 1,
    isFreePreview: true,
    description: 'How to choose the best prop firms without hidden spread widening and strict rules.'
  },
  {
    id: 'les-prop-2',
    courseId: 'course-prop-firm-accelerator',
    title: 'Lesson 2: The 0.5% Consistency Model for Evaluation Passing',
    videoId: 'V-_O7nl0Ii0',
    duration: '31:15',
    orderNo: 2,
    isFreePreview: false,
    description: 'Why 0.5% risk guarantees passing in 15 trading days without touching max drawdown.'
  },

  // Psychology Lessons
  {
    id: 'les-psy-1',
    courseId: 'course-trading-psychology',
    title: 'Lesson 1: The Psychology of Drawdowns & Acceptance (Free Preview)',
    videoId: 'kJQP7kiw5Fk',
    duration: '21:10',
    orderNo: 1,
    isFreePreview: true,
    description: 'Learn to accept that losses are merely the cost of doing business in trading.'
  },
  {
    id: 'les-psy-2',
    courseId: 'course-trading-psychology',
    title: 'Lesson 2: Building your Pre-Market Checklist & Execution Discipline',
    videoId: 'M7lc1UVf-VE',
    duration: '27:30',
    orderNo: 2,
    isFreePreview: false,
    description: 'Daily SOP ritual before the opening bell to ensure zero impulsive clicks.'
  }
];

export const INITIAL_CERTIFICATES: PayoutCertificate[] = [
  {
    id: 'cert-1',
    title: '$14,850 Bi-Weekly Payout Certificate',
    firmOrBroker: 'FundedNext Prop Firm',
    amount: '$14,850 (₹12,47,400)',
    date: 'February 18, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    accountType: 'Prop Firm Funded',
    verifiedRef: 'FN-PAY-2026-98124',
    orderNo: 1,
    isVisible: true
  },
  {
    id: 'cert-2',
    title: '$8,240 Profit Split Certificate',
    firmOrBroker: 'FTMO Funded Account',
    amount: '$8,240 (₹6,92,160)',
    date: 'January 24, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80',
    accountType: 'Prop Firm Funded',
    verifiedRef: 'FTMO-CERT-441029',
    orderNo: 2,
    isVisible: true
  },
  {
    id: 'cert-3',
    title: '₹4,50,000 Zerodha Net Payout Statement',
    firmOrBroker: 'Zerodha Broking Ltd (Indian Market)',
    amount: '₹4,50,000',
    date: 'January 12, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    accountType: 'Live Broker Payout',
    verifiedRef: 'ZER-WD-8812901',
    orderNo: 3,
    isVisible: true
  },
  {
    id: 'cert-4',
    title: '$22,400 Milestone Certificate ($200K Account)',
    firmOrBroker: 'Alpha Capital Group',
    amount: '$22,400 (₹18,81,600)',
    date: 'December 28, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
    accountType: 'Prop Firm Funded',
    verifiedRef: 'ACG-PAY-77123',
    orderNo: 4,
    isVisible: true
  },
  {
    id: 'cert-5',
    title: '$5,900 Funded Account Scaling Certificate',
    firmOrBroker: 'The Funded Trader',
    amount: '$5,900 (₹4,95,600)',
    date: 'November 15, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    accountType: 'Evaluation Pass',
    verifiedRef: 'TFT-PASSED-33109',
    orderNo: 5,
    isVisible: true
  },
  {
    id: 'cert-6',
    title: '₹8,20,000 Quarterly Indian Equities Payout',
    firmOrBroker: 'Angel One Ltd',
    amount: '₹8,20,000',
    date: 'October 20, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    accountType: 'Live Broker Payout',
    verifiedRef: 'ANGEL-PAY-55291',
    orderNo: 6,
    isVisible: true
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Somnath (Lead Mentor & Trader)',
    email: 'admin@learnfxtrade.com',
    phone: '+91 98765 43210',
    role: 'admin',
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'user-demo-student',
    name: 'Rahul Sharma',
    email: 'student@example.com',
    phone: '+91 98111 22334',
    role: 'student',
    createdAt: '2026-01-20T12:00:00Z'
  }
];

export const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    id: 'enr-1',
    userId: 'user-demo-student',
    courseId: 'course-forex-mastery',
    orderId: 'order-sample-1',
    grantedAt: '2026-01-20T12:30:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'order-sample-1',
    userId: 'user-demo-student',
    userEmail: 'student@example.com',
    courseId: 'course-forex-mastery',
    courseTitle: 'Institutional Forex & Smart Money Concepts (SMC) Mastery',
    razorpayOrderId: 'order_RZP98231sample',
    amount: 4999,
    currency: 'INR',
    status: 'paid',
    createdAt: '2026-01-20T12:28:00Z'
  }
];
