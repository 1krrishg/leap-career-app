'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CVData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio?: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
}

interface CoverLetterData {
  recipientName: string;
  company: string;
  position: string;
  yourName: string;
  content: string;
  jobDescription?: string;
}

interface CVAnalysis {
  atsScore: number;
  missingKeywords: string[];
  suggestions: string[];
  readabilityScore: number;
  impactScore: number;
  keywordDensity: { [key: string]: number };
}

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'modern' | 'classic' | 'creative' | 'minimal';
}

const cvTemplates: Template[] = [
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Clean, professional design with blue accents',
    preview: '🎨 Modern & Professional',
    category: 'modern'
  },
  {
    id: 'classic-black',
    name: 'Classic Black',
    description: 'Traditional black and white format',
    preview: '📄 Traditional & Clean',
    category: 'classic'
  },
  {
    id: 'creative-gradient',
    name: 'Creative Gradient',
    description: 'Eye-catching with gradient elements',
    preview: '✨ Creative & Bold',
    category: 'creative'
  },
  {
    id: 'minimal-white',
    name: 'Minimal White',
    description: 'Simple, clean, and focused',
    preview: '⚪ Minimal & Clean',
    category: 'minimal'
  }
];

// AI Analysis Keywords for different job types
const jobKeywords = {
  'software-engineer': ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'AWS', 'Docker', 'API', 'REST'],
  'data-scientist': ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'Data Analysis'],
  'product-manager': ['Product Strategy', 'User Research', 'Agile', 'Scrum', 'Market Analysis', 'Roadmap', 'Stakeholder Management', 'Analytics', 'A/B Testing'],
  'marketing': ['Digital Marketing', 'SEO', 'Social Media', 'Content Marketing', 'Google Analytics', 'Email Marketing', 'Campaign Management', 'Brand Strategy'],
  'sales': ['Sales Strategy', 'CRM', 'Lead Generation', 'Client Relationship', 'Negotiation', 'Pipeline Management', 'Revenue Growth', 'B2B Sales']
};

