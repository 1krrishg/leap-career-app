'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CompanyPrep {
  id: number;
  name: string;
  logo: string;
  color: string;
  description: string;
  commonQuestions: string[];
  sampleAnswers: string[];
  expertTips: string[];
  interviewProcess: string[];
}

// Generic Interview Questions for all companies
const genericQuestions = {
  behavioral: [
    "Tell me about yourself",
    "Why do you want to work here?",
    "What are your strengths and weaknesses?",
    "Where do you see yourself in 5 years?",
    "Why should we hire you?",
    "Tell me about a challenging project you worked on",
    "How do you handle stress and pressure?",
    "Describe a time you had to learn something quickly",
    "Tell me about a time you failed and what you learned",
    "How do you handle criticism?",
    "Describe a situation where you had to work with a difficult person",
    "Tell me about a time you went above and beyond",
    "How do you prioritize your work?",
    "Describe a time you had to make a decision without all the information",
    "Tell me about a time you had to persuade someone"
  ],
  technical: [
    "Explain a complex technical concept to a non-technical person",
    "How do you stay updated with industry trends?",
    "What's your approach to debugging?",
    "How do you handle technical disagreements with colleagues?",
    "Describe your ideal development environment",
    "How do you ensure code quality?",
    "What's your experience with version control?",
    "How do you approach system design?",
    "What's your testing strategy?",
    "How do you handle technical debt?"
  ],
  situational: [
    "How would you handle a tight deadline?",
    "What would you do if you disagreed with your manager?",
    "How do you handle competing priorities?",
    "What's your approach to learning new technologies?",
    "How do you handle ambiguity in projects?",
    "What would you do if a project was failing?",
    "How do you handle feedback from stakeholders?",
    "What's your approach to mentoring others?",
    "How do you handle scope creep?",
    "What would you do if you made a mistake?"
  ]
};

