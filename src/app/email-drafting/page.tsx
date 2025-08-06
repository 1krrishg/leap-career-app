'use client';

import { useState } from 'react';
import Link from 'next/link';

interface EmailTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  template: string;
  tips: string[];
  placeholders: { [key: string]: string };
}

const emailTemplates: EmailTemplate[] = [
  {
    id: 'cover-letter',
    title: 'Cover Letter',
    description: 'Professional cover letter for job applications',
    icon: '📄',
    category: 'Application',
    template: `Dear [HIRING_MANAGER],

I am writing to express my strong interest in the [POSITION] role at [COMPANY]. With my background in [FIELD] and [YEARS] years of experience, I am excited about the opportunity to contribute to your team.

In my previous role at [PREVIOUS_COMPANY], I [ACHIEVEMENT_1]. This experience has equipped me with [SKILL_1] and [SKILL_2], which I believe align perfectly with your requirements.

What particularly attracts me to [COMPANY] is [COMPANY_REASON]. I am impressed by [SPECIFIC_DETAIL] and would love to be part of a team that [COMPANY_VALUE].

Key highlights of my qualifications include:
• [QUALIFICATION_1]
• [QUALIFICATION_2]  
• [QUALIFICATION_3]

I would welcome the opportunity to discuss how my skills and passion can contribute to [COMPANY]'s continued success. Thank you for considering my application.

Best regards,
[YOUR_NAME]`,
    tips: [
      'Research the company and mention specific details',
      'Quantify your achievements with numbers',
      'Address the hiring manager by name if possible',
      'Keep it to one page maximum',
      'Match your skills to the job requirements'
    ],
    placeholders: {
      '[HIRING_MANAGER]': 'Hiring Manager name or "Hiring Manager"',
      '[POSITION]': 'Job title you\'re applying for',
      '[COMPANY]': 'Company name',
      '[FIELD]': 'Your field/industry',
      '[YEARS]': 'Years of experience',
      '[PREVIOUS_COMPANY]': 'Your previous company',
      '[ACHIEVEMENT_1]': 'Specific achievement or responsibility',
      '[SKILL_1]': 'Relevant skill',
      '[SKILL_2]': 'Another relevant skill',
      '[COMPANY_REASON]': 'Why you want to work at this company',
      '[SPECIFIC_DETAIL]': 'Something specific about the company',
      '[COMPANY_VALUE]': 'Company mission/value that resonates',
      '[QUALIFICATION_1]': 'Key qualification',
      '[QUALIFICATION_2]': 'Another qualification',
      '[QUALIFICATION_3]': 'Third qualification',
      '[YOUR_NAME]': 'Your full name'
    }
  },
  {
    id: 'follow-up-application',
    title: 'Application Follow-up',
    description: 'Follow up on your job application status',
    icon: '📧',
    category: 'Follow-up',
    template: `Subject: Following up on [POSITION] Application - [YOUR_NAME]

Dear [HIRING_MANAGER],

I hope this email finds you well. I am writing to follow up on my application for the [POSITION] role at [COMPANY], which I submitted on [DATE].

I remain very interested in this opportunity and believe my [KEY_SKILL] experience would be valuable to your team. Since submitting my application, I have [RECENT_ACHIEVEMENT], which further strengthens my candidacy.

I understand you likely receive many applications and appreciate the time needed for review. If there are any additional materials or information I can provide to support my candidacy, please let me know.

I would be happy to schedule a brief call to discuss how I can contribute to [COMPANY]'s [SPECIFIC_GOAL]. Thank you for your time and consideration.

Best regards,
[YOUR_NAME]
[PHONE_NUMBER]
[EMAIL]`,
    tips: [
      'Wait at least 1-2 weeks before following up',
      'Keep it brief and professional',
      'Mention something new since your application',
      'Show continued interest without being pushy',
      'Include your contact information'
    ],
    placeholders: {
      '[POSITION]': 'Job title',
      '[YOUR_NAME]': 'Your full name',
      '[HIRING_MANAGER]': 'Hiring Manager name',
      '[COMPANY]': 'Company name',
      '[DATE]': 'Application submission date',
      '[KEY_SKILL]': 'Your most relevant skill',
      '[RECENT_ACHIEVEMENT]': 'Something you\'ve accomplished recently',
      '[SPECIFIC_GOAL]': 'Company goal or project',
      '[PHONE_NUMBER]': 'Your phone number',
      '[EMAIL]': 'Your email address'
    }
  },
  {
    id: 'networking-cold-outreach',
    title: 'Networking Outreach',
    description: 'Reach out to professionals for networking',
    icon: '🤝',
    category: 'Networking',
    template: `Subject: [MUTUAL_CONNECTION] suggested I reach out

Hello [CONTACT_NAME],

I hope this message finds you well. [MUTUAL_CONNECTION] suggested I reach out to you when I mentioned my interest in [INDUSTRY/FIELD].

I am a [YOUR_ROLE] with [YEARS] years of experience in [YOUR_FIELD]. I'm particularly interested in [SPECIFIC_AREA] and have been following [COMPANY]'s work in this space.

I would love to learn more about your experience at [COMPANY] and your insights into [SPECIFIC_TOPIC]. If you have 15-20 minutes for a brief coffee chat or phone call in the coming weeks, I would greatly appreciate it.

I understand you're busy, so if now isn't a good time, please feel free to suggest a better time that works for you.

Thank you for considering my request.

Best regards,
[YOUR_NAME]
[YOUR_TITLE]
[PHONE_NUMBER]
[EMAIL]`,
    tips: [
      'Always mention a mutual connection if possible',
      'Be specific about what you want to learn',
      'Keep the ask small (15-20 minutes)',
      'Show that you\'ve done research on them/their company',
      'Be flexible with timing'
    ],
    placeholders: {
      '[MUTUAL_CONNECTION]': 'Name of mutual connection',
      '[CONTACT_NAME]': 'Person you\'re reaching out to',
      '[INDUSTRY/FIELD]': 'Industry or field of interest',
      '[YOUR_ROLE]': 'Your current role',
      '[YEARS]': 'Years of experience',
      '[YOUR_FIELD]': 'Your field/specialty',
      '[SPECIFIC_AREA]': 'Specific area of interest',
      '[COMPANY]': 'Their company',
      '[SPECIFIC_TOPIC]': 'Topic you want to discuss',
      '[YOUR_NAME]': 'Your full name',
      '[YOUR_TITLE]': 'Your job title',
      '[PHONE_NUMBER]': 'Your phone number',
      '[EMAIL]': 'Your email address'
    }
  },
  {
    id: 'interview-thank-you',
    title: 'Interview Thank You',
    description: 'Thank you email after an interview',
    icon: '🙏',
    category: 'Follow-up',
    template: `Subject: Thank you for today's interview - [POSITION]

Dear [INTERVIEWER_NAME],

Thank you for taking the time to meet with me today to discuss the [POSITION] role at [COMPANY]. I enjoyed our conversation about [SPECIFIC_TOPIC] and learning more about [TEAM/PROJECT].

Our discussion reinforced my enthusiasm for this opportunity. I'm particularly excited about [SPECIFIC_ASPECT] and how I could contribute with my experience in [RELEVANT_EXPERIENCE].

I wanted to follow up on [QUESTION/TOPIC] that came up during our conversation. [ADDITIONAL_INFO]

Please let me know if you need any additional information from me. I look forward to the next steps in the process.

Thank you again for your time and consideration.

Best regards,
[YOUR_NAME]`,
    tips: [
      'Send within 24 hours of the interview',
      'Reference specific topics discussed',
      'Reiterate your interest in the role',
      'Address any concerns that came up',
      'Keep it concise and professional'
    ],
    placeholders: {
      '[INTERVIEWER_NAME]': 'Interviewer\'s name',
      '[POSITION]': 'Job title',
      '[COMPANY]': 'Company name',
      '[SPECIFIC_TOPIC]': 'Topic discussed in interview',
      '[TEAM/PROJECT]': 'Team or project mentioned',
      '[SPECIFIC_ASPECT]': 'Exciting aspect of the role',
      '[RELEVANT_EXPERIENCE]': 'Your relevant experience',
      '[QUESTION/TOPIC]': 'Question or topic to follow up on',
      '[ADDITIONAL_INFO]': 'Additional information or clarification',
      '[YOUR_NAME]': 'Your full name'
    }
  },
  {
    id: 'linkedin-connection',
    title: 'LinkedIn Connection Request',
    description: 'Personalized LinkedIn connection message',
    icon: '🔗',
    category: 'Networking',
    template: `Hi [CONTACT_NAME],

I'd love to connect with you! I [CONNECTION_REASON] and was impressed by your work in [FIELD/AREA].

I'm a [YOUR_ROLE] with experience in [YOUR_EXPERTISE]. I'd be interested in [MUTUAL_INTEREST].

Best regards,
[YOUR_NAME]`,
    tips: [
      'Keep it under 300 characters',
      'Mention where you found them',
      'Be specific about why you want to connect',
      'Find common ground',
      'Be genuine and personal'
    ],
    placeholders: {
      '[CONTACT_NAME]': 'Person\'s first name',
      '[CONNECTION_REASON]': 'How you found them or why connecting',
      '[FIELD/AREA]': 'Their field or area of expertise',
      '[YOUR_ROLE]': 'Your current role',
      '[YOUR_EXPERTISE]': 'Your area of expertise',
      '[MUTUAL_INTEREST]': 'Common interest or goal',
      '[YOUR_NAME]': 'Your first name'
    }
  },
  {
    id: 'salary-negotiation',
    title: 'Salary Negotiation',
    description: 'Professional salary negotiation email',
    icon: '💰',
    category: 'Negotiation',
    template: `Subject: [POSITION] Offer Discussion

Dear [HIRING_MANAGER],

Thank you for extending the offer for the [POSITION] role at [COMPANY]. I'm excited about the opportunity to join your team and contribute to [COMPANY_GOAL].

After careful consideration of the offer and research into market rates for similar positions, I would like to discuss the compensation package. Based on my [YEARS] years of experience in [FIELD] and my track record of [ACHIEVEMENT], I believe a salary of [DESIRED_SALARY] would be more aligned with market standards and the value I can bring to the role.

[ADDITIONAL_JUSTIFICATION]

I'm open to discussing the complete compensation package, including [OTHER_BENEFITS]. I remain very enthusiastic about joining [COMPANY] and am confident we can reach a mutually beneficial agreement.

I would appreciate the opportunity to discuss this further. Thank you for your understanding.

Best regards,
[YOUR_NAME]`,
    tips: [
      'Do your research on market rates first',
      'Justify with specific achievements',
      'Be professional and positive',
      'Consider the entire package, not just salary',
      'Show enthusiasm for the role'
    ],
    placeholders: {
      '[POSITION]': 'Job title',
      '[HIRING_MANAGER]': 'Hiring manager\'s name',
      '[COMPANY]': 'Company name',
      '[COMPANY_GOAL]': 'Company goal or mission',
      '[YEARS]': 'Years of experience',
      '[FIELD]': 'Your field',
      '[ACHIEVEMENT]': 'Specific achievement',
      '[DESIRED_SALARY]': 'Your desired salary range',
      '[ADDITIONAL_JUSTIFICATION]': 'Additional justification for your request',
      '[OTHER_BENEFITS]': 'Other benefits to discuss',
      '[YOUR_NAME]': 'Your full name'
    }
  },
  {
    id: 'job-decline',
    title: 'Job Offer Decline',
    description: 'Politely decline a job offer',
    icon: '❌',
    category: 'Professional',
    template: `Subject: [POSITION] Offer - [YOUR_NAME]

Dear [HIRING_MANAGER],

Thank you for offering me the [POSITION] role at [COMPANY]. I appreciate the time you and your team invested in the interview process and the confidence you've shown in my abilities.

After careful consideration, I have decided to decline the offer. [DECLINE_REASON - this was a difficult decision, but I have accepted another opportunity that aligns more closely with my current career goals / I have decided to pursue a different direction at this time].

I was impressed by [POSITIVE_ASPECT] and the [TEAM/CULTURE]. I hope our paths may cross again in the future.

Thank you again for this opportunity. I wish you and the team all the best in finding the right candidate for this role.

Best regards,
[YOUR_NAME]`,
    tips: [
      'Respond promptly (within 2-3 days)',
      'Be gracious and professional',
      'Keep the reason brief and positive',
      'Leave the door open for future opportunities',
      'Thank them for their time'
    ],
    placeholders: {
      '[POSITION]': 'Job title',
      '[YOUR_NAME]': 'Your full name',
      '[HIRING_MANAGER]': 'Hiring manager\'s name',
      '[COMPANY]': 'Company name',
      '[DECLINE_REASON]': 'Brief, professional reason for declining',
      '[POSITIVE_ASPECT]': 'Something positive about the company',
      '[TEAM/CULTURE]': 'Team or culture aspect you appreciated'
    }
  },
  {
    id: 'referral-request',
    title: 'Employee Referral Request',
    description: 'Ask for an employee referral',
    icon: '👥',
    category: 'Networking',
    template: `Subject: Referral Request for [POSITION] at [COMPANY]

Hi [CONTACT_NAME],

I hope you're doing well! I saw that [COMPANY] has an opening for a [POSITION] role, and I'm very interested in applying. 

Given your experience at [COMPANY], I was wondering if you might be able to provide some insights about the role and team. I have [YEARS] years of experience in [FIELD] and have worked on [RELEVANT_EXPERIENCE].

If you feel comfortable doing so, would you be willing to refer me for this position? I understand this is asking a favor, and I want to make sure my background aligns well with what the team is looking for.

I've attached my resume for your review. If you think I'd be a good fit, I'd be grateful for a referral. If not, I completely understand and would still appreciate any advice you might have.

Thanks for considering this, and I hope we can catch up soon!

Best,
[YOUR_NAME]`,
    tips: [
      'Only ask people you have a genuine relationship with',
      'Provide your resume for their review',
      'Make it easy for them to say no',
      'Explain why you\'re interested in the specific role',
      'Offer to take them out for coffee/lunch as thanks'
    ],
    placeholders: {
      '[CONTACT_NAME]': 'Contact\'s first name',
      '[POSITION]': 'Job title',
      '[COMPANY]': 'Company name',
      '[YEARS]': 'Years of experience',
      '[FIELD]': 'Your field',
      '[RELEVANT_EXPERIENCE]': 'Relevant experience or projects',
      '[YOUR_NAME]': 'Your first name'
    }
  }
];

