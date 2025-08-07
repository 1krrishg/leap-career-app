'use client';

import { useState, useRef } from 'react';
import Link from "next/link";

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

interface CVTemplate {
  id: string;
  name: string;
  type: 'college' | 'company';
  institution: string;
  description: string;
  category: string;
  tags: string[];
  content: {
    header: {
      name: string;
      title: string;
      contact: string;
      location: string;
    };
    summary: string;
    experience: Array<{
      title: string;
      company: string;
      duration: string;
      achievements: string[];
    }>;
    education: Array<{
      degree: string;
      school: string;
      year: string;
      gpa?: string;
    }>;
    skills: string[];
    projects?: Array<{
      name: string;
      description: string;
      tech: string[];
    }>;
  };
}

const cvTemplates: CVTemplate[] = [
  {
    id: 'google-software',
    name: 'Google Software Engineer CV',
    type: 'company',
    institution: 'Google',
    description: 'Software engineer CV template used by Google employees',
    category: 'Software Engineering',
    tags: ['Scalability', 'System Design', 'Code Quality', 'Performance'],
    content: {
      header: {
        name: 'Sarah Chen',
        title: 'Senior Software Engineer',
        contact: 'sarah.chen@email.com | (555) 123-4567 | linkedin.com/in/sarahchen',
        location: 'San Francisco, CA'
      },
      summary: 'Experienced software engineer with 5+ years building scalable systems at Google. Led development of microservices serving 10M+ users, improved system performance by 40%, and mentored 3 junior engineers. Expert in Java, Python, and distributed systems.',
      experience: [
        {
          title: 'Senior Software Engineer',
          company: 'Google',
          duration: '2021 - Present',
          achievements: [
            'Led development of payment processing system serving 10M+ daily transactions',
            'Improved API response time by 40% through optimization and caching strategies',
            'Designed and implemented microservices architecture reducing deployment time by 60%',
            'Mentored 3 junior engineers and conducted 20+ technical interviews'
          ]
        },
        {
          title: 'Software Engineer',
          company: 'Microsoft',
          duration: '2019 - 2021',
          achievements: [
            'Developed Azure cloud services used by 5M+ enterprise customers',
            'Reduced system downtime by 80% through automated monitoring and alerting',
            'Collaborated with cross-functional teams to deliver features on time'
          ]
        }
      ],
      education: [
        {
          degree: 'Master of Science in Computer Science',
          school: 'Stanford University',
          year: '2019',
          gpa: '3.9/4.0'
        },
        {
          degree: 'Bachelor of Science in Computer Science',
          school: 'UC Berkeley',
          year: '2017',
          gpa: '3.8/4.0'
        }
      ],
      skills: ['Java', 'Python', 'Go', 'JavaScript', 'React', 'Kubernetes', 'Docker', 'AWS', 'Google Cloud', 'System Design', 'Microservices', 'REST APIs', 'GraphQL', 'MongoDB', 'PostgreSQL']
    }
  },
  {
    id: 'microsoft-product',
    name: 'Microsoft Product Manager CV',
    type: 'company',
    institution: 'Microsoft',
    description: 'Product manager CV template from Microsoft',
    category: 'Product Management',
    tags: ['Product Strategy', 'User Research', 'Data Analysis', 'Leadership'],
    content: {
      header: {
        name: 'Alex Rodriguez',
        title: 'Senior Product Manager',
        contact: 'alex.rodriguez@email.com | (555) 987-6543 | linkedin.com/in/alexrodriguez',
        location: 'Seattle, WA'
      },
      summary: 'Strategic product manager with 6+ years experience launching successful products at Microsoft. Led product strategy for Office 365 features used by 200M+ users, increased user engagement by 35%, and managed $50M product budget. Expert in user research, data analysis, and cross-functional leadership.',
      experience: [
        {
          title: 'Senior Product Manager',
          company: 'Microsoft',
          duration: '2020 - Present',
          achievements: [
            'Led product strategy for Office 365 collaboration features used by 200M+ users',
            'Increased user engagement by 35% through data-driven feature optimization',
            'Managed $50M product budget and delivered 15+ features on schedule',
            'Led cross-functional team of 25 engineers, designers, and marketers'
          ]
        },
        {
          title: 'Product Manager',
          company: 'Adobe',
          duration: '2018 - 2020',
          achievements: [
            'Launched Creative Cloud features driving $20M in additional revenue',
            'Conducted user research with 500+ customers to inform product decisions',
            'Collaborated with engineering teams to deliver features on time'
          ]
        }
      ],
      education: [
        {
          degree: 'Master of Business Administration',
          school: 'Harvard Business School',
          year: '2018',
          gpa: '3.7/4.0'
        },
        {
          degree: 'Bachelor of Science in Engineering',
          school: 'MIT',
          year: '2016',
          gpa: '3.9/4.0'
        }
      ],
      skills: ['Product Strategy', 'User Research', 'Data Analysis', 'A/B Testing', 'SQL', 'Python', 'Tableau', 'Figma', 'Agile', 'Scrum', 'Stakeholder Management', 'Roadmapping', 'Market Analysis', 'Competitive Analysis']
    }
  },
  {
    id: 'stanford-cs',
    name: 'Stanford CS Graduate CV',
    type: 'college',
    institution: 'Stanford University',
    description: 'Computer Science graduate CV template with strong technical focus',
    category: 'Computer Science',
    tags: ['Machine Learning', 'AI', 'Software Engineering', 'Research'],
    content: {
      header: {
        name: 'David Kim',
        title: 'Computer Science Graduate',
        contact: 'david.kim@email.com | (555) 456-7890 | linkedin.com/in/davidkim',
        location: 'Palo Alto, CA'
      },
      summary: 'Recent Stanford CS graduate with strong foundation in machine learning and software engineering. Completed research on computer vision algorithms, built full-stack applications, and led technical projects. Seeking software engineering roles in AI/ML companies.',
      experience: [
        {
          title: 'Research Assistant',
          company: 'Stanford AI Lab',
          duration: '2022 - 2023',
          achievements: [
            'Researched computer vision algorithms improving accuracy by 15%',
            'Published paper on "Efficient Object Detection in Real-time Applications"',
            'Implemented deep learning models using PyTorch and TensorFlow',
            'Presented findings at Stanford AI Symposium'
          ]
        },
        {
          title: 'Software Engineering Intern',
          company: 'Meta',
          duration: 'Summer 2022',
          achievements: [
            'Developed recommendation system features used by 1M+ users',
            'Optimized database queries reducing response time by 30%',
            'Collaborated with senior engineers on production code'
          ]
        }
      ],
      education: [
        {
          degree: 'Master of Science in Computer Science',
          school: 'Stanford University',
          year: '2023',
          gpa: '3.9/4.0'
        },
        {
          degree: 'Bachelor of Science in Computer Science',
          school: 'UC Berkeley',
          year: '2021',
          gpa: '3.8/4.0'
        }
      ],
      skills: ['Python', 'Java', 'JavaScript', 'React', 'TensorFlow', 'PyTorch', 'SQL', 'Git', 'Docker', 'AWS', 'Machine Learning', 'Computer Vision', 'Natural Language Processing', 'Data Structures', 'Algorithms'],
      projects: [
        {
          name: 'Real-time Object Detection System',
          description: 'Built computer vision system using YOLO for real-time object detection',
          tech: ['Python', 'OpenCV', 'PyTorch', 'Flask']
        },
        {
          name: 'E-commerce Platform',
          description: 'Full-stack web application with user authentication and payment processing',
          tech: ['React', 'Node.js', 'MongoDB', 'Stripe']
        }
      ]
    }
  },
  {
    id: 'harvard-business',
    name: 'Harvard Business CV',
    type: 'college',
    institution: 'Harvard Business School',
    description: 'Business graduate CV template with leadership and strategic focus',
    category: 'Business',
    tags: ['Leadership', 'Strategy', 'Analytics', 'Management'],
    content: {
      header: {
        name: 'Emily Johnson',
        title: 'Business Strategy Consultant',
        contact: 'emily.johnson@email.com | (555) 321-6547 | linkedin.com/in/emilyjohnson',
        location: 'Boston, MA'
      },
      summary: 'Harvard Business School graduate with strong analytical and leadership skills. Led strategic initiatives at McKinsey, managed $10M client projects, and developed business strategies for Fortune 500 companies. Expert in financial modeling, market analysis, and team leadership.',
      experience: [
        {
          title: 'Associate Consultant',
          company: 'McKinsey & Company',
          duration: '2021 - Present',
          achievements: [
            'Led strategic initiatives for Fortune 500 companies worth $10M+',
            'Developed market entry strategies for 3 international markets',
            'Managed cross-functional teams of 8+ consultants and analysts',
            'Presented findings to C-suite executives and board members'
          ]
        },
        {
          title: 'Business Analyst',
          company: 'Goldman Sachs',
          duration: '2019 - 2021',
          achievements: [
            'Analyzed investment opportunities worth $500M+ in total value',
            'Built financial models for M&A transactions and IPOs',
            'Conducted due diligence for 5+ major deals'
          ]
        }
      ],
      education: [
        {
          degree: 'Master of Business Administration',
          school: 'Harvard Business School',
          year: '2021',
          gpa: '3.8/4.0'
        },
        {
          degree: 'Bachelor of Arts in Economics',
          school: 'Yale University',
          year: '2019',
          gpa: '3.9/4.0'
        }
      ],
      skills: ['Strategic Planning', 'Financial Modeling', 'Market Analysis', 'Excel', 'PowerPoint', 'SQL', 'Tableau', 'Leadership', 'Project Management', 'Client Relations', 'Data Analysis', 'Business Development', 'M&A', 'Due Diligence']
    }
  }
];

