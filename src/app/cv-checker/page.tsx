'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

interface CVAnalysis {
  score: number;
  feedback: string[];
  suggestions: string[];
  missingKeywords: string[];
  strengths: string[];
  atsScore: number;
  readabilityScore: number;
  impactScore: number;
  structureAnalysis: {
    hasContactInfo: boolean;
    hasExperience: boolean;
    hasEducation: boolean;
    hasSkills: boolean;
    hasSummary: boolean;
  };
  keywordAnalysis: {
    matchedKeywords: string[];
    missingKeywords: string[];
  keywordDensity: { [key: string]: number };
  };
  professionalInsights: {
    achievements: string[];
    metrics: string[];
    actionVerbs: string[];
  };
}

const jobKeywords = {
  'software-engineer': {
    essential: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'AWS', 'Docker', 'API', 'REST'],
    advanced: ['TypeScript', 'MongoDB', 'Express', 'Redux', 'GraphQL', 'Kubernetes', 'Microservices', 'CI/CD'],
    trending: ['Next.js', 'Tailwind CSS', 'Prisma', 'tRPC', 'Vercel', 'Supabase', 'AI/ML Integration']
  },
  'data-scientist': {
    essential: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Pandas', 'NumPy', 'Scikit-learn'],
    advanced: ['TensorFlow', 'PyTorch', 'Deep Learning', 'NLP', 'Computer Vision', 'Big Data', 'Spark'],
    trending: ['LangChain', 'Hugging Face', 'MLOps', 'AutoML', 'Explainable AI', 'Edge AI']
  },
  'product-manager': {
    essential: ['Product Strategy', 'User Research', 'Agile', 'Scrum', 'Market Analysis', 'Roadmap'],
    advanced: ['Stakeholder Management', 'Analytics', 'A/B Testing', 'JIRA', 'Product Metrics', 'Go-to-Market'],
    trending: ['AI Product Management', 'Data-Driven Decisions', 'Customer Success', 'Product-Led Growth']
  },
  'marketing': {
    essential: ['Digital Marketing', 'SEO', 'Social Media', 'Content Marketing', 'Google Analytics'],
    advanced: ['Email Marketing', 'Campaign Management', 'Brand Strategy', 'PPC', 'Marketing Automation'],
    trending: ['AI Marketing', 'TikTok Marketing', 'Influencer Marketing', 'Video Marketing', 'Personalization']
  },
  'sales': {
    essential: ['Sales Strategy', 'CRM', 'Lead Generation', 'Client Relationship', 'Negotiation'],
    advanced: ['Pipeline Management', 'Revenue Growth', 'B2B Sales', 'Salesforce', 'Account Management'],
    trending: ['AI Sales Tools', 'Social Selling', 'Video Selling', 'Sales Enablement', 'Revenue Operations']
  }
};