export default function EmailDraftingPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [customizedEmail, setCustomizedEmail] = useState('');
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(emailTemplates.map(t => t.category)))];

  const filteredTemplates = activeCategory === 'All' 
    ? emailTemplates 
    : emailTemplates.filter(t => t.category === activeCategory);

  const handleTemplateSelect = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setCustomizedEmail(template.template);
    setFormData({});
  };

  const handleFormDataChange = (placeholder: string, value: string) => {
    setFormData(prev => ({ ...prev, [placeholder]: value }));
    
    // Update the email with the new value
    let updatedEmail = selectedTemplate?.template || '';
    const updatedFormData = { ...formData, [placeholder]: value };
    
    Object.entries(updatedFormData).forEach(([key, val]) => {
      updatedEmail = updatedEmail.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), val);
    });
    
    setCustomizedEmail(updatedEmail);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(customizedEmail);
      alert('Email copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const generateWithAI = () => {
    // Placeholder for AI generation
    alert('AI-powered customization coming soon! This will analyze the context and automatically fill in placeholders with intelligent suggestions.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/master" className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block">
            ← Back to Master Menu
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Professional Email Drafting</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create professional emails for every stage of your job search journey. From cover letters to follow-ups, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Email Templates</h2>
              
              {/* Category Filter */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeCategory === category
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Template List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredTemplates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                      selectedTemplate?.id === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{template.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{template.title}</h3>
                        <p className="text-sm text-gray-600">{template.description}</p>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {template.category}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Email Editor */}
          <div className="lg:col-span-2">
            {selectedTemplate ? (
              <div className="space-y-6">
                {/* Selected Template Header */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{selectedTemplate.icon}</div>
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900">{selectedTemplate.title}</h2>
                        <p className="text-gray-600">{selectedTemplate.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={generateWithAI}
                      className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
                    >
                      🤖 AI Assist
                    </button>
                  </div>

                  {/* Tips */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips:</h4>
                    <ul className="space-y-1">
                      {selectedTemplate.tips.map((tip, index) => (
                        <li key={index} className="text-sm text-blue-800">• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Customization Form */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Customize Your Email</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedTemplate.placeholders).map(([placeholder, description]) => (
                      <div key={placeholder}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {placeholder.replace(/[\[\]]/g, '')}
                        </label>
                        <input
                          type="text"
                          placeholder={description}
                          value={formData[placeholder] || ''}
                          onChange={(e) => handleFormDataChange(placeholder, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Email Preview */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Email Preview</h3>
                    <button
                      onClick={copyToClipboard}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
                    >
                      📋 Copy to Clipboard
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                      {customizedEmail}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              /* Welcome Message */
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="text-6xl mb-6">📧</div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to Email Drafting</h2>
                <p className="text-gray-600 mb-6">
                  Select a template from the left to start drafting your professional email. 
                  Each template comes with expert tips and customizable fields to help you create the perfect message.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl mb-2">📄</div>
                    <div className="text-sm text-gray-600">Cover Letters</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">📧</div>
                    <div className="text-sm text-gray-600">Follow-ups</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">🤝</div>
                    <div className="text-sm text-gray-600">Networking</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">💰</div>
                    <div className="text-sm text-gray-600">Negotiations</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}