const companyData: CompanyPrep[] = [
  {
    id: 1,
    name: "Google",
    logo: "🔍",
    color: "from-blue-500 to-blue-600",
    description: "Focus on problem-solving, algorithms, and behavioral questions. Google values creativity and innovation.",
    commonQuestions: [
      "How would you solve this coding problem?",
      "Tell me about a time you failed and what you learned",
      "How would you improve Google Maps?",
      "Design a system to handle millions of requests",
      "How do you approach algorithm optimization?",
      "Tell me about a time you had to make a technical decision"
    ],
    sampleAnswers: [
      "I would approach this systematically, first understanding the constraints, then breaking it down into smaller subproblems...",
      "I once led a project that didn't meet our initial goals, but I learned valuable lessons about communication and planning...",
      "I would focus on real-time traffic updates, user-generated content, and AI-powered route optimization...",
      "I'd use a distributed system with load balancers, caching layers, and microservices architecture...",
      "I start by analyzing time and space complexity, then optimize based on the most critical constraints...",
      "I gathered input from the team, evaluated trade-offs, and made a data-driven decision..."
    ],
    expertTips: [
      "Practice coding problems on LeetCode",
      "Focus on clean, readable code",
      "Think out loud during problem-solving",
      "Show passion for technology and innovation",
      "Research Google's products and culture",
      "Prepare for system design questions"
    ],
    interviewProcess: [
      "Phone screen with recruiter",
      "Technical phone interview",
      "Onsite interviews (4-5 rounds)",
      "Coding, system design, and behavioral"
    ]
  },
  {
    id: 2,
    name: "Amazon",
    logo: "📦",
    color: "from-orange-500 to-orange-600",
    description: "Emphasize leadership principles, customer obsession, and operational excellence. Prepare for STAR method questions.",
    commonQuestions: [
      "Tell me about a time you disagreed with your manager",
      "How do you handle competing priorities?",
      "Describe a situation where you had to make a decision with incomplete data",
      "What's your approach to customer feedback?",
      "Tell me about a time you had to deliver bad news",
      "How do you handle operational challenges?"
    ],
    sampleAnswers: [
      "I respectfully presented data and alternative solutions, focusing on customer impact and business outcomes...",
      "I prioritize based on customer impact and business urgency, communicating clearly with stakeholders...",
      "I gather available information, assess risks, make the best decision possible, and iterate based on results...",
      "I listen actively, validate understanding, and take immediate action to address concerns...",
      "I delivered the news directly, explained the context, and proposed solutions to mitigate the impact...",
      "I analyze the root cause, implement immediate fixes, and develop long-term solutions..."
    ],
    expertTips: [
      "Memorize Amazon's 16 Leadership Principles",
      "Use STAR method for all behavioral questions",
      "Focus on customer impact in all answers",
      "Show bias for action and ownership",
      "Research Amazon's business model",
      "Prepare for operational excellence questions"
    ],
    interviewProcess: [
      "Online assessment",
      "Phone screen",
      "Onsite interviews (4-5 rounds)",
      "Leadership principles and technical skills"
    ]
  },
  {
    id: 3,
    name: "Microsoft",
    logo: "🪟",
    color: "from-green-500 to-green-600",
    description: "Focus on technical skills, collaboration, and growth mindset. Microsoft values learning and adaptability.",
    commonQuestions: [
      "How do you stay updated with technology trends?",
      "Tell me about a challenging technical problem you solved",
      "How do you handle working with difficult team members?",
      "What's your experience with cloud technologies?",
      "How do you approach learning new technologies?",
      "Tell me about a time you had to adapt to change"
    ],
    sampleAnswers: [
      "I follow industry blogs, attend conferences, and experiment with new technologies in personal projects...",
      "I tackled a performance issue by profiling the code, identifying bottlenecks, and implementing optimizations...",
      "I focus on common goals, communicate clearly, and find ways to leverage each person's strengths...",
      "I have experience with Azure services, including compute, storage, and networking components...",
      "I start with documentation, build small projects, and gradually increase complexity...",
      "I embraced the change, learned the new requirements, and helped my team adapt..."
    ],
    expertTips: [
      "Show passion for technology and learning",
      "Demonstrate collaboration skills",
      "Be prepared for system design questions",
      "Research Microsoft's products and culture",
      "Focus on growth mindset",
      "Prepare for Azure-specific questions"
    ],
    interviewProcess: [
      "Initial phone screen",
      "Technical phone interview",
      "Onsite interviews (3-4 rounds)",
      "Coding, design, and behavioral"
    ]
  },
  {
    id: 4,
    name: "Apple",
    logo: "🍎",
    color: "from-gray-600 to-gray-700",
    description: "Focus on design thinking, user experience, and attention to detail. Apple values creativity and quality.",
    commonQuestions: [
      "How do you approach user experience design?",
      "Tell me about a time you had to balance form and function",
      "How do you handle feedback from users?",
      "What's your experience with iOS development?",
      "How do you ensure quality in your work?",
      "Tell me about a time you had to think differently"
    ],
    sampleAnswers: [
      "I start by understanding user needs, then iterate through design and testing phases...",
      "I prioritize user needs while maintaining aesthetic appeal and technical feasibility...",
      "I listen carefully, validate understanding, and iterate based on user feedback...",
      "I have experience with Swift, UIKit, and following Apple's design guidelines...",
      "I implement thorough testing, code reviews, and continuous integration processes...",
      "I challenged conventional thinking and proposed an innovative solution..."
    ],
    expertTips: [
      "Research Apple's design philosophy",
      "Show attention to detail",
      "Demonstrate creativity and innovation",
      "Prepare for iOS-specific questions",
      "Focus on user-centric thinking",
      "Understand Apple's ecosystem"
    ],
    interviewProcess: [
      "Phone screen",
      "Technical interview",
      "Onsite interviews (3-4 rounds)",
      "Design, technical, and behavioral"
    ]
  },
  {
    id: 5,
    name: "Meta (Facebook)",
    logo: "📘",
    color: "from-blue-600 to-blue-700",
    description: "Focus on scale, social impact, and rapid iteration. Meta values moving fast and breaking things.",
    commonQuestions: [
      "How would you design a social media feature?",
      "Tell me about a time you had to scale a system",
      "How do you handle user privacy concerns?",
      "What's your experience with React?",
      "How do you approach rapid prototyping?",
      "Tell me about a time you had to make a quick decision"
    ],
    sampleAnswers: [
      "I'd start with user research, design the feature, and iterate based on user feedback...",
      "I identified bottlenecks, implemented caching, and used horizontal scaling techniques...",
      "I prioritize user privacy by implementing proper data handling and security measures...",
      "I have extensive experience with React, including hooks, context, and performance optimization...",
      "I use rapid prototyping tools and focus on core functionality first...",
      "I gathered available information, made the best decision possible, and iterated based on results..."
    ],
    expertTips: [
      "Research Meta's products and culture",
      "Show passion for social impact",
      "Demonstrate ability to move fast",
      "Prepare for React-specific questions",
      "Focus on scale and performance",
      "Understand social media challenges"
    ],
    interviewProcess: [
      "Phone screen",
      "Technical phone interview",
      "Onsite interviews (4-5 rounds)",
      "Coding, system design, and behavioral"
    ]
  },
  {
    id: 6,
    name: "Netflix",
    logo: "🎬",
    color: "from-red-500 to-red-600",
    description: "Focus on freedom and responsibility, high performance, and data-driven decisions. Netflix values autonomy.",
    commonQuestions: [
      "How do you handle freedom and responsibility?",
      "Tell me about a time you had to make a data-driven decision",
      "How do you approach performance optimization?",
      "What's your experience with microservices?",
      "How do you handle ambiguity?",
      "Tell me about a time you had to innovate"
    ],
    sampleAnswers: [
      "I take ownership of my work, make informed decisions, and hold myself accountable for results...",
      "I analyzed user data, identified patterns, and made recommendations based on evidence...",
      "I profile the system, identify bottlenecks, and implement targeted optimizations...",
      "I have experience designing and implementing microservices with proper communication patterns...",
      "I break down complex problems, gather information, and make the best decision possible...",
      "I identified an opportunity, proposed a solution, and successfully implemented it..."
    ],
    expertTips: [
      "Research Netflix's culture and values",
      "Show autonomy and responsibility",
      "Demonstrate data-driven thinking",
      "Prepare for performance questions",
      "Focus on innovation and creativity",
      "Understand streaming technology"
    ],
    interviewProcess: [
      "Phone screen",
      "Technical interview",
      "Onsite interviews (3-4 rounds)",
      "Technical, behavioral, and culture fit"
    ]
  },
  {
    id: 7,
    name: "Deloitte",
    logo: "🏢",
    color: "from-green-600 to-green-700",
    description: "Focus on consulting skills, business acumen, and client relationships. Deloitte values analytical thinking and communication.",
    commonQuestions: [
      "How would you approach a client problem with limited information?",
      "Tell me about a time you had to influence without authority",
      "How do you handle ambiguity in projects?",
      "What's your experience with data analysis?",
      "How do you build client relationships?",
      "Tell me about a time you had to present to senior stakeholders"
    ],
    sampleAnswers: [
      "I would start by asking clarifying questions, conducting research, and developing a structured approach...",
      "I built relationships, presented compelling data, and focused on mutual benefits to gain buy-in...",
      "I break down complex problems, create clear milestones, and maintain open communication...",
      "I have experience with Excel, SQL, and visualization tools to derive insights from data...",
      "I listen actively, understand their needs, and deliver value consistently...",
      "I prepared thoroughly, focused on key messages, and adapted to their feedback..."
    ],
    expertTips: [
      "Practice case studies and frameworks",
      "Show strong communication skills",
      "Demonstrate analytical thinking",
      "Research Deloitte's service offerings",
      "Focus on client-centric approach",
      "Prepare for consulting-specific questions"
    ],
    interviewProcess: [
      "Initial phone screen",
      "Case study interview",
      "Behavioral interview",
      "Partner interview"
    ]
  },
  {
    id: 8,
    name: "McKinsey",
    logo: "📊",
    color: "from-blue-600 to-blue-700",
    description: "Focus on problem-solving frameworks, quantitative skills, and structured thinking. McKinsey values intellectual curiosity.",
    commonQuestions: [
      "How would you estimate the market size for electric vehicles?",
      "Tell me about a time you had to work with incomplete data",
      "How do you approach ambiguous problems?",
      "What's your experience with Excel and PowerPoint?",
      "How do you handle client relationships?",
      "Tell me about a time you had to influence senior leaders"
    ],
    sampleAnswers: [
      "I'd use a top-down approach: total cars sold annually, penetration rate, and average price...",
      "I identified what data was available, made reasonable assumptions, and validated with stakeholders...",
      "I break down the problem, identify key drivers, and develop a structured hypothesis...",
      "I'm proficient with advanced Excel functions, pivot tables, and creating compelling presentations...",
      "I build trust through consistent delivery, clear communication, and understanding their needs...",
      "I presented compelling data, focused on their priorities, and demonstrated clear value..."
    ],
    expertTips: [
      "Practice mental math and estimation",
      "Learn consulting frameworks (MECE, etc.)",
      "Show structured thinking",
      "Demonstrate intellectual curiosity",
      "Focus on quantitative skills",
      "Prepare for case study questions"
    ],
    interviewProcess: [
      "Online assessment",
      "First round case interview",
      "Second round case interview",
      "Final round with partners"
    ]
  },
  {
    id: 9,
    name: "Goldman Sachs",
    logo: "💰",
    color: "from-yellow-500 to-yellow-600",
    description: "Focus on financial knowledge, risk management, and analytical skills. Goldman Sachs values precision and attention to detail.",
    commonQuestions: [
      "How do you handle financial risk?",
      "Tell me about a time you had to analyze complex data",
      "What's your experience with financial modeling?",
      "How do you stay updated with market trends?",
      "Tell me about a time you had to work under pressure",
      "How do you approach regulatory compliance?"
    ],
    sampleAnswers: [
      "I assess risk systematically, implement controls, and monitor outcomes continuously...",
      "I used statistical analysis, identified patterns, and presented clear insights to stakeholders...",
      "I have experience building financial models in Excel, including DCF and sensitivity analysis...",
      "I follow financial news, attend industry events, and analyze market data regularly...",
      "I prioritize tasks, maintain focus, and deliver high-quality results under tight deadlines...",
      "I stay informed about regulations, implement proper controls, and maintain documentation..."
    ],
    expertTips: [
      "Research financial markets and products",
      "Show strong analytical skills",
      "Demonstrate attention to detail",
      "Prepare for financial modeling questions",
      "Focus on risk management",
      "Understand regulatory environment"
    ],
    interviewProcess: [
      "Phone screen",
      "Technical interview",
      "Superday (multiple interviews)",
      "Technical, behavioral, and case studies"
    ]
  },
  {
    id: 10,
    name: "JP Morgan",
    logo: "🏦",
    color: "from-blue-700 to-blue-800",
    description: "Focus on financial services, technology innovation, and client relationships. JP Morgan values integrity and excellence.",
    commonQuestions: [
      "How do you approach financial technology?",
      "Tell me about a time you had to work with legacy systems",
      "What's your experience with cybersecurity?",
      "How do you handle regulatory requirements?",
      "Tell me about a time you had to innovate",
      "How do you build trust with clients?"
    ],
    sampleAnswers: [
      "I focus on user needs, implement robust security, and ensure regulatory compliance...",
      "I analyzed the existing system, planned the migration carefully, and minimized disruption...",
      "I implement security best practices, conduct regular audits, and stay updated with threats...",
      "I stay informed about regulations, implement proper controls, and maintain documentation...",
      "I identified an opportunity, proposed a solution, and successfully implemented it...",
      "I deliver consistent value, communicate clearly, and always act with integrity..."
    ],
    expertTips: [
      "Research JP Morgan's business lines",
      "Show understanding of financial services",
      "Demonstrate technology expertise",
      "Prepare for regulatory questions",
      "Focus on client-centric approach",
      "Understand banking technology"
    ],
    interviewProcess: [
      "Phone screen",
      "Technical interview",
      "Onsite interviews (3-4 rounds)",
      "Technical, behavioral, and case studies"
    ]
  }
];