export default function CVCheckerPage() {
  const [cvText, setCvText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [jobType, setJobType] = useState('software-engineer');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'analyzer' | 'templates'>('analyzer');
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setFileName(file.name);
      // For demo purposes, we'll simulate reading the file content
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setCvText(text);
      };
      reader.readAsText(file);
    }
  };

  const analyzeCV = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const mockAnalysis: CVAnalysis = {
        score: Math.floor(Math.random() * 40) + 60, // 60-100
        feedback: [
          "Your CV shows good technical skills",
          "Consider adding more quantifiable achievements",
          "The structure is clear and professional"
        ],
        suggestions: [
          "Add specific metrics to your achievements",
          "Include more industry-specific keywords",
          "Consider adding a professional summary"
        ],
        missingKeywords: ["React", "TypeScript", "AWS", "Docker"],
        strengths: [
          "Strong technical background",
          "Good project descriptions",
          "Clear formatting"
        ],
        atsScore: Math.floor(Math.random() * 30) + 70,
        readabilityScore: Math.floor(Math.random() * 20) + 80,
        impactScore: Math.floor(Math.random() * 25) + 75,
        structureAnalysis: {
          hasContactInfo: true,
          hasExperience: true,
          hasEducation: true,
          hasSkills: true,
          hasSummary: false
        },
        keywordAnalysis: {
          matchedKeywords: ["JavaScript", "Python", "Git"],
          missingKeywords: ["React", "TypeScript", "AWS"],
          keywordDensity: {
            "JavaScript": 0.05,
            "Python": 0.03,
            "Git": 0.02
          }
        },
        professionalInsights: {
          achievements: ["Led team of 5 developers", "Improved performance by 40%"],
          metrics: ["40%", "5 developers", "3 years"],
          actionVerbs: ["Led", "Developed", "Implemented"]
        }
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
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
    if (file) {
      setUploadedFile(file);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setCvText(text);
      };
      reader.readAsText(file);
    }
  };

  const copyTemplate = (template: CVTemplate) => {
    const cvContent = `
${template.content.header.name}
${template.content.header.title}
${template.content.header.contact}
${template.content.header.location}

SUMMARY
${template.content.summary}

EXPERIENCE
${template.content.experience.map(exp => `
${exp.title} | ${exp.company} | ${exp.duration}
${exp.achievements.map(achievement => `• ${achievement}`).join('\n')}
`).join('\n')}

EDUCATION
${template.content.education.map(edu => `
${edu.degree}
${edu.school} | ${edu.year}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
`).join('\n')}

SKILLS
${template.content.skills.join(', ')}

${template.content.projects ? `
PROJECTS
${template.content.projects.map(project => `
${project.name}
${project.description}
Technologies: ${project.tech.join(', ')}
`).join('\n')}` : ''}
    `.trim();

    navigator.clipboard.writeText(cvContent).then(() => {
      alert('CV template copied to clipboard!');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/master" className="text-blue-600 hover:text-blue-800 font-medium mb-6 inline-block text-lg transition-colors duration-200">
            ← Back to Master Menu
          </Link>
          <h1 className="text-5xl font-bold text-black mb-4 leading-tight">Professional CV Tools</h1>
          <p className="text-xl text-gray-800 leading-relaxed">Analyze your CV or view templates from top companies and colleges</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('analyzer')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'analyzer'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              CV Analyzer
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'templates'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              CV Templates
            </button>
          </div>
        </div>

        {activeTab === 'analyzer' ? (
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

                  {/* Detailed Scores */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{analysis.atsScore}%</div>
                      <div className="text-sm text-gray-600">ATS Score</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">{analysis.readabilityScore}%</div>
                      <div className="text-sm text-gray-600">Readability</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">{analysis.impactScore}%</div>
                      <div className="text-sm text-gray-600">Impact</div>
                    </div>
                  </div>

                  {/* Feedback Sections */}
                  <div className="space-y-6">
                    {/* Strengths */}
                    {analysis.strengths.length > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Strengths</h3>
                        <ul className="space-y-2">
                          {analysis.strengths.map((strength, index) => (
                            <li key={index} className="text-green-700 flex items-start">
                              <span className="mr-2">•</span>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Suggestions */}
                    {analysis.suggestions.length > 0 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-yellow-800 mb-3">💡 Suggestions</h3>
                        <ul className="space-y-2">
                          {analysis.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-yellow-700 flex items-start">
                              <span className="mr-2">•</span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Missing Keywords */}
                    {analysis.missingKeywords.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-red-800 mb-3">⚠️ Missing Keywords</h3>
                        <div className="flex flex-wrap gap-2">
                          {analysis.missingKeywords.map((keyword, index) => (
                            <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button
                      onClick={resetAnalysis}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
                    >
                      Analyze Another CV
                    </button>
                  </div>
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
        ) : (
          /* Templates Section */
          <div className="space-y-8">
            {selectedTemplate ? (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-semibold text-black">{selectedTemplate.name}</h2>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ← Back to Templates
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg mb-2">{selectedTemplate.content.header.name}</h3>
                    <p className="text-gray-600">{selectedTemplate.content.header.title}</p>
                    <p className="text-gray-600">{selectedTemplate.content.header.contact}</p>
                    <p className="text-gray-600">{selectedTemplate.content.header.location}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-800 mb-2">SUMMARY</h4>
                    <p className="text-gray-700">{selectedTemplate.content.summary}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-800 mb-2">EXPERIENCE</h4>
                    {selectedTemplate.content.experience.map((exp, index) => (
                      <div key={index} className="mb-3">
                        <p className="font-semibold">{exp.title} | {exp.company} | {exp.duration}</p>
                        <ul className="ml-4 mt-1">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-gray-700">• {achievement}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-800 mb-2">EDUCATION</h4>
                    {selectedTemplate.content.education.map((edu, index) => (
                      <div key={index} className="mb-2">
                        <p className="font-semibold">{edu.degree}</p>
                        <p className="text-gray-700">{edu.school} | {edu.year}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-800 mb-2">SKILLS</h4>
                    <p className="text-gray-700">{selectedTemplate.content.skills.join(', ')}</p>
                  </div>
                  
                  {selectedTemplate.content.projects && (
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">PROJECTS</h4>
                      {selectedTemplate.content.projects.map((project, index) => (
                        <div key={index} className="mb-3">
                          <p className="font-semibold">{project.name}</p>
                          <p className="text-gray-700">{project.description}</p>
                          <p className="text-gray-600 text-xs">Technologies: {project.tech.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => copyTemplate(selectedTemplate)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Copy Template
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Top Companies Templates */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-3xl font-semibold text-black mb-6">🏢 Top Company CV Templates</h2>
                  <p className="text-gray-600 mb-8">View CV templates used by employees at top companies</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cvTemplates.filter(t => t.type === 'company').map(template => (
                      <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setSelectedTemplate(template)}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                            {template.institution.charAt(0)}
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {template.category}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {template.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300">
                          View Template
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Colleges Templates */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-3xl font-semibold text-black mb-6">🏫 Top College CV Templates</h2>
                  <p className="text-gray-600 mb-8">View CV templates from graduates of top universities</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cvTemplates.filter(t => t.type === 'college').map(template => (
                      <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setSelectedTemplate(template)}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
                            {template.institution.charAt(0)}
                          </div>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                            {template.category}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {template.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300">
                          View Template
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

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