export default function CVGeneratorPage() {
  const [activeTab, setActiveTab] = useState<'generator' | 'checker' | 'templates'>('generator');
  const [selectedTemplate, setSelectedTemplate] = useState('modern-blue');
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: ''
    },
    summary: '',
    experience: [{ title: '', company: '', duration: '', description: '', achievements: [] }],
    education: [{ degree: '', institution: '', year: '' }],
    skills: { technical: [], soft: [] }
  });

  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>({
    recipientName: '',
    company: '',
    position: '',
    yourName: '',
    content: ''
  });

  const [generatedCV, setGeneratedCV] = useState('');
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
  const [cvAnalysis, setCvAnalysis] = useState<CVAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobType, setJobType] = useState('software-engineer');
  const [cvText, setCvText] = useState('');

  const handleCVInputChange = (section: keyof CVData, field: string, value: any, index?: number) => {
    setCvData(prev => {
      if (section === 'experience' && typeof index === 'number') {
        const newExperience = [...prev.experience];
        newExperience[index] = { ...newExperience[index], [field]: value };
        return { ...prev, experience: newExperience };
      }
      if (section === 'education' && typeof index === 'number') {
        const newEducation = [...prev.education];
        newEducation[index] = { ...newEducation[index], [field]: value };
        return { ...prev, education: newEducation };
      }
      if (section === 'personalInfo') {
        return { ...prev, personalInfo: { ...prev.personalInfo, [field]: value } };
      }
      if (section === 'skills') {
        if (field === 'technical') {
          return { ...prev, skills: { ...prev.skills, technical: value.split(',').map((s: string) => s.trim()) } };
        }
        if (field === 'soft') {
          return { ...prev, skills: { ...prev.skills, soft: value.split(',').map((s: string) => s.trim()) } };
        }
      }
      return { ...prev, [section]: value };
    });
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, { title: '', company: '', duration: '', description: '', achievements: [] }]
    }));
  };

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', institution: '', year: '' }]
    }));
  };

  const generateCV = () => {
    const cv = `
# ${cvData.personalInfo.name}

**${cvData.personalInfo.email}** | **${cvData.personalInfo.phone}** | **${cvData.personalInfo.location}**
${cvData.personalInfo.linkedin ? `LinkedIn: ${cvData.personalInfo.linkedin}` : ''}
${cvData.personalInfo.portfolio ? `Portfolio: ${cvData.personalInfo.portfolio}` : ''}

## Professional Summary
${cvData.summary}

## Professional Experience
${cvData.experience.map(exp => 
  exp.title ? `**${exp.title}** at ${exp.company} (${exp.duration})
${exp.description}
${exp.achievements.length > 0 ? `\n**Key Achievements:**\n${exp.achievements.map(achievement => `• ${achievement}`).join('\n')}` : ''}` : ''
).join('\n\n')}

## Education
${cvData.education.map(edu => 
  edu.degree ? `${edu.degree} - ${edu.institution} (${edu.year})${edu.gpa ? ` - GPA: ${edu.gpa}` : ''}` : ''
).join('\n')}

## Technical Skills
${cvData.skills.technical.join(', ')}

## Soft Skills
${cvData.skills.soft.join(', ')}

${cvData.projects && cvData.projects.length > 0 ? `
## Projects
${cvData.projects.map(project => 
  `**${project.name}**
${project.description}
Technologies: ${project.technologies.join(', ')}${project.link ? `\nLink: ${project.link}` : ''}`
).join('\n\n')}` : ''}

${cvData.certifications && cvData.certifications.length > 0 ? `
## Certifications
${cvData.certifications.map(cert => 
  `${cert.name} - ${cert.issuer} (${cert.year})`
).join('\n')}` : ''}
    `.trim();
    setGeneratedCV(cv);
  };

  const generateCoverLetter = () => {
    const letter = `
${coverLetterData.yourName}
${coverLetterData.recipientName}
${coverLetterData.company}

Dear ${coverLetterData.recipientName},

${coverLetterData.content}

Sincerely,
${coverLetterData.yourName}
    `.trim();
    setGeneratedCoverLetter(letter);
  };

  const analyzeCV = async () => {
    if (!cvText.trim()) {
      alert('Please paste your CV text to analyze');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delays
    setTimeout(() => {
      const text = cvText.toLowerCase();
      const keywords = jobKeywords[jobType as keyof typeof jobKeywords] || [];
      const foundKeywords = keywords.filter(keyword => text.includes(keyword.toLowerCase()));
      const missingKeywords = keywords.filter(keyword => !text.includes(keyword.toLowerCase()));
      
      const atsScore = Math.min(100, Math.max(0, 
        (foundKeywords.length / keywords.length) * 100 + 
        (text.length > 500 ? 20 : 0) + 
        (text.includes('experience') ? 15 : 0) +
        (text.includes('skills') ? 15 : 0)
      ));

      const suggestions = [];
      if (missingKeywords.length > 0) {
        suggestions.push(`Add missing keywords: ${missingKeywords.slice(0, 3).join(', ')}`);
      }
      if (text.length < 500) {
        suggestions.push('Expand your experience descriptions with more details');
      }
      if (!text.includes('achievements')) {
        suggestions.push('Include specific achievements with quantifiable results');
      }
      if (!text.includes('metrics')) {
        suggestions.push('Add metrics and numbers to demonstrate impact');
      }

      const keywordDensity: { [key: string]: number } = {};
      keywords.forEach(keyword => {
        const regex = new RegExp(keyword.toLowerCase(), 'g');
        const matches = text.match(regex);
        keywordDensity[keyword] = matches ? matches.length : 0;
      });

      setCvAnalysis({
        atsScore: Math.round(atsScore),
        missingKeywords,
        suggestions,
        readabilityScore: Math.round(Math.random() * 30 + 70), // 70-100
        impactScore: Math.round(Math.random() * 25 + 75), // 75-100
        keywordDensity
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const generateImprovedCV = () => {
    if (!cvAnalysis) return;

    const improvements = cvAnalysis.suggestions.map(suggestion => `• ${suggestion}`).join('\n');
    const improvedCV = `${generatedCV || cvText}

## AI-Recommended Improvements:
${improvements}

## Suggested Keywords to Add:
${cvAnalysis.missingKeywords.slice(0, 5).join(', ')}

## ATS Optimization Tips:
• Use standard section headings (Experience, Education, Skills)
• Include relevant keywords naturally in descriptions
• Quantify achievements with numbers and percentages
• Keep formatting simple and clean
• Use bullet points for better readability`;

    setGeneratedCV(improvedCV);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/master" className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block">
            ← Back to Master Menu
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">CV Generator & AI Checker</h1>
          <p className="text-gray-600">Create professional CVs and get AI-powered analysis to improve your chances</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('generator')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'generator' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              CV Generator
            </button>
            <button
              onClick={() => setActiveTab('checker')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'checker' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              AI CV Checker
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'templates' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Templates
            </button>
          </div>
        </div>

        {activeTab === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* CV Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">CV Information</h2>
              
              {/* Personal Information */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={cvData.personalInfo.name}
                    onChange={(e) => handleCVInputChange('personalInfo', 'name', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={cvData.personalInfo.email}
                    onChange={(e) => handleCVInputChange('personalInfo', 'email', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={cvData.personalInfo.phone}
                    onChange={(e) => handleCVInputChange('personalInfo', 'phone', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={cvData.personalInfo.location}
                    onChange={(e) => handleCVInputChange('personalInfo', 'location', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="LinkedIn (optional)"
                    value={cvData.personalInfo.linkedin}
                    onChange={(e) => handleCVInputChange('personalInfo', 'linkedin', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Portfolio (optional)"
                    value={cvData.personalInfo.portfolio || ''}
                    onChange={(e) => handleCVInputChange('personalInfo', 'portfolio', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Professional Summary */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-medium text-gray-900">Professional Summary</h3>
                <textarea
                  placeholder="Write a compelling professional summary..."
                  value={cvData.summary}
                  onChange={(e) => handleCVInputChange('summary', '', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Experience */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Professional Experience</h3>
                  <button
                    type="button"
                    onClick={addExperience}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    + Add Experience
                  </button>
                </div>
                {cvData.experience.map((exp, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) => handleCVInputChange('experience', 'title', e.target.value, index)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => handleCVInputChange('experience', 'company', e.target.value, index)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Duration (e.g., Jan 2020 - Present)"
                      value={exp.duration}
                      onChange={(e) => handleCVInputChange('experience', 'duration', e.target.value, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Job description and achievements..."
                      value={exp.description}
                      onChange={(e) => handleCVInputChange('experience', 'description', e.target.value, index)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Technical skills (e.g., JavaScript, React, Python)"
                    value={cvData.skills.technical.join(', ')}
                    onChange={(e) => handleCVInputChange('skills', 'technical', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Soft skills (e.g., Leadership, Communication, Problem Solving)"
                    value={cvData.skills.soft.join(', ')}
                    onChange={(e) => handleCVInputChange('skills', 'soft', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={generateCV}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Generate CV
              </button>
            </div>

            {/* Generated CV Preview */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Generated CV</h2>
              {generatedCV ? (
                <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">{generatedCV}</pre>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 h-96 flex items-center justify-center">
                  <p className="text-gray-500 text-center">Fill in the form and click "Generate CV" to see your CV here</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'checker' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* CV Input */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI CV Checker</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="software-engineer">Software Engineer</option>
                    <option value="data-scientist">Data Scientist</option>
                    <option value="product-manager">Product Manager</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paste Your CV Text
                  </label>
                  <textarea
                    value={cvText}
                    onChange={(e) => setCvText(e.target.value)}
                    placeholder="Paste your CV content here for AI analysis..."
                    rows={15}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={analyzeCV}
                  disabled={isAnalyzing || !cvText.trim()}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing CV...
                    </div>
                  ) : (
                    'Analyze CV with AI'
                  )}
                </button>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI Analysis Results</h2>
              
              {isAnalyzing ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">AI is analyzing your CV...</p>
                  <p className="text-sm text-gray-500 mt-2">Checking ATS compatibility, keywords, and suggestions</p>
                </div>
              ) : cvAnalysis ? (
                <div className="space-y-6">
                  {/* ATS Score */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">ATS Score</h3>
                      <span className="text-2xl font-bold text-blue-600">{cvAnalysis.atsScore}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          cvAnalysis.atsScore >= 80 ? 'bg-green-500' : 
                          cvAnalysis.atsScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${cvAnalysis.atsScore}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {cvAnalysis.atsScore >= 80 ? 'Excellent! Your CV will pass most ATS systems.' :
                       cvAnalysis.atsScore >= 60 ? 'Good, but there\'s room for improvement.' :
                       'Your CV needs optimization to pass ATS systems.'}
                    </p>
                  </div>

                  {/* Missing Keywords */}
                  {cvAnalysis.missingKeywords.length > 0 && (
                    <div className="bg-red-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Missing Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {cvAnalysis.missingKeywords.slice(0, 8).map((keyword, index) => (
                          <span key={index} className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions */}
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Suggestions</h3>
                    <ul className="space-y-2">
                      {cvAnalysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-yellow-600 mr-2">💡</span>
                          <span className="text-gray-700">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Additional Scores */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{cvAnalysis.readabilityScore}</div>
                      <div className="text-sm text-gray-600">Readability Score</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{cvAnalysis.impactScore}</div>
                      <div className="text-sm text-gray-600">Impact Score</div>
                    </div>
                  </div>

                  <button
                    onClick={generateImprovedCV}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Generate Improved CV
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Analyze</h3>
                  <p className="text-gray-600">Paste your CV and click "Analyze CV with AI" to get started</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">CV Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cvTemplates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{template.preview.split(' ')[0]}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Template Preview</h2>
              <div className="bg-gray-50 rounded-lg p-6 min-h-96">
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📄</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {cvTemplates.find(t => t.id === selectedTemplate)?.name}
                  </h3>
                  <p className="text-gray-600">
                    {cvTemplates.find(t => t.id === selectedTemplate)?.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-4">
                    Template preview will be available in the next update
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 