export default function InterviewPrepPage() {
  const [selectedCompany, setSelectedCompany] = useState<CompanyPrep | null>(null);
  const [showMockInterview, setShowMockInterview] = useState(false);
  const [mockInterviewStep, setMockInterviewStep] = useState(0);
  const [activeTab, setActiveTab] = useState<'companies' | 'generic' | 'mock-interview'>('companies');
  const [selectedQuestionType, setSelectedQuestionType] = useState<'behavioral' | 'technical' | 'situational'>('behavioral');

  const startMockInterview = (company: CompanyPrep) => {
    setSelectedCompany(company);
    setShowMockInterview(true);
    setMockInterviewStep(0);
    setActiveTab('mock-interview');
  };

  const nextMockInterviewStep = () => {
    if (selectedCompany && mockInterviewStep < selectedCompany.commonQuestions.length - 1) {
      setMockInterviewStep(mockInterviewStep + 1);
    } else {
      setShowMockInterview(false);
      alert('Mock interview completed! Great job!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/master" className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block">
            ← Back to Master Menu
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Interview Preparation</h1>
          <p className="text-gray-600">Prepare for interviews with top companies and practice common questions</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('companies')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'companies' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Company-Specific Prep
            </button>
            <button
              onClick={() => setActiveTab('generic')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'generic' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Generic Questions
            </button>
            <button
              onClick={() => setActiveTab('mock-interview')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'mock-interview' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mock Interviews
            </button>
          </div>
        </div>

        {activeTab === 'companies' && (
          <>
            {/* Company Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {companyData.map((company) => (
            <div key={company.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className={`bg-gradient-to-r ${company.color} p-6 text-white`}>
                <div className="text-4xl mb-2">{company.logo}</div>
                <h3 className="text-xl font-semibold mb-2">{company.name}</h3>
                <p className="text-sm opacity-90">{company.description}</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Interview Process</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {company.interviewProcess.map((step, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedCompany(company)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => startMockInterview(company)}
                      className="flex-1 border border-blue-500 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Mock Interview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
            </div>
          </>
        )}

        {activeTab === 'generic' && (
          <div className="space-y-8">
            {/* Question Type Selector */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Generic Interview Questions</h2>
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
                <button
                  onClick={() => setSelectedQuestionType('behavioral')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    selectedQuestionType === 'behavioral' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Behavioral Questions
                </button>
                <button
                  onClick={() => setSelectedQuestionType('technical')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    selectedQuestionType === 'technical' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Technical Questions
                </button>
                <button
                  onClick={() => setSelectedQuestionType('situational')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    selectedQuestionType === 'situational' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Situational Questions
                </button>
              </div>

              {/* Questions List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Questions</h3>
                  <div className="space-y-3">
                    {genericQuestions[selectedQuestionType].map((question, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                        <p className="text-sm text-gray-700 font-medium">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Answer Framework</h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">STAR Method (Situation, Task, Action, Result)</h4>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li><strong>Situation:</strong> Describe the context and background</li>
                      <li><strong>Task:</strong> Explain your responsibility and goals</li>
                      <li><strong>Action:</strong> Detail the steps you took</li>
                      <li><strong>Result:</strong> Share the outcomes and lessons learned</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-green-900 mb-2">Pro Tips</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Prepare 3-5 stories for each question type</li>
                      <li>• Use specific examples with numbers and metrics</li>
                      <li>• Practice your answers out loud</li>
                      <li>• Keep answers under 2 minutes</li>
                      <li>• Show enthusiasm and confidence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mock-interview' && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Mock Interview Practice</h2>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose a Company</h3>
              <p className="text-gray-600">Select a company from the "Company-Specific Prep" tab to start a mock interview</p>
            </div>
          </div>
        )}

        {/* Company Details Modal */}
        {selectedCompany && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{selectedCompany.logo}</div>
                  <h3 className="text-2xl font-semibold text-gray-900">{selectedCompany.name} Interview Prep</h3>
                </div>
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Common Questions */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Common Questions</h4>
                  <div className="space-y-3">
                    {selectedCompany.commonQuestions.map((question, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Answers */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Sample Answer Approach</h4>
                  <div className="space-y-3">
                    {selectedCompany.sampleAnswers.map((answer, index) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">{answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expert Tips */}
                <div className="lg:col-span-2">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Expert Tips</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCompany.expertTips.map((tip, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">💡</span>
                        <span className="text-gray-700">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-6">
                <button
                  onClick={() => startMockInterview(selectedCompany)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Start Mock Interview
                </button>
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mock Interview Modal */}
        {showMockInterview && selectedCompany && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Mock Interview with {selectedCompany.name}
                </h3>
                <p className="text-gray-600">Question {mockInterviewStep + 1} of {selectedCompany.commonQuestions.length}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Question:</h4>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700">{selectedCompany.commonQuestions[mockInterviewStep]}</p>
                </div>

                <h4 className="font-semibold text-gray-900 mb-3">Sample Answer:</h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-700">{selectedCompany.sampleAnswers[mockInterviewStep]}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={nextMockInterviewStep}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {mockInterviewStep < selectedCompany.commonQuestions.length - 1 ? 'Next Question' : 'Finish Interview'}
                </button>
                <button
                  onClick={() => setShowMockInterview(false)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Exit Interview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 