export default function CVCheckerPage() {
  const [jobType, setJobType] = useState('software-engineer');
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [cvText, setCvText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setFileName(file.name);
      // Simulate PDF text extraction
      setTimeout(() => {
        const sampleText = `John Doe
Software Engineer
john.doe@email.com | (555) 123-4567 | New York, NY
LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Results-driven software engineer with 3+ years of experience developing scalable web applications. Skilled in JavaScript, React, Node.js, and cloud technologies. Passionate about creating innovative solutions and committed to writing clean, maintainable code.

PROFESSIONAL EXPERIENCE

Senior Software Engineer at TechCorp Inc. (Jan 2022 - Present)
• Led development of microservices architecture serving 100K+ users
• Increased application performance by 40% through optimization and caching strategies
• Mentored 3 junior developers and conducted code reviews
• Implemented CI/CD pipeline reducing deployment time by 60%

Software Engineer at StartupXYZ (Mar 2020 - Dec 2021)
• Developed RESTful APIs using Node.js and Express
• Built responsive frontend using React and TypeScript
• Collaborated with cross-functional teams using Agile methodology
• Reduced bug reports by 30% through comprehensive testing

EDUCATION
Bachelor of Science in Computer Science - University of Technology (2019)
GPA: 3.8/4.0

TECHNICAL SKILLS
JavaScript, TypeScript, React, Node.js, Python, SQL, MongoDB, AWS, Docker, Git, REST APIs, Microservices, Agile

SOFT SKILLS
Leadership, Problem Solving, Communication, Team Collaboration, Time Management, Adaptability`;
        setCvText(sampleText);
      }, 1000);
    }
  };

  const analyzeCV = () => {
    if (!cvText.trim() && !uploadedFile) return;

    setIsAnalyzing(true);
    
    setTimeout(() => {
      const text = cvText.toLowerCase();
      const keywords = jobKeywords[jobType as keyof typeof jobKeywords];
      const allKeywords = [...keywords.essential, ...keywords.advanced, ...keywords.trending];
      
      // Keyword analysis
      const matchedKeywords = allKeywords.filter(keyword => 
        text.includes(keyword.toLowerCase())
      );
      const missingKeywords = allKeywords.filter(keyword => 
        !text.includes(keyword.toLowerCase())
      );
      
      // Calculate scores
      const keywordScore = Math.round((matchedKeywords.length / allKeywords.length) * 100);
      const atsScore = Math.min(100, keywordScore + (text.length > 800 ? 20 : 10) + 
        (text.includes('experience') ? 15 : 0) + (text.includes('education') ? 15 : 0));
      const readabilityScore = Math.round(Math.max(70, 100 - Math.abs(text.split(' ').length / text.split('.').length - 15) * 2));
      
      // Impact analysis
      const impactWords = ['increased', 'improved', 'developed', 'created', 'managed', 'led', 'achieved', 'delivered'];
      const impactCount = impactWords.filter(word => text.includes(word)).length;
      const impactScore = Math.round(Math.min(100, 70 + impactCount * 5));
      
      // Structure analysis
      const structureAnalysis = {
        hasContactInfo: text.includes('@') || text.includes('phone') || text.includes('email'),
        hasExperience: text.includes('experience') || text.includes('work'),
        hasEducation: text.includes('education') || text.includes('degree') || text.includes('university'),
        hasSkills: text.includes('skills') || text.includes('technologies'),
        hasSummary: text.includes('summary') || text.includes('objective')
      };
      
      // Professional insights
      const achievements: string[] = [];
      const metrics: string[] = [];
      const actionVerbs: string[] = [];
      
      if (text.includes('increased')) achievements.push('Quantified performance improvements');
      if (text.includes('managed')) achievements.push('Leadership and team management');
      if (text.includes('developed')) achievements.push('Product development experience');
      if (text.includes('%')) metrics.push('Uses percentage metrics');
      if (text.includes('$')) metrics.push('Includes financial impact');
      if (text.includes('users') || text.includes('customers')) metrics.push('Shows scale of impact');
      
      impactWords.forEach(word => {
        if (text.includes(word)) actionVerbs.push(word);
      });
      
      // Generate feedback
      const feedback = [];
      const suggestions = [];
      const strengths = [];
      
      if (keywordScore >= 80) {
        feedback.push('Excellent keyword optimization! Your CV shows strong alignment with job requirements.');
        strengths.push('Strong technical skills coverage');
        strengths.push('Good keyword optimization');
      } else if (keywordScore >= 60) {
        feedback.push('Good CV, but there\'s room for improvement to better match the job requirements.');
        suggestions.push('Add more relevant technical skills');
        suggestions.push('Include specific project examples');
      } else {
        feedback.push('Your CV needs significant improvement to match this job type.');
        suggestions.push('Focus on adding relevant technical skills');
        suggestions.push('Include more specific achievements');
        suggestions.push('Add industry-specific keywords');
      }
      
      if (atsScore >= 80) {
        strengths.push('Strong ATS compatibility');
      } else {
        suggestions.push('Improve ATS compatibility with better structure and keywords');
      }
      
      if (impactScore >= 80) {
        strengths.push('Strong achievement-focused language');
      } else {
        suggestions.push('Use more action verbs and quantifiable achievements');
      }
      
      if (missingKeywords.length > 0) {
        suggestions.push(`Consider adding: ${missingKeywords.slice(0, 5).join(', ')}`);
      }
      
      if (!structureAnalysis.hasContactInfo) {
        suggestions.push('Add clear contact information');
      }
      if (!structureAnalysis.hasExperience) {
        suggestions.push('Include detailed work experience section');
      }
      if (!structureAnalysis.hasEducation) {
        suggestions.push('Add educational background');
      }
      
      // Keyword density analysis
      const keywordDensity: { [key: string]: number } = {};
      matchedKeywords.forEach(keyword => {
        const regex = new RegExp(keyword.toLowerCase(), 'g');
        const matches = text.match(regex);
        keywordDensity[keyword] = matches ? matches.length : 0;
      });

      setAnalysis({
        score: keywordScore,
        feedback,
        suggestions,
        missingKeywords: missingKeywords.slice(0, 8),
        strengths,
        atsScore,
        readabilityScore,
        impactScore,
        structureAnalysis,
        keywordAnalysis: {
          matchedKeywords,
          missingKeywords,
          keywordDensity
        },
        professionalInsights: {
          achievements,
          metrics,
          actionVerbs
        }
      });
      
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setCvText('');
    setUploadedFile(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setFileName(file.name);
      // Simulate PDF text extraction
      setTimeout(() => {
        const sampleText = `John Doe
Software Engineer
john.doe@email.com | (555) 123-4567 | New York, NY
LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Results-driven software engineer with 3+ years of experience developing scalable web applications. Skilled in JavaScript, React, Node.js, and cloud technologies. Passionate about creating innovative solutions and committed to writing clean, maintainable code.

PROFESSIONAL EXPERIENCE

Senior Software Engineer at TechCorp Inc. (Jan 2022 - Present)
• Led development of microservices architecture serving 100K+ users
• Increased application performance by 40% through optimization and caching strategies
• Mentored 3 junior developers and conducted code reviews
• Implemented CI/CD pipeline reducing deployment time by 60%

Software Engineer at StartupXYZ (Mar 2020 - Dec 2021)
• Developed RESTful APIs using Node.js and Express
• Built responsive frontend using React and TypeScript
• Collaborated with cross-functional teams using Agile methodology
• Reduced bug reports by 30% through comprehensive testing

EDUCATION
Bachelor of Science in Computer Science - University of Technology (2019)
GPA: 3.8/4.0

TECHNICAL SKILLS
JavaScript, TypeScript, React, Node.js, Python, SQL, MongoDB, AWS, Docker, Git, REST APIs, Microservices, Agile

SOFT SKILLS
Leadership, Problem Solving, Communication, Team Collaboration, Time Management, Adaptability`;
        setCvText(sampleText);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/master" className="text-blue-600 hover:text-blue-800 font-medium mb-6 inline-block text-lg transition-colors duration-200">
            ← Back to Master Menu
          </Link>
          <h1 className="text-5xl font-bold text-black mb-4 leading-tight">Professional CV Analyzer</h1>
          <p className="text-xl text-gray-800 leading-relaxed">Upload your CV and get comprehensive analysis for better job applications</p>
        </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Upload Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-semibold text-black mb-8 leading-tight">Upload Your CV</h2>
              
            <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Job Type
                  </label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="software-engineer">Software Engineer</option>
                    <option value="data-scientist">Data Scientist</option>
                    <option value="product-manager">Product Manager</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>

              {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                  Upload CV (PDF)
                  </label>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-4xl mb-4">📄</div>
                  {uploadedFile ? (
                    <div>
                      <p className="text-green-600 font-semibold">✓ {fileName}</p>
                      <p className="text-sm text-gray-500 mt-2">Click to change file</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-800 mb-2">Drag and drop your CV here</p>
                      <p className="text-sm text-gray-600">or click to browse</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                </div>

                  <button
                    onClick={analyzeCV}
                disabled={isAnalyzing || (!uploadedFile && !cvText.trim())}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing CV...
                      </div>
                    ) : (
                  'Analyze CV'
                    )}
                  </button>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Analysis Results</h2>
              
              {isAnalyzing ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing your CV...</p>
                <p className="text-sm text-gray-500 mt-2">Checking keywords, structure, ATS compatibility, and professional insights</p>
                </div>
            ) : analysis ? (
                <div className="space-y-6">
                {/* Overall Score */}
                <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                  <div className="text-5xl font-bold text-gray-900 mb-2">{analysis.score}%</div>
                  <div className="text-lg text-gray-600 mb-4">Overall Match Score</div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        analysis.score >= 80 ? 'bg-green-500' : 
                        analysis.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${analysis.score}%` }}
                      ></div>
                    </div>
                  </div>

                {/* Score Breakdown */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{analysis.atsScore}</div>
                    <div className="text-sm text-gray-600">ATS Score</div>
                        </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{analysis.readabilityScore}</div>
                    <div className="text-sm text-gray-600">Readability</div>
                        </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{analysis.impactScore}</div>
                    <div className="text-sm text-gray-600">Impact</div>
                  </div>
                      </div>

                {/* Structure Analysis */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Structure Analysis</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-2 ${analysis.structureAnalysis.hasContactInfo ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-sm text-gray-700">Contact Information</span>
                        </div>
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-2 ${analysis.structureAnalysis.hasExperience ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-sm text-gray-700">Work Experience</span>
                        </div>
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-2 ${analysis.structureAnalysis.hasEducation ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-sm text-gray-700">Education</span>
                            </div>
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-2 ${analysis.structureAnalysis.hasSkills ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-sm text-gray-700">Skills Section</span>
                          </div>
                        </div>
                      </div>

                {/* Feedback */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Feedback</h3>
                  <ul className="space-y-2">
                    {analysis.feedback.map((item, index) => (
                                <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">💡</span>
                        <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                {/* Strengths */}
                {analysis.strengths.length > 0 && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Strengths</h3>
                    <ul className="space-y-2">
                      {analysis.strengths.map((strength, index) => (
                                <li key={index} className="flex items-start">
                          <span className="text-green-600 mr-2">✅</span>
                          <span className="text-gray-700">{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                {/* Professional Insights */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Insights</h3>
                        <div className="space-y-3">
                    {analysis.professionalInsights.achievements.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Achievements Found:</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysis.professionalInsights.achievements.map((achievement, index) => (
                            <span key={index} className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded-full">
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {analysis.professionalInsights.metrics.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Metrics Used:</h4>
                      <div className="flex flex-wrap gap-2">
                          {analysis.professionalInsights.metrics.map((metric, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                              {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  </div>
                </div>

                  {/* Suggestions */}
                  <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Suggestions</h3>
                    <ul className="space-y-2">
                    {analysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-yellow-600 mr-2">💡</span>
                          <span className="text-gray-700">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                {/* Missing Keywords */}
                {analysis.missingKeywords.length > 0 && (
                  <div className="bg-red-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Missing Keywords</h3>
                          <div className="flex flex-wrap gap-2">
                      {analysis.missingKeywords.map((keyword, index) => (
                        <span key={index} className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
                                {keyword}
                              </span>
                            ))}
            </div>
          </div>
        )}

                  <button
                  onClick={resetAnalysis}
                  className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                  Analyze Another CV
                  </button>
                </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Analyze Your CV</h3>
                <p className="text-gray-600">Upload your CV and click &quot;Analyze CV&quot; to get comprehensive feedback</p>
                </div>
              )}
            </div>
          </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Professional CV Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">✅ Best Practices</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Use specific keywords from job descriptions</li>
                <li>• Include quantifiable achievements with metrics</li>
                <li>• Keep it concise (1-2 pages maximum)</li>
                <li>• Use action verbs to start bullet points</li>
                <li>• Ensure ATS-friendly formatting</li>
                <li>• Include relevant technical skills</li>
              </ul>
                </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">❌ Common Mistakes</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Using generic phrases like &quot;team player&quot;</li>
                <li>• Including irrelevant personal information</li>
                <li>• Making it too long or too short</li>
                <li>• Using passive voice</li>
                <li>• Not proofreading for errors</li>
                <li>• Using complex formatting that breaks ATS</li>
              </ul>
              </div>
            </div>
                </div>
      </div>
    </div>
  